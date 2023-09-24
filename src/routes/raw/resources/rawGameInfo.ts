import hypixelApi from '../../../utils/hypixelApi'
import Res from '../../../../index'

// cacheless
export default {
    path: '/rawGameInfo',
    async run(req: Request, params: URLSearchParams) {
        const APIPromise = await hypixelApi.get(`/resources/games`)
        const HypixelData = await APIPromise.json()

        return Res(HypixelData)
    },
}
