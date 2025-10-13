import './NavBar.css'
import {useState} from "react";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);


    const toggleMenu = () => setIsOpen(!isOpen);
    return (

        <nav className="navbar">
            <div className="app-logo">
                <p className="logo"><a href="/">Tijdslot</a></p>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                ☰
            </div>
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                <li><a href="/contant">Contact</a></li>
                <li><a href="/inloggen">Inloggen</a></li>
                <li className="button-register">
                    <a href="/register">Registreren</a>
                </li>
            </ul>
        </nav>

    )
}

export default NavBar;