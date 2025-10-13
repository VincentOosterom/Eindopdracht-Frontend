import NavBar from "../NavBar/NavBar.jsx";
import './Header.css'


function Header({query, setQuery}) {


    return (
        <header className="app-header">
            <NavBar/>
            <div className="header-content">
                <h1>Vind en boek lokale </h1>
                <h1>dienstverleners in één klik.</h1>
                <p>Van masseurs tot kapper, plan direct een afspraak bij jouw in de buurt.</p>
                <div className="input-field">
                    <input
                        className="input-field-search"
                        type="text"
                        name={"search-company"}
                        value={query}
                        placeholder="Zoek uw bedrijf.."
                        onChange={(e) => setQuery(e.target.value)}/>

                    <select
                        name="provincie"
                        id="provincie"
                        className="input-field-city">
                        <option value="">Kies een provincie</option>
                        <option value="groningen">Groningen</option>
                        <option value="friesland">Friesland</option>
                        <option value="drenthe">Drenthe</option>
                        <option value="overijssel">Overijssel</option>
                        <option value="flevoland">Flevoland</option>
                        <option value="gelderland">Gelderland</option>
                        <option value="utrecht">Utrecht</option>
                        <option value="noord-holland">Noord-Holland</option>
                        <option value="zuid-holland">Zuid-Holland</option>
                        <option value="zeeland">Zeeland</option>
                        <option value="noord-brabant">Noord-Brabant</option>
                        <option value="limburg">Limburg</option>
                    </select>
                    <button className="search-btn">Zoeken</button>
                </div>
                <div className="input-field-mobile">
                    <input
                        className="input-field-search"
                        type="text"
                        name={"search-company"}
                        placeholder="Zoek uw bedrijf.."/>
                    <select
                        name="provincie"
                        className="input-field-city">
                        <option value="">Kies een provincie</option>
                        <option value="groningen">Groningen</option>
                        <option value="friesland">Friesland</option>
                        <option value="drenthe">Drenthe</option>
                        <option value="overijssel">Overijssel</option>
                        <option value="flevoland">Flevoland</option>
                        <option value="gelderland">Gelderland</option>
                        <option value="utrecht">Utrecht</option>
                        <option value="noord-holland">Noord-Holland</option>
                        <option value="zuid-holland">Zuid-Holland</option>
                        <option value="zeeland">Zeeland</option>
                        <option value="noord-brabant">Noord-Brabant</option>
                        <option value="limburg">Limburg</option>
                    </select>
                    <button className="search-btn">Zoeken</button>
                </div>
            </div>
        </header>
    )
}

export default Header;