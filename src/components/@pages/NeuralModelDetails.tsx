import { Divider, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NeuralModelDto, NeuralModelService } from '../../service'
import { neruralModelStatus } from '../@common/NeuralModelTableItem'
import { Paragraph } from '../@common/Paragraph'
import { Card } from '../@layout/Card'

import { Page } from '../@layout/Page'

export const NeuralModelDetails: React.FC = () => {
    const { id } = useParams()
    const [model, setModel] = useState<NeuralModelDto>()

    useEffect(() => {
        NeuralModelService.findOne(id!).then(res => {
            setModel(res.data)
        })
    }, [id, setModel])

    return (
        <Page loginRequired>
            <Card>
                <Paragraph>
                    <Text as="span" fontWeight="bold">
                        Model name:
                    </Text>
                    {`\t${model?.name}`}
                </Paragraph>
                <Divider />
                <Paragraph>
                    <Text as="span" fontWeight="bold">
                        City:
                    </Text>
                    {`\t${model?.city.name}`}
                </Paragraph>
                <Paragraph>
                    <Text as="span" fontWeight="bold">
                        Status:
                    </Text>
                    {neruralModelStatus(model?.status!)}
                </Paragraph>
                <Paragraph>
                    <Text as="span" fontWeight="bold">
                        Accuracy:
                    </Text>
                    {`\t${model?.accuracy.toFixed(2)}%`}
                </Paragraph>
                <Paragraph>
                    <Text as="span" fontWeight="bold">
                        Initial training epochs:
                    </Text>
                    {`\t${model?.epochs}`}
                </Paragraph>
                <Paragraph>
                    <Text as="span" fontWeight="bold">
                        Hidden Layers:
                    </Text>
                    {`\t${model?.hiddenLayerCount}`}
                </Paragraph>
                <Paragraph>
                    <Text as="span" fontWeight="bold">
                        LSTM Unit count:
                    </Text>
                    {`\t${model?.lstm_count}`}
                </Paragraph>
            </Card>
        </Page>
    )
}
