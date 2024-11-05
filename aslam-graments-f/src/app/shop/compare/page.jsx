import FootBar from "@/app/Components/footer";
import Navbar from "@/app/Components/Navbar";
import NewsLetter from "@/app/Components/NewsLetterSH";
import Link from "next/link";
import CompareSection from "./compareSection";

export default function ComparePage() {
    return (
        <>
            <Navbar page={"Compare"} />
            <main className="main">
                <section className="breadcrumb">
                    <ul className="breadcrumb__list flex container">
                        <li><Link href="/" className="breadcrumb__link">Home</Link></li>
                        <li><span className="breadcrumb__link"></span>  〉</li>
                        <li><Link href={"/shop"} className="breadcrumb__link">Shop</Link></li>
                        <li><span className="breadcrumb__link"></span>  〉</li>
                        <li><span className="breadcrumb__link">Compare</span></li>
                    </ul>
                </section>
                <CompareSection/>
                <NewsLetter />
            </main>
            <FootBar />
        </>
    )
}