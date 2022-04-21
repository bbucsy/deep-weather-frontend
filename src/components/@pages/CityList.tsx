import { DeleteIcon } from '@chakra-ui/icons'
import {
    Divider,
    Heading,
    IconButton,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CityDto, CityService } from '../../service'
import { CoordinateText } from '../@common/CoordinateText'

import { LinkButton } from '../@common/LinkButton'
import { Card } from '../@layout/Card'
import { Page } from '../@layout/Page'

export const CityList: React.FC = () => {
    const [cityList, setCityList] = useState<CityDto[]>([])

    useEffect(() => {
        CityService.findAll().then(cities => {
            setCityList(cities.data)
        })
    }, [setCityList])

    const deleteCity = (id: number) => {
        CityService.remove(id.toString()).then(() => {
            setCityList(cityList.filter(city => city.id !== id))
        })
    }

    return (
        <Page>
            <Heading py={5}>Cities</Heading>
            <Card>
                <TableContainer>
                    <Table variant="simple">
                        <TableCaption>All cities in database</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Coords</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cityList.map(city => (
                                <Tr key={city.id}>
                                    <Td>
                                        <Link to={`/city/${city.id}`}>{city.name}</Link>
                                    </Td>
                                    <Td>
                                        <CoordinateText latitude={city.lat} longitude={city.lon}></CoordinateText>
                                    </Td>
                                    <Td>
                                        <IconButton
                                            aria-label="Delete city"
                                            colorScheme={'red'}
                                            icon={<DeleteIcon />}
                                            onClick={() => deleteCity(city.id)}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Card>
            <Divider />

            <LinkButton href="/city/new">Add new city</LinkButton>
        </Page>
    )
}
