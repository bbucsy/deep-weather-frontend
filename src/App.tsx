import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CityList } from './components/@pages/CityList'

import { Home } from './components/@pages/Home'

export const App = () => (
    <React.StrictMode>
        <ChakraProvider>
            <BrowserRouter>
                <ColorModeScript />
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />}></Route>
                        <Route path="cities">
                            <Route index element={<CityList />}></Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
)
