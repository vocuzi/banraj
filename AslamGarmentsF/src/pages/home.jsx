import React, { useRef, useEffect } from "react";
import '../css/style.css';
import '../css/google.css';
import '../css/decoration.css';
import '../css/external.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import model from '../images/model.png';
import cross from '../images/cross.svg';
import smallboy from '../images/small-boy.png';
import aboutUS from '../images/FinishingAreanew1.jpg';
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Home = () => {

    const navigate = useNavigate();

    const catog = useRef(null);

    const location = useLocation();

    useEffect(() => {
        const hash = location.hash;
        if (hash === "#category") {
            catog.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);

    const categories = [
        {
            id: 1,
            name: 'Kids Wear',
            img: smallboy
        },
        {
            id: 2,
            name: 'Mens Wear',
            img: smallboy
        },
        {
            id: 3,
            name: 'Womens Wear',
            img: smallboy
        }
    ]

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

            <div className="category" ref={catog}>
                <div className="txt">
                    <h1>Our Products</h1>
                    <p>
                        We offer a wide range of garments for all age ranged people. Our all
                        collections are for kids, teens and adults.
                    </p>
                    <button onClick={() => catog.current.scrollIntoView({ behavior: "smooth" })}>Explore</button>
                </div>
                {
                    categories.map((category) => (
                        <div key={category.id} className="card">
                            <Link to="/" className="product-item">
                                <img src={category.img} className="img-fluid product-thumbnail" alt={category.name} />
                                <h3 className="product-title">{category.name}</h3>

                                <span className="icon-cross">
                                    <img src={cross} className="img-fluid" alt="Cross" />
                                </span>
                            </Link>
                        </div>
                    ))
                }

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
