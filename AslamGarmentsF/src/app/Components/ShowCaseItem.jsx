import Image from "next/image";


export default function ShowCaseItem({item}) {
    return (
        <div className="showcase__item">
            <a href="details.html" className="showcase__img-box">
                <Image
                    src={item.img}
                    alt=""
                    className="showcase__img"
                />
            </a>
            <div className="showcase__content">
                <a href="details.html">
                    <h4 className="showcase__title">
                        {item.name}
                    </h4>
                </a>
                <div className="showcase__price flex">
                    <span className="new__price">${item.oldPrice}</span>
                    <span className="old__price">${item.newPrice}</span>
                </div>
            </div>
        </div>
    )
}