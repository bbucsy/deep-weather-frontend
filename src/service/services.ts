import { CityApi, NeuralModelApi, PredictionsApi } from './api'
import { Configuration } from './configuration'

const configuration = new Configuration({
    basePath: process.env.REACT_APP_API_URL,
})

export const CityService = new CityApi(configuration)
export const NeuralModelService = new NeuralModelApi(configuration)
export const PredictionService = new PredictionsApi(configuration)
