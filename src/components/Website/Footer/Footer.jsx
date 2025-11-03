import './Footer.css'
import {NavLink} from "react-router-dom";

function Footer() {
    return (
        <footer className="app-footer">
            <div className="left-container">
                <h3>Tijdslot</h3>
                <p>De eenvoudige en betrouwbare online afspraakplanner </p><p>voor kleine bedrijven. Gemakkelijk
                afspraken maken, beheren en</p> <p>bevestigen, waar en wanneer jij wilt.</p>
            </div>
            <div className="footer-nav-links">
                <div className="first-colum">
                    <h3>Voor bedrijven</h3>
                    <ul>
                        <li><NavLink to="/registeren"
                                     className={({isActive}) => (isActive ? "active" : "")}>Registeren</NavLink></li>
                        <li><NavLink to="/inloggen"
                                     className={({isActive}) => (isActive ? "active" : "")}>Inloggen</NavLink></li>
                    </ul>
                </div>

            </div>

        </footer>
    )
}

export default Footer