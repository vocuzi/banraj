import React, { useContext, useState } from "react";
import axios from "axios";
import '../css/login.css';
import { Link, useNavigate } from "react-router-dom";
import { BaseContext } from "../BaseContext";

const Login = () => {
    const navigate = useNavigate();
    const { BaseUrl } = useContext(BaseContext)
    const [error, setError] = useState('');
    const [nameerror, setNameError] = useState('');
    const [passerror, setPassError] = useState('');

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
                navigate('/');
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

    return (
        <>
            <body className="bdy">

                <div className="container">

                    <div className="lftimgg">
                        <h1>Aslam Garments</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque culpa modi id eum qui sapiente fugit quo eius vel dolore, eveniet optio tempora temporibus magni dolores totam tenetur rerum aperiam.</p>
                    </div>
                    <div className="login ">
                        <h1>Good to See You Again!</h1>
                        <h4>Log In to Continue Shopping Your Favorite Trends.</h4>
                        <div className="card">
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
                                <input type="password" id="password" required />
                                <label htmlFor="password">Password</label>
                                <div className="mailError">
                                    <p>{passerror}</p>
                                </div>
                            </div>
                            <button onClick={login}>Login</button>
                        </div>
                        <p>If you Dont have an account please <Link to='/signup'> Sign-Up</Link>!</p>
                    </div>
                </div>
            </body>
        </>
    );
};

export default Login;