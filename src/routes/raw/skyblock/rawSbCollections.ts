import hypixelApi from '../../../utils/hypixelApi'
import Res from '../../../../index'

// cacheless
export default {
    path: '/rawCollections',
    params: [],
    async run(req: Request, params: URLSearchParams) {
        const APIPromise = await hypixelApi.get(`/resources/skyblock/collections`)
        const HypixelData = await APIPromise.json()

        return Res(HypixelData)
    },
}
