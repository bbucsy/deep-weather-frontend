import { Heading, Table, TableCaption, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CityDto, CityService } from '../../service/service'
import { NeuralModelTableItem } from '../@common/NeuralModelTableItem'
import { Paragraph } from '../@common/Paragraph'
import { Page } from '../@layout/Page'

export const CityDetails: React.FC = () => {
    const { id } = useParams()
    const [city, setCity] = useState<CityDto>()

    useEffect(() => {
        CityService.findOne({ id: +id! }).then(setCity)
    }, [id, setCity])

    return (
        <Page>
            <Heading>{city?.name}</Heading>
            <Paragraph>
                <Text as={'span'} fontWeight={'bold'}>
                    Coordinates:
                </Text>{' '}
                {city?.lat}, {city?.lon}
            </Paragraph>

            <TableContainer>
                <Table variant="simple">
                    <TableCaption>Neural-models connected to {city?.name}</TableCaption>
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
        </Page>
    )
}
