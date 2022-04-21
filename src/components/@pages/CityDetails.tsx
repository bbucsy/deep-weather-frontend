import { Divider, Heading, Table, TableCaption, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CityDto, CityService } from '../../service'
import { CoordinateText } from '../@common/CoordinateText'
import { LinkButton } from '../@common/LinkButton'

import { NeuralModelTableItem } from '../@common/NeuralModelTableItem'
import { Paragraph } from '../@common/Paragraph'
import { Page } from '../@layout/Page'

export const CityDetails: React.FC = () => {
    const { id } = useParams()
    const [city, setCity] = useState<CityDto>()

    useEffect(() => {
        CityService.findOne(Number.parseInt(id!)).then(res => {
            setCity(res.data)
        })
    }, [id, setCity])

    return (
        <Page>
            <Heading>{city?.name}</Heading>
            <Divider />
            <Paragraph>
                <Text as={'span'} fontWeight={'bold'}>
                    Coordinates:
                </Text>{' '}
                <CoordinateText latitude={city?.lat!} longitude={city?.lon!}></CoordinateText>
            </Paragraph>

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
            <LinkButton href={`/neural-model/new?city=${city?.id}`}>Create new model</LinkButton>
        </Page>
    )
}
