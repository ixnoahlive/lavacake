import hypixelApi from '../../../utils/hypixelApi'
import Res from '../../../../index'

// cacheless
export default {
    path: '/rawSbFireSales',
    params: [],
    async run(req: Request, params: URLSearchParams) {
        const APIPromise = await hypixelApi.get(`/skyblock/firesales`)
        const HypixelData = await APIPromise.json()

        return Res(HypixelData)
    },
}
