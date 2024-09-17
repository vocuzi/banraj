import React from "react";
import Navbar from "../components/navbar";
import ContactCard from "../components/contactCard";
import ContactItem from "../components/contactItem";
import Footer from "../components/footer";

const ContactPage = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Navbar page={"contact"} />
            <br /><br /><br /><br />
            <h1>Contact Us</h1>
            <ContactCard />
            <ContactItem phone={"+916380615171"} email={"titannatesan@gmail.com"} location={"inga dhan pakkathula"} />
            <br /><br />
            <Footer />
        </div>
    )
}

export default ContactPage;