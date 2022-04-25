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
import { useAppStateContext } from '../../utils/AppStateContext'
import { Role } from '../../utils/AuthContext'
import { useAuthContext } from '../../utils/useAuthContext'
import { CoordinateText } from '../@common/CoordinateText'

import { LinkButton } from '../@common/LinkButton'
import { Card } from '../@layout/Card'
import { Page } from '../@layout/Page'

export const CityList: React.FC = () => {
    const [cityList, setCityList] = useState<CityDto[]>([])

    const { profile } = useAuthContext()

    const { setLoading, throwSuccess, throwError } = useAppStateContext()

    useEffect(() => {
        setLoading(true)
        CityService.findAll()
            .then(cities => {
                setCityList(cities.data)
            })
            .catch(err => {
                console.log(err)
                throwError('Could not load city list')
            })
            .finally(() => {
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCityList])

    const deleteCity = (id: number) => {
        setLoading(true)
        CityService.remove(id.toString())
            .then(() => {
                setCityList(cityList.filter(city => city.id !== id))
                throwSuccess('City deleted successfully')
            })
            .catch(err => {
                throwError('Could not delete city')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Page loginRequired>
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
                                    {profile?.role === Role.Admin && (
                                        <Td>
                                            <IconButton
                                                aria-label="Delete city"
                                                colorScheme={'red'}
                                                icon={<DeleteIcon />}
                                                onClick={() => deleteCity(city.id)}
                                            />
                                        </Td>
                                    )}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Card>
            <Divider />

            {profile?.role === Role.Admin ? <LinkButton href="/city/new">Add new city</LinkButton> : null}
        </Page>
    )
}
