import React, { useContext, useEffect, useState } from "react";
import '../css/style.css';
import '../css/google.css';
import '../css/decoration.css';
import '../css/external.css';
import { Link, useNavigate } from "react-router-dom";
import { BaseContext } from "../BaseContext";
import axios from "axios";

const Navbar = (page) => {
    const navigate = useNavigate();
    const { BaseUrl } = useContext(BaseContext);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(`${BaseUrl}checkAuth/`, {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    });
                    console.log(response.data);
                    if (response.data['message'] === "Authenticated") {
                        setLogin(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        checkAuth();
    }, [BaseUrl])

    return (
        <div className="navbar">
            <h1 className="lugrasimo-regular" onClick={() => navigate('/')}>Aslam Garments<b>.</b></h1>
            <ul>
                <li><Link to="/" className={page.page === "home" ? "active" : ""}>Home</Link></li>
                <li><Link to="/shop" className={page.page === "shop" ? "active" : ""}>Shop</Link></li>
                <li><Link to="/about" className={page.page === "about" ? "active" : ""}>About Us</Link></li>
                <li><Link to="/service" className={page.page === "service" ? "active" : ""}>Services</Link></li>
                <li><Link to="/contact" className={page.page === "contact" ? "active" : ""}>Contact Us</Link></li>
                {
                    login ? (
                        <>
                            <li ><span class="material-symbols-outlined " data-tooltip="Profile">person</span></li>
                            <li ><span class="material-symbols-outlined " data-tooltip="Cart">shopping_cart</span></li>
                            <li><span class="material-symbols-outlined" data-tooltip="Log-out">logout</span></li>
                        </>
                    ) : (
                        <>
                            <li><button onClick={() => navigate('/login')}>Login</button></li>
                            <li><button onClick={() => navigate('/signup')}>Sign-Up</button></li>
                        </>
                    )
                }

            </ul>
        </div>
    )
}

export default Navbar;