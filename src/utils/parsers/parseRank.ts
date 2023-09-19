import { colors } from '../../types/colors'

const ranks = {
    VIP: '&a[VIP]',
    VIP_PLUS: '&a[VIP&6+&a]',
    MVP: '&b[MVP]',
    MVP_PLUS: '&b[MVP&%+&b]',
    MVP_PLUS_PLUS: '&$[MVP&%++&$]',
    GAME_MASTER: '&2[GM]',
    ADMIN: '&c[ADMIN]',
    YOUTUBER: '&c[&fYOUTUBE&c]',
    NONE: '&7'
}

export default function parseRank(rank, plusColour, rankColour) {
    console.log(ranks)
    console.log(colors)
    return ranks[rank]
    .replace(/&%/g,  `&${colors[plusColour.toLowerCase()]}`)
    .replace(/&\$/g, `&${colors[rankColour.toLowerCase()]}`)
}