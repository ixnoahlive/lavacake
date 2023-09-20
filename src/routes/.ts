import Res from "../../index"
import packageInfo from '../../package.json' assert { type: 'json' };

export default {
    path: '/',
    params: [],
    run(req: Request) {
        return Res({
            version: packageInfo.version,
            code: 200,
            message: '🍰 Lavacake is baked & running!'
        })
    }
}