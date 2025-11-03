import './Homepage.css'
import SearchResultCard from "../../../components/Website/SearchCard/SearchResultCard.jsx";
import HowWorksCard from "../../../components/Website/HowWorksCard/HowWorksCard.jsx";
import plus from "../../../assets/plus.svg";
import global from "../../../assets/global.svg";
import calender from "../../../assets/calender.svg";
import Header from "../../../components/Website/Header/Header.jsx";
import Footer from "../../../components/Website/Footer/Footer.jsx";
import {companies} from "/src/dummyData/companies";
import {useState} from "react";


function Home() {
    const [query, setQuery] = useState("");
    const filteredCompanies = query ? companies.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())) : companies;


    return (
        <>
            {/*HEADER COMPONENT*/}
            <Header
                query={query}
                setQuery={setQuery}
                title="Vind en boek lokale"
                title2="dienstverleners in één klik."
                subTitle="Van masseurs tot kapper, plan direct een afspraak bij jouw in de buurt."/>
            <main className="main">

                {/*SECTION 2*/}
                <h2>Zoek resultaten</h2>
                <section className="search-result">
                    {filteredCompanies.map((company) => (
                        <SearchResultCard key={company.companyId}{...company} name="Boek nu"
                                          companyId={company.companyId}/>
                    ))}

                </section>
                {/*SECTION 2*/}
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
            {/*FOOTER COMPONENT*/}
            <Footer/>
        </>
    )
}

export default Home;