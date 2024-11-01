import Image from "next/image";
import email from "../assets/img/icon-email.svg"

export default function NewsLetter () {
    return (
        <section className="newsletter section home__newsletter">
        <div className="newsletter__container container grid">
          <h3 className="newsletter__title flex">
            <Image
              src={email}
              alt=""
              className="newsletter__icon"
            />
            Sign in to Newsletter
          </h3>
          <p className="newsletter__description">
            ...and receive $25 coupon for first shopping.
          </p>
          <form action="" className="newsletter__form">
            <input
              type="text"
              placeholder="Enter Your Email"
              className="newsletter__input"
            />
            <button type="submit" className="newsletter__btn">Subscribe</button>
          </form>
        </div>
      </section>
    )
}