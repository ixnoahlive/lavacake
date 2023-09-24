import hypixelApi from '../../../utils/hypixelApi'
import Res from '../../../../index'

// cacheless
export default {
    path: '/rawSbBingo',
    params: [],
    async run(req: Request, params: URLSearchParams) {
        const APIPromise = await hypixelApi.get(`/resources/skyblock/bingo`)
        const HypixelData = await APIPromise.json()

        return Res(HypixelData)
    },
}
