import hypixelApi from '../../utils/hypixelApi'
import Cache from '../../utils/Cache'
import Res from '../../../index'

import parseRank, { Ranks } from '../../utils/parsers/parseRank'
import parseHousing from '../../utils/parsers/parseHousing'
import nwLevel from '../../utils/calc/nwLevel'

export default {
    path: '/player',
    params: ['name'],
    async run(req: Request, params: URLSearchParams) {
        const lowerCaseName = params.get('name')?.toLowerCase()
        if (!lowerCaseName) {
            throw new Error('Name is required but not provided')
        }
        let HypixelData = Cache[lowerCaseName]
        let previouslyCached = HypixelData ? true : false

        if (!previouslyCached) {
            await hypixelApi.get(`/player?name=${lowerCaseName}`).then((promise) =>
                promise.json().then((result) => {
                    HypixelData = result
                }),
            )
        }

        // Return raw response if unsuccessful
        if (HypixelData.success == false || !HypixelData)
            return Res(
                HypixelData || {
                    success: false,
                    code: 404,
                    error: 'Could not retrieve player data from cache or API',
                },
            )
        if (HypixelData.player) HypixelData = HypixelData.player

        if (!previouslyCached) {
            HypixelData._lastUpdate = Date.now()
            Cache[lowerCaseName] = HypixelData
        }

        // Fetch rank
        let rankId = 'NONE'
        if (HypixelData.newPackageRank) rankId = HypixelData.newPackageRank
        if (HypixelData.monthlyPackageRank !== 'NONE') rankId = HypixelData.monthlyPackageRank || rankId
        if (HypixelData.rank) rankId = HypixelData.rank

        if (rankId == 'SUPERSTAR') rankId = 'MVP_PLUS_PLUS'

        // Remove from cache after time
        if (!previouslyCached) {
            setTimeout(() => {
                delete Cache[lowerCaseName as string] // setTimeout would not be called if lowerCaseName was undefined
            }, 300 * 1000)
        }

        return Res({
            success: true,
            _lastUpdate: HypixelData._lastUpdate,

            _id: HypixelData._id,
            uuid: HypixelData.uuid,
            displayName: HypixelData.displayname,
            playerName: HypixelData.playername,

            rank: rankId,
            rankFormatted: parseRank(rankId as keyof typeof Ranks, HypixelData.rankPlusColor?.toLowerCase(), HypixelData.monthlyRankColor?.toLowerCase()),

            exactNetworkLevel: nwLevel.getExactLevel(HypixelData.networkExp),
            networkLevel: nwLevel.getLevel(HypixelData.networkExp),
            networkExp: HypixelData.networkExp,

            firstLogin: HypixelData.firstLogin,
            lastLogout: HypixelData.lastLogout,
            lastLogin: HypixelData.lastLogin,

            achievements: undefined,
            achievementsOneTime: undefined,
            achievementRewardsNew: undefined,
            achievementTracking: undefined,

            quests: {},
            challenges: {},

            housing: parseHousing(rankId as any, HypixelData.housingMeta),

            gifting: {
                mysteryBoxes: {
                    giftsGiven: HypixelData.giftingMeta?.giftsGiven,
                    bundlesGiven: HypixelData.giftingMeta?.realBundlesGiven,

                    giftsRecieved: HypixelData.giftingMeta?.giftsRecieved,
                    bundlesRecieved: HypixelData.giftingMeta?.realBundlesRecieved,
                },
                ranks: {
                    ranksGiven: HypixelData.giftingMeta?.ranksGiven,
                },
            },
        })
        //const PlayerData = {};
    },
}
