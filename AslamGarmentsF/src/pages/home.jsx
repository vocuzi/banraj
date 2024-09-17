import React, { useRef, useEffect, useContext, useState } from "react";
import '../css/style.css';
import '../css/google.css';
import '../css/decoration.css';
import '../css/external.css';
import { useNavigate, useLocation } from "react-router-dom";
import cross from '../images/cross.svg';
import aboutUS from '../images/FinishingAreanew1.jpg';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { BaseContext } from "../BaseContext";
import AOS from "aos";
import "aos/dist/aos.css";
import child from '../images/FinishingAreanew1.jpg'
import child2 from '../images/PRODUCTION-CAPACITY.jpg'
import child3 from "../images/garment-job-work.jpg"



const Home = () => {

    const navigate = useNavigate();
    const catog = useRef(null);
    const location = useLocation();
    const { BaseUrl } = useContext(BaseContext);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    useEffect(() => {
        const hash = location.hash;
        if (hash === "#category") {
            catog.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);

    useEffect(() => {
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

    const [img , setImg] = useState(child)

    const images = [child,child2,child3]

    useEffect(() => {
        let i = 0;
        setInterval(() => {
            if (i === 3) {
                i = 0;
            }
            setImg(images[i])
            i++;
        },5000)
    }, []) 

    return (
        <div>
                <Navbar page={"home"} />
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

                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="0">R</span>
                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="100">E</span>
                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="200">N</span>
                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="300">Z</span>
                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="400"> </span>
                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="500">T</span>
                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="600">R</span>
                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="700">E</span>
                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="800">N</span>
                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="900">D</span>
                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="1000">I</span>
                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="1100">N</span>
                    <span data-aos="flip-left" data-aos-duration="500" data-aos-delay="1200">G</span>
                </div>
            </div>

            <div className="category " ref={catog} >
                <h1>Categories</h1>
                <div className="txt " data-aos="fade-up" data-aos-anchor-placement="top-center">
                    <h1>Our Products</h1>
                    <p>
                        We offer a wide range of garments for all age ranged people. Our all
                        collections are for kids, teens and adults.
                    </p>
                    <button onClick={() => catog.current.scrollIntoView({ behavior: "smooth" })}>Explore</button>
                </div>
                <div className="cont" >
                    {
                        categories.map((category,index) => (
                            <div key={category.id} className="card " onClick={() => clickCat(category.id)} data-aos-anchor-placement="center-bottom" data-aos="fade-up" data-aos-delay={`${(index+1)*200}`}>
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
                <div className="lftimg" data-aos="fade-up" data-aos-anchor-placement="top-center">
                    <img src={aboutUS} alt="AboutUsImage" />
                </div>
                <div className="txt" data-aos="fade-up" data-aos-anchor-placement="top-center">
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

                <div id="carousel" className="snap" data-aos="zoom-in" data-aos-anchor-placement="top-center">
                    <div id="carousel-1" className="cours"></div>
                    <div id="carousel-2" className="cours"></div>
                    <div id="carousel-3" className="cours"></div>
                    <div id="carousel-4" className="cours"></div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
