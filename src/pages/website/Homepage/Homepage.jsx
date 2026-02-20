import './Homepage.css'
import SearchResultCard from "../../../components/website/homepage/SearchResult/SearchResultCard.jsx";
import InfoCard from "../../../components/website/homepage/InfoCard/InfoCard.jsx";
import plus from "../../../assets/plus.svg";
import global from "../../../assets/global.svg";
import calender from "../../../assets/calender.svg";
import Header from "../../../components/website/header_footer_navbar/Header/Header.jsx";
import Footer from "../../../components/website/header_footer_navbar/Footer/Footer.jsx";
import api from "../../../api/api";
import {useState, useEffect} from "react";


function Home() {
    const [query, setQuery] = useState("");
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6);


    const [error, setError] = useState("");

    // ALLE BEDRIJVEN OPHALEN
    useEffect(() => {
        async function fetchCompanies() {
            setLoading(true);
            setError(null)
            try {
                const res = await api.get("/companies");
                setCompanies(res.data);
            } catch {
                setError("Fout bij het ophalen van geregisteerde bedrijven");
            } finally {
                setLoading(false);
            }
        }

        fetchCompanies();
    }, []);


    // ZOEKBALK FITLER
    const filteredCompanies = query
        ? companies.filter((c) =>
            c.name.toLowerCase().includes(query.toLowerCase())
        )
        : companies;


    return (
        <>
            <Header
                query={query}
                setQuery={setQuery}
                title="Vind en boek lokale dienstverleners in één klik."
                subTitle="Van masseurs tot kapper, plan direct een afspraak bij jouw in de buurt."
            />

            <main className="main">
                <section className="search-result">
                    {error && <p className="error-message">{error}</p>}
                    {loading && <p className="loading-message">Bedrijven laden</p>}
                    <h2>Zoek resultaten</h2>
                    {!loading && filteredCompanies.length === 0 && (
                        <p className="error-message">Geen bedrijven gevonden…</p>)
                    }

                    <article className="search-result-grid">
                        {filteredCompanies
                            .slice(0, visibleCount)
                            .map((company) => (
                                <SearchResultCard
                                    key={company.id}
                                    title={company.name}
                                    description={company.bio}
                                    company={company}
                                    street={company.street}
                                    city={company.city}
                                    zipcode={company.zipcode}
                                    name="Boek nu"
                                />
                            ))}

                        {filteredCompanies.length > visibleCount && (
                            <button className="btn load_more" onClick={() => setVisibleCount(visible => visible + 6)}>
                                Toon meer bedrijven
                            </button>
                        )}
                    </article>
                </section>
                <section className="how-it-works">
                    <h2>Hoe werkt het?</h2>
                    <article className="how-it-works-grid">
                        <InfoCard
                            image={plus}
                            title="Meld je aan als bedrijf"
                            subtitle="Registreer jouw bedrijf bij Tijdslot en maak een profiel aan. Voeg je openingstijden, diensten en medewerkers toe."
                        />
                        <InfoCard
                            image={global}
                            title="Word zichtbaar voor klanten"
                            subtitle="Zodra je profiel compleet is, kunnen klanten je vinden via zoekfunctie of unieke bedrijfs-URL."
                        />
                        <InfoCard
                            image={calender}
                            title="Ontvang en beheer afspraken"
                            subtitle="Klanten boeken direct een tijdslot bij jouw diensten. Beheer je agenda eenvoudig via het dashboard en blijf overzicht houden."
                        />
                    </article>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Home;
