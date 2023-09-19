const KEYS = {
    main: '02131fbc-d2ea-4d6e-86e0-767fc16761c9',
    dev:  'e7ffe31b-f403-443c-95a3-bdcd5ea47701',
}
const tokens = require('../../token.json')

function get(endpoint : string) {
    return fetch(`https://api.hypixel.net`+endpoint, { method: 'GET', headers: { 'API-Key': KEYS.dev } })
}

export default { get }