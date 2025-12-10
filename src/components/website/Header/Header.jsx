import NavBar from "../NavBar/NavBar.jsx";
import './Header.css'


function Header({query, setQuery, title, subTitle}) {


    return (
        <header className="app-header">
            <NavBar/>
            <section className="header-content">
                <h1>{title}</h1>
                <p>{subTitle}</p>
                <div className="input-field">
                    <input
                        className="input-field-search"
                        type="text"
                        name={"search-company"}
                        value={query}
                        placeholder="Zoek uw bedrijf.."
                        onChange={(e) => setQuery(e.target.value)}/>
                </div>
            </section>
        </header>
    )
}

export default Header;