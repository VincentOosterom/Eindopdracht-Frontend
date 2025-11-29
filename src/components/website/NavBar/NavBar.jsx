import './NavBar.css'
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";


function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const toggleMenu = () => setIsOpen(!isOpen);

    // Houd scroll in de gaten, zodra naar beneden, hamburger verdwijnt.
    useEffect(() => {
        function handleScroll() {
            const y = window.scrollY || window.pageYOffset;
            setScrollY(y);
        }
        window.addEventListener("scroll", handleScroll, {passive: true});
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    })

    return (
        <nav className="navbar">
            <div className="app-logo">
                <p className="logo"> Tijdslot</p>
            </div>
            <div className={`hamburger ${scrollY  ? "hidden" : ""}`} onClick={toggleMenu}>
                ☰
            </div>
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                <li>
                    <NavLink
                        to="/" className={`nav-link active ${isOpen ? "active" : ""}`}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/inloggen"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Inloggen
                    </NavLink>
                </li>
                <li className="button-register">
                    <NavLink to="/registeren" className={({ isActive }) => (isActive ? "active" : "")}>Registreren</NavLink>
                </li>
            </ul>
        </nav>

    )
}

export default NavBar;