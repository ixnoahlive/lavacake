// @ts-nocheck
import { Endpoint } from '../types/endpoint.ts'
import root from './.ts'

import player from './wrapped/player.ts'

import rawPlayer from './raw/rawPlayer.ts'
import rawRecentGames from './raw/rawRecentGames.ts'
import rawStatus from './raw/rawStatus.ts'

export const endpoints: Record<string, Endpoint> = {
    root,

    player,

    rawRecentGames,
    rawStatus,
    rawPlayer,
}
