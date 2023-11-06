import { RankPriority } from '../../types/priority'

type HousingMeta = {
    packages?: Array<string>
    purchasedSlots?: number,
    plotSize?: string
}

export default function parseHousing(rank: keyof typeof RankPriority, housingMeta: HousingMeta) {

    // Slot Calculation
    const rankPriority = RankPriority[rank] || 0

    let slots = 0
    let slotsDefault = 1
    let slotsPurchased = housingMeta.purchasedSlots || 0

    if (rankPriority >= 1) slotsDefault++
    if (rankPriority >= 3) slotsDefault++

    slots += slotsDefault
    slots += slotsPurchased

    // Cookie Data calculation
    const Cookies = {}
    const cookieKeys = Object.keys(housingMeta).filter(key => key.startsWith('given_cookies_'))

    // FIXME: code could use some cleanup & look from other future contributors. cheers.
    cookieKeys.forEach(key => {
        const weirdDate = parseInt( /given_cookies_([0-9]+)/.exec(key)[1] )
        
        const year = Math.floor(weirdDate / 52)
        const week = Math.floor((weirdDate / 52 % 1).toFixed(4) * 52) + 1 // Prevent floating point issues by using toFixed

        if (!Cookies[year]) Cookies[year] = {}
        Cookies[year][week] = { ids: housingMeta[key], spent: housingMeta[key].length }
    })

    return {
        housingPlus: housingMeta.packages?.includes('housing_plus'),

        slots,
        slotsPurchased,
        slotsDefault,

        plotSize: housingMeta.plotSize || 'TINY',

        cookies: Cookies,
    }
}
