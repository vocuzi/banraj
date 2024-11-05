import product1 from "../assets/img/showcase-img-1.jpg"
import product2 from "../assets/img/showcase-img-2.jpg"
import product3 from "../assets/img/showcase-img-3.jpg"
import ShowCaseItem from "./ShowCaseItem"

export default function ShowCase() {


  const products = [
    {
      img: product1,
      rating: 2,
      oldPrice: 238.85,
      newPrice: 245.84,
      badge: "Hot",
      category: "Clothing",
      name: "Colorful Pattern Shirts",
      type: "Featured",
    },
    {
      img: product2,
      rating: 3,
      oldPrice: 238.85,
      newPrice: 245.8,
      badge: "Hot",
      category: "Clothing",
      name: "Colorful Pattern Shirts",
      type: "Featured",
    },
    {
      img: product3,
      rating: 4,
      oldPrice: 238.85,
      newPrice: 245.84,
      badge: "Hot",
      category: "Clothing",
      name: "Colorful Pattern Shirts",
      type: "Featured",
    },
  ]

  return (
    <section className="showcase section">
      <div className="showcase__container container grid">
        <div className="showcase__wrapper">
          <h3 className="section__title">Hot Releases</h3>
          {products.map((product,index)=>(
            <ShowCaseItem item={product} key={index}/>
          ))}
        </div>
        <div className="showcase__wrapper">
          <h3 className="section__title">Deals & Outlet</h3>
          {products.map((product,index)=>(
            <ShowCaseItem item={product} key={index}/>
          ))}
        </div>
        <div className="showcase__wrapper">
          <h3 className="section__title">Trendy</h3>
          {products.map((product,index)=>(
            <ShowCaseItem item={product} key={index}/>
          ))}
        </div>
        <div className="showcase__wrapper">
          <h3 className="section__title">Best Deal</h3>
          {products.map((product,index)=>(
            <ShowCaseItem item={product} key={index}/>
          ))}
        </div>
      </div>
    </section>
  )
}