import React, { useContext } from "react";
import { mainContext } from "../Contexts/mainContext";
import Header from "../components/header/Header";
import Slider from "../components/slider/Slider";
import { Link } from "react-router-dom";
import imgdetail1 from "../assets/images/product-item/nft.jpg";
import dataSlider from "../assets/fake-data/dataSlider";
import Footer from "../components/footer/Footer";
import { Newsletters } from "../components/layouts/home/Newsletters";

const Home02 = () => {
  const { contract } = useContext(mainContext);
  const tokenURI = async (tokenId) => {
    try {
      await contract.methods.tokenURI(tokenId).call(function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        } else {
          // setOwnerOf(res);
        }
      })
    } catch (e) {
      console.log(e)
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
                <Link
                  to="/connect-wallet"
                  className="sc-button style letter style-2 style-item-details wallet-btn"
                >
                  <span>Calim Button</span>
                </Link>
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
