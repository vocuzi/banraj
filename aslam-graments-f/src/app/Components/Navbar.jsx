"use client"

import React, { useState } from "react";
import Image from "next/image";
import logo from "../assets/img/logo.png";
import heart from "../assets/img/icon-heart.svg";
import cart from "../assets/img/icon-cart.svg";
import search from "../assets/img/search.png";
import burger from "../assets/img/menu-burger.svg";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Define your navigation items here
    const navItems = [
        { href: "index.html", label: "Home", isActive: true },
        { href: "shop.html", label: "Shop" },
        { href: "accounts.html", label: "My Account" },
        { href: "compare.html", label: "Compare" },
        { href: "login-register.html", label: "Login" },
    ];

    return (
        <header className="header">
            <div className="header__top">
                <div className="header__container container">
                    <div className="header__contact">
                        <span>(+01) - 2345 - 6789</span>
                        <span>Our location</span>
                    </div>
                    <p className="header__alert-news">
                        Super Values Deals - Save more coupons
                    </p>
                    <a href="login-register.html" className="header__top-action">
                        Log In / Sign Up
                    </a>
                </div>
            </div>

            <nav className="nav container">
                <a href="index.html" className="nav__logo">
                    <Image
                        className="nav__logo-img"
                        src={logo}
                        alt="website logo"
                    />
                </a>
                <div className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`} id="nav-menu">
                    <div className="nav__menu-top">
                        <a href="index.html" className="nav__menu-logo">
                            <Image src={logo} alt=""/>
                        </a>
                        <div className="nav__close" onClick={toggleMenu}>
                            <i className="fi fi-rs-cross-small"></i>
                        </div>
                    </div>
                    <ul className="nav__list">
                        {navItems.map((item, index) => (
                            <li className="nav__item" key={index}>
                                <a href={item.href} className={`nav__link ${item.isActive ? "active-link" : ""}`}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="header__search">
                        <input
                            type="text"
                            placeholder="Search For Items..."
                            className="form__input"
                        />
                        <button className="search__btn">
                            <Image src={search} alt="search icon" />
                        </button>
                    </div>
                </div>
                <div className="header__user-actions">
                    <a href="wishlist.html" className="header__action-btn" title="Wishlist">
                        <Image src={heart} alt="" />
                        <span className="count">3</span>
                    </a>
                    <a href="cart.html" className="header__action-btn" title="Cart">
                        <Image src={cart} alt="" />
                        <span className="count">3</span>
                    </a>
                    <div className="header__action-btn nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                        <Image src={burger} alt=""/>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
