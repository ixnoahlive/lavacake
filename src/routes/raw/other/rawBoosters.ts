import hypixelApi from '../../../utils/hypixelApi'
import Res from '../../../../index'

// cacheless
export default {
    path: '/rawBoosters',
    params: [],
    async run(req: Request, params: URLSearchParams) {
        const APIPromise = await hypixelApi.get(`/boosters`)
        const HypixelData = await APIPromise.json()

        return Res(HypixelData)
    },
}
