import { RankPriority } from "../../types/priority";

type HousingMeta = { packages?: Array<string>, purchasedSlots?: number, plotSize?: string };

export default function parseHousing(rank: keyof typeof RankPriority, housingMeta: HousingMeta) {
    const rankPriority = RankPriority[rank] || 0

    let slots = 1
    if (rankPriority>=1) slots++
    if (rankPriority>=3) slots++
    if (housingMeta.purchasedSlots) slots += housingMeta.purchasedSlots

    return {
        housingPlus: housingMeta.packages?.includes('housing_plus'),
        housingSlots: slots,
        plotSize: housingMeta.plotSize || 'TINY',
    }
};
