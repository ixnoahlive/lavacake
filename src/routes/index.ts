// @ts-nocheck
import { Endpoint } from '../types/endpoint.ts'
import player from './player.ts'
import rawPlayer from './rawPlayer.ts'
import root from './.ts'

export const endpoints: Record<string, Endpoint> = {
    player,
    rawPlayer,
    root,
}
