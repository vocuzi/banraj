import Image from "next/image"

export default function ProductCard({ product }) {
    return (
        <div className="product__item">
            <div className="product__banner">
                <a href="details.html" className="product__images">
                    <Image
                        src={product.img1}
                        alt=""
                        className="product__img default"
                        priority={true}
                    />
                    <Image
                        src={product.img2}
                        alt=""
                        className="product__img hover"
                        loading="lazy"
                        priority={false}
                    />
                </a>
                <div className="product__actions">
                    <a href="#" className="action__btn" aria-label="Quick View">
                        <i className="fi fi-rs-eye"></i>
                    </a>
                    <a
                        href="#"
                        className="action__btn"
                        aria-label="Add to Wishlist"
                    >
                        <i className="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" className="action__btn" aria-label="Compare">
                        <i className="fi fi-rs-shuffle"></i>
                    </a>
                </div>
                <div className="product__badge light-pink">{product.badge}</div>
            </div>
            <div className="product__content">
                <span className="product__category">{product.category}</span>
                <a href="details.html">
                    <h3 className="product__title">{product.name}</h3>
                </a>
                <div className="product__rating">
                    {[...Array(product.rating)].map((_, i) => (
                        <i key={i} className="fi fi-rs-star"></i>
                    ))}
                </div>
                <div className="product__price flex">
                    <span className="new__price">${product.oldPrice}</span>
                    <span className="old__price">${product.newPrice}</span>
                </div>
                <a
                    href="#"
                    className="action__btn cart__btn"
                    aria-label="Add To Cart"
                >
                    <i className="fi fi-rs-shopping-bag-add"></i>
                </a>
            </div>
        </div>
    )
}