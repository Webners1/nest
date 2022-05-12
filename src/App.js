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
    const contractAddress = '0xe6871022a53ebe7e30f0274d1052c65785918068'
    // const [account, setAccount] = useState();
    return (
        <Routes >
            <mainContext.Provider value={{ setUserInfo , setProvider , userInfo , provider , contract , setContract , contractAddress}}>
                {
                    routes.map((data, index) => (
                        <Route exact={true} path={data.path} element={data.component} key={index} />
                    ))
                }
            </mainContext.Provider >
        </Routes>
    );
}

export default App;
