import React, { useState, useContext, useEffect } from "react";
import { mainContext } from "../Contexts/mainContext";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Newsletters from "../components/layouts/home/Newsletters";
import Footer from "../components/footer/Footer";
import imgdetail1 from "../assets/images/product-item/nft.jpg";
import Countdown from "react-countdown";

const HatchingStation
  = () => {
    const { contract, setRender, render, userInfo, userNFTs } = useContext(mainContext);
    const [hatchRemainingTimeState, setHatchRemainingTime] = useState(0);
    const [tokenId, setTokenId] = useState();

    // FUNCTIONS

    useEffect(() => {
      if (tokenId) {
        hatchRemainingTime()
      }
    }, [tokenId])

    const lockInIncubator = async () => {
      try {
        await contract.methods.lockInIncubator(tokenId).send({ from: userInfo?.address }).on('transactionHash', Hash => {
          setRender(!render)
        })
      } catch (e) {
        console.log(e)
      }
    }

    const hatchRemainingTime = async () => {
      try {
        await contract?.methods.hatchRemainingTime(tokenId).call(function (err, res) {
          if (err) {
            console.log("An error occured", err);
            return;
          } else {
            setHatchRemainingTime(res)
          }
        })
      } catch (e) {
        console.log(e)
      }
    }

    const hatchEgg = async () => {
      try {
        await contract?.methods.hatchEgg(tokenId).send({ from: userInfo?.address }).on('transactionHash', Hash => {
          setRender(!render)
        })
      } catch (e) {
        console.log(e)
      }
    }

    useEffect(() => {
      hatchRemainingTime()
    }, [render])


    return (
      <div>
        <Header />
        <section className="fl-page-title">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="page-title-inner flex">
                  <div className="page-title-heading">
                    <h2 className="heading">Hatching Station</h2>
                  </div>
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>Hatching Station</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Home Section */}
        <section className="tf-section item-details-page">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="sc-heading style-2">
                  <div className="content-left">
                    <div className="inner">
                      <h3>Egg NFT's</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-md-12">
                <div className="item-media">
                  <div className="media">
                    <img src={imgdetail1} alt="Details" />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-md-12">
                <div className="content-item">
                  <div>
                    <select onChange={(e) => setTokenId(e.target.value)} className="font-weight-bold rounded text-dark p-3 col-xl-12 col-lg-12 col-md-1">
                      <option defaultValue value={false}>Select Token Id</option>
                      {
                        userNFTs?.result?.map((NFT, i) => {
                          return (
                            <option value={NFT?.token_id}>{NFT?.token_id}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <h3> Egg NFT</h3>
                  <p className="mg-bt-42">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque
                    ipsa quae ab illo inventore veritatis et quasi architecto
                    beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                    quia voluptas sit aspernatur aut
                  </p>
                  <ul className="list-details-item"></ul>
                  <div className="infor-bid">
                    <div className="content-left">
                      <h6>Time Remaining</h6>
                      <div className="price">
                        <div className="countdown">
                          <Countdown date={hatchRemainingTimeState}>
                            <span>You are good to go!</span>
                          </Countdown>
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                    hatchRemainingTime === Date.now() ?
                      <button
                        onClick={() => hatchEgg()}
                        className="sc-button style letter style-2 style-item-details hatch"
                      >
                        <span>Hatch</span>
                      </button>
                      :
                      <button
                        onClick={() => lockInIncubator()}
                        className="sc-button style letter style-2 style-item-details hatch"
                      >
                        <span>Lock in Incubator</span>
                      </button>
                  }

                </div>
              </div>
            </div>
          </div>
        </section>
        <Newsletters />
        <Footer />
      </div>
    );
  };

export default HatchingStation
  ;
