import { DeleteIcon } from '@chakra-ui/icons'
import {
    Heading,
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
                                    <Link to={`city/${city.id}`}>
                                        {city.name}
                                    </Link>
                                </Td>
                                <Td>
                                    {city.lat}, {city.lon}
                                </Td>
                                <Td>
                                    <LinkButton
                                        leftIcon={<DeleteIcon />}
                                        color={'red'}
                                        href="#"
                                    ></LinkButton>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <LinkButton href="/cities/new">Add new city</LinkButton>
        </Page>
    )
}
