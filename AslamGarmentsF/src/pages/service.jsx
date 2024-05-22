import React, { useRef,useState,useEffect,useContext } from "react";
import '../css/style.css';
import '../css/google.css';
import '../css/decoration.css';
import '../css/external.css';
import model from '../images/model.png';
import cross from '../images/cross.svg';
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseContext } from "../BaseContext";

const Service = () => {
    const navigate = useNavigate();
    const catog = useRef(null);
    const [categories, setCategories] = useState([])
    const { BaseUrl } = useContext(BaseContext);

    useEffect(() => {
        console.log(BaseUrl)
        const getCat = async () => {
            try {
                const response = await axios.get(`${BaseUrl}getCat/`)

                if (response.data['message'] === "Success") {
                    setCategories(response.data['data'])
                    console.log(response.data['data'])
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        getCat();
    }, [BaseUrl])

    const clickCat=(catogID)=>{
        navigate('/shop/',{state:{categoryID:catogID}})
    }

    return (
        <body>
            <div className="header">
                <Navbar page={"service"} />
                <div className="content">
                    <div className="lfttxt">
                        <h1 className="saira-condensed-bold">Aslam Garments</h1>
                        <p className="saira-condensed-regular">
                            Aslam Garments is a leading manufacturer of garments in Tamil Nadu.
                            We have been in the business for over 20 years and have built a
                            reputation for quality and reliability. Our products are made from
                            the finest materials and are designed to last. We offer a wide range
                            of garments for all age ranged people.
                        </p>
                        <button onClick={() => navigate('/shop/')}>View Products</button>
                        <button onClick={() => catog.current.scrollIntoView({ behavior: "smooth" })}>Category</button>
                    </div>
                    <img src={model} alt="Model Images" />
                </div>
            </div>
            <div className="service">
                <div className="card">
                    <span className="material-symbols-outlined">local_shipping</span>
                    <h2>Fast & Free Delivery</h2>
                    <p>Free and Faster Delivery for all the products in local and under few terms and conditions.</p>
                </div>
                <div className="card">
                    <span className="material-symbols-outlined">shopping_bag</span>
                    <h2>Easy to Shop</h2>
                    <p>Easy to shop with our website and get the products at your door step.</p>
                </div>
                <div className="card">
                    <span className="material-symbols-outlined">local_shipping</span>
                    <h2>Easy Replacement</h2>
                    <p>Easy replacement for the products with in 7 days of delivery with few terms and conditions.</p>
                </div>
            </div>
            <div className="category" ref={catog}>
            <div className="txt" >
                    <h1>Our Products</h1>
                    <p>
                        We offer a wide range of garments for all age ranged people. Our all
                        collections are for kids, teens and adults.
                    </p>
                    <button onClick={() => catog.current.scrollIntoView({ behavior: "smooth" })}>Explore</button>
                </div>
                <div className="cont">
                {
                        categories.map((category) => (
                            <div key={category.id} className="card " onClick={()=>clickCat(category.id)}>
                                    <img src={`${BaseUrl.slice(0, -1)}${category.image}`} className=" product-thumbnail" alt={category.name} />
                                    <h3 className="product-title">{category.name}</h3>
                                    <div className="cross">
                                        <img src={cross} alt="Cross" />
                                    </div>
                            </div>
                        ))
                    }
                </div>

            </div>
            <Footer />
        </body>
    )
}

export default Service;