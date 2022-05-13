import React, { useState, useEffect, useContext } from 'react';
import { mainContext } from '../../Contexts/mainContext';
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import contractAbi from "../../abis/contract.json";
import { Link } from 'react-router-dom'
import img1 from '../../assets/images/icon/icon-1.svg'
import img2 from '../../assets/images/icon/icon-2.svg'
import img3 from '../../assets/images/icon/icon-3.svg'
import img4 from '../../assets/images/icon/icon-4.svg'
import img5 from '../../assets/images/icon/icon-5.svg'
import img6 from '../../assets/images/icon/icon-6.svg'
import img7 from '../../assets/images/icon/icon-7.png'
import img8 from '../../assets/images/icon/icon-8.svg'
import img9 from '../../assets/images/icon/icon-9.svg'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const WalletConnect = () => {
    const { setUserInfo, setProvider, setContract, contractAddress , tokenAddress} = useContext(mainContext);

    //FUNCTIONS
    const loadContract = () => {
        // Getting WEB3
        window.web3 = new Web3(window.ethereum);
        const web3 = window.web3;
        const contract = new web3.eth.Contract(
            contractAbi.abi,
            contractAddress
        )
        setContract(contract)
        const token = new web3.eth.Contract(
            tokenAbi.abi,
            tokenAddress
        )
        setToken(token)
        console.log(contract)
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
            if (chainId == 80001) {
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

    const loadWeb3ViaWalletConnect = async () => {
        try {
            //  Create WalletConnect Provider
            const provider = new WalletConnectProvider({
                infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // Required
            });

            //  Enable session (triggers QR Code modal)
            await provider.enable();

            //  Create Web3
            const web3 = new Web3(provider);
            userData(web3);
        } catch (e) {
            console.log(e);
        }
    };

    const loadWeb3ViaCoinbase = async () => {
        try {
            // //  Create WalletConnect Provider
            // const provider = new CoinbaseWalletSDK({
            //     infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // Required
            // });

            // //  Enable session (triggers QR Code modal)
            // await provider.enable();

            // //  Create Web3
            // const web3 = new Web3(provider);
            // userData(web3);
        } catch (e) {
            console.log(e);
        }
    };

    const connectWallet = (index) => {
        switch (index) {
            case 0:
                loadWeb3ViaMetaMask()
                break;
            case 1:
                loadWeb3ViaWalletConnect()
                break;
            case 2:
                loadWeb3ViaCoinbase()
                break;
            default:
                break;
        }
    }

    const [data] = useState(
        [
            {
                img: img1,
                title: 'Meta Mask',
                text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,',
                class: ''
            },
            {
                img: img4,
                title: 'Wallet Connect',
                text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,',
                class: ''
            },
            {
                img: img5,
                title: 'Coinbase Wallet',
                text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,',
                class: ''
            },
            {
                img: img2,
                title: 'Bitski',
                text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,',
                class: ''
            },
            {
                img: img3,
                title: 'Fortmatic',
                text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,',
                class: ''
            },
            {
                img: img6,
                title: 'Authereum',
                text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,',
                class: ''
            },
            {
                img: img7,
                title: 'kaikas',
                text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,',
                class: 'mg-bt-0'
            },
            {
                img: img8,
                title: 'Torus',
                text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,',
                class: 'mg-bt-0'
            },
            {
                img: img9,
                title: 'Bitcoin',
                text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,',
                class: 'mg-bt-0'
            },
        ]
    )
    return (
        <section className="tf-section connect-wallet">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="sc-heading">
                            <h3>Wallet- Connect</h3>
                            <p className="desc">Most popular gaming digital nft market place </p>
                        </div>
                    </div>
                    {
                        data.map((item, index) => (
                            <div key={index} className="col-lg-4 col-md-4">
                                <div className={`sc-wallet ${item.class}`}>
                                    <div className="icon">
                                        <img src={item.img} alt="Wallet Icons" />
                                    </div>
                                    <div className="content">
                                        <h4><a onClick={() => connectWallet(index)}>{item.title}</a></h4>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default WalletConnect;
