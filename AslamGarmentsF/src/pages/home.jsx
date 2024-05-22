import React, { useRef, useEffect, useContext, useState } from "react";
import '../css/style.css';
import '../css/google.css';
import '../css/decoration.css';
import '../css/external.css';
import { useNavigate, useLocation } from "react-router-dom";
import model from '../images/model.png';
import cross from '../images/cross.svg';
import aboutUS from '../images/FinishingAreanew1.jpg';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { BaseContext } from "../BaseContext";

const Home = () => {

    const navigate = useNavigate();
    const catog = useRef(null);
    const location = useLocation();
    const { BaseUrl } = useContext(BaseContext);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const hash = location.hash;
        if (hash === "#category") {
            catog.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);

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

                <Navbar page={"home"} />

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

            <div className="category " ref={catog} style={{marginTop:"5%"}}>
                <h1>Categories</h1>
                <div className="txt ">
                    <h1>Our Products</h1>
                    <p>
                        We offer a wide range of garments for all age ranged people. Our all
                        collections are for kids, teens and adults.
                    </p>
                    <button onClick={() => catog.current.scrollIntoView({ behavior: "smooth" })}>Explore</button>
                </div>
                <div className="cont ">
                    {
                        categories.map((category) => (
                            <div key={category.id} className="card " onClick={()=>clickCat(category.id)}>
                                    <img src={`${BaseUrl.slice(0, -1)}${category.image}`} alt={category.name} />
                                    <h3>{category.name}</h3>
                                    <div className="cross">
                                        <img src={cross} alt="Cross" />
                                    </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="aboutUS">
                <div className="lftimg">
                    <img src={aboutUS} alt="AboutUsImage" />
                </div>
                <div className="txt">
                    <h1>About Us</h1>
                    <p>
                        Aslam Garments is a leading manufacturer of garments in Tamil Nadu. We
                        have been in the business for over 20 years and have built a
                        reputation for quality and reliability. Our products are made from the
                        finest materials and are designed to last. We offer a wide range of
                        garments for all age ranged people.
                    </p>
                    <button onClick={() => navigate('/about')}>Read More</button>
                </div>

                <div id="carousel" className="snap">
                    <div id="carousel-1" className="cours"></div>
                    <div id="carousel-2" className="cours"></div>
                    <div id="carousel-3" className="cours"></div>
                    <div id="carousel-4" className="cours"></div>
                </div>
            </div>
            <Footer />
        </body>
    );
}

export default Home;
