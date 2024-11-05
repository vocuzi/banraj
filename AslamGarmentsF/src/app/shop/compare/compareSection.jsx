import Image from "next/image";
import product1 from "@/app/assets/img/product-2-1.jpg";
import product2 from "@/app/assets/img/product-4-1.jpg";
import product3 from "@/app/assets/img/product-7-1.jpg";
import "./style.css";

export default function CompareSection() {
  const products = [
    {
      name: "Plain Striola Shirts",
      price: "$35",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis perferendis nam, fuga reiciendis libero doloremque distinctio.",
      colors: ["hsl(37, 100%, 65%)", "hsl(353, 100%, 65%)", "hsl(49, 100%, 60%)"],
      stock: "Out of stock",
      weight: "150 gram",
      dimensions: "N/A",
      image: product1,
    },
    {
      name: "Chen Cardigan",
      price: "$67",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis perferendis nam, fuga reiciendis libero doloremque distinctio.",
      colors: ["hsl(37, 100%, 65%)", "hsl(353, 100%, 65%)", "hsl(49, 100%, 60%)"],
      stock: "Out of stock",
      weight: "150 gram",
      dimensions: "N/A",
      image: product2,
    },
    {
      name: "Henley Shirt",
      price: "$24",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis perferendis nam, fuga reiciendis libero doloremque distinctio.",
      colors: ["hsl(37, 100%, 65%)", "hsl(353, 100%, 65%)", "hsl(49, 100%, 60%)"],
      stock: "Out of stock",
      weight: "150 gram",
      dimensions: "N/A",
      image: product3,
    },
  ];

  return (
    <section className="compare container section--lg">
      <table className="compare__table ">
        <tbody>
          <tr>
            <th>Image</th>
            {products.map((product, index) => (
              <td key={index}>
                <Image
                  src={product.image}
                  alt={product.name}
                  className="compare__img object-cover"
                />
              </td>
            ))}
          </tr>
          <tr>
            <th>Name</th>
            {products.map((product, index) => (
              <td key={index}><h3 className="table__title">{product.name}</h3></td>
            ))}
          </tr>
          <tr>
            <th>Price</th>
            {products.map((product, index) => (
              <td key={index}><span className="table__price">{product.price}</span></td>
            ))}
          </tr>
          <tr>
            <th>Description</th>
            {products.map((product, index) => (
              <td key={index}>
                <p>{product.description}</p>
              </td>
            ))}
          </tr>
          <tr>
            <th>Colors</th>
            {products.map((product, index) => (
              <td key={index}>
                <ul className="color__list compare__colors flex space-x-2">
                  {product.colors.map((color, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="color__link block w-6 h-6 rounded-full"
                        style={{ backgroundColor: color }}
                      ></a>
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
          <tr>
            <th>Stock</th>
            {products.map((product, index) => (
              <td key={index}><span className="table__stock">{product.stock}</span></td>
            ))}
          </tr>
          <tr>
            <th>Weight</th>
            {products.map((product, index) => (
              <td key={index}><span className="table__weight">{product.weight}</span></td>
            ))}
          </tr>
          <tr>
            <th>Dimensions</th>
            {products.map((product, index) => (
              <td key={index}><span className="table__dimension">{product.dimensions}</span></td>
            ))}
          </tr>
          <tr>
            <th>Buy</th>
            {products.map((product, index) => (
              <td key={index}>
                <a href="#" className="btn btm--sm">Add to Cart</a>
              </td>
            ))}
          </tr>
          <tr>
            <th>Remove</th>
            {products.map((product, index) => (
              <td key={index}><i className="fi fi-rs-trash table__trash"></i></td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
}
