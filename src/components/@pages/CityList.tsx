import { DeleteIcon } from '@chakra-ui/icons'
import { Heading, IconButton, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CityDto, CityService } from '../../service/service'
import { LinkButton } from '../@common/LinkButton'
import { Page } from '../@layout/Page'

export const CityList: React.FC = () => {
    const [cityList, setCityList] = useState<CityDto[]>([])

    useEffect(() => {
        CityService.findAll().then(cities => {
            setCityList(cities)
        })
    }, [setCityList])

    const deleteCity = (id: number) => {
        CityService.remove({ id: id.toString() }, { data: { please: true } }).then(() => {
            setCityList(cityList.filter(c => c.id !== id))
        })
    }

    return (
        <Page>
            <Heading py={5}>Cities</Heading>
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
                                    {city.lat}, {city.lon}
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
            <LinkButton href="/city/new">Add new city</LinkButton>
        </Page>
    )
}
