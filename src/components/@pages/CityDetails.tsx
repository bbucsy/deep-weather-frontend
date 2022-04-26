import { Divider, Heading, Table, TableCaption, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { Marker, Map } from 'pigeon-maps'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CityDto, CityService } from '../../service'
import { useAppStateContext } from '../../utils/AppStateContext'
import { Role } from '../../utils/AuthContext'
import { useAuthContext } from '../../utils/useAuthContext'
import { CoordinateText } from '../@common/CoordinateText'
import { LinkButton } from '../@common/LinkButton'

import { NeuralModelTableItem } from '../@common/NeuralModelTableItem'
import { Paragraph } from '../@common/Paragraph'
import { Card } from '../@layout/Card'
import { Page } from '../@layout/Page'

export const CityDetails: React.FC = () => {
    const { id } = useParams()
    const [city, setCity] = useState<CityDto>()

    const { profile } = useAuthContext()

    const { setLoading, throwError } = useAppStateContext()

    useEffect(() => {
        setLoading(true)
        CityService.findOne(Number.parseInt(id!))
            .then(res => {
                setCity(res.data)
            })
            .catch(err => {
                throwError('Unable to load city')
            })
            .finally(() => {
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    if (typeof city === 'undefined') return <></>

    return (
        <Page loginRequired>
            <Card>
                <Heading>{city?.name}</Heading>
                <Divider />
                <Paragraph>
                    <Text as={'span'} fontWeight={'bold'}>
                        Coordinates:
                    </Text>{' '}
                    <CoordinateText latitude={city?.lat!} longitude={city?.lon!}></CoordinateText>
                </Paragraph>
                <Map height={300} defaultCenter={[city?.lat || 0, city?.lon || 0]} defaultZoom={11}>
                    <Marker width={50} anchor={[city?.lat || 0, city?.lon || 0]} />
                </Map>
                <TableContainer>
                    <Table variant="simple">
                        <TableCaption placement="top">Neural-models connected to {city?.name}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Accuracy</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {city?.neuralModels.map(nm => (
                                <NeuralModelTableItem id={nm.id} name={nm.name} key={nm.id} />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Card>
            {profile?.role === Role.Admin ? (
                <LinkButton href={`/neural-model/new?city=${city?.id}`} colorScheme={'primary'}>
                    Create new model
                </LinkButton>
            ) : null}
        </Page>
    )
}
