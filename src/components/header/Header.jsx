import React, { useRef, useState, useEffect, useContext } from 'react';
import { mainContext } from "../../Contexts/mainContext";
import TopBar from './TopBar';
import Web3 from 'web3';
import contractAbi from "../../abis/contract.json"
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo/N.E.S.T_dark.png'
import logo2x from '../../assets/images/logo/NEST_dark.png'
import logolight from '../../assets/images/logo/N.E.S.T.png'
import logolight2x from '../../assets/images/logo/NEST.png'
import menus from "../../pages/menu";
import DarkMode from "./DarkMode"

import icon from '../../assets/images/icon/connect-wallet.svg'

const Header = () => {
    const { setUserInfo, setProvider, setContract, contractAddress , provider} = useContext(mainContext);
    console.log(hell)
    const { pathname } = useLocation();
    const headerRef = useRef(null)
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    const isSticky = (e) => {
        const header = document.querySelector('.js-header');
        const scrollTop = window.scrollY;

        scrollTop >= 100 ? header.classList.add('is-fixed') : header.classList.remove('is-fixed');
        scrollTop >= 120 ? header.classList.add('is-small') : header.classList.remove('is-small');
    };

    const menuLeft = useRef(null)
    const btnToggle = useRef(null)

    const menuToggle = () => {
        menuLeft.current.classList.toggle('active');
        btnToggle.current.classList.toggle('active');
    }


    const [activeIndex, setActiveIndex] = useState(null);
    const handleOnClick = index => {
        setActiveIndex(index);
    };

    //FUNCTIONS

    const loadContract = () => {
        // Getting WEB3
        window.web3 = new Web3(window.ethereum);
        const web3 = window.web3;
        const contract = new web3.eth.contract(
            contractAbi.abi,
            contractAddress
        )
        setContract(contract)
        // console.log(nativeTokenContract);
    };

    useEffect(() => {
        try {
            loadContract()
        } catch (e) {
            console.log(e)
        }
    }, [])

    const userData = async (web3) => {
        try {
            let chainId = await web3.eth.getChainId();
            console.log(chainId);
            if (chainId == 137) {
                loadContract()
                // AFTER GETTING CHAINID WE CAN CONDITION IF ELSE
                let account = await web3.eth.getAccounts();

                // THIS HAS TO BE GLOBAL (account)
                let address = account[0];
                address = address.toLowerCase();
                let balance = await web3.eth.getBalance(address);
                console.log(balance);
                setUserInfo({
                    address: address,
                    balance: balance,
                    chainId: chainId
                })
            } else {
                alert("Switch to Matic Network...");
            }
        } catch (e) {
            console.log(e);
        }
    };


    const loadWeb3ViaMetaMask = async () => {
        // Account Change Handling
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                console.log("account changed");
                const web3 = new Web3(window.ethereum);
                userData(web3);
            });
            window.ethereum.on("chainChanged", () => {
                // If user has locked/logout from MetaMask, this resets the accounts array to empty
                // if (!accounts.length) {
                //     // logic to handle what happens once MetaMask is locked
                //   }
                console.log("heyy");
                const web3 = new Web3(window.ethereum);
                setProvider(web3)
                // loadContract()
                userData(web3);
            });
        }

        // Meta Mask Connectivity
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: "eth_requestAccounts" });
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                // setProvider(window.web3);
            } else {
                window.alert(
                    "Non-Ethereum browser detected. You should consider trying MetaMask!"
                );
            }
            const web3 = window.web3;
            setProvider(web3)
            // loadContract()
            userData(web3);
        } catch (e) {
            console.log(e);
        }
    };

    // const loadWeb3ViaWalletConnect = async () => {
    //     try {
    //         //  Create WalletConnect Provider
    //         const provider = new WalletConnectProvider({
    //             infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // Required
    //         });

    //         //  Enable session (triggers QR Code modal)
    //         await provider.enable();

    //         //  Create Web3
    //         const web3 = new Web3(provider);
    //         userData(web3);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    return <div>
        {/* <TopBar /> */}
        <header id="header_main" className="header_1 js-header" ref={headerRef}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mobile-button" ref={btnToggle} onClick={menuToggle}><span></span></div>
                        <div id="site-header-inner" className="flex">
                            <div id="site-logo" className="clearfix">
                                <div id="site-logo-inner">
                                    <Link to="/" rel="home" className="main-logo">
                                        <img id="logo_header" className='logo-dark' src={logo} srcSet={logo2x} alt="n.e.s.t" />
                                        <img id="logo_header" className='logo-light' src={logolight} srcSet={logolight2x} alt="n.e.s.t" />
                                    </Link>
                                </div>
                            </div>
                            <form className="form-search">
                                {/* <input type="text" placeholder="Search here" /> */}
                                {/* <button><i className="far fa-search"></i></button> */}
                            </form>

                            <nav id="main-nav" className="main-nav" ref={menuLeft}>
                                <ul id="menu-primary-menu" className="menu">
                                    {
                                        menus.map((data, index) => (
                                            <li key={index} onClick={() => handleOnClick(index)} className={`menu-item menu-item-has-children ${activeIndex === index ? 'active' : ''} `}   >
                                                <Link to={data.links}>{data.name}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </nav>
                            <div className="button-connect-wallet">
                                <Link to="/connect-wallet" className="sc-button wallet  style-2">
                                    <img src={icon} alt="icon" />
                                    <span>Connect Wallet</span>
                                </Link>
                            </div>

                            <DarkMode />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>;
};

export default Header;
