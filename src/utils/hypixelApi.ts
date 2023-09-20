import tokensJSON from '../../token.json'
const tokens = tokensJSON as {
    active: 'devToken' | 'appToken'
    devToken: string
    appToken: string
}

function get(endpoint: string) {
    return fetch(`https://api.hypixel.net` + endpoint, {
        method: 'GET',
        headers: { 'API-Key': tokens[tokens.active] },
    })
}

export default { get }
