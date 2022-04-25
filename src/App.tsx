import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BaseLayout } from './components/@layout/BaseLayout'
import { AuthPage } from './components/@pages/AuthPage'
import { CityDetails } from './components/@pages/CityDetails'
import { CityList } from './components/@pages/CityList'
import { CityNew } from './components/@pages/CityNew'

import { Home } from './components/@pages/Home'
import { NeuralModelDetails } from './components/@pages/NeuralModelDetails'
import { NeuralNetworkNew } from './components/@pages/NeuralModelNew'
import { Predictions } from './components/@pages/Predictions'
import { AuthProvider } from './utils/AuthContext'

export const App = () => (
    <React.StrictMode>
        <ChakraProvider>
            <BrowserRouter>
                <ColorModeScript />
                <AuthProvider>
                    <BaseLayout>
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
                                <Route path="predictions">
                                    <Route index element={<Predictions />}></Route>
                                </Route>
                                <Route path="auth">
                                    <Route index element={<AuthPage />}></Route>
                                </Route>
                            </Route>
                        </Routes>
                    </BaseLayout>
                </AuthProvider>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
)
