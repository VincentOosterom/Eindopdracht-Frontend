import './NotFound.css'
import {useNavigate} from "react-router-dom";
import NavBar from "../../../components/website/header_footer_navbar/NavBar/NavBar.jsx";

function NotFound() {
    const navigate = useNavigate();

    function handleBackHome(){
        navigate('/')
    }

    return (
        <>
            <header className="header-hero">
                <NavBar/>
                <article className="header-hero-content">
                    <h1>Sorry. Deze pagina bestaat niet.<br/>Klik hieronder om terug te gaan naar onze homepagina</h1>
                    <button onClick={handleBackHome}>Terug naar de homepage</button>
                </article>
            </header>
        </>
    )
}

export default NotFound;