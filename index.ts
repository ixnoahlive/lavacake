import { Endpoint } from './src/types/endpoint'
import fs from 'fs'

const pathFiles: Record<string, Endpoint> = {}

fs.readdirSync('./src/routes').filter(fileName => fileName.endsWith('.ts')).forEach(fileName => {
    const endpointData : Endpoint = require(`./src/routes/${fileName.replace('.ts','')}`)
    pathFiles[endpointData.path] = endpointData
})

export default function Res(obj : object) {
    return new Response(JSON.stringify(obj))
}

const rateLimits: Record<string, number> = {}
Bun.serve({
    port: 9753,
    fetch(req) {
        // Check if ratelimited
        const consumerIP = req.headers.get('x-forwarded-for');
        if(!consumerIP) {
            throw new Error("x-forwarded-for header is required but not provided");
        }
        if ( rateLimits[consumerIP]>=10 ) return Res({ success: false, code: 429, error: 'You are being ratelimited' })

        // Format data
        const reqUrl = new URL(req.url)
        const endpointData : Endpoint = pathFiles[reqUrl.pathname]

        // Check for valid arguments
        if ( !endpointData ) return Res({ success: false, code: 400, error: 'Invalid pathname' })
        if ( !endpointData.params.every( key => reqUrl.searchParams.has(key) ) ) return Res({ success: false, code: 400, error: 'Missing parameters', required: endpointData.params })

        // Manage ratelimit addition
        if (!rateLimits[consumerIP]) rateLimits[consumerIP] = 0
        rateLimits[consumerIP]++
        setTimeout(() => {
            rateLimits[consumerIP] -= 1
        }, 10*1000);

        // Run endpoint code
        return endpointData.run( req, reqUrl.searchParams )
    }
})
