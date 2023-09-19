import hypixelApi from "../utils/hypixelApi";
import Res from "../../index";

import parseRank from '../utils/parsers/parseRank';
import parseHousing from '../utils/parsers/parseHousing';

const Cache = {}
module.exports = {
    path: '/player',
    params: ['name'],
    async run(req : Request, params : URLSearchParams) {
        let HypixelData = Cache[ params.get('name').toLowerCase() ]
        let previouslyCached = HypixelData ? true : false

        if (!previouslyCached) {
            await hypixelApi.get(`/player?name=${params.get('name')}`)
                .then(promise => promise.json().then(
                    result => { HypixelData = result }
                ));
        }
        
        // Return raw response if unsuccessful
        if (!HypixelData.success || !HypixelData) return Res(HypixelData || {success: false, code: 404, error: 'Could not retrieve player data from cache or API'})
        HypixelData = HypixelData.player

        Cache[params.get('name').toLowerCase()] = HypixelData

        // Fetch rank
        let rankId = "NONE";
        if (HypixelData.newPackageRank)                                                rankId = HypixelData.newPackageRank
        if (HypixelData.monthlyPackageRank || HypixelData.monthlyPackageRank!=="NONE") rankId = HypixelData.monthlyPackageRank
        if (HypixelData.rank)                                                          rankId = HypixelData.rank

        if (rankId=="SUPERSTAR") rankId == "MVP_PLUS_PLUS"

        // Remove from cache after time
        if (!previouslyCached) {
            setTimeout(() => {
                delete Cache[HypixelData.playername]
            }, 120*1000);
        }

        return Res({
            success: true,

            _id:         HypixelData._id,
            uuid:        HypixelData.uuid,
            displayName: HypixelData.displayname,
            playerName:  HypixelData.playername,

            rank: rankId,
            rankFormatted: parseRank(rankId, HypixelData.rankPlusColor, HypixelData.monthlyRankColor),

            firstLogin: HypixelData.firstLogin,
            lastLogout: HypixelData.lastLogout,
            lastLogin:  HypixelData.lastLogin,

            achievements: undefined,
            achievementsOneTime: undefined,
            achievementRewardsNew: undefined,
            achievementTracking: undefined,
            
            quests: {},
            challenges: {},

            housing: parseHousing(rankId, HypixelData.housingMeta),
            
            gifting: {
                mysteryBoxes: {
                    giftsGiven:   HypixelData.giftingMeta?.giftsGiven,
                    bundlesGiven: HypixelData.giftingMeta?.realBundlesGiven,

                    giftsRecieved:   HypixelData.giftingMeta?.giftsRecieved,
                    bundlesRecieved: HypixelData.giftingMeta?.realBundlesRecieved,
                },
                ranks: {
                    ranksGiven: HypixelData.giftingMeta?.ranksGiven
                }
            }
        });
        //const PlayerData = {};
    }
};