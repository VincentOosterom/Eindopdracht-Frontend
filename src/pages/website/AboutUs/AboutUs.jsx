import './AboutUs.css'
import NavBar from "../../../components/website/header_footer_navbar/NavBar/NavBar.jsx";
import Footer from "../../../components/website/header_footer_navbar/Footer/Footer.jsx";
import DashboardSettings  from "../../../assets/DashboardSettings.png"
import DashboardPreview from "../../../assets/dashboardPreview.png"

function AboutUs() {
    return (
        <>
            <header className="about-us-header">
                <NavBar/>
                <section>
                    <article className="about-us-content-header">
                        <h1>Wie zijn wij?</h1>
                        <p>De eenvoudige en betrouwbare online afspraakplanner
                            voor kleine bedrijven. Gemakkelijk afspraken maken, beheren en
                            bevestigen, waar en wanneer jij wilt.</p>
                    </article>
                </section>
            </header>
            <main className="about-us-main">
                <section className="about-us-section">

                    <div className="row">
                        <article className="content">
                            <h2>Tijdslot. Wat is het?</h2>
                            <p>
                                Tijdslot is een slimme afspraakplanner voor freelancers en
                                kleine ondernemingen. Geen gedoe meer met telefoontjes of
                                dubbele boekingen.
                            </p>
                        </article>

                        <article className="image">
                            <img src={DashboardPreview} alt="Tijdslot dashboard preview" />
                        </article>
                    </div>

                    <div className="row reverse">
                        <article className="content">
                            <h2>Maak je eigen diensten</h2>
                            <p>
                                Tijdslot geeft freelancers en kleine ondernemingen volledige controle
                                over hun diensten en beschikbaarheid. Stel eenvoudig je eigen services in,
                                bepaal je tijdslots en voorkom dubbele boekingen — volledig geautomatiseerd.
                            </p>
                        </article>

                        <article className="image">
                            <img src={DashboardSettings} alt="Tijdslot instellingen preview" />
                        </article>
                    </div>

                </section>

            </main>
            <Footer/>
        </>
    )
}

export default AboutUs;