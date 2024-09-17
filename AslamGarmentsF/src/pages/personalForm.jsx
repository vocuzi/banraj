import React, { useContext, useRef, useState,useEffect } from "react";
import "../css/personalForm.css"
import axios from "axios";
import { BaseContext } from "../BaseContext";
import { useNavigate } from "react-router-dom";

const PersonalForm = () => {

	const { BaseUrl } = useContext(BaseContext);
	const [error, setError] = useState(null);
	const errorRef = useRef(null);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		doorNo: "",
		street: "",
		city: "",
		state: "Tamil Nadu",
		pincode: "",
		country: "India",
		landmark: ""
	});

	useEffect(() => {
		if (error && errorRef.current) {
		  errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	  }, [error]);

	  useEffect(()=>{
		if (localStorage.getItem('token') === null){
			window.location.href = "/login";
		}
	  })

	const [profilePic, setProfilePic] = useState(null);
	const [profilePicPreview, setProfilePicPreview] = useState(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setProfilePic(file);

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfilePicPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(null);
		if (!formData.firstname){
			setError("First Name is Required");return;
		} if (!formData.lastname){
			setError("Last Name is Required"); return;
		} if (!formData.doorNo){
			setError("Door no. is Required"); return;
		} if (!formData.street){
			setError("Street is Required");return;
		} if (!formData.city){
			setError("City is Required"); return;
		} if (!formData.state){
			setError("State is Required"); return;
		} if (!formData.pincode){
			setError("Pin Code is required"); return;
		} if (!formData.country){
			setError("Country Name is Required"); return;
		}

		// Create a FormData object
		const data = new FormData();
		data.append('firstname', formData.firstname);
		data.append('lastname', formData.lastname);
		data.append('doorNo', formData.doorNo);
		data.append('street', formData.street);
		data.append('city', formData.city);
		data.append('state', formData.state);
		data.append('pincode', formData.pincode);
		data.append('country', formData.country);
		data.append('landmark', formData.landmark);

		if (profilePic) {
			data.append('profilePic', profilePic);
		}

		axios.put(`${BaseUrl}profile/`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
				"Authorization": `Token ${localStorage.getItem('token')}`
			}
		})
			.then(res => {
				console.log(res.data);
				navigate(-2);
			})
			.catch(err => {
				console.log(err);
				setError("Error in submitting the form");
			});
	};


	return (
		<div className="pfbdy">
			<h1>Please Enter the Following details</h1>
			<div>
			{error && <p ref={errorRef}>{error}</p>}
				<form>
						<img src={profilePicPreview ? profilePicPreview : "https://dummyimage.com/512x512/ecffe8/70b363.png&text=Profile"} alt="Profile Preview" />
					<label htmlFor="profilePic" >
						<input type="file" id="profilePic" name="profilePic" onChange={handleFileChange} accept=".jpg, .png, .jpeg" />
						<div className="btnpp">{profilePicPreview ? "Change Profile Picture" : "Upload Profile Picture"}</div>
						{/* <span>Profile Picture</span> */}
					</label>
					<br />
					<label htmlFor="firstname">
						<input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />
						<span>First Name <i>*</i></span>
					</label>

					<br />
					<label htmlFor="lastname">
						<input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required />
						<span>Last Name <i>*</i></span>
					</label>
					<br />
					<label htmlFor="doorNo">
						<input type="text" id="doorNo" name="doorNo" value={formData.doorNo} onChange={handleChange} required />
						<span>Door No <i>*</i></span>
					</label>
					<br />
					<label htmlFor="street">
						<input type="text" id="street" name="street" value={formData.street} onChange={handleChange} required />
						<span>Street <i>*</i></span>
					</label>
					<br />
					<label htmlFor="city">
						<input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
						<span>City <i>*</i></span>
					</label>
					<br />
					<label htmlFor="state">
						<input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
						<span>State <i>*</i></span>
					</label>
					<br />
					<label htmlFor="pincode">
						<input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
						<span>Pincode <i>*</i></span>
					</label>
					<br />
					<label htmlFor="country">
						<input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
						<span>Country <i>*</i></span>
					</label>
					<br />
					<label htmlFor="landmark">
						<input type="text" id="landmark" name="landmark" value={formData.landmark} onChange={handleChange} required />
						<span>Landmark</span>
					</label>
					<br />
					{/* <button type="submit" onSubmit={handleSubmit}>Submit</button> */}
					<input type="submit" value="Submit" onClick={handleSubmit} />
				</form>
			</div>
		</div>
	);
}

export default PersonalForm;