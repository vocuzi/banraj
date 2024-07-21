import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../css/product.css"
import axios from "axios";
import { BaseContext } from "../BaseContext";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/footer";

const Product = () => {
    const param = useParams();
    const productID = parseInt(param.pid);
    const [product, setProduct] = useState([]);
    const [currentProductID, setProductID] = useState(productID);
    const { BaseUrl } = React.useContext(BaseContext);
    const [addProd, setAddProd] = useState([]);
    const [raw, setRaw] = useState();
    const [imgIndex, setImgIndex] = useState(0);
    const [variants, setVariants] = useState(false)
    const [selectedSize, setSelectedSize] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const token = localStorage.getItem('token');
        const checkAuth = async () => {
            try {
                if (token) {
                    const response = await axios.get(`${BaseUrl}checkAuth/`, {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    })
                    if (response.data['message'] === "Authenticated") {
                        setAuth(true)
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        checkAuth();
    }, [BaseUrl])

    function calculateDiscountPercentage(marketPrice, sellingPrice) {
        if (marketPrice <= 0) {
            throw new Error("Market price should be greater than zero.");
        }
        const discount = marketPrice - sellingPrice;
        const discountPercentage = (discount / marketPrice) * 100;
        return discountPercentage.toFixed(2); // Returning the discount percentage rounded to two decimal places
    }

    const fetchProduct = async () => {

        try {
            const response = await axios.get(`${BaseUrl}getProduct/${currentProductID}/`);
            if (response.data['variant']) {
                setRaw(response.data.variants[0]['product'])
                setVariants(true)
            }
            else {
                setProduct(response.data['product']);
                setVariants(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProduct();
        setImgIndex(0)
        setSelectedSize("")
    }, [currentProductID]);

    useEffect(() => {
        if (raw) {
            const pro = raw.find((productItem) => productItem.id === currentProductID);
            setProduct(pro);
            if (pro.sizes.length <= 1) {
                setSelectedSize(pro.product_size.id);
            }
            raw.forEach((productItem) => {
                // if (productItem.id !== currentProductID) {
                const mainImage = productItem.images.find((image) => image.is_main);
                if (!addProd.some((item) => item.color === productItem.product_color.color) && !addProd.some((item) => item.image === mainImage.image)) {
                    setAddProd((prevAddProd) => [...prevAddProd, { image: mainImage.image, color: productItem.product_color.color, pid: productItem.id, hexcode: productItem.product_color.hexcode }]);
                }
            })
        }

    }, [raw, addProd]);

    useEffect(() => {
        const interval = setInterval(() => {
            setImgIndex((prevIndex) => (prevIndex + 1) % (product.images ? product.images.length : 0));
        }, 5000);

        return () => clearInterval(interval);
    });

    const handleATC = async () => {
        if (!auth) {
            alert("Please login to add to cart")
        }
        else if (selectedSize === "") {
            alert("Please select a size to add to cart")
        }
        else if (auth) {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BaseUrl}addtocart/`,
                {
                    product: currentProductID,
                    size: selectedSize,
                    color: product.product_color.id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`
                    }
                }
            )
            if (response.data['message'] === "Success") {
                alert("Product added to cart")
            }
            else {
                console.log(response.data);
            }
        }

    }

    const BuyNow = async () => {
        if (auth) {
            const token = localStorage.getItem('token');
            var bynow = document.getElementById("BuyNow")
            bynow.disabled = true;
            console.log(currentProductID, selectedSize, quantity, product.product_color.id)
            const response = await axios.post(`${BaseUrl}singleOrder/`,
                {
                    product: currentProductID,
                    size: selectedSize,
                    quantity: quantity,
                    color: product.product_color.id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`
                    }
                }
            )
            if (response.data['message'] === "Success") {
                var popup = document.getElementById("popup");
                popup.style.display = 'none';
                bynow.disabled = false;
                alert("Order Placed Successfully")
            }
            else if (response.data['message'] === "Invalid") {
                alert("Please Fill the address for Delivery")
                setTimeout(() => {
                    navigate("/profile")
                }, 1000)
            }
            else {
                console.log(response.data);
            }
        }
    }

    const handlePopup = () => {
        var popup = document.getElementById("popup");
        if (!auth) {
            alert("Please login to Buy Any Product")
        }
        else if (selectedSize === "") {
            alert("Please select a size to Buy this Product")
        }
        else {
            popup.style.display = "flex";
        }
    }

    return (
        <div>
            <div id="popup" className="popup">
                <div className="cont ">
                    <button className="bak material-symbols-outlined" onClick={() => document.getElementById("popup").style.display = "none"}>close</button>
                    <h1>{product.name}</h1>
                    {product.images ? <img src={`${BaseUrl.slice(0, -1)}${product.images.find((image) => image.is_main).image}`} alt="product" /> : ""}
                    <div className="details ">
                        <h3>Color: {product.product_color ? <p>{product.product_color.color.toUpperCase()}</p> : ""}</h3>
                        <br />
                        <h3>Size: {product.product_size ? <p>{product.product_size.size}</p> : ""}</h3>
                        <br />
                        <h3>MRP: <p>₹{product.marketPrice * quantity} (+)</p></h3><br />
                        <h3>Discount: <p>₹{(product.marketPrice - product.sellingPrice) * quantity} (-)</p></h3><br />
                        <h3>Delivery Charges: <p>₹0 (+)</p></h3><br />
                        <h3>Total: <p>₹{product.sellingPrice * quantity}</p></h3><br />
                        <h3>Quantity:</h3>
                        <div className="qty">
                            <button className="pls material-symbols-outlined" onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>add</button><b>{quantity}</b><button className="mis material-symbols-outlined" onClick={() => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1))}>remove</button>
                        </div>
                    </div>
                    <button id="BuyNow" className="buynow" onClick={BuyNow}>Confirm Order</button>
                </div>
            </div>
            <div className="sChart" id="chart">
                <div className="cont">
                    <button className="bak material-symbols-outlined" onClick={() => document.getElementById("chart").style.display = "none"}>close</button>
                    <h1>Size Chart</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Size</th>
                                {product.sizes && product.sizes.some(size => size.shoulder !== null) && <th>Shoulder</th>}
                                {product.sizes && product.sizes.some(size => size.chest !== null) && <th>Chest</th>}
                                {product.sizes && product.sizes.some(size => size.top_length !== null) && <th>Length</th>}
                                {product.sizes && product.sizes.some(size => size.waist !== null) && <th>Waist</th>}
                                {product.sizes && product.sizes.some(size => size.hip !== null) && <th>Hip</th>}
                                {product.sizes && product.sizes.some(size => size.pant_length !== null) && <th>Bottom Length</th>}
                                {product.sizes && product.sizes.some(size => size.thigh !== null) && <th>Thigh</th>}
                                {product.sizes && product.sizes.some(size => size.sleev_length !== null) && <th>Sleev Length</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.sizes && (
                                    product.sizes.map((size) => {
                                        return (
                                            <tr key={size.id}>
                                                {size.size && <td>{size.size}</td>}
                                                {product.sizes.some(size => size.shoulder !== null) && <td>{size.shoulder ?? "-"}</td>}
                                                {product.sizes.some(size => size.chest !== null) && <td>{size.chest ?? "-"}</td>}
                                                {product.sizes.some(size => size.top_length !== null) && <td>{size.top_length ?? "-"}</td>}
                                                {product.sizes.some(size => size.waist !== null) && <td>{size.waist ?? "-"}</td>}
                                                {product.sizes.some(size => size.hip !== null) && <td>{size.hip ?? "-"}</td>}
                                                {product.sizes.some(size => size.pant_length !== null) && <td>{size.pant_length ?? "-"}</td>}
                                                {product.sizes.some(size => size.thigh !== null) && <td>{size.pant_length ?? "-"}</td>}
                                                {product.sizes.some(size => size.sleev_length !== null) && <td>{size.sleev_length ?? "-"}</td>}
                                            </tr>
                                        )

                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <button id="back" className="back material-symbols-outlined" onClick={() => navigate(-1)} >arrow_back <i>Back</i></button>
            <Navbar />
            <main>
                <div className="carousel">
                    {product.images ? <img src={`${BaseUrl.slice(0, -1)}${product.images[imgIndex].image}`} alt="product" /> : ""}
                    {product.images ?
                        (
                            <div className="carousel-indicator">
                                {
                                    product.images.map((image, index) => {
                                        return <span onClick={() => setImgIndex(index)} className={imgIndex === index ? "active" : ''} key={index}></span>
                                    })}
                            </div>
                        ) :
                        (<></>)
                    }
                    <button className="prev" onClick={() => setImgIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length)}>&#10094;</button>
                    <button className="next" onClick={() => setImgIndex((prevIndex) => (prevIndex + 1) % product.images.length)}>&#10095;</button>
                </div>
                <div className="productDetails">
                    <h1>{product.name}</h1>
                    <h4>{product.discription}</h4>
                    {product.product_size ? <p><strong>Size: </strong> {product.product_size.size}</p> : (<></>)}
                    {product.product_color ? <p><strong>Color: </strong>{product.product_color.color.toUpperCase()}</p> : <></>}
                    <p className="mrp">₹{product.marketPrice}</p>
                    <p className="price">₹{product.sellingPrice} <i>{calculateDiscountPercentage(product.marketPrice, product.sellingPrice)}<span className="material-symbols-outlined">sell</span></i></p>
                    {variants && <p className="head">Avali Variants:</p>}
                    {variants && (<div className="variants ">
                        {
                            addProd.map((product, index) => {
                                return (
                                    <div key={index} className={currentProductID === product.pid ? "variant selected" : "variant "} onClick={() => setProductID(product.pid)} style={{ backgroundColor: product.hexcode }}>
                                        <img src={`${BaseUrl.slice(0, -1)}${product.image}`} alt="" />
                                    </div>
                                )
                            })
                        }
                    </div>)}
                    {product.sizes && product.sizes.length > 0 ? <p className="head">Avali Sizes:</p> : <></>}
                    {product.sizes && product.sizes.length > 0 ?
                        (<div className="sizes">
                            {
                                product.sizes.map((size, index) => {
                                    return (
                                        <span key={index} className={selectedSize === size.id ? "size selected" : "size "} onClick={() => setSelectedSize(size.id)}>{size.size}</span>
                                    )
                                })
                            }
                            <span className="material-symbols-outlined sc" onClick={()=> document.getElementById("chart").style.display="flex"}>straighten</span>
                        </div>) : <></>}
                    <button className={auth ? "bn" : "bn dis"} onClick={handlePopup}>Buy Now<span className="material-symbols-outlined">local_mall</span></button><button className={auth ? "atc" : "atc dis"} onClick={handleATC}>Add To Cart<span className="material-symbols-outlined">shopping_cart</span></button>
                </div>
            </main>
            <Footer />
        </div>
    );
}



export default Product;
