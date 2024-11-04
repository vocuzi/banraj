import FootBar from "@/app/Components/footer";
import Navbar from "@/app/Components/Navbar";
import NewsLetter from "@/app/Components/NewsLetterSH";
import product22 from "@/app/assets/img/product-2-2.jpg";
import product31 from "@/app/assets/img/product-3-1.jpg";
import product32 from "@/app/assets/img/product-3-2.jpg";
import product41 from "@/app/assets/img/product-4-1.jpg";
import product42 from "@/app/assets/img/product-4-2.jpg";
import product51 from "@/app/assets/img/product-5-1.jpg";
import Image from "next/image";
import Link from "next/link";
import "./style.css"


export default function CartPage() {
  const products = [
    {
      id: 1,
      images: [product22, product31],
      name: "Product 1 Name",
      description: "Description for Product 1.",
      price: 110,
      qty: 5,
      stock: 20,
    },
    {
      id: 2,
      images: [product32, product41],
      name: "Product 2 Name",
      description: "Description for Product 2.",
      price: 120,
      qty: 3,
      stock: 5,
    },
    {
      id: 3,
      images: [product42, product51],
      name: "Product 3 Name",
      description: "Description for Product 3.",
      price: 130,
      qty: 2,
      stock: 0,
    },
  ];

  return (
    <>
      <Navbar page={"Shop"} />
      <main className="main">
        <section className="breadcrumb">
          <ul className="breadcrumb__list flex container">
            <li><Link href="/" className="breadcrumb__link">Home</Link></li>
            <li><span className="breadcrumb__link">  〉</span></li>
            <li><Link href={"/shop"} className="breadcrumb__link">Shop</Link></li>
            <li><span className="breadcrumb__link">  〉</span></li>
            <li><span className="breadcrumb__link">Cart</span></li>
          </ul>
        </section>

        <section className="cart section--lg container">
          <div className="table__container">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>

                {products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <Image
                        src={product.images[0]} // Display the first image
                        alt={product.name}
                        className="table__img"
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>
                      <h3 className="table__title">{product.name}</h3>
                      <p className="table__description">{product.description}</p>
                    </td>
                    <td>
                      <span className="table__price">${product.price}</span>
                    </td>
                    <td className="flex-col justify-center">
                      <i className="fi fi-rs-minus-small"></i>
                      <span className="qty">{product.qty}</span>
                      <i className="fi fi-rs-plus-small"></i>
                    </td>
                    <td><span className="subtotal">${product.qty * product.price}</span></td>
                    <td><i className="fi fi-rs-trash table__trash"></i></td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          <div className="cart__actions">
            <a href="#" className="btn flex btn__md">
              <i className="fi-rs-shuffle"></i> Update Cart
            </a>
            <a href="#" className="btn flex btn__md">
              <i className="fi-rs-shopping-bag"></i> Continue Shopping
            </a>
          </div>

          <div className="divider">
            <i className="fi fi-rs-fingerprint"></i>
          </div>

          <div className="cart__group grid">
            <div className="cart__total">
              <h3 className="section__title">Cart Totals</h3>
              <table className="cart__total-table">
                <tbody>
                  <tr>
                    <td><span className="cart__total-title">Cart Subtotal</span></td>
                    <td><span className="cart__total-price">$240.00</span></td>
                  </tr>
                  <tr>
                    <td><span className="cart__total-title">Shipping</span></td>
                    <td><span className="cart__total-price">$10.00</span></td>
                  </tr>
                  <tr>
                    <td><span className="cart__total-title">Total</span></td>
                    <td><span className="cart__total-price">$250.00</span></td>
                  </tr>
                </tbody>
              </table>
              <a href="checkout.html" className="btn flex btn--md">
                <i className="fi fi-rs-box-alt"></i> Proceed To Checkout
              </a>
            </div>
          </div>
        </section>

        <NewsLetter />
      </main>
      <FootBar />
    </>
  )
}