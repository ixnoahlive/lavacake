type SkyWarsStats = {
    levelFormatted?: string
    levelFormattedWithBrackets?: string

    souls?: number
    souls_gathered?: number
    paid_souls?: number

    lastMode?: string
    skywars_experience?: number

    losses?: number
    wins?: number
    win_streak?: number

    kills?: number
    deaths?: number
    assists?: number
}

export default function parseSkyWars(skywarsData: SkyWarsStats) {
    return {}
}
