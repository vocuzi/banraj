import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../css/product.css"
import axios from "axios";
import { BaseContext } from "../BaseContext";
import { useParams } from "react-router-dom";

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
    }, [product]);


    return (
        <div>
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
                    <p className="price">₹{product.sellingPrice} <i>{calculateDiscountPercentage(product.marketPrice, product.sellingPrice)}<span class="material-symbols-outlined">sell</span></i></p>
                    {variants && <p className="head">Avali Variants:</p>}
                    {variants && (<div className="variants ">
                        {
                            addProd.map((product, index) => {
                                return (
                                    <div key={index} className={currentProductID === product.pid ? "variant selected" : "variant "} onClick={() => setProductID(product.pid)} style={{ backgroundColor: product.hexcode }}>
                                        <img src={`${BaseUrl.slice(0, -1)}${product.image}`} alt="" />
                                        <b>{product.color.toUpperCase()}</b>
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
                                        <span key={index} className={selectedSize===size.size?"size selected":"size "} onClick={()=>setSelectedSize(size.size)}>{size.size}</span>
                                    )
                                })
                            }
                        </div>) : <></>}
                </div>
            </main>
        </div>
    );
}



export default Product;
