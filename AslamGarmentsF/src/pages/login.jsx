import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import '../css/login.css';
import '../css/mobile.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BaseContext } from "../BaseContext";

const Login = () => {
    const navigate = useNavigate();
    const { BaseUrl } = useContext(BaseContext)
    const [error, setError] = useState('');
    const [nameerror, setNameError] = useState('');
    const [passerror, setPassError] = useState('');
    const [emailerror, setEmailError] = useState('');
    const location = useLocation();

    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (location.hash === '#signup') {
            setIsLogin(false)
        }
    }, [location])

    function isNotValidPass(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        else if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter.";
        }
        else if (!hasLowerCase) {
            return "Password must contain at least one lowercase letter.";
        }
        else if (!hasDigit) {
            return "Password must contain at least one digit.";
        }
        else if (!hasSpecialChar) {
            return "Password must contain at least one special character.";
        }
        return false;
    }

    const signup = async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const confirmpass = document.getElementById('confirmpass').value;
        document.querySelector('.error').style.opacity = '0';
        document.querySelector('.nameError').style.opacity = '0';
        document.querySelector('.mailError').style.opacity = '0';

        if (username === "") {
            document.querySelector('.nameError').style.opacity = '1';
            setNameError("Username is Required");
            return;
        }
        if (email === "") {
            document.querySelector('.mailError').style.opacity = '1';
            setEmailError("Email is Required");
            return;
        }
        if (password === "") {
            document.querySelector('.error').style.opacity = '1';
            setError("Password is Required");
            return;
        }
        if (confirmpass === "") {
            document.querySelector('.error').style.opacity = '1';
            setError("Confirm Password is Required");
            return;
        }

        if (confirmpass === password) {
            if (isNotValidPass(password)) {
                document.querySelector('.error').style.opacity = '1';
                setError(isNotValidPass(password));
            }
            else {
                try {
                    const response = await axios.post(`${BaseUrl}signup/`, {
                        username: username,
                        password: password,
                        email: email,
                        phone: phone

                    });
                    if (response.data['message'] === 'User Created Successfully') {
                        localStorage.setItem('token', response.data['token']);
                        navigate("/personalForm");
                    }
                    else {
                        console.log(response.data)
                        document.querySelector('.error').style.opacity = '1';
                        if (response.data['username']) {
                            document.querySelector('.nameError').style.opacity = '1';
                            setNameError(response.data['username']);
                        }
                        else if (response.data['email']) {
                            document.querySelector('.mailError').style.opacity = '1';
                            setEmailError(response.data['email']);
                        }
                        else if (response.data['message']) {
                            document.querySelector('.error').style.opacity = '1';
                            setError(response.data['message'])
                        }
                    }
                }
                catch (error) {
                    console.log("Catch Error Message")
                    document.querySelector('.error').style.opacity = '1';
                    setError(error);
                    console.log(error);
                }
            }
        }
        else {
            document.querySelector('.error').style.opacity = '1';
            setError('Password Not Match');
        }

    }

    const login = async () => {

        document.querySelector('.error').style.opacity = '0';
        document.querySelector('.nameError').style.opacity = '0';
        document.querySelector('.mailError').style.opacity = '0';

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === "") {
            document.querySelector('.nameError').style.opacity = '1';
            setNameError("Username is Required");
            return;
        }
        if (password === "") {
            document.querySelector('.mailError').style.opacity = '1';
            setPassError("Password is Required");
            return;
        }

        console.log(BaseUrl);
        try {
            const response = await axios.post(`${BaseUrl}login/`, {
                username: username,
                password: password
            });
            if (response.data['token']) {
                localStorage.setItem('token', response.data['token']);
                navigate(-1);
            }
            else {
                document.querySelector('.error').style.display = 'block';
                setError(response.data['non_field_errors']);
                console.log("Error Message")
                console.log(response.data['non_field_errors']);
            }
        }
        catch (error) {
            console.log("Catch Error Message")
            document.querySelector('.error').style.opacity = '1';
            setError("Invalid Username or Password");
            console.log(error);
        }
    }

    const handleSignUpClick = (event) => {
        event.preventDefault(); // Prevent the default navigation immediately
        document.querySelector('.error').style.opacity = '0';
        document.querySelector('.nameError').style.opacity = '0';
        document.querySelector('.mailError').style.opacity = '0';
        setIsLogin(false)
        const card = document.querySelector('.card');
        const btn = document.getElementById('btn');
        btn.style.animation = '1s twist ease-in-out'
        card.style.animation = '1s twist ease-in-out'
    };

    const handleLoginClick = (event) => {
        event.preventDefault(); // Prevent the default navigation immediately
        document.querySelector('.error').style.opacity = '0';
        document.querySelector('.nameError').style.opacity = '0';
        document.querySelector('.mailError').style.opacity = '0';
        setIsLogin(true)
        const card = document.querySelector('.card');
        const btn = document.getElementById('btn');
        btn.style.animation = '1s twist-back ease-in-out'
        card.style.animation = '1s twist-back ease-in-out'
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Prevent the default action (form submission)
            if (isLogin) {
                login();
            } else {
                signup();
            }
        }
    };

    return (
        <>
            <div className="bdy">

                <div className="container">

                    <div className="lftimgg">
                        <h1>Aslam Garments</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque culpa modi id eum qui sapiente fugit quo eius vel dolore, eveniet optio tempora temporibus magni dolores totam tenetur rerum aperiam.</p>
                    </div>

                    {isLogin ? (
                        <div className="login ">
                            <h1>Good to See You Again!</h1>
                            <p>Log In to Continue Shopping Your Favorite Trends.</p>
                            <div className="card">
                                <div className="error">
                                    <p>{error}</p>
                                </div>
                                <div className="ina">
                                    <input type="text" id="username" required onKeyDown={handleKeyPress} placeholder="Username/E-mail/Phone-no" />
                                    <label htmlFor="username">Username</label>
                                    <div className="nameError">
                                        <p>{nameerror}</p>
                                    </div>
                                </div>
                                <div className="ina">
                                    <input type="password" id="password" required onKeyDown={handleKeyPress} placeholder="Your Password" />
                                    <label htmlFor="password">Password</label>
                                    <div className="mailError">
                                        <p>{passerror}</p>
                                    </div>
                                </div>
                                <button onClick={login} id="btn">Login</button>
                            </div>
                            <p>If you Dont have an account please <Link to='/signup' onClick={handleSignUpClick}> Sign-Up</Link>!</p>
                        </div>
                    ) : (
                        <div className="login ">
                            <h1>Discover Your Next Look</h1>
                            <p>Join Now and Get Exclusive Access to Fashion Deals and Insights.</p>
                            <div className="card" style={{ height: '80%', marginTop: '5%' }}>
                                <div className="error">
                                    <p>{error}</p>
                                </div>
                                <div className="ina ">
                                    <input type="text" id="username" required onKeyDown={handleKeyPress} placeholder="Username" />
                                    <label htmlFor="username">Username</label>
                                    <div className="nameError">
                                        <p>{nameerror}</p>
                                    </div>
                                </div>
                                <div className="ina">
                                    <input type="text" id="phone" required onKeyDown={handleKeyPress} placeholder="+91 000 000 0000" />
                                    <label htmlFor="phone">Phone Number</label>
                                </div>
                                <div className="ina ">
                                    <input type="email" id="email" required onKeyDown={handleKeyPress} placeholder="address@domain.com" />
                                    <label htmlFor="email">Email</label>
                                    <div className="mailError">
                                        <p>{emailerror}</p>
                                    </div>
                                </div>
                                <div className="ina">
                                    <input type="password" id="password" required onKeyDown={handleKeyPress} placeholder="Password" />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className="ina">
                                    <input type="password" id="confirmpass" required onKeyDown={handleKeyPress} placeholder="Comfirm Password" />
                                    <label htmlFor="confirmpass">Confirm Password</label>
                                </div>
                                <button onClick={signup} id="btn">Sign-Up</button>
                            </div>
                            <p>If you'r Already a user, please <Link to='/login' onClick={handleLoginClick}> Login</Link> with your credentials</p>
                        </div>
                    )}


                </div>
            </div>
        </>
    );
};

export default Login;