import './AboutUs.css'
import NavBar from "../../../components/website/header_footer_navbar/NavBar/NavBar.jsx";


function AboutUs() {
    return (
        <>
            <header className="about-us-header">
                <NavBar/>
                <section>
                    <article className="about-us-content">
                        <h1>Wie zijn wij?</h1>
                        <p>De eenvoudige en betrouwbare online afspraakplanner
                            voor kleine bedrijven. Gemakkelijk afspraken maken, beheren en
                            bevestigen, waar en wanneer jij wilt.</p>
                    </article>
                </section>
            </header>
        </>
    )
}

export default AboutUs;