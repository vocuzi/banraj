import React from "react";
import "../css/contact.css";

const ContactCard = () =>{
    return(
        <form className="contactcard">
            <label htmlFor="name">
                <input type="text" id="name" name="name" placeholder="Your Name" />
                <p>Name</p>
                <span class="material-symbols-outlined">id_card</span>
            </label>
            <label htmlFor="email">
                <input type="email" id="email" name="email" placeholder="youremail@domain.any" />
                <p>Email</p>
                <span class="material-symbols-outlined">mail</span>
            </label>
            <label htmlFor="message">
                <textarea id="message" name="message" placeholder="Your Message"></textarea>
                <p>Message</p>
                <span class="material-symbols-outlined">chat</span>
            </label>
            <button type="submit"><p>Send</p><span class="material-symbols-outlined">send</span></button>
        </form>
    )
}

export default ContactCard;