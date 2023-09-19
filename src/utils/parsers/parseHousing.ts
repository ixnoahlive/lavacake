const { priority } = require( "../../types/priority" );

export function parseHousing(rank, housingMeta) {
    const rankPriority = priority[rank] || 0
    
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