import React from "react";
import "../css/contact.css";

const ContactItem = ({ phone, email, location }) => {
    return (
        <div className="contactItem">
            <div className="cont">
                <span class="material-symbols-outlined">call</span>
                <i>{phone}</i>
            </div>
            <div className="cont">
                <span class="material-symbols-outlined">alternate_email</span>
                <i>{email}</i>
            </div>
            <div className="cont">
                <span class="material-symbols-outlined">my_location</span>
                <i>{location}</i>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d399.2913142127677!2d77.36081756759216!3d11.072953870208114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1726308280885!5m2!1sen!2sin"
                allowfullscreen="no"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    )
}

export default ContactItem;