import { Text } from '@chakra-ui/react'

export interface CoordinateProp {
    latitude: string | number
    longitude: string | number
}
export const CoordinateText: React.FC<CoordinateProp> = ({ latitude, longitude }: CoordinateProp) => {
    const lat = typeof latitude === 'string' ? Number.parseFloat(latitude) : latitude
    const lon = typeof longitude === 'string' ? Number.parseFloat(longitude) : longitude

    const latLabel = lat > 0 ? 'N' : 'S'
    const lonLabel = lon > 0 ? 'E' : 'W'

    return (
        <Text as={'span'}>
            {lat?.toFixed(4)}° {latLabel}, {lon?.toFixed(4)}° {lonLabel}
        </Text>
    )
}
