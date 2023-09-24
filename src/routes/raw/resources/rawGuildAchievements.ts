import hypixelApi from '../../../utils/hypixelApi'
import Res from '../../../../index'

// cacheless
export default {
    path: '/rawGuildAchievements',
    async run(req: Request, params: URLSearchParams) {
        const APIPromise = await hypixelApi.get(`/resources/guilds/achievements`)
        const HypixelData = await APIPromise.json()

        return Res(HypixelData)
    },
}
