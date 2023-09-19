import tokens from '../../token.json'

function get(endpoint : string) {
    return fetch(`https://api.hypixel.net`+endpoint, { method: 'GET', headers: { 'API-Key': tokens[tokens[active]] } })
}

export default { get }