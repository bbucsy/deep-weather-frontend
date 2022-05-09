import { Divider, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NeuralModelDto, NeuralModelService } from '../../service'
import { useAppStateContext } from '../../utils/AppStateContext'
import { neruralModelStatus } from '../@common/NeuralModelTableItem'
import { Paragraph } from '../@common/Paragraph'
import { Card } from '../@layout/Card'

import { Page } from '../@layout/Page'

export const NeuralModelDetails: React.FC = () => {
    const { id } = useParams()
    const [model, setModel] = useState<NeuralModelDto>()
    const [allAccuracy, setAllAccuracy] = useState<number>(0)
    const { setLoading, throwError } = useAppStateContext()

    const getData = async () => {
        if (typeof id === 'undefined') throw new Error('Id not specified')

        const modelInfo = NeuralModelService.findOne(id)
        const accuracyInfo = NeuralModelService.overallAccuracy(id)
        const combined = Promise.all([modelInfo, accuracyInfo]).then(result => {
            setModel(result[0].data)
            setAllAccuracy(result[1].data.accuracy ?? 0)
        })
        return combined
    }

    useEffect(() => {
        setLoading(true)
        getData()
            .catch(err => {
                throwError('Could not find Neural model')
            })
            .finally(() => {
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setModel])

    return (
        <Page loginRequired>
            {typeof model !== 'undefined' && (
                <Card>
                    <Text as="span" fontWeight="bold">
                        Model name:
                    </Text>
                    {`\t${model?.name}`}

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
                            Accuracy since last training:
                        </Text>
                        {`\t`}
                        {model?.accuracy ? `${(model.accuracy * 100).toFixed(2)}%` : 'N/A'}
                    </Paragraph>
                    <Paragraph>
                        <Text as="span" fontWeight="bold">
                            Overall accuracy:
                        </Text>
                        {`\t`}
                        {(allAccuracy * 100).toFixed(2)} %
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
            )}
        </Page>
    )
}
