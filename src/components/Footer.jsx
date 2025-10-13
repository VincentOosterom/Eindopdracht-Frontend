import './Footer.css'

function Footer() {
    return (
        <footer className="app-footer">
            <div className="left-container">
                <h3>Tijdslot</h3>
                <p>De eenvoudige en betrouwbare online afspraakplanner </p><p>voor kleine bedrijven. Gemakkelijk afspraken maken, beheren en</p> <p>bevestigen, waar en wanneer jij wilt.</p>
            </div>
            <div className="footer-nav-links">
                <div className="first-colum">
                    <h3>Voor bedrijven</h3>
                    <ul>
                        <li><a href="../pages/Registeren.jsx"></a>Registeren</li>
                        <li><a href="../pages/Inloggen.jsx"></a>Inloggen</li>
                    </ul>
                </div>
                <div className="second-colum">
                    <h3>Bedrijfsgegevens</h3>
                    <ul>
                        <li><a href="../pages/Over-Ons.jsx"></a>Over ons</li>
                        <li><a href="../pages/Contact.jsx"></a>Contact</li>
                    </ul>
                </div>
            </div>

        </footer>
    )
}

export default Footer