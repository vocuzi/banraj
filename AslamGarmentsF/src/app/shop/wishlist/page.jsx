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


export default function WishlistPage() {
  const products = [
    {
      id: 1,
      images: [product22, product31],
      name: "Product 1 Name",
      description: "Description for Product 1.",
      price: "$110",
      stock: 20,
    },
    {
      id: 2,
      images: [product32, product41],
      name: "Product 2 Name",
      description: "Description for Product 2.",
      price: "$120",
      stock: 5,
    },
    {
      id: 3,
      images: [product42, product51],
      name: "Product 3 Name",
      description: "Description for Product 3.",
      price: "$130",
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
            <li><span className="breadcrumb__link">Shop</span></li>
            <li><span className="breadcrumb__link">  〉</span></li>
            <li><span className="breadcrumb__link">Wishlist</span></li>
          </ul>
        </section>
        <section className="wishlist section--lg container">
          <div className="table__container">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock Status</th>
                  <th>Action</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
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
                      <span className="table__price">{product.price}</span>
                    </td>
                    <td>
                      <span className={product.stock <= 0 ? "table__stock text-red-600" : product.stock <= 10 ? "table__stock text-orange-600" : "table__stock text-green-600"}>{product.stock <= 0 ? "Out Of Stock" : product.stock <= 10 ? "Very few left" : "In Stock"}</span>
                    </td>
                    <td>
                      <a href="#" className="btn btn--sm">Add to Cart</a>
                    </td>
                    <td>
                      <i className="fi fi-rs-trash table__trash"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <NewsLetter />
      </main>
      <FootBar />
    </>
  )
}