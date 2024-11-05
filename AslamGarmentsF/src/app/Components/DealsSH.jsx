import DealCard from "./DealCard";
import deal1 from "../assets/img/deals-1.jpg";
import deal2 from "../assets/img/deals-2.png";

export default function DealSection() {
    const deals = [
        {
            head: "Deal of The Day",
            description: "Summer Collection New Modern Design",
            oldPrice: 160.99,
            newPrice: 139.00,
            timeEnds: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), 
            img: deal1,
        },
        {
            head: "Exclusive Offer",
            description: "Winter Collection Elegant Style",
            oldPrice: 180.99,
            newPrice: 159.00,
            timeEnds: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 
            img: deal2,
        },
    ];

    return (
        <section className="deals section">
            <div className="deals__container container grid">
                {deals.map((deal, index) => (
                    <DealCard key={index} deal={deal} />
                ))}
            </div>
        </section>
    );
}
