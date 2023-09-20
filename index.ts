import config from './config.json' assert { type: 'json' }

import { Endpoint } from './src/types/endpoint'
import { endpoints } from './src/routes'

export default function Res(obj: object) {
    return new Response(JSON.stringify(obj))
}

const rateLimits: Record<string, number> = {} // Track User Ratelimits

// Currently unused while I'm researching how the ratelimits work
const rateHypixel = { lastPeriod: Date.now(), requests: 0 } // Track Hypixel API Ratelimits
Bun.serve({
    port: 9753,
    fetch(req) {
        // Check if ratelimited
        const consumerIP = req.headers.get('x-forwarded-for') || '0.0.0.0' // Fallback to prevnet TS annotation freakout
        if (config.userRatelimit.enabled) {
            if (!consumerIP) {
                throw new Error('x-forwarded-for header is required but not provided. Disable userRatelimit in config.json to solve this.')
            }
            if (rateLimits[consumerIP] >= config.userRatelimit.reqAmount)
                return Res({
                    success: false,
                    code: 429,
                    error: 'You are being ratelimited',
                })
        }

        // Format data
        const reqUrl = new URL(req.url)
        const EndpointData: Endpoint = endpoints[reqUrl.pathname.replace('/', '') || 'root']

        // Check for valid arguments
        if (!EndpointData) return Res({ success: false, code: 404, error: 'Not found' })
        if (!EndpointData.params.every((key) => reqUrl.searchParams.has(key)))
            return Res({
                success: false,
                code: 400,
                error: 'Missing parameters',
                required: EndpointData.params,
            })

        // Manage ratelimit addition
        if (config.userRatelimit.enabled) {
            if (!rateLimits[consumerIP]) rateLimits[consumerIP] = 0
            rateLimits[consumerIP]++
            setTimeout(() => {
                rateLimits[consumerIP] -= 1
            }, config.userRatelimit.expires * 1000)
        }

        // Run endpoint code
        return EndpointData.run(req, reqUrl.searchParams)
    },
})
