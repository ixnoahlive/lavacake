import { Endpoint } from './src/types/endpoint'
import fs from 'fs'

const pathFiles = {}

fs.readdirSync('./src/routes').filter(fileName => fileName.endsWith('.ts')).forEach(fileName => {
    const EndpointData : Endpoint = require(`./src/routes/${fileName.replace('.ts','')}`)
    pathFiles[EndpointData.path] = EndpointData
})

export default function Res(obj : object) {
    return new Response(JSON.stringify(obj))
}

const Ratelimits = {}
Bun.serve({
    port: 9753,
    fetch(req) {
        // Check if ratelimited
        if ( Ratelimits[req.headers['x-forwarded-for']]>=10 ) return Res({ success: false, code: 429, error: 'You are being ratelimited' })

        // Format data
        const reqUrl = new URL(req.url)
        const EndpointData : Endpoint = pathFiles[reqUrl.pathname]

        // Check for valid arguments
        if ( !EndpointData ) return Res({ success: false, code: 400, error: 'Invalid pathname' })
        if ( !EndpointData.params.every( key => reqUrl.searchParams.has(key) ) ) return Res({ success: false, code: 400, error: 'Missing parameters', required: EndpointData.params })

        // Manage ratelimit addition
        if (!Ratelimits[req.headers['x-forwarded-for']]) Ratelimits[req.headers['x-forwarded-for']] = 0
        Ratelimits[req.headers['x-forwarded-for']]++
        setTimeout(() => {
            Ratelimits[req.headers['x-forwarded-for']] -= 1
        }, 10*1000);

        // Run endpoint code
        return EndpointData.run( req, reqUrl.searchParams )
    }
})