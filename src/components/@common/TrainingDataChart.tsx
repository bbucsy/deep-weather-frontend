import { TrainingDataDto } from '../../service'
import {
    LineSeries,
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    YAxis,
    FlexibleWidthXYPlot,
    DiscreteColorLegend,
} from 'react-vis'
import 'react-vis/dist/style.css'
import { useState } from 'react'

export interface ShowState {
    accuracy: boolean
    loss: boolean
}

interface LegendItem {
    title: string
    disabled: boolean
}

export const TrainingDataChart: React.FC<{ data: TrainingDataDto[] }> = ({ data }) => {
    const [showAccuracy, setShowAccuracy] = useState<boolean>(true)
    const [showLoss, setShowLoss] = useState<boolean>(true)
    const [legendItems, setLegendItems] = useState<LegendItem[]>([
        {
            title: 'Accuracy',
            disabled: false,
        },
        {
            title: 'Loss',
            disabled: false,
        },
    ])

    const onLegendClick = (item: any) => {
        let newAccuracy = showAccuracy
        let newLoss = showLoss
        if (item.title === 'Accuracy') {
            newAccuracy = !newAccuracy
        } else if (item.title === 'Loss') {
            newLoss = !newLoss
        }

        if (!newAccuracy && !newLoss) return
        else {
            console.log('REEEEE')
            setShowAccuracy(newAccuracy)
            setShowLoss(newLoss)
            console.log(newAccuracy)
            let newLegendItems = legendItems
            newLegendItems[0].disabled = !newAccuracy
            newLegendItems[1].disabled = !newLoss
            setLegendItems(newLegendItems)
        }
    }

    return (
        <>
            <FlexibleWidthXYPlot height={300}>
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title="Epochs" tickFormat={val => (Math.round(val) === val ? val : '')} />
                <YAxis tickFormat={val => `${val} %`} />

                {showAccuracy && (
                    <LineSeries
                        animation={true}
                        data={data.map(d => {
                            return {
                                x: d.epoch + 1,
                                y: d.accuracy * 100,
                            }
                        })}
                    />
                )}

                {showLoss && (
                    <LineSeries
                        animation={true}
                        data={data.map(d => {
                            return {
                                x: d.epoch + 1,
                                y: d.loss * 100,
                            }
                        })}
                    />
                )}
                <DiscreteColorLegend items={legendItems} onItemClick={onLegendClick}></DiscreteColorLegend>
            </FlexibleWidthXYPlot>
        </>
    )
}
