import tokensJSON from '../../token.json'
const tokens = tokensJSON as {
    active: 'devToken' | 'appToken'
    devToken: string
    appToken: string
}

if (tokens[tokens.active]) console.warn("You didn't make a valid token.json file! Please refer to README.md!")

function get(endpoint: string) {
    return fetch(`https://api.hypixel.net` + endpoint, {
        method: 'GET',
        headers: { 'API-Key': tokens[tokens.active] },
    })
}
export default { get }
