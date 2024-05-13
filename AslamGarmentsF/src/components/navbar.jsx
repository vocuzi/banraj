import React from "react";
import '../css/style.css';
import '../css/google.css';
import '../css/decoration.css';
import '../css/external.css';
import { Link, useNavigate } from "react-router-dom";

const Navbar = (page) => {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <h1 className="lugrasimo-regular" onClick={()=>navigate('/')}>Aslam Garments<b>.</b></h1>
            <ul>
                <li><Link to="/" className={page.page === "home" ? "active" : ""}>Home</Link></li>
                <li><Link to="/shop" className={page.page === "shop" ? "active" : ""}>Shop</Link></li>
                <li><Link to="/about" className={page.page === "about" ? "active" : ""}>About Us</Link></li>
                <li><Link to="/service" className={page.page === "service" ? "active" : ""}>Services</Link></li>
                <li><Link to="/contact" className={page.page === "contact" ? "active" : ""}>Contact Us</Link></li>
                <li ><span class="material-symbols-outlined ">person</span></li>
                <li ><span class="material-symbols-outlined ">shopping_cart</span></li>
            </ul>
        </div>
    ) 
}

export default Navbar;