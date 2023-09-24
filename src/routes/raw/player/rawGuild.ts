import hypixelApi from '../../../utils/hypixelApi'
import Res from '../../../../index'

// cacheless
export default {
    path: '/rawGuild',
    oneOf: ['player', 'name', 'id'],
    async run(req: Request, params: URLSearchParams) {
        let searchParam = null
        switch (true) {
            // ! fixme: messy code
            case params.has('id'):
                searchParam = 'id'
                break
            case params.has('name'):
                searchParam = 'name'
                break
            case params.has('player'):
                searchParam = 'player'
                break
        }
        if (!searchParam) return Res({ success: false, code: 400 })
        const APIPromise = await hypixelApi.get(`/guild?${searchParam}=${params.get(searchParam)}`)
        const HypixelData = await APIPromise.json()

        return Res(HypixelData)
    },
}
