import { Colors } from '../../types/colors'

export enum Ranks {
    VIP = '&a[VIP]',
    VIP_PLUS = '&a[VIP&6+&a]',
    MVP = '&b[MVP]',
    MVP_PLUS = '&b[MVP&%+&b]',
    MVP_PLUS_PLUS = '&$[MVP&%++&$]',
    GAME_MASTER = '&2[GM]',
    ADMIN = '&c[ADMIN]',
    YOUTUBER = '&c[&fYOUTUBE&c]',
    NONE = '&7',
}
export default function parseRank(rank: keyof typeof Ranks, plusColour: keyof typeof Colors, rankColour: keyof typeof Colors) {
    return Ranks[rank].replace(/&%/g, `&${Colors[plusColour]}`).replace(/&\$/g, `&${Colors[rankColour]}`)
}
