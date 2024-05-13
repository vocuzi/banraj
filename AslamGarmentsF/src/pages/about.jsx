import React from "react";
import aboutUS from '../images/FinishingAreanew1.jpg';
import model from '../images/model.png';
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();
    return (
        <body>
            <div class="header">
                <Navbar page={"about"} />
                <div class="content">
                    <div class="lfttxt">

                        <h1 className="saira-condensed-bold">About Us</h1>
                        <p className="saira-condensed-regular">
                            Aslam Garments is a leading manufacturer of garments in Tamil Nadu.
                            We have been in the business for over 20 years and have built a
                            reputation for quality and reliability. Our products are made from
                            the finest materials and are designed to last. We offer a wide range
                            of garments for all age ranged people.
                        </p>
                        <button onClick={() => navigate('/shop/')}>View Products</button>
                        <button onClick={() => navigate('/#category')}>Category</button>
                    </div>
                    <img src={model} alt="Model Images" />
                </div>
            </div>

            <div className="aboutUS" style={{marginTop:'5%'}}>
                <div className="lftimg">
                    <img src={aboutUS} alt="AboutUsImage" />
                </div>
                <div className="txt">
                    <h1>About Us</h1>
                    <p>
                        Aslam Garments is a leading manufacturer of garments in Tamil Nadu. We
                        have been in the business for over 20 years and have built a
                        reputation for quality and reliability. Our products are made from the
                        finest materials and are designed to last. We offer a wide range of
                        garments for all age ranged people.
                    </p>
                </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fugiat error inventore exercitationem sit enim vitae, modi magni? Excepturi quisquam aut deserunt quia itaque? Eos consequatur molestiae facilis eum vel, vitae impedit quaerat temporibus aliquam architecto deserunt ipsum reprehenderit eveniet vero maiores ex recusandae magnam? Tenetur fugit dolorum repudiandae quidem? Incidunt, ut eveniet! Sit voluptatum inventore ad. Obcaecati natus officia eaque facere nostrum. Assumenda sint id laboriosam. Veritatis, laboriosam! Consectetur reprehenderit ipsa itaque eius libero fugiat suscipit fugit recusandae! Dolor, commodi. Nihil cupiditate necessitatibus nulla debitis minus nemo repellendus soluta id iste, libero ipsum, rerum aut, laboriosam voluptatem repudiandae blanditiis. Temporibus explicabo dolores hic optio itaque inventore quo et voluptatibus esse officiis nobis, ex pariatur saepe nisi! Voluptatum at nam mollitia, aliquid adipisci exercitationem quidem ut possimus eum. Rem qui quos corporis, ipsa necessitatibus cupiditate ad architecto corrupti impedit nisi incidunt ipsam facere molestias fugiat provident reprehenderit temporibus, beatae assumenda distinctio doloremque soluta ea autem? Animi aut enim laudantium expedita soluta corporis facilis, quae excepturi sunt quam. Ipsum soluta maxime, neque eum blanditiis provident, unde cum esse quasi perferendis, itaque cumque sint architecto excepturi debitis perspiciatis sed. Quo hic itaque officiis est quos dolor libero quod fuga id, aliquid at</p>

                <div id="carousel" className="snap">
                    <div id="carousel-1" className="cours"></div>
                    <div id="carousel-2" className="cours"></div>
                    <div id="carousel-3" className="cours"></div>
                    <div id="carousel-4" className="cours"></div>
                </div>
            </div>

            <Footer />
        </body>

    )
}

export default About;