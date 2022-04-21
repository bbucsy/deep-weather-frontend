/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface IRequestOptions extends AxiosRequestConfig {}

export interface IRequestConfig {
    method?: any
    headers?: any
    url?: any
    data?: any
    params?: any
}

// Add options interface
export interface ServiceOptions {
    axios?: AxiosInstance
}

// Add default options
export const serviceOptions: ServiceOptions = {}

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
    if (serviceOptions.axios) {
        return serviceOptions.axios
            .request(configs)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    } else {
        throw new Error('please inject yourself instance like axios  ')
    }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
    const configs: IRequestConfig = { ...options, method, url }
    configs.headers = {
        ...options.headers,
        'Content-Type': contentType,
    }
    return configs
}

export const basePath = ''

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
    [key: string]: TValue
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
    items?: T[]
}

export class ListResultDto<T> implements IListResult<T> {
    items?: T[]
}

export interface IPagedResult<T> extends IListResult<T> {
    totalCount?: number
    items?: T[]
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
    totalCount?: number
    items?: T[]
}

// customer definition
// empty

export class PredictionsService {
    /**
     *
     */
    static responses(options: IRequestOptions = {}): Promise<ResponseListDto[]> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/predictions/responses'

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options)

            /** 适配ios13，get请求不允许带body */

            axios(configs, resolve, reject)
        })
    }
    /**
     *
     */
    static addResponse(
        params: {
            /** requestBody */
            body?: CreateResponseDto
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/predictions/responses'

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options)

            let data = params.body

            configs.data = data

            axios(configs, resolve, reject)
        })
    }
    /**
     *
     */
    static currentPredictionsOfCity(
        params: {
            /**  */
            cityId: number
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<PredictionListDto[]> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/predictions/city/{city_id}'
            url = url.replace('{city_id}', params['cityId'] + '')

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options)

            /** 适配ios13，get请求不允许带body */

            axios(configs, resolve, reject)
        })
    }
    /**
     *
     */
    static currentPredictions(options: IRequestOptions = {}): Promise<PredictionListDto[]> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/predictions'

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options)

            /** 适配ios13，get请求不允许带body */

            axios(configs, resolve, reject)
        })
    }
}

export class CityService {
    /**
     *
     */
    static create(
        params: {
            /** requestBody */
            body?: CreateCityDto
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/city'

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options)

            let data = params.body

            configs.data = data

            axios(configs, resolve, reject)
        })
    }
    /**
     *
     */
    static findAll(options: IRequestOptions = {}): Promise<CityDto[]> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/city'

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options)

            /** 适配ios13，get请求不允许带body */

            axios(configs, resolve, reject)
        })
    }
    /**
     *
     */
    static findOne(
        params: {
            /**  */
            id: number
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<CityDto> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/city/{id}'
            url = url.replace('{id}', params['id'] + '')

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options)

            /** 适配ios13，get请求不允许带body */

            axios(configs, resolve, reject)
        })
    }
    /**
     *
     */
    static remove(
        params: {
            /**  */
            id: string
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/city/{id}'
            url = url.replace('{id}', params['id'] + '')

            const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options)

            let data = {}

            configs.data = data

            axios(configs, resolve, reject)
        })
    }
}

export class NeuralModelService {
    /**
     *
     */
    static createModel(
        params: {
            /** requestBody */
            body?: CreateModelDto
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/neural-model'

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options)

            let data = params.body

            configs.data = data

            axios(configs, resolve, reject)
        })
    }
    /**
     *
     */
    static findAllModels(options: IRequestOptions = {}): Promise<NeuralModelListDto[]> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/neural-model'

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options)

            /** 适配ios13，get请求不允许带body */

            axios(configs, resolve, reject)
        })
    }
    /**
     *
     */
    static predict(options: IRequestOptions = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/neural-model/predict'

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options)

            let data = null

            configs.data = data

            axios(configs, resolve, reject)
        })
    }
    /**
     *
     */
    static retrain(options: IRequestOptions = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/neural-model/retrain'

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options)

            let data = null

            configs.data = data

            axios(configs, resolve, reject)
        })
    }
    /**
     *
     */
    static findOne(
        params: {
            /**  */
            id: string
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<NeuralModelDto> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/neural-model/{id}'
            url = url.replace('{id}', params['id'] + '')

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options)

            /** 适配ios13，get请求不允许带body */

            axios(configs, resolve, reject)
        })
    }
}

export class AuthService {
    /**
     *
     */
    static login(
        params: {
            /** requestBody */
            body?: LoginDto
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<LoginResponseDto> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/auth/login'

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options)

            let data = params.body

            configs.data = data

            axios(configs, resolve, reject)
        })
    }
    /**
     *
     */
    static register(
        params: {
            /** requestBody */
            body?: LoginDto
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<LoginResponseDto> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/auth/register'

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options)

            let data = params.body

            configs.data = data

            axios(configs, resolve, reject)
        })
    }
}

export interface ResponseListDto {
    /** Id of response */
    id: number

    /** Date of response creation in ISO string format */
    created_at: string

    /**  */
    model: object

    /** The weather label the neural model predicted */
    prediction: number

    /** The response the user submitted */
    userResponse: number
}

export interface CreateResponseDto {
    /** The id of the prediction the response is submitted for */
    prediction_id: number

    /** The weather label the user wants to submit to the prediction */
    response: number
}

export interface PredictionListDto {
    /** Id of the prediction */
    id: number

    /** The end of the time window the prediction is meant for */
    predictionTime: number

    /** The weather label code, the neural network predicted */
    predictedLabel: number

    /** The most voted weather labels by the users */
    userResponseLabel: number

    /**  */
    model: object

    /**  */
    city: object
}

export interface CreateCityDto {
    /**  */
    name: string

    /**  */
    lon: number

    /**  */
    lat: number
}

export interface neuralModelBase {
    /**  */
    id: number

    /**  */
    name: string
}

export interface CityDto {
    /** Connected Neural models */
    neuralModels: neuralModelBase[]

    /** ID of the city */
    id: number

    /** Name of the city */
    name: string

    /** Latitude */
    lat: number

    /** Longitude */
    lon: number
}

export interface CreateModelDto {
    /** Name of the neural network model */
    name: string

    /** The number of epochs the initial training will user */
    epochs: number

    /** The id of the city the model is attached to */
    city: number

    /** Number of hidden layers */
    hiddenLayerCount: number

    /** Number of LSTM units in the first layer */
    lstm_count: number
}

export interface NeuralModelListDto {
    /**  */
    id: number

    /**  */
    name: string

    /**  */
    status: number
}

export interface NeuralModelDto {
    /**  */
    id: number

    /**  */
    name: string

    /**  */
    epochs: number

    /**  */
    hiddenLayerCount: number

    /**  */
    lstm_count: number

    /**  */
    accuracy: number

    /**  */
    status: number

    /**  */
    city: object
}

export interface LoginDto {
    /**  */
    username: string

    /**  */
    password: string
}

export interface LoginResponseDto {
    /**  */
    access_token: string
}
