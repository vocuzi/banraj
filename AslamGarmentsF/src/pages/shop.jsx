import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/shop.css'
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import axios from "axios";
import { BaseContext } from "../BaseContext";
import 'rc-slider/assets/index.css';

const Shop = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { BaseUrl } = useContext(BaseContext);
    const { categoryID } = location.state || "";
    const [category, setCategory] = useState(categoryID ? categoryID : '')
    const [color, setColor] = useState('');
    const [name, setName] = useState('')
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(10000)
    const [products, setProducts] = useState([]);
    const [colorisopen, setcolorisopen] = useState(false)
    const [priceisopen, setpriceisopen] = useState(false)
    const [sortisopen, setsortisopen] = useState(false)
    const [catisopen, setcatisopen] = useState(false)
    const [ordering, setOrdering] = useState('')
    const [df, setdf] = useState([])
    const [categories, setCategories] = useState([])

    const [colors, setAllColors] = useState([
        {
            id: 1,
            name: 'red',
        },
        {
            id: 2,
            name: "blue",
        },
        {
            id: 3,
            name: 'black',
        },
        {
            id: 4,
            name: 'gray',
        }
    ])

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${BaseUrl}products/?category=${category}&color=${color}&min_price=${minPrice}&max_price=${maxPrice}&name=${name}&ordering=${ordering}`);

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

    useEffect(() => {
        fetchProduct();
        getColors();
        getCategory();
    }, [])

    const addFilters = () => {
        if (minPrice > maxPrice) {
            alert("Minimum price should be less than maximum price")
            return;
        }
        fetchProduct();
    }

    return (
        <body>
            <div className="header" style={{ height: '40vh' }}>

                <Navbar page={"shop"} />

                <div className="content">
                    <div className="lfttxt" style={{ position: 'absolute', top: '50%' }} >
                        <h1 className="saira-condensed-bold">Product Section</h1>
                    </div>
                    <div className="searchbar">
                        <input type="text" placeholder="Search" onChange={(e) => setName(e.target.value)} />
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
                    {
                        catisopen ? (
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
                        ) : (<></>)
                    }
                    <hr />
                    <label htmlFor="price" onClick={() => priceisopen ? setpriceisopen(false) : setpriceisopen(true)}>
                        <p>Price</p><span className="material-symbols-outlined" style={priceisopen ? ({ transform: 'rotate(180deg)' }) : ({})}>arrow_drop_down</span>
                    </label>
                    {
                        priceisopen ? (
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
                        ) : (<></>)
                    }
                    <hr />
                    <label htmlFor="sort" onClick={() => sortisopen ? setsortisopen(false) : setsortisopen(true)}>
                        <p>Sort</p><span className="material-symbols-outlined" style={sortisopen ? ({ transform: 'rotate(180deg)' }) : ({})}>arrow_drop_down</span>
                    </label>
                    {
                        sortisopen ? (
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
                        ) : (<></>)
                    }
                    <hr />
                    <label htmlFor="colors" onClick={() => colorisopen ? setcolorisopen(false) : setcolorisopen(true)}>
                        <p >Colours</p><span className="material-symbols-outlined" style={colorisopen ? ({ transform: 'rotate(180deg)' }) : ({})}>arrow_drop_down</span>
                    </label>
                    {colorisopen ?
                        (
                            <div className="options">
                                {colors.map((color) => (<span key={color.id} style={{ backgroundColor: color.color }} onClick={() => setColor(color.id)}></span>))}
                            </div>
                        ) :
                        (<></>)
                    }
                    <hr />
                    <button onClick={addFilters}>Add Filters</button>
                </div>
                <div className="productCont ">
                    {
                        products.map((product, index) => (
                            <div key={index} className="productCard">
                                <img src={product.img} alt={product.name} />
                                <h3 >{product.name}</h3>
                                <p style={{ fontSize: '1.2rem', color: '#494949' }}>{product.discription.length > 70 ? (product.discription.slice(0, 70) + "...") : (product.discription)}</p>
                                <p>₹{product.sellingPrice} <strong>₹{product.marketPrice}</strong></p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />

        </body>
    );
}

export default Shop;