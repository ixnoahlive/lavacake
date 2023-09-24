import hypixelApi from '../../../utils/hypixelApi'
import Res from '../../../../index'

// cacheless
export default {
    path: '/rawStatus',
    params: ['uuid'],
    async run(req: Request, params: URLSearchParams) {
        const APIPromise = await hypixelApi.get(`/status?uuid=${params.get('uuid')}`)
        const HypixelData = await APIPromise.json()

        return Res(HypixelData)
    },
}
