import SwiperCore, { EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const PageIntro = () => {
  SwiperCore.use([EffectFade, Navigation]);

  return (
    <section className="page-intro">
      <Swiper navigation effect="fade" className="swiper-wrapper">
        <SwiperSlide>
          <div
            className="page-intro__slide"
            style={{ backgroundImage: "url('/images/slide-1.jpg')" }}
          >
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>All your favourite Local Brands</h2>
                <a href="#" className="btn-shop">
                  <i className="icon-right" />
                  Shop now
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="page-intro__slide"
            style={{ backgroundImage: "url('/images/slide-2.jpg')" }}
          >
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Support your local business</h2>
                <a href="#" className="btn-shop">
                  <i className="icon-right" />
                  Shop now
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping" />
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>On purchases over 199 egp</p>
              </div>
            </li>

            <li>
              <i className="icon-shipping" />
              <div className="data-item__content">
                <h4>Connecting Local Brands</h4>
                <p>Our clients needs to reach local home brands Easily</p>
              </div>
            </li>

            <li>
              <i className="icon-cash" />
              <div className="data-item__content">
                <h4>Originality Guaranteed</h4>
                <p>30 days warranty for each product from our store</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PageIntro;
