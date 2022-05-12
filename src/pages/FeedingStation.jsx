import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Newsletters from "../components/layouts/home/Newsletters";
import Footer from "../components/footer/Footer";
import imgdetail1 from "../assets/images/product-item/nft.jpg";





const FeedingStation = () => {
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
                  <h2 className="heading">Feeding Station</h2>
                </div>
                <div className="breadcrumbs">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>Feeding Station</li>
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
                <h3> Feed NFT</h3>
                <p className="mg-bt-42">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut
                </p>
                <div className="g-container">
                  <div className="gauge-a"></div>
                  <div className="gauge-b"></div>
                  <div className="gauge-c"></div>
                  <div className="gauge-data">
                    <h1 id="percent">0%</h1>
                  </div>
                </div>
                <div className="infor-bid feed-station">
                  <div className="input-group">
                    <input
                      name="name"
                      type="text"
                      placeholder="Number of tokens to Feeds"
                      required=""
                    />
                  </div>
                </div>
                <Link
                  to="/connect-wallet"
                  className="sc-button"
                >
                  <span>Feed</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <center>
      <a  href="#down">Click Here to Smoothly Scroll Down</a>
  <div id="down">
    
  </div>
  </center>
      <Newsletters />
      <Footer />
    </div>
  );
};




export default FeedingStation;
