"use client"
import React,{useState} from "react"
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
import ProductCard from "./ProductCard"

export default function ProductSection() {

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

  const [currentType,setCurrentType] = useState(products[0].type)

  return (
    <section className="products container section">
      <div className="tab__btns">
        {products
          .map(product => product.type)
          .filter((type, index, self) => self.indexOf(type) === index)
          .map((type,index) => (
            <span className={type===currentType?"tab__btn active-tab":"tab__btn"} data-target="#new-added" onClick={()=>setCurrentType(type)} key={index}>{type}</span>
          ))}
      </div>

      <div className="tab__items">
        <div className="tab__item active-tab" id="featured">
          <div className="products__container grid">
            {products.filter((product,index)=>(product.type === currentType)).map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}