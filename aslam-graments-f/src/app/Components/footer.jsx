import Image from "next/image"
import logo from "../assets/img/logo2.png"
import facebook from "../assets/img/icon-facebook.svg"
import twitter from "../assets/img/icon-twitter.svg";
import instagram from "../assets/img/icon-instagram.svg";
import pintrest from "../assets/img/icon-pinterest.svg";
import youtube from "../assets/img/icon-youtube.svg";
import payMethod from "../assets/img/payment-method.png";

const FootBar = () => {
    const socialLinks = [
        { src: facebook, alt: "Facebook Logo" },
        { src: twitter, alt: "Twitter Logo" },
        { src: instagram, alt: "Instagram Logo" },
        { src: pintrest, alt: "Pintrest Logo" },
        { src: youtube, alt: "Youtube Logo" },
    ]
    return (
        <footer className="footer container">
            <div className="footer__container grid">
                <div className="footer__content">
                    <a href="index.html" className="footer__logo">
                        <Image src={logo} alt="" className="footer__logo-img" />
                    </a>
                    <h4 className="footer__subtitle">Contact</h4>
                    <p className="footer__description">
                        <span>Address:</span> 13 Tlemcen Road, Street 32, Beb-Wahren
                    </p>
                    <p className="footer__description">
                        <span>Phone:</span> +01 2222 365 /(+91) 01 2345 6789
                    </p>
                    <p className="footer__description">
                        <span>Hours:</span> 10:00 - 18:00, Mon - Sat
                    </p>
                    <div className="footer__social">
                        <h4 className="footer__subtitle">Follow Me</h4>
                        <div className="footer__links flex">
                            {socialLinks.map((link, index) => (
                                <a href="#" key={index}>
                                    <Image
                                        src={link.src}
                                        alt={link.alt}
                                        className="footer__social-icon"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="footer__content">
                    <h3 className="footer__title">Address</h3>
                    <ul className="footer__links">
                        <li><a href="#" className="footer__link">About Us</a></li>
                        <li><a href="#" className="footer__link">Delivery Information</a></li>
                        <li><a href="#" className="footer__link">Privacy Policy</a></li>
                        <li><a href="#" className="footer__link">Terms & Conditions</a></li>
                        <li><a href="#" className="footer__link">Contact Us</a></li>
                        <li><a href="#" className="footer__link">Support Center</a></li>
                    </ul>
                </div>
                <div className="footer__content">
                    <h3 className="footer__title">My Account</h3>
                    <ul className="footer__links">
                        <li><a href="#" className="footer__link">Sign In</a></li>
                        <li><a href="#" className="footer__link">View Cart</a></li>
                        <li><a href="#" className="footer__link">My Wishlist</a></li>
                        <li><a href="#" className="footer__link">Track My Order</a></li>
                        <li><a href="#" className="footer__link">Help</a></li>
                        <li><a href="#" className="footer__link">Order</a></li>
                    </ul>
                </div>
                <div className="footer__content">
                    <h3 className="footer__title">Secured Payed Gateways</h3>
                    <Image
                        src={payMethod}
                        alt=""
                        className="payment__img"
                    />
                </div>
            </div>
            <div className="footer__bottom">
                <p className="copyright">&copy; 2024 Titan Natesan. All right reserved</p>
                <span className="designer">Designer by Crypticalcoder</span>
            </div>
        </footer>
    )
}

export default FootBar;