import { Td, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { NeuralModelDto, NeuralModelService } from '../../service/service'

export interface NMTIProps {
    id: number
    name: string
}

export const NeuralModelTableItem: React.FC<NMTIProps> = ({ id, name }: NMTIProps) => {
    const [model, setModel] = useState<NeuralModelDto>()

    useEffect(() => {
        NeuralModelService.findOne({ id: `${id}` }).then(setModel)
    }, [id, setModel])

    return (
        <Tr>
            <Td>{name}</Td>
            <Td>{model?.accuracy}%</Td>
            <Td>{model?.status}%</Td>
        </Tr>
    )
}
