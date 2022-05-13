import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import { mainContext } from './Contexts/mainContext';
import routes from './pages/router'

function App() {
    // const hell = "hell";
    const [userInfo, setUserInfo] = useState();
    const [provider, setProvider] = useState();
    const [contract, setContract] = useState();
    const [token, setToken] = useState();
    const [render, setRender] = useState();
    const contractAddress = '0x2122d9A056ecc5105Ca82Aeb0749E0Fe8476DF12'
    const tokenAddress = '0xD4Bc43c13922994dFd489999F9BB5F4edB04Ffa5'
    // const [account, setAccount] = useState();
    return (
        <mainContext.Provider
            value={{
                setUserInfo, setProvider, userInfo, provider, contract,
                setContract, contractAddress, tokenAddress, setRender, render,
                token, setToken
            }}>
            <Routes >
                {
                    routes.map((data, index) => (
                        <Route exact={true} path={data.path} element={data.component} key={index} />
                    ))
                }
            </Routes>
        </mainContext.Provider >
    );
}

export default App;
