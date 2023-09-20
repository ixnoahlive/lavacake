import hypixelApi from "../utils/hypixelApi";
import Res from "../../index";

const Cache: Record<string, any> = {}
module.exports = {
    path: '/rawPlayer',
    params: ['name'],
    async run(req : Request, params : URLSearchParams) {
        const lowerCaseName = params.get('name')?.toLowerCase();
        if(!lowerCaseName) {
            throw new Error("Name is required but not provided");
        }
        let HypixelData = Cache[lowerCaseName]
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

        Cache[lowerCaseName] = HypixelData

        // Remove from cache after time
        if (!previouslyCached) {
            setTimeout(() => {
                delete Cache[lowerCaseName]
            }, 120*1000);
        }

        return Res(HypixelData);
    }
};
