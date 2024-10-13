import React, { useRef, useState, useEffect, useContext } from "react";
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
import child from '../images/FinishingAreanew1.jpg'
import child2 from '../images/PRODUCTION-CAPACITY.jpg'
import child3 from "../images/garment-job-work.jpg"

const Service = () => {
    const navigate = useNavigate();
    const catog = useRef(null);
    const [categories, setCategories] = useState([])
    const { BaseUrl } = useContext(BaseContext);
    const [img, setImg] = useState(child)
    const images = [child, child2, child3]

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

    const clickCat = (catogID) => {
        navigate('/shop/', { state: { categoryID: catogID } })
    }

    return (
        <body>
                <Navbar page={"service"} />
            <div className="header">
                <div className="content">
                <img id="headImg" src={img} alt="header Image" />
                    
                    {/* <div className="lfttxt">
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
                    </div> */}
                </div>
            </div>
            <div className="service">
                <div className="card">
                    <span className="material-symbols-outlined">local_shipping</span>
                    <h2>Fast & Free Delivery</h2>
                    <p>Free and faster delivery for all the products in local and under few terms and conditions.</p>
                </div>
                <div className="card">
                    <span className="material-symbols-outlined">shopping_bag</span>
                    <h2>Easy to Shop</h2>
                    <p>Easy to shop with our website and get the products at your doorstep.</p>
                </div>
                <div className="card">
                    <span className="material-symbols-outlined">autorenew</span>
                    <h2>Easy Replacement</h2>
                    <p>Easy replacement for the products within 7 days of delivery with few terms and conditions.</p>
                </div>
                <div className="card">
                    <span className="material-symbols-outlined">support_agent</span>
                    <h2>24/7 Support</h2>
                    <p>Our support team is available 24/7 to assist you with any issues or questions.</p>
                </div>
                {/* <div className="card">
                    <span className="material-symbols-outlined">security</span>
                    <h2>Secure Payments</h2>
                    <p>All transactions are secure and encrypted, ensuring your personal and payment information is safe.</p>
                </div> */}
                <div className="card">
                    <span className="material-symbols-outlined">local_mall</span>
                    <h2>Single Product Purchase</h2>
                    <p>Purchase single items easily with our streamlined checkout process, perfect for individual buyers.</p>
                </div>
                <div className="card">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    <h2>Bulk Product Purchase</h2>
                    <p>Get discounts on bulk purchases and enjoy convenient bulk order processing for your business needs.</p>
                </div>
                <div className="card">
                    <span className="material-symbols-outlined">thumb_up</span>
                    <h2>Customer Satisfaction</h2>
                    <p>We prioritize customer satisfaction with a hassle-free shopping experience and quality products.</p>
                </div>
            </div>

            <div className="category" ref={catog} style={{marginTop:"0"}}>
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
                            <div key={category.id} className="card " onClick={() => clickCat(category.id)}>
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