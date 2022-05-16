import React, { useContext, useEffect } from "react";
import { mainContext } from "../Contexts/mainContext";
import Header from "../components/header/Header";
import Slider from "../components/slider/Slider";
import { Link } from "react-router-dom";
import imgdetail1 from "../assets/images/product-item/nft.jpg";
import dataSlider from "../assets/fake-data/dataSlider";
import Footer from "../components/footer/Footer";
import { Newsletters } from "../components/layouts/home/Newsletters";
import { useState } from "react";

const Home02 = () => {
  const { contract, token, contractAddress, setRender, render, userInfo, userNFTs } = useContext(mainContext);
  const [ownerOfState, setOwnerOf] = useState();
  const [tokenMetaData, setTokenMetaData] = useState();
  const [levelState, setLevel] = useState();
  const [allowanceState, setAllowance] = useState();
  const [maxMatureBirdCostState, setMaxMatureBirdCost] = useState();
  const [matureBirdCostState, setMatureBirdCost] = useState();
  const [tokenId, setTokenId] = useState(false);
  const [approveForMatureBirdBtn, setApproveForMatureBirdBtn] = useState(false);
  const [approveForMaxMatureBirdBtn, setApproveForMaxMatureBirdBtn] = useState(false);
  const [upgradeToMatureBirdBtn, setUpgradeToMatureBirdBtn] = useState(false);
  const [upgradeToMaxMatureBirdBtn, setUpgradeToMaxMatureBirdBtn] = useState(false);
  const [upgradeBtn, setUpgradeBtn] = useState(true);

  //FUNCTIONS
  //CALLING FUNCTIONS

  useEffect(() => {
    if (tokenId) {
      ownerOf()
      tokenURI()
      level()
      allowance()
      matureBirdCost()
      maxMatureBirdCost()
    }
  }, [tokenId])


  const ownerOf = async () => {
    try {
      await contract.methods.ownerOf(tokenId).call(function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        } else {
          setOwnerOf(res);
          console.log(res)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  const tokenURI = async () => {
    try {
      await contract.methods.tokenURI(tokenId).call(function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        } else {
          setTokenMetaData(JSON.parse(res));
          console.log(res)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const level = async () => {
    try {
      await contract.methods.level(tokenId).call(function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        } else {
          setLevel(res);
          console.log(res)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const matureBirdCost = async () => {
    if (levelState > 0) {
      try {
        await contract.methods.matureBirdCost(tokenId).call(function (err, res) {
          if (err) {
            console.log("An error occured", err);
            return;
          } else {
            setMatureBirdCost(res);
            console.log(res)

          }
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      alert("Only baby bird can be upgraded.")
    }
  }

  const maxMatureBirdCost = async () => {
    if (levelState > 0) {
      try {
        await contract.methods.maxMatureBirdCost(tokenId).call(function (err, res) {
          if (err) {
            console.log("An error occured", err);
            return;
          } else {
            setMaxMatureBirdCost(res);
            console.log(res)
          }
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      alert("Only baby bird can be upgraded.")
    }
  }

  const allowance = async () => {
    try {
      await token.methods.allowance(userInfo?.address, contractAddress).call(function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        } else {
          setAllowance(res);
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  //SENDING FUNCTIONS

  const approve = async (cost) => {
    await token.methods.approve(contractAddress, cost).send({ from: userInfo?.address }).then(() => {
      if (levelState === 1) {
        if (allowanceState >= matureBirdCostState) {
          setApproveForMatureBirdBtn(false);
          setUpgradeToMatureBirdBtn(true);
        }
      }
      else if (levelState === 2) {
        if (allowanceState >= maxMatureBirdCostState) {
          setApproveForMaxMatureBirdBtn(false);
          setUpgradeToMaxMatureBirdBtn(true);
        }
      }
    })
  }

  const upgradeToMatureBird = async () => {
    try {
      await contract.methods.upgradeToMatureBird(tokenId).send({ from: userInfo?.address }).then(() => {
        setRender(!render)
      })
    } catch (e) {
      console.log(e)
    }
  }
  const upgradeToMaxMatureBird = async () => {
    try {
      await contract.methods.upgradeToMaxMatureBird(tokenId).send({ from: userInfo?.address }).then(() => {
        setRender(!render)
      })
    } catch (e) {
      console.log(e)
    }
  }
  const withdrawReward = async () => {
    try {
      await contract.methods.withdrawReward(tokenId).send({ from: userInfo?.address }).on('transactionHash', Hash => {
        setRender(!render)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const upgradeBird = async () => {
    if (levelState === 0) {
      alert("You Need to Hatch the Bird first.")
    }
    else if (levelState === 1) {
      if (allowanceState <= matureBirdCostState) {
        setApproveForMatureBirdBtn(true)
      }
    }
    else if (levelState === 2) {
      if (allowanceState <= maxMatureBirdCostState) {
        setApproveForMaxMatureBirdBtn(true)
      }
    }
  }

  return (
    <div className="home-2">
      <Header />
      <Slider data={dataSlider} />
      <section className="tf-section item-details-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="sc-heading style-2">
                <div className="content-left">
                  <div className="inner">
                    <h3>My NFT's</h3>
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
                  {/* THIS ONCHANGE WILL HAVE THE TOKENID WE WILLL SET TOKEN ID HERE */}
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
                <h3> First NFT</h3>
                <p className="mg-bt-42">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut
                </p>
                <ul className="list-details-item"></ul>
                <div className="author-bid">
                  <div className="author-item">
                    <div className="infor">
                      <h6>
                        <Link to="#">APY</Link>{" "}
                      </h6>
                      <div className="create">Text</div>
                    </div>
                  </div>
                  <div className="author-item">
                    <div className="infor">
                      <h6>
                        <Link to="#">Rarity</Link>{" "}
                      </h6>
                      <div className="create">Text</div>
                    </div>
                  </div>
                </div>
                <div className="infor-bid">
                  <div className="content-left">
                    <h6>Attributes</h6>
                    <div className="price">Text</div>
                  </div>
                </div>
                {upgradeBtn &&
                  <button
                    onClick={() => { upgradeBird(); setUpgradeBtn(!upgradeBtn) }}
                    className="ml-3 mr-5 sc-button style letter style-2 style-item-details wallet-btn"
                  >
                    <span>Upgrade</span>
                  </button>
                }
                {
                  approveForMatureBirdBtn &&
                  <button
                    onClick={() => approve(matureBirdCostState)}
                    className="ml-3 mr-5 sc-button style letter style-2 style-item-details wallet-btn"
                  >
                    <span>Approve Mature Bird</span>
                  </button>
                }
                {
                  approveForMaxMatureBirdBtn &&
                  <button
                    onClick={() => approve(maxMatureBirdCostState)}
                    className="ml-3 mr-5 sc-button style letter style-2 style-item-details wallet-btn"
                  >
                    <span>Approve Max Mature Bird</span>
                  </button>
                }
                {
                  upgradeToMatureBirdBtn &&
                  <button
                    onClick={() => upgradeToMatureBird()}
                    className="ml-3 mr-5 sc-button style letter style-2 style-item-details wallet-btn"
                  >
                    <span>Approve Max Mature Bird</span>
                  </button>
                }
                {
                  upgradeToMaxMatureBirdBtn &&
                  <button
                    onClick={() => upgradeToMaxMatureBird()}
                    className="ml-3 mr-5 sc-button style letter style-2 style-item-details wallet-btn"
                  >
                    <span>Approve Max Mature Bird</span>
                  </button>
                }
                {/* <button
                  onClick={() => { }}
                  className="ml-2 sc-button style letter style-2 style-item-details"
                >
                  <span>Withdraw</span>
                </button> */}
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

export default Home02;
