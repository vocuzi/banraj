import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/shop.css'
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import axios from "axios";
import { BaseContext } from "../BaseContext";
import 'rc-slider/assets/index.css';
import child from '../images/FinishingAreanew1.jpg'
import child2 from '../images/PRODUCTION-CAPACITY.jpg'
import child3 from "../images/garment-job-work.jpg"

const Shop = (page) => {

    const location = useLocation();
    const navigate = useNavigate();
    const { BaseUrl } = useContext(BaseContext);
    const { categoryID } = location.state || "";
    const [category, setCategory] = useState(categoryID ? categoryID : '')
    const [name, setName] = useState('')
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(10000)
    const [colorisopen, setcolorisopen] = useState(false)
    const [priceisopen, setpriceisopen] = useState(false)
    const [sortisopen, setsortisopen] = useState(false)
    const [catisopen, setcatisopen] = useState(false)
    const [sizeisopen, setsizeisopen] = useState(false)
    const [ordering, setOrdering] = useState('')
    const [color, setColor] = useState('');
    const [df, setdf] = useState([])
    const images = [child, child2, child3]
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([]);
    const [colors, setAllColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [selectSize, setSelectSize] = useState([]);
    const [img, setImg] = useState(child)

    useEffect(() => {
        let i = 0;
        var imag = document.getElementById("headImg");
        setInterval(() => {
            if (i === 3) {
                i = 0;
            }
            setImg(images[i])
            i++;
        }, 5000)
    }, [])

    const handleSeleceSize = (id, size, event) => {
        const checked = event.target.checked;

        setSelectSize(prevSelectSize => {
            if (checked) {
                return [...prevSelectSize, { id, size }];
            } else {
                return prevSelectSize.filter(size => size.id !== id);
            }
        });
    };

    const fetchProduct = async () => {
        try {
            const sizeParam = selectSize.map(sizeObj => sizeObj.id).join('&size=');
            console.log(sizeParam)
            // const response = await axios.get(`${BaseUrl}products/?category=${category}&color=${color}&min_price=${minPrice}&max_price=${maxPrice}&name=${name}&ordering=${ordering}&size=${size}`,
            const response = await axios.get(`${BaseUrl}products/?size=${sizeParam ?? ""}`,
                {
                    params: {
                        category: category ?? "",
                        color: color ?? "",
                        min_price: minPrice ?? "",
                        max_price: maxPrice ?? "",
                        name: name ?? "",
                        ordering: ordering ?? "",
                    }
                }
            );

            const formattedProducts = response.data.map(product => {
                const mainImage = product.images.find(img => img.is_main) || {};
                return {
                    id: product.id,
                    name: product.name,
                    img: mainImage.image,
                    discription: product.discription,
                    marketPrice: product.marketPrice,
                    sellingPrice: product.sellingPrice
                };
            });
            setProducts(formattedProducts);
            const prices = formattedProducts.map(product => product.sellingPrice)
            setdf([Math.min(...prices), Math.max(...prices)])
            document.getElementById('load').style.display = 'none';
        }
        catch (error) {
            console.log(error)
        }
    }

    const getColors = async () => {
        try {
            const response = await axios.get(`${BaseUrl}getcolor/`)
            if (response.data['message'] === "Success") {
                setAllColors(response.data['data'])
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const getCategory = async () => {
        try {
            const response = await axios.get(`${BaseUrl}getCat/`)
            if (response.data['message'] === "Success") {
                setCategories(response.data['data'])
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const getSizes = async () => {
        try {
            const response = await axios.get(`${BaseUrl}getSizes/`)
            if (response.data['message'] === "Success") {
                setSizes(response.data['data'])
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(page.page)
        fetchProduct();
        getColors();
        getCategory();
        getSizes();
    }, [])

    const addFilters = () => {
        if (minPrice > maxPrice) {
            alert("Minimum price should be less than maximum price")
            return;
        }
        document.getElementById('load').style.display = "flex"
        fetchProduct();
    }

    const enter = (e) => {
        if (e.key === 'Enter') {
            addFilters();
        }
    }

    return (
        <div>
            <div id="load" className="loader-wrap">
                <div className="loader"></div>
            </div>
            <div className="header">

                <Navbar page={"shop"} />

                <div className="content">
                    <img id="headImg" src={img} alt="header Image" />
                    <div className="lfttxt">
                        <h1>Product Section</h1>
                    </div>
                    <div className="searchbar">
                        <input type="text" placeholder="Search" onChange={(e) => setName(e.target.value)} onKeyDown={enter} />
                        <span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={addFilters}>search</span>
                    </div>
                </div>
            </div>

            <div className="products ">
                <div className="filterside ">
                    <h1>Filters</h1>
                    <hr />
                    <label htmlFor="category" onClick={() => catisopen ? setcatisopen(false) : setcatisopen(true)}>
                        <p>Category</p><span className="material-symbols-outlined" style={catisopen ? ({ transform: 'rotate(180deg)' }) : ({})}>arrow_drop_down</span>
                    </label>
                    {catisopen ? (
                        <div className="options">
                            <label style={{ gridColumn: 'span 4', justifyContent: "start" }} onClick={() => setCategory('')}>
                                <input type="radio" value='' name='category' />
                                <p>All</p>
                            </label>
                            {categories.map((category) => (
                                <label key={category.id} style={{ gridColumn: 'span 4', justifyContent: 'start' }} onClick={() => setCategory(category.id)}>
                                    <input type="radio" value={category.id} name='category' />
                                    <p>{category.name}</p>
                                </label>
                            ))}
                        </div>
                    ) : (<></>)}
                    <hr />
                    <label htmlFor="price" onClick={() => sizeisopen ? setsizeisopen(false) : setsizeisopen(true)}>
                        <p>Size</p><span className="material-symbols-outlined" style={sizeisopen ? ({ transform: 'rotate(180deg)' }) : ({})}>arrow_drop_down</span>
                    </label>
                    {sizeisopen ?
                        (<div className="options">
                            <label style={{ gridColumn: 'span 4', justifyContent: "start" }} onClick={() => setSelectSize([])}>
                                <input type="checkbox" value='' name='size' />
                                <p>All</p>
                            </label>
                            {sizes.map((size) => (
                                <label key={size.id} style={{ gridColumn: 'span 4', justifyContent: 'start' }} onClick={(e) => handleSeleceSize(size.id, size.size, e)}>
                                    <input type="checkbox" value={size.id} name='size' />
                                    <p>{size.size}</p>
                                </label>
                            ))}
                        </div>
                        ) : (<> </>)}
                    <hr />
                    <label htmlFor="price" onClick={() => priceisopen ? setpriceisopen(false) : setpriceisopen(true)}>
                        <p>Price</p><span className="material-symbols-outlined" style={priceisopen ? ({ transform: 'rotate(180deg)' }) : ({})}>arrow_drop_down</span>
                    </label>
                    {priceisopen ? (
                        <div className="options ">
                            <label htmlFor="minPrice">
                                <p>Min Price</p>
                                <input type="number" placeholder={`Min ${df[0]}`} min={df[0]} max={df[1]} id="minPrice" onChange={(e) => setMinPrice(e.target.value)} style={{ width: "90%" }} />
                            </label>
                            <label htmlFor="maxPrice">
                                <p>Max Price</p>
                                <input type="number" placeholder={`Max ${df[1]}`} max={df[1]} min={df[0]} id="maxPrice" onChange={(e) => setMaxPrice(e.target.value)} style={{ width: "90%" }} />
                            </label>
                        </div>
                    ) : (<></>)}
                    <hr />
                    <label htmlFor="sort" onClick={() => sortisopen ? setsortisopen(false) : setsortisopen(true)}>
                        <p>Sort</p><span className="material-symbols-outlined" style={sortisopen ? ({ transform: 'rotate(180deg)' }) : ({})}>arrow_drop_down</span>
                    </label>
                    {sortisopen ? (
                        <div className="options">
                            <label style={{ gridColumn: 'span 4', justifyContent: "start" }} onClick={() => setOrdering('name')}>
                                <input type="radio" value='name' name='ordering' />
                                <p>Alphabetical A-Z</p>
                            </label>
                            <label style={{ gridColumn: 'span 4', justifyContent: 'start' }} onClick={() => setOrdering('-name')}>
                                <input type="radio" value='-name' name='ordering' />
                                <p>Alphabetical Z-A</p>
                            </label>
                            <label style={{ gridColumn: 'span 4', justifyContent: 'start' }} onClick={() => setOrdering('-sellingPrice')}>
                                <input type="radio" value='-sellingPrice' name='ordering' />
                                <p>Price High - Low</p>
                            </label>
                            <label style={{ gridColumn: 'span 4', justifyContent: 'start' }} onClick={() => setOrdering('sellingPrice')}>
                                <input type="radio" value='sellingPrice' name='ordering' />
                                <p>Price Low - High</p>
                            </label>
                        </div>
                    ) : (<></>)}
                    <hr />
                    <label htmlFor="colors" onClick={() => colorisopen ? setcolorisopen(false) : setcolorisopen(true)}>
                        <p >Colours</p><span className="material-symbols-outlined" style={colorisopen ? ({ transform: 'rotate(180deg)' }) : ({})}>arrow_drop_down</span>
                    </label>
                    {colorisopen ? (
                        <div className="options">
                            {colors.map((color) => (<span key={color.id} style={{ backgroundColor: (color.hexcode ? color.hexcode : color.color) }} onClick={() => setColor(color.id)}></span>))}
                        </div>
                    ) : (<></>)}
                    <hr />
                    <button onClick={addFilters}>Add Filters</button>
                </div>
                <div className="productCont ">
                    {products.map((product, index) => (
                        <div key={index} className="productCard" onClick={() => navigate(`/product/${product.id}`)}>
                            <img src={product.img} alt={product.name} />
                            <h3 >{product.name}</h3>
                            <p style={{ fontSize: '1.2rem', color: '#494949' }}>{product.discription.length > 70 ? (product.discription.slice(0, 70) + "...") : (product.discription)}</p>
                            <p>₹{product.sellingPrice} <strong>₹{product.marketPrice}</strong></p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />

        </div>
    );
}

export default Shop;