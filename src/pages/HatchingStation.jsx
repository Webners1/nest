import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Newsletters from "../components/layouts/home/Newsletters";
import Footer from "../components/footer/Footer";
import imgdetail1 from "../assets/images/product-item/nft.jpg";
import Countdown from "react-countdown";

const HatchingStation
 = () => {
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
                        <Countdown date={Date.now() + 500000000}>
                          <span>You are good to go!</span>
                        </Countdown>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  to="#"
                  className="sc-button style letter style-2 style-item-details hatch"
                >
                  <span>Hatch</span>
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

export default HatchingStation
;
