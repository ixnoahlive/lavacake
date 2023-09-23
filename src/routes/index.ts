// @ts-nocheck
import { Endpoint } from '../types/endpoint.ts'
import player from './player.ts'
import root from './.ts'

import rawPlayer from './rawPlayer.ts'
import rawRecentGames from './rawRecentGames.ts'
import rawStatus from './rawStatus.ts'

export const endpoints: Record<string, Endpoint> = {
    root,

    player,

    rawRecentGames,
    rawStatus,
    rawPlayer,
}
