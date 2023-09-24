// @ts-nocheck
import { Endpoint } from '../types/endpoint.ts'
import root from './.ts'

import player from './wrapped/player.ts'

import rawPlayer from './raw/player/rawPlayer.ts'
import rawRecentGames from './raw/player/rawRecentGames.ts'
import rawStatus from './raw/player/rawStatus.ts'
import rawPunishments from './raw/other/rawPunishments.ts'
import rawBoosters from './raw/other/rawBoosters.ts'
import rawCounts from './raw/other/rawCounts.ts'
import rawLeaderboards from './raw/other/rawLeaderboards.ts'
import rawGuild from './raw/player/rawGuild.ts'


import rawSbBingo from './raw/skyblock/rawSbBingo.ts'
import rawSbElections from './raw/skyblock/rawSbElections.ts'
import rawSbNews from './raw/skyblock/rawSbNews.ts'
import rawSbFireSales from './raw/skyblock/rawSbFireSales.ts'

export const endpoints: Record<string, Endpoint> = {
    root,

    // Wrapped data
    player,

    // Raw data
    rawLeaderboards,
    rawPunishments,
    rawRecentGames,
    rawBoosters,
    rawCounts,
    rawStatus,
    rawPlayer,
    rawGuild,

    rawSbBingo,
    rawSbElections,
    rawSbNews,
    rawSbFireSales,
}
