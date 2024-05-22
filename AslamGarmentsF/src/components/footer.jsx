import React, { useContext, useState } from "react";
import '../css/style.css';
import '../css/google.css';
import '../css/decoration.css';
import '../css/external.css';
import { Link } from "react-router-dom";
import whatsapp from '../images/whatsapp.png';
import facebook from '../images/facebook.png';
import twitter from '../images/twitter.png';
import instagram from '../images/instagram.png';
import axios from "axios";
import { BaseContext } from "../BaseContext";


const Footer = () => {

    const Icons = [
        { id: 1, icon: whatsapp },
        { id: 2, icon: facebook },
        { id: 3, icon: twitter },
        { id: 4, icon: instagram }
    ]

    const [error, setError] = useState('')
    const [isError, setIsError] = useState(true)

    const { BaseUrl } = useContext(BaseContext);

    const Subscribe = async () => {
        const email = document.getElementById("email").value;

        try {
            const response = await axios.post(`${BaseUrl}subscribe/`, {
                email: email
            })
            if (response.data['message']) {
                setIsError(false)
                setError(response.data['message']);
            }
            else if (response.data['email']) {
                setIsError(true)
                setError(response.data['email']);
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <footer>
            <div>
                <h1 className="lugrasimo-regular">Aslam Garments</h1>
                <p>
                    Aslam Garments is a leading manufacturer of garments in Tamil Nadu. We
                    have been in the business for over 20 years and have built a
                    reputation for quality and reliability. Our products are made from the
                    finest materials and are designed to last. We offer a wide range of
                    garments for all age ranged people.
                </p>
                {
                    Icons.map((icon) => (
                        <span key={icon.id}>
                            <img src={icon.icon} alt="Icon" />
                        </span>
                    ))
                }
            </div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/">Service</Link>
            </div>
            <div>
                <Link to="/">Contact Us</Link>
                <Link to="/">Jobs</Link>
            </div>
            <div>
                <h1>Subscribe</h1>
                <input type="email" placeholder="Enter your email" id="email"/>
                <button onClick={Subscribe}>Subscribe</button>
                {
                    isError ? (
                        <p style={{ fontSize: '1.2rem', textAlign: "center", color: 'red' }}>{error}</p>
                    ) : (
                        <p style={{ fontSize: '1.2rem', textAlign: "center", color: 'lightgreen' }}>{error}</p>
                    )
                }
            </div>
            <div className="cr">
                <hr />
                <p>Copyright &copy; 2024 All Rights Reserved - Designed and Developed By
                    <Link to={"https://titan-portfolio.netlify.app/"} target="blank"> Titan Natesan</Link> and Team</p>
            </div>
        </footer>
    );
}

export default Footer;