enum WeatherLabel {
    Thunderstorm,
    Drizzle,
    Rain,
    Snow,
    Clear,
    Atmosphere,
    Clouds,
}

export const weatherCodeToLablel = (code: number): string => {
    switch (code) {
        case WeatherLabel.Thunderstorm:
            return 'Thunderstorm'
        case WeatherLabel.Drizzle:
            return 'Drizzle'
        case WeatherLabel.Rain:
            return 'Rain'
        case WeatherLabel.Snow:
            return 'Snow'
        case WeatherLabel.Clear:
            return 'Clear'
        case WeatherLabel.Atmosphere:
            return 'Atmospheric phenomenon'
        case WeatherLabel.Clouds:
            return 'Cloudy'
        default:
            return 'N/A'
    }
}
