import React , { useState } from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import  Newsletters from '../components/layouts/home/Newsletters';
import Footer from '../components/footer/Footer';
import imgdetail1 from "../assets/images/maintainance.png";

const AutoFeed = () => {
  return <div>
    <Header />
    <section className="fl-page-title">
        <div className="overlay"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="page-title-inner flex">
                        <div className="page-title-heading">
                            <h2 className="heading">Auto Feed</h2>
                        </div>
                        <div className="breadcrumbs">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li>Auto Feed</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Under Construction */}
    <section className="tf-section item-details-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="sc-heading style-3">
                <div className="content-left">
                  <div className="inner justify-content-center">
                    <h3>This Page is Under Maintainance</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="item-media">
                <div className="media">
                  <img src={imgdetail1} alt="Details" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    <Newsletters />
    <Footer />
  </div>;
};

export default AutoFeed;
