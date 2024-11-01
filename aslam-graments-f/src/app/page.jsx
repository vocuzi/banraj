"use client";

import React from "react";
import Image from "next/image";
// import homeImg from "./assets/img/home-img.png";

import Categories from "./Components/categories";
import ProductSection from "./Components/ProductSH";
import DealSection from "./Components/DealsSH";
import NewsLetter from "./Components/NewsLetterSH";
import logo from "./assets/img/logo.png";
import NewArrival from "./Components/NewArrival";

export default function Home() {

  return (
    <main className="main">
      <section className="home section--lg">
        <div className="home__container container grid">
          <div className="home__content">
            <span className="home__subtitle">Renz Trending</span>
            <h1 className="home__title">
              Fashion Products <span>Great Collection</span>
            </h1>
            <p className="home__description">
              Save more from buying products directly from the manufacturers
            </p>
            <a href="shop.html" className="btn">Shop Now</a>
          </div>
          <Image src={logo} className="home__img" alt="hats" priority />
        </div>
      </section>
      <Categories/>
      <ProductSection/>
      <DealSection/>
      <NewArrival/>
      <NewsLetter/>
    </main>
  );
}
