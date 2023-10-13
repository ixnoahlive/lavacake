import hypixelApi from '../../../utils/hypixelApi'
import Res from '../../../../index'

// cacheless
export default {
    path: '/rawAuctionsEnded',
    params: [],
    async run(req: Request, params: URLSearchParams) {
        const APIPromise = await hypixelApi.get(`/skyblock/auctions_ended`)
        const HypixelData = await APIPromise.json()

        return Res(HypixelData)
    },
}
