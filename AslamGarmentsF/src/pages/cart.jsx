import React, { useContext, useEffect, useState } from "react";
import '../css/cart.css';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { BaseContext } from "../BaseContext";

const Cart = () => {

    const { BaseUrl } = useContext(BaseContext);
    const [products, setProducts] = useState([]);

    const getCart = async () => {
        try {

            const response = await axios.get(`${BaseUrl}getCart/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            setProducts(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateCart = async (cid, qty, cd) => {
        try {
            const response = await axios.post(`${BaseUrl}updateCart/`,
                {
                    id: cid,
                    quantity: qty,
                    cd: cd
                }, { headers: { Authorization: `Token ${localStorage.getItem('token')}`, "Content-Type": "application/json" } }
            )
            setProducts(response.data['cartItems'])
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCart();
    }, [])

    return (
        <div>
            <div className="header" style={{ height: '30vh' }}>

                <Navbar page={"cart"} />

                <div className="content">
                    <div className="lfttxt " style={{ position: 'absolute', top: '60%', left: "50%", transform: "translate(-50%,-50%)", textAlign: 'center' }} >
                        <h1 className="saira-condensed-bold">Cart Section</h1>
                    </div>
                </div>
            </div>
            <main className="cart ">
                {
                    products.map((product) => {
                        return (
                            <div className="cart-item " key={product.id}>
                                {product.product.images ? <img src={`${BaseUrl.slice(0, -1)}${product.product.images.find((image) => image.is_main).image}`} alt="" /> : ""}
                                <div className="cart-item-details ">
                                    <h1>{product.product.name}</h1>
                                    <p>Price: ₹{product.product.sellingPrice} (x{product.quantity})</p>
                                    <p>Size: {product.size.size}</p>
                                    <p style={{ display: "inline", marginRight: "10px" }}>Quantity: {product.quantity}</p><button onClick={()=>updateCart(product.id,product.quantity+1,false)}>+</button><button onClick={()=>updateCart(product.id,product.quantity-1,false)}>-</button>
                                    <p>Total Price: ₹{product.product.sellingPrice * product.quantity} (x{product.quantity})</p>
                                </div>
                                <div className="btn ">
                                    <button>Buy Now<span className="material-symbols-outlined">orders</span></button>
                                    <button onClick={()=>updateCart(product.id,0,true)}>Remove<span className="material-symbols-outlined">delete</span></button>
                                </div>
                            </div>
                        )
                    })
                }
            </main>
            <Footer />
        </div>
    )
}

export default Cart;