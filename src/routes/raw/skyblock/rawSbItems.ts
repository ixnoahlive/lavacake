import hypixelApi from '../../../utils/hypixelApi'
import Res from '../../../../index'

// cacheless
export default {
    path: '/rawItems',
    params: [],
    async run(req: Request, params: URLSearchParams) {
        const APIPromise = await hypixelApi.get(`/resources/skyblock/items`)
        const HypixelData = await APIPromise.json()

        return Res(HypixelData)
    },
}
