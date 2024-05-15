import React, { useContext, useState } from "react";
import axios from "axios";
import '../css/login.css';
import { Link, useNavigate } from "react-router-dom";
import { BaseContext } from "../BaseContext";

const Signup = () => {
    const navigate = useNavigate();
    const { BaseUrl } = useContext(BaseContext)
    const [error, setError] = useState('');
    const [nameerror, setNameError] = useState('');
    const [emailerror, setEmailError] = useState('');

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
                        email: email
                    });
                    if (response.data['message'] === 'User Created Successfully') {
                        localStorage.setItem('token', response.data['token']);
                        navigate('/');
                    }
                    else {
                        console.log(response.data)
                        document.querySelector('.error').style.opacity = '1';
                        if (response.data['username']){
                            document.querySelector('.nameError').style.opacity = '1';
                            setNameError(response.data['username']);
                        }
                        else if (response.data['email']){
                            document.querySelector('.mailError').style.opacity = '1';
                            setEmailError(response.data['email']);
                        }   
                        else if (response.data['message']){
                            document.querySelector('.mailError').style.opacity = '1';
                            setEmailError(response.data['message'])
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

    return (
        <>
            <body className="bdy">

                <div className="container">

                    <div className="lftimgg ">
                        <h1>Aslam Garments</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque culpa modi id eum qui sapiente fugit quo eius vel dolore, eveniet optio tempora temporibus magni dolores totam tenetur rerum aperiam.</p>
                    </div>
                    <div className="login ">
                        <h1>Discover Your Next Look</h1>
                        <p>Join Now and Get Exclusive Access to Fashion Deals and Insights.</p>
                        <div className="card" style={{ height: '80%', marginTop: '5%' }}>
                            <div className="error">
                                <p>{error}</p>
                            </div>
                            <div className="ina">
                                <input type="text" id="username" required />
                                <label htmlFor="username">Username</label>
                                <div className="nameError">
                                    <p>{nameerror}</p>
                                </div>
                            </div>
                            <div className="ina">
                                <input type="email" id="email" required />
                                <label htmlFor="email">Email</label>
                                <div className="mailError">
                                    <p>{emailerror}</p>   
                                </div>
                            </div>
                            <div className="ina">
                                <input type="password" id="password" required />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="ina">
                                <input type="password" id="confirmpass" required />
                                <label htmlFor="confirmpass">Re-Enter Password</label>
                            </div>
                            <button onClick={signup}>Sign-Up</button>
                        </div>
                        <p>If you'r Already a user, please <Link to='/login'> Login</Link> with your credentials</p>
                    </div>
                </div>
            </body>
        </>
    );
};

export default Signup;