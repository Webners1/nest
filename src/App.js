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
    const contractAddress = '0x5a2AADF95472461cF95a69FC09A880569D2B0dde'
    const tokenAddress = '0xD4Bc43c13922994dFd489999F9BB5F4edB04Ffa5';
    const [userNFTs, setUserNFTs] = useState();
    // const [account, setAccount] = useState();
    return (
        <mainContext.Provider
            value={{
                setUserInfo, setProvider, userInfo, provider, contract,
                setContract, contractAddress, tokenAddress, setRender, render,
                token, setToken, setUserNFTs, userNFTs
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
