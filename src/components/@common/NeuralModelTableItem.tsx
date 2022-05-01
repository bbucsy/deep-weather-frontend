import { CheckIcon, InfoIcon } from '@chakra-ui/icons'
import { Badge, Spinner, Td, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NeuralModelDto, NeuralModelService } from '../../service'

export interface NMTIProps {
    id: number
    name: string
}

export const neruralModelStatus = (status: number) => {
    switch (status) {
        case 0:
            return (
                <Badge colorScheme="yellow">
                    Training
                    <Spinner />
                </Badge>
            )
        case 1:
            return (
                <Badge colorScheme="green">
                    Operating <CheckIcon />
                </Badge>
            )
        default:
            return (
                <Badge colorScheme="red">
                    Failed <InfoIcon />
                </Badge>
            )
    }
}

export const NeuralModelTableItem: React.FC<NMTIProps> = ({ id, name }: NMTIProps) => {
    const [model, setModel] = useState<NeuralModelDto>()

    useEffect(() => {
        NeuralModelService.findOne(id.toString()).then(res => setModel(res.data))
    }, [id, setModel])

    return (
        <Tr>
            <Td>
                <Link to={`/neural-model/${id}`}>{name}</Link>{' '}
            </Td>
            <Td>{model?.accuracy ? `${(model.accuracy * 100).toFixed(2)}%` : 'N/A'}</Td>
            <Td>{neruralModelStatus(model?.status!)}</Td>
        </Tr>
    )
}
