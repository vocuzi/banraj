import React, { useContext, useEffect, useState } from 'react';
import '../css/style.css';
import '../css/google.css';
import '../css/decoration.css';
import '../css/external.css';
import '../css/profile.css';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BaseContext } from '../BaseContext';
import Footer from '../components/footer';

const UserProfile = () => {

    const [edit, setEdit] = useState(false);
    const { BaseUrl } = useContext(BaseContext)
    const [pp, setPP] = useState('https://www.w3schools.com/howto/img_avatar.png');
    const [message, setMessage] = useState("");
    const [view, setView] = useState('personal');
    const [changes, setChanges] = useState(false)

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: '',
        username: '',
        phone: '',
        doorNo: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        landmark: '',
        profilePic: 'https://www.w3schools.com/howto/img_avatar.png',
    });

    const update = (e) => {
        setChanges(true)
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    };

    const handleFileChange = (e) => {
        setChanges(true)
        const file = e.target.files[0];
        setUser((prevUser) => ({
            ...prevUser,
            profilePic: file,
        }));
        setPP(URL.createObjectURL(file));
    };

    const personalButton = async () => {
        setEdit(!edit);
        if (edit && changes) {
            const formData = new FormData();
            formData.append('firstname', user.firstname);
            formData.append('lastname', user.lastname);
            formData.append('email', user.email);
            formData.append('username', user.username);
            formData.append('phone', user.phone);
            formData.append('doorNo', user.doorNo);
            formData.append('street', user.street);
            formData.append('city', user.city);
            formData.append('state', user.state);
            formData.append('pincode', user.pincode);
            formData.append('country', user.country);
            formData.append('landmark', user.landmark);
            if (user.profilePic instanceof File) {
                formData.append('profilePic', user.profilePic);
            }
            const response = await axios.post(`${BaseUrl}profile/`, formData, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            var pop = document.getElementById("popup");
            pop.style.display = "flex"
            pop.style.opacity = 1;
            if (response.data['message'] === "Success") {
                setChanges(false)
                setMessage("Profile Updated Successfully")
            }
            else if (response.data['message']) {
                setMessage(response.data['message'])
                setEdit(true);
            }
        }
    }

    const getOrders = () => {
        axios.get(`${BaseUrl}getOrder/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`${BaseUrl}profile/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            response.data['profilePic'] = `${BaseUrl.slice(0, -1)}${response.data['profilePic']}`;
            console.log(response.data)
            setPP(response.data['profilePic'])
            setUser(response.data)
        }
        getUser();
    }, [])


    return (
        <div className='tgb'>
            <Navbar page='profile' />

            <div id='popup' className="pop-up" onClick={() => (document.getElementById("popup").style.opacity = 0, document.getElementById('popup').style.display = "none")}>
                <div className="message">
                    <h1>{message}</h1>
                </div>
            </div>

            <div className="profile ">
                {edit ?
                    <div className="inp">
                        <span className="material-symbols-outlined">edit</span>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div> :
                    ""
                }
                <img src={pp} alt="profile-pic" />
                <p><strong>Name</strong>{user.firstname + " " + user.lastname}</p>
                <p><strong>UserID</strong>{user.username}</p>
                <p><strong>Email</strong>{user.email}</p>
                <p><strong>Phone</strong>{user.phone}</p>
            </div>

            <div className="profileEdit">
                <nav>
                    <ul>
                        <li onClick={() => setView("personal")} className={view === "personal" ? "active" : ''}><Link to="#">Personal</Link></li>
                        <li onClick={() => (setView("order"),getOrders())} className={view === "order" ? "active" : ''}><Link to="#">Orders</Link></li>
                        <li onClick={() => setView("preorder")} className={view === "preorder" ? "active" : ''}><Link to="#">Previous Orders</Link></li>
                    </ul>
                </nav>

                {
                    view === "personal" &&
                    <div className="editarea ">
                        <h1>Personal Information</h1>
                        <label htmlFor="firstname">
                            {edit ? (<input type="text" id='firstname' value={user.firstname} onChange={update} placeholder='' />)
                                : (<input type="text" id='firstname' value={user.firstname} onChange={update} placeholder='' readOnly disabled />)}
                            <p>First Name</p>
                        </label>
                        <label htmlFor="lastname">
                            {edit ? (<input type="text" id='lastname' value={user.lastname} onChange={update} placeholder='' />)
                                : (<input type="text" id='lastname' value={user.lastname} onChange={update} placeholder='' readOnly disabled />)}
                            <p>Last Name</p>
                        </label>
                        <label htmlFor="email">
                            {edit ? (<input type="email" id='email' value={user.email} onChange={update} placeholder='' />)
                                : (<input type="email" id='email' value={user.email} onChange={update} placeholder='' readOnly disabled />)}
                            <p>Email</p>
                        </label>
                        <label htmlFor="phone">
                            {edit ? (<input type="text" id='phone' value={user.phone} onChange={update} placeholder='' />)
                                : (<input type="text" id='phone' value={user.phone} onChange={update} placeholder='' readOnly disabled />)}
                            <p>Phone</p>
                        </label>
                        {/* <label htmlFor="profilePic">
                            <input type="file" id='profilePic' onChange={handleFileChange} style={{ display: edit ? 'block' : 'none' }} />
                            <p>Profile Picture</p>
                        </label> */}
                        <h1>Address Details</h1>
                        <label htmlFor="doorNo">
                            {edit ? (<input type="text" id='doorNo' value={user.doorNo} onChange={update} placeholder='' />)
                                : (<input type="text" id='doorNo' value={user.doorNo} onChange={update} placeholder='' readOnly disabled />)}
                            <p>Door no.</p>
                        </label>
                        <label htmlFor="street">
                            {edit ? (<input type="text" id='street' value={user.street} onChange={update} placeholder='' />)
                                : (<input type="text" id='street' value={user.street} onChange={update} placeholder='' readOnly disabled />)}
                            <p>Street</p>
                        </label>
                        <label htmlFor="city">
                            {edit ? (<input type="text" id='city' value={user.city} onChange={update} placeholder='' />)
                                : (<input type="text" id='city' value={user.city} onChange={update} placeholder='' readOnly disabled />)}
                            <p>City</p>
                        </label>
                        <label htmlFor="state">
                            {edit ? (<input type="text" id='state' value={user.state} onChange={update} placeholder='' />)
                                : (<input type="text" id='state' value={user.state} onChange={update} placeholder='' readOnly disabled />)}
                            <p>State</p>
                        </label>
                        <label htmlFor="pincode">
                            {edit ? (<input type="text" id='pincode' value={user.pincode} onChange={update} placeholder='' />)
                                : (<input type="text" id='pincode' value={user.pincode} onChange={update} placeholder='' readOnly disabled />)}
                            <p>Pincode</p>
                        </label>
                        <label htmlFor="country">
                            {edit ? (<input type="text" id='country' value={user.country} onChange={update} placeholder='' />)
                                : (<input type="text" id='country' value={user.country} onChange={update} placeholder='' readOnly disabled />)}
                            <p>Country</p>
                        </label>
                        <label htmlFor="landmark">
                            {edit ? (<input type="text" id='landmark' value={user.landmark} onChange={update} placeholder='' />)
                                : (<input type="text" id='landmark' value={user.landmark} onChange={update} placeholder='' readOnly disabled />)}
                            <p>Landmark</p>
                        </label>
                        {view === "personal" && <button className="button" onClick={personalButton}>{edit ? "Save" : "Edit"}</button>}
                    </div>
                }
                {
                    view === "order" &&
                    <div className="editarea">
                        <h1>Orders</h1>
                        <div className="cont b">
                            <div className="product">
                                <h3>Image</h3>
                                <div className="details">
                                    <h3>Name</h3>
                                    <h3>Price</h3>
                                    <h3>Quantity</h3>
                                    <h3>Total</h3>
                                    <h3>Remove</h3>
                                </div>
                            </div>
                            <div className="product">
                                <img src="https://source.unsplash.com/random/?book" alt="jeans" />
                                <div className="details">
                                    <p>Denim Jeans</p>
                                    <p>490</p>
                                    <p>3</p>
                                    <p>$25</p>
                                    <span className="material-symbols-outlined">delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    view === "preorder" &&
                    <div className="editarea">
                        <h1>Previous Orders</h1>
                        <p className='notFound'>No previous orders</p>
                    </div>
                }

            </div>
        </div>
    );
};

export default UserProfile;
