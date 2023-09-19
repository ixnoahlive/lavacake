import hypixelApi from "../utils/hypixelApi";
import Res from "../../index";

const Cache = {}
export default {
    endpoint: 'rawPlayer',
    path: '/rawPlayer',
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

        // Remove from cache after time
        if (!previouslyCached) {
            setTimeout(() => {
                delete Cache[HypixelData.playername]
            }, 120*1000);
        }

        return Res(HypixelData);
    }
};
