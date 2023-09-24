import player from '../routes/player'
import Cache from './Cache'

// import ValidationError from "./ValidationError";

// const DashedUUID = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i
// const NormieUUID = /^[A-F\d]{8}[A-F\d]{4}4[A-F\d]{3}[89AB][A-F\d]{3}[A-F\d]{12}$/i

// export function formatUUID( uuid : string, hideDashes : boolean ) {
//     const isDashed = DashedUUID.test(uuid)
//     const isNormie = NormieUUID.test(uuid)

//     if (!isDashed && !isNormie) throw new ValidationError(`Not a valid UUID: ${uuid}`)
//     if (isDashed && isNormie) throw new ValidationError('Schrodinger\'s edge case, please open an issue.')

//     if (hideDashes) {
//         if (isNormie) return uuid
//         return uuid.replace(/-/g, '')
//     } else {
//         if (isDashed) return uuid
//         return uuid.slice(0,8)+'-'+uuid.slice(8,12)+'-'+uuid.slice(12,16)+'-'+uuid.slice(16,20)+'-'+uuid.slice(20)
//     }
//     throw new Error('Couldn\'t format UUID')
// }

/**
 * Checks cache + Queries Mojang API for uuid
 * @param playerName Player name
 * @returns UUID string
 */
export async function getUUID(playerName: string) {
    if (Cache[playerName]) return Cache[playerName].uuid
    fetch(`https://api.mojang.com/users/profiles/minecraft/${playerName}`).then(async (finishedPromise) => {
        await finishedPromise.json().then((result) => {
            return result.uuid
        })
    })
}
