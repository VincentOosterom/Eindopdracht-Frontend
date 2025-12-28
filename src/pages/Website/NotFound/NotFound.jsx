import './NotFound.css'
import {useNavigate} from "react-router-dom";
import NavBar from "../../../components/website/NavBar/NavBar.jsx";

function NotFound() {
    const navigate = useNavigate();

    function handleBackHome(){
        navigate('/')
    }

    return (
        <>
            <header className="not-found">
                <NavBar/>
                <article className="not-found-content">
                    <h1>Sorry. Deze pagina bestaat niet.</h1>
                    <h1>Klik hieronder om terug te gaan naar onze homepagina</h1>
                    <button onClick={handleBackHome}>Terug naar de homepage</button>
                </article>
            </header>
        </>
    )
}

export default NotFound;