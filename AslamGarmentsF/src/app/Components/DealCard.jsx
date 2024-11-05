import { useEffect, useState } from "react";
import Image from "next/image";

export default function DealCard({ deal }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const countdown = () => {
            const endDate = new Date(deal.timeEnds).getTime();
            const now = new Date().getTime();
            const distance = endDate - now;

            if (distance < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        const interval = setInterval(countdown, 1000);

        return () => clearInterval(interval);
    }, [deal.timeEnds]);

    return (
        <div className="deals__item">
            <Image
                className="img"
                src={deal.img}
                alt={`${deal.head} Image`}
            />
            <div className="deals__group">
                <h3 className="deals__brand">{deal.head}</h3>
                <span className="deals__category">Limited quantities</span>
            </div>
            <h4 className="deals__title">{deal.description}</h4>
            <div className="deals__price flex">
                <span className="new__price">${deal.newPrice.toFixed(2)}</span>
                <span className="old__price">${deal.oldPrice.toFixed(2)}</span>
            </div>
            <div className="deals__group">
                <p className="deals__countdown-text">Hurry Up! Offer Ends In:</p>
                <div className="countdown">
                    <div className="countdown__amount">
                        <p className="countdown__period">{timeLeft.days}</p>
                        <span className="unit">Days</span>
                    </div>
                    <div className="countdown__amount">
                        <p className="countdown__period">{timeLeft.hours}</p>
                        <span className="unit">Hours</span>
                    </div>
                    <div className="countdown__amount">
                        <p className="countdown__period">{timeLeft.minutes}</p>
                        <span className="unit">Mins</span>
                    </div>
                    <div className="countdown__amount">
                        <p className="countdown__period">{timeLeft.seconds}</p>
                        <span className="unit">Sec</span>
                    </div>
                </div>
            </div>
            <div className="deals__btn">
                <a href="details.html" className="btn btn--md">Shop Now</a>
            </div>
        </div>
    );
}
