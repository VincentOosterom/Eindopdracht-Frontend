import './Footer.css'
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="app-footer">
            <section className="left-container">
                <h3>Tijdslot</h3>
                <p>De eenvoudige en betrouwbare online afspraakplanner </p><p>voor kleine bedrijven. Gemakkelijk
                afspraken maken, beheren en</p> <p>bevestigen, waar en wanneer jij wilt.</p>
            </section>
            <section className="footer-nav-links">
                <div className="first-colum">
                    <h3>Voor bedrijven</h3>
                    <ul>
                        <li><Link to="/registeren">Registeren</Link></li>
                        <li><Link to="/inloggen">Inloggen</Link></li>
                    </ul>
                </div>
            </section>
        </footer>
    )
}

export default Footer