import "./NavBar.css";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hideBurger, setHideBurger] = useState(false);

    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        let lastScroll = 0;

        function handleScroll() {
            lastScroll = window.scrollY;
            setHideBurger(lastScroll > 0);

        }

        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="navbar">
            <div className="app-logo">
                <p className="logo">Tijdslot</p>
            </div>
            <button
                className={`hamburger ${isOpen ? "open" : ""} ${hideBurger ? "hidden" : ""}`}
                onClick={toggleMenu}
                aria-label="Menu"
            >
                <span/>
                <span/>
                <span/>
            </button>

            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
                <li><NavLink to="/over-ons" onClick={closeMenu}>Over ons</NavLink> </li>
                <li><NavLink to="/inloggen" onClick={closeMenu}>Inloggen</NavLink></li>
                <li className="cta">
                    <NavLink to="/registeren" onClick={closeMenu}>Registreren</NavLink>
                </li>
            </ul>

            {isOpen && <div className="backdrop" onClick={closeMenu}/>}
        </nav>
    );
}

export default NavBar;
