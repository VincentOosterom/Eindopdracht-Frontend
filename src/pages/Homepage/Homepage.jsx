import './Homepage.css'
import SearchResultCard from "../../components/SearchCard/SearchResultCard.jsx";
import HowWorksCard from "../../components/WorksCard/HowWorksCard.jsx";
import plus from "../../assets/plus.svg";
import global from "../../assets/global.svg";
import calender from "../../assets/calender.svg";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {companies} from "/src/data/companies";
import {useState} from "react";


function Home() {
    const [query, setQuery] = useState("");
    const filteredCompanies = query
        ? companies.filter((company) =>
            company.title.toLowerCase().includes(query.toLowerCase())) : companies;

    return (
        <>
            <Header query={query} setQuery={setQuery}/>
            <main className="homepage">
                <h2>Zoek resultaten</h2>
                <section className="search-result">
                    {filteredCompanies.map((company) => (
                        <SearchResultCard key={company.companyId}{...company} name="Boek nu"
                                          companyId={company.companyId}/>
                    ))}

                </section>
                <h2>Hoe werkt het?</h2>
                <section className="how-it-works">
                    <HowWorksCard
                        image={plus}
                        title="Meld je aan als bedrijf"
                        subtitle="Registreer jouw bedrijf bij Tijdslot en maak een profiel aan. Voeg je openingstijden, diensten en medewerkers toe."/>
                    <HowWorksCard
                        image={global}
                        title="Word zichtbaar voor klanten"
                        subtitle="Zodra je profiel compleet is, kunnen klanten je vinden via zoekfunctie of unieke bedrijfs-URL."/>
                    <HowWorksCard
                        image={calender}
                        title="Ontvang en beheer afspraken"
                        subtitle="Klanten boeken direct een tijdslot bij jouw diensten. Beheer je agenda eenvoudig via het dashboard en blijf overzicht houden."/>
                </section>
            </main>
            <Footer/>

        </>
    )
}

export default Home;