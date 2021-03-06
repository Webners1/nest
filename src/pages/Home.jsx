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
  let [tokenMetaData, setTokenMetaData] = useState(false);
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
  const [rarity, setRarity] = useState();
  var base64 = require('base-64');

  //FUNCTIONS
  //CALLING FUNCTIONS 

  useEffect(() => {
    if (tokenId) {
      level()
      if (tokenId && levelState) {
        ownerOf()
        getRarity()
        tokenURI()
        allowance()
        matureBirdCost()
        maxMatureBirdCost()
      }
    }
  }, [tokenId, levelState, render])


  const ownerOf = async () => {
    try {
      await contract?.methods.ownerOf(tokenId).call(function (err, res) {
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
      await contract?.methods.tokenURI(tokenId).call(function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        } else {
          let stringMetaData = base64.decode(res.slice(29));
          console.log(res.slice(29))
          console.log(base64.decode(res.slice(29)))
          let metaData = JSON.parse(stringMetaData);
          setTokenMetaData(metaData);
          console.log(metaData)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const getRarity = async () => {
    if (levelState > 0) {
      try {
        await contract?.methods.getRarity(tokenId).call(function (err, res) {
          if (err) {
            console.log("An error occured", err);
            return;
          } else {
            setRarity(res);
            console.log(res)
          }
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      setRarity("Not Hatched Yet.")
    }
  }


  const level = async () => {
    try {
      await contract?.methods.level(tokenId).call(function (err, res) {
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
    if (levelState == 1) {
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
    }
  }

  const maxMatureBirdCost = async () => {
    // level()
    if (levelState == 2) {
      try {
        await contract?.methods.maxMatureBirdCost(tokenId).call(function (err, res) {
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
    }
  }

  const allowance = async () => {
    try {
      await token?.methods.allowance(userInfo?.address, contractAddress).call(function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        } else {
          setAllowance(res);
          console.log("allowance ==>", res)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  //SENDING FUNCTIONS

  const approve = async (cost) => {
    if (levelState == 1) {
      if (allowanceState >= matureBirdCostState) {
        setApproveForMatureBirdBtn(false);
        setUpgradeToMatureBirdBtn(true);
        return;
      }
    }
    else if (levelState == 2) {
      if (allowanceState >= maxMatureBirdCostState) {
        setApproveForMaxMatureBirdBtn(false);
        setUpgradeToMaxMatureBirdBtn(true);
        return;
      }
    }
    await token?.methods.approve(contractAddress, cost).send({ from: userInfo?.address }).then(() => {
      setRender(!render);
    })
    if (levelState == 1) {
      if (allowanceState >= matureBirdCostState) {
        setApproveForMatureBirdBtn(false);
        setUpgradeToMatureBirdBtn(true);
        return;
      }
    }
    else if (levelState == 2) {
      if (allowanceState >= maxMatureBirdCostState) {
        setApproveForMaxMatureBirdBtn(false);
        setUpgradeToMaxMatureBirdBtn(true);
        return;
      }
    }
  }

  const upgradeToMatureBird = async () => {
    try {
      await contract?.methods.upgradeToMatureBird(tokenId).send({ from: userInfo?.address }).then(() => {
        window.location.reload()
      })
    } catch (e) {
      console.log(e)
    }
  }

  const upgradeToMaxMatureBird = async () => {
    try {
      await contract?.methods.upgradeToMaxMatureBird(tokenId).send({ from: userInfo?.address }).then(() => {
        window.location.reload()
      })
    } catch (e) {
      console.log(e)
    }
  }

  const withdrawReward = async () => {
    try {
      await contract?.methods.withdrawReward(tokenId).send({ from: userInfo?.address }).on('transactionHash', Hash => {
        setRender(!render)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const upgradeBird = async () => {
    if (levelState == 0) {
      alert("You Need to Hatch the Bird first.")
    }
    else if (levelState == 1) {
      console.log("ghusssaa1")
      console.log("2=>", matureBirdCostState)
      console.log("1=>", allowanceState)
      if (allowanceState <= matureBirdCostState) {
        console.log("1")
        setApproveForMatureBirdBtn(true)
        setUpgradeBtn(!upgradeBtn)
      } else if (allowanceState > matureBirdCostState) {
        console.log("2")
        setUpgradeBtn(!upgradeBtn)
        setUpgradeToMatureBirdBtn(true);
      }
    }
    else if (levelState == 2) {
      console.log("ghusssaa2")
      if (allowanceState <= maxMatureBirdCostState) {
        console.log("2")
        setApproveForMaxMatureBirdBtn(true)
        setUpgradeBtn(!upgradeBtn)
      } else if (allowanceState > maxMatureBirdCostState) {
        console.log("3")
        setUpgradeBtn(!upgradeBtn)
        setUpgradeToMaxMatureBirdBtn(true);
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
                {
                  tokenMetaData ?
                    <video width="750" height="500" controls >
                      <source src={tokenMetaData?.image_data} type="video/mp4" />
                    </video>
                    :
                    <div className="media">
                      <img src={imgdetail1} alt="Details" />
                    </div>
                }
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
                      <div className="create">{rarity}</div>
                    </div>
                  </div>
                </div>
                <div className="infor-bid">
                  <div className="content-left">
                    <h6>Attributes</h6>
                    <div className="price">
                      {
                        tokenMetaData?.attributes?.map((attribute, i) => {
                          return (
                            <div>
                              <p>{attribute.trait_type}: {attribute.value}</p>
                            </div>
                          )
                        })
                      }
                      {
                        !(tokenMetaData?.attributes) &&
                        <div>
                          <p>No Attributes</p>
                        </div>
                      }
                    </div>
                  </div>
                </div>
                {(levelState > 1) &&
                  <button
                    onClick={() => { withdrawReward() }}
                    className="ml-3 mr-5 sc-button style letter style-2 style-item-details wallet-btn"
                  >
                    <span>Withdraw</span>
                  </button>
                }
                {(upgradeBtn && levelState > 0) &&
                  <button
                    onClick={() => { upgradeBird() }}
                    className="ml-3 mr-5 sc-button style letter style-2 style-item-details wallet-btn"
                  >
                    <span>Upgrade</span>
                  </button>
                }
                {
                  (approveForMatureBirdBtn && levelState > 0) &&
                  <button
                    onClick={() => approve(matureBirdCostState)}
                    className="ml-3 mr-5 sc-button style letter style-2 style-item-details wallet-btn"
                  >
                    <span>Approve Mature Bird</span>
                  </button>
                }
                {
                  (approveForMaxMatureBirdBtn && levelState > 0) &&
                  <button
                    onClick={() => approve(maxMatureBirdCostState)}
                    className="ml-3 mr-5 sc-button style letter style-2 style-item-details wallet-btn"
                  >
                    <span>Approve Max Mature Bird</span>
                  </button>
                }
                {
                  (upgradeToMatureBirdBtn && levelState > 0) &&
                  <button
                    onClick={() => upgradeToMatureBird()}
                    className="ml-3 mr-5 sc-button style letter style-2 style-item-details wallet-btn"
                  >
                    <span>Upgrade Mature Bird</span>
                  </button>
                }
                {
                  (upgradeToMaxMatureBirdBtn && levelState > 0) &&
                  <button
                    onClick={() => upgradeToMaxMatureBird()}
                    className="ml-3 mr-5 sc-button style letter style-2 style-item-details wallet-btn"
                  >
                    <span>Upgrade Max Mature Bird</span>
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
