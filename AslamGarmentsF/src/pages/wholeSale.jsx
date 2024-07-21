import React from "react";
import '../css/style.css';
import '../css/google.css';
import '../css/decoration.css';
import '../css/ws.css';
import '../css/external.css';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import child from '../images/small-boy.png';
import { useNavigate } from "react-router-dom";

const WholeSale = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <main className="mai">
                <div className="wsproductcont">
                    <div className="productCard" onClick={() => navigate(`/`)}>
                        <img src={child} alt="Small Boy" />
                        <div className="prodet">
                            <h1 >Testing</h1>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci architecto sit accusantium ratione earum est eligendi autem quaerat amet labore magnam nam reprehenderit corporis dicta reiciendis deserunt, repudiandae, corrupti illo eos blanditiis modi consequuntur facere. Excepturi possimus ipsum aut reprehenderit. </p>
                            <p>₹280 <strong>₹300</strong></p>
                        </div>
                    </div>
                    <div className="productCard" onClick={() => navigate(`/`)}>
                        <img src={child} alt="Small Boy" />
                        <div className="prodet">
                            <h1 >Testing</h1>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci architecto sit accusantium ratione earum est eligendi autem quaerat amet labore magnam nam reprehenderit corporis dicta reiciendis deserunt, repudiandae, corrupti illo eos blanditiis modi consequuntur facere. Excepturi possimus ipsum aut reprehenderit. </p>
                            <p>₹280 <strong>₹300</strong></p>
                        </div>
                    </div>
                    <div className="productCard" onClick={() => navigate(`/`)}>
                        <img src={child} alt="Small Boy" />
                        <div className="prodet">
                            <h1 >Testing</h1>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci architecto sit accusantium ratione earum est eligendi autem quaerat amet labore magnam nam reprehenderit corporis dicta reiciendis deserunt, repudiandae, corrupti illo eos blanditiis modi consequuntur facere. Excepturi possimus ipsum aut reprehenderit. </p>
                            <p>₹280 <strong>₹300</strong></p>
                        </div>
                    </div>
                    <div className="productCard" onClick={() => navigate(`/`)}>
                        <img src={child} alt="Small Boy" />
                        <div className="prodet">
                            <h1 >Testing</h1>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci architecto sit accusantium ratione earum est eligendi autem quaerat amet labore magnam nam reprehenderit corporis dicta reiciendis deserunt, repudiandae, corrupti illo eos blanditiis modi consequuntur facere. Excepturi possimus ipsum aut reprehenderit. </p>
                            <p>₹280 <strong>₹300</strong></p>
                        </div>
                    </div>
                    <div className="productCard" onClick={() => navigate(`/`)}>
                        <img src={child} alt="Small Boy" />
                        <div className="prodet">
                            <h1 >Testing</h1>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci architecto sit accusantium ratione earum est eligendi autem quaerat amet labore magnam nam reprehenderit corporis dicta reiciendis deserunt, repudiandae, corrupti illo eos blanditiis modi consequuntur facere. Excepturi possimus ipsum aut reprehenderit. </p>
                            <p>₹280 <strong>₹300</strong></p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default WholeSale;