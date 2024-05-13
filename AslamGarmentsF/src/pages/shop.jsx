import React from "react";
import '../css/style.css';
import '../css/google.css';
import '../css/decoration.css';
import '../css/external.css';
import { Link } from "react-router-dom";
import cross from '../images/cross.svg';
import smallboy from '../images/small-boy.png';
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Shop = () => {

    const products = [
        {
            id: 1,
            name: 'Kids Wear',
            img: smallboy,
            price: 40
        },
        {
            id: 2,
            name: 'Mens Wear',
            img: smallboy,
            price: 20
        },
        {
            id: 3,
            name: 'Womens Wear',
            img: smallboy,
            price: 60
        },
        {
            id: 4,
            name: 'Kids Wear',
            img: smallboy,
            price: 50
        },
        {
            id: 5,
            name: 'Mens Wear',
            img: smallboy,
            price: 20
        },
        {
            id: 6,
            name: 'Womens Wear',
            img: smallboy,
            price: 60
        },
        {
            id: 7,
            name: 'Kids Wear',
            img: smallboy,
            price: 50
        },
        {
            id: 8,
            name: 'Mens Wear',
            img: smallboy,
            price: 20
        },
        {
            id: 9,
            name: 'Womens Wear',
            img: smallboy,
            price: 60
        }
    ]

    return (
        <body>
            <div className="header" style={{ height: '40vh' }}>
                <Navbar page={"shop"} />
                <div className="content">
                    <div className="lfttxt" style={{ width: "40%", textAlign: "center" }}>
                        <h1 className="saira-condensed-bold">Product Section</h1>
                        <br /><br />
                        <br /><br /><br /><br />
                        <br /><br /><br /><br />
                        <br /><br />
                    </div>
                </div>
            </div>

            <div className="category">
                {
                    products.map((product,index) => (
                        <div key={index} className="card">
                            <Link to="/" className="product-item">
                                <img src={product.img} className="img-fluid product-thumbnail" alt={product.name} />
                                <h3 className="product-title">{product.name}</h3>
                                <strong className="product-price">₹{product.price}</strong>

                                <span className="icon-cross">
                                    <img src={cross} className="img-fluid" alt="Cross" />
                                </span>
                            </Link>
                        </div>
                    ))
                }
            </div>
            <Footer/>
            
        </body>
    );
}

export default Shop;