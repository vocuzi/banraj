"use client"

import product11 from "../assets/img/product-1-1.jpg"
import product12 from "../assets/img/product-1-2.jpg"
import product21 from "../assets/img/product-2-1.jpg"
import product22 from "../assets/img/product-2-2.jpg"
import product31 from "../assets/img/product-3-1.jpg"
import product32 from "../assets/img/product-3-2.jpg"
import product41 from "../assets/img/product-4-1.jpg"
import product42 from "../assets/img/product-4-2.jpg"
import product51 from "../assets/img/product-5-1.jpg"
import product52 from "../assets/img/product-5-2.jpg"
import product61 from "../assets/img/product-6-1.jpg"
import product62 from "../assets/img/product-6-2.jpg"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from 'swiper/modules';
import ProductCard from "./ProductCard"

export default function NewArrival() {

  const products = [
    {
      img1: product11,
      img2: product12,
      rating: 2,
      oldPrice: 238.85,
      newPrice: 245.84,
      badge: "Hot",
      category: "Clothing",
      name: "Colorful Pattern Shirts",
      type: "Featured",
    },
    {
      img1: product21,
      img2: product22,
      rating: 3,
      oldPrice: 238.85,
      newPrice: 245.8,
      badge: "Hot",
      category: "Clothing",
      name: "Colorful Pattern Shirts",
      type: "Featured",
    },
    {
      img1: product31,
      img2: product32,
      rating: 4,
      oldPrice: 238.85,
      newPrice: 245.84,
      badge: "Hot",
      category: "Clothing",
      name: "Colorful Pattern Shirts",
      type: "Featured",
    },
    {
      img1: product41,
      img2: product42,
      rating: 5,
      oldPrice: 238.85,
      newPrice: 245.84,
      badge: "Hot",
      category: "Clothing",
      name: "Colorful Pattern Shirts",
      type: "Popular",
    },
    {
      img1: product51,
      img2: product52,
      rating: 5,
      oldPrice: 238.85,
      newPrice: 245.84,
      badge: "-30%",
      category: "Clothing",
      name: "Colorful Pattern Shirts",
      type: "Popular",
    },
    {
      img1: product61,
      img2: product62,
      rating: 5,
      oldPrice: 238.85,
      newPrice: 245.84,
      badge: "-22%",
      category: "Clothing",
      name: "Colorful Pattern Shirts",
      type: "Newly Added",
    },
  ]

  const w = window.innerWidth;
  const slides = w >= 1400 ? 4 : w >= 1200 ? 3 : w >= 992 ? 2.5 : w >= 768 ? 2 : w >= 576 ? 1.5 : w >= 350 ? 1.2 : 1;
  const sb = w >= 1400 ? 30 : w >= 1200 ? 35 : w >= 992 ? 40 : w >= 768 ? 40 : w >= 576 ? 30 : w >= 350 ? 40 : 10;
  const rotate = w >= 1400 ? 30 : w >= 1200 ? 40 : w >= 992 ? 50 : w >= 768 ? 110 : w >= 576 ? 120 : w >= 350 ? 150 : 0;
  const depth = w >= 1400 ? 100 : w >= 1200 ? 150 : w >= 992 ? 180 : w >= 768 ? 220 : w >= 576 ? 240 : w >= 350 ? 300 : 0;
  const stretch = w >= 1400 ? 10 : w >= 1200 ? 10 : w >= 992 ? 20 : w >= 768 ? 25 : w >= 576 ? 10 : w >= 350 ? 0 : 0;
  const shadow = w >= 1400 ? false : w >= 1200 ? false : w >= 992 ? false : w >= 768 ? true : w >= 576 ? true : w >= 350 ? true : false;

  return (
    <section className="new__arrivals container section">
      <h3 className="section__title"><span>New</span> Arrivals</h3>

      <Swiper
        className="new__container swiper"
        spaceBetween={sb}
        modules={[Navigation, EffectCoverflow]}
        coverflowEffect={{
          rotate: rotate,
          stretch: stretch,
          depth: depth,
          modifier: 1,
          slideShadows: shadow,
        }}
        speed={600}
        centeredSlides
        effect="coverflow"
        slidesPerView={slides} // Adjust based on your design
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop
      >
        <div className="swiper-wrapper">
          {products.map((product, index) => (
            <SwiperSlide key={index} >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </div>

        <div className="swiper-button-prev">
          {/* <i className="fi fi-rs-angle-left"></i> */}
        </div>
        <div className="swiper-button-next">
          {/* <i className="fi fi-rs-angle-right"></i> */}
        </div>
      </Swiper>

      {/* <div className="new__container swiper">
        <div className="swiper-wrapper">
          <div className="product__item swiper-slide">
            <div className="product__banner">
              <a href="details.html" className="product__images">
                <img
                  src="assets/img/product-1-1.jpg"
                  alt=""
                  className="product__img default"
                />
                <img
                  src="assets/img/product-1-2.jpg"
                  alt=""
                  className="product__img hover"
                />
              </a>
              <div className="product__actions">
                <a href="#" className="action__btn" aria-label="Quick View">
                  <i className="fi fi-rs-eye"></i>
                </a>
                <a href="#" className="action__btn" aria-label="Add to Wishlist">
                  <i className="fi fi-rs-heart"></i>
                </a>
                <a href="#" className="action__btn" aria-label="Compare">
                  <i className="fi fi-rs-shuffle"></i>
                </a>
              </div>
              <div className="product__badge light-pink">Hot</div>
            </div>
            <div className="product__content">
              <span className="product__category">Clothing</span>
              <a href="details.html">
                <h3 className="product__title">Colorful Pattern Shirts</h3>
              </a>
              <div className="product__rating">
                <i className="fi fi-rs-star"></i>
                <i className="fi fi-rs-star"></i>
                <i className="fi fi-rs-star"></i>
                <i className="fi fi-rs-star"></i>
                <i className="fi fi-rs-star"></i>
              </div>
              <div className="product__price flex">
                <span className="new__price">$238.85</span>
                <span className="old__price">$245.8</span>
              </div>
              <a
                href="#"
                className="action__btn cart__btn"
                aria-label="Add To Cart"
              >
                <i className="fi fi-rs-shopping-bag-add"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="swiper-button-prev">
          <i className="fi fi-rs-angle-left"></i>
        </div>
        <div className="swiper-button-next">
          <i className="fi fi-rs-angle-right"></i>
        </div>
      </div> */}
    </section>
  )
}