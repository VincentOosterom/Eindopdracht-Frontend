import './NavBar.css'
import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";


function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const toggleMenu = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    // Als je op logo klikt, terug naar home
    function toHome() {
        navigate(`/`)
    }

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
                <p className="logo" onClick={toHome}> Tijdslot</p>
            </div>
            <div className={`hamburger ${scrollY  ? "hidden" : ""}`} onClick={toggleMenu}>
                ☰
            </div>
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                <li>
                    <NavLink
                        to="/inloggen/bedrijf"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Inloggen
                    </NavLink>
                </li>
                <li className="button-register">
                    <NavLink to="/registeren/bedrijf" className={({ isActive }) => (isActive ? "active" : "")}>Registreren</NavLink>
                </li>
            </ul>
        </nav>

    )
}

export default NavBar;