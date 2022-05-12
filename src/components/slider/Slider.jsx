import React from "react";
import { Link } from "react-router-dom";
import { Navigation, Scrollbar, A11y } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

const Slider02 = (props) => {
  const data = props.data;
  return (
    <section className="tf-slider slider">
      {/* <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <SliderItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </section>
  );
};

const SliderItem = (props) => (
  <div className="swiper-container ">
    <div className="swiper-wrapper">
      <div className="swiper-slide">
        <div className="slider-item">
          <div className="overlay"></div>
          <video className="background-video" autoPlay loop muted>
            <source src={props.item.video} type="video/mp4" />
          </video>
          <div className="container">
            <div className="slider-inner flex home-1 style-2">
              <div className="slider-content">
                <h1 className="heading">{props.item.title}</h1>
                <p className="sub-heading">{props.item.description}</p>
                <div className="button-slider">
                <a href="https://astrobirdz.io/"
                className="sc-button btn-bordered-white style letter "
                 target="_blank">
                   <span>Explore More</span>
                 </a>
                </div>
              </div>
              <div className="slider-img flex">
                <div className="img-left">
                  <div className="img-1">
                        <video className="slider_video" autoPlay loop muted>
                        <source src={props.item.video1} type="video/mp4" />
                        </video>
                  </div>
                  <div className="img-2">
                  <video className="slider_video" autoPlay loop muted>
                      <source src={props.item.video2} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className="img-right">
                <video className="slider_video" autoPlay loop muted>
                      <source src={props.item.video3} type="video/mp4" />
                    </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Slider02;
