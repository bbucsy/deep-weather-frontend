import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CityDetails } from './components/@pages/CityDetails'
import { CityList } from './components/@pages/CityList'
import { CityNew } from './components/@pages/CityNew'

import { Home } from './components/@pages/Home'
import { NeuralModelDetails } from './components/@pages/NeuralModelDetails'
import { NeuralNetworkNew } from './components/@pages/NeuralModelNew'

export const App = () => (
    <React.StrictMode>
        <ChakraProvider>
            <BrowserRouter>
                <ColorModeScript />
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />}></Route>
                        <Route path="city">
                            <Route index element={<CityList />}></Route>
                            <Route path="new" element={<CityNew />}></Route>
                            <Route path=":id" element={<CityDetails />}></Route>
                        </Route>
                        <Route path="neural-model">
                            <Route path="new" element={<NeuralNetworkNew />}></Route>
                            <Route path=":id" element={<NeuralModelDetails />}></Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
)
