import React, { useState } from 'react';
import '../css/style.css';
import '../css/google.css';
import '../css/decoration.css';
import '../css/external.css';
import '../css/profile.css';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

const UserProfile = () => {

    const [edit, setEdit] = useState(false);

    const [view, setView] = useState('order');

    const [user, setUser] = useState({
        name: 'Natesan K',
        email: 'titan@gmail.com',
        username: 'TitanNatesan',
        phone: '9876543210',
        doorNo: '123',
        street: 'abc',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001',
        country: 'India',
        landmark: 'Near Bus Stand',
        profilePic: 'https://www.w3schools.com/howto/img_avatar.png',
    });

    const update = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    };

    return (
        <div>
            <Navbar page='profile' />

            <div className="profile">
                <img src={user.profilePic} alt="profile-pic" />
                <p><strong>Name</strong>{user.name}</p>
                <p><strong>UserID</strong>{user.username}</p>
                <p><strong>Email</strong>{user.email}</p>
                <p><strong>Phone</strong>{user.phone}</p>
            </div>

            <div className="profileEdit">
                <nav>
                    <ul>
                        <li onClick={() => setView("personal")} className={view === "personal" ? "active" : ''}><Link to="#">Personal</Link></li>
                        <li onClick={() => setView("cart")} className={view === "cart" ? "active" : ''}><Link to="#">Cart</Link></li>
                        <li onClick={() => setView("order")} className={view === "order" ? "active" : ''}><Link to="#">Orders</Link></li>
                        <li onClick={() => setView("preorder")} className={view === "preorder" ? "active" : ''}><Link to="#">Previous Orders</Link></li>
                    </ul>
                </nav>
                {
                    view === "personal" &&
                    <div className="editarea">
                        <h1>Personal Information</h1>
                        <label htmlFor="name">
                            {edit ? (<input type="text" id='name' value={user.name} onChange={update} placeholder='' />)
                                : (<input type="text" id='name' value={user.name} onChange={update} placeholder='' readOnly disabled />)}
                            <p>Name</p>
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
                        {view === "personal" && <button className="button" onClick={() => setEdit(true)}>{edit ? "Save" : "Edit"}</button>}
                    </div>
                }
                {
                    view === "cart" &&
                    <div className="editarea">
                        <h1>Cart</h1>
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
                                    <span class="material-symbols-outlined">delete</span>
                                </div>
                            </div>
                        </div>

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
                                    <span class="material-symbols-outlined">delete</span>
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
