import './NotFound.css'
import {useNavigate} from "react-router-dom";



function NotFound() {
    const navigate = useNavigate();

    function handleBackHome(){
        navigate('/')
    }

    return (
        <>
            <header className="not-found">
                <div className="not-found-content">
                    <h1>Sorry, deze pagina bestaat niet :(</h1>
                    <button onClick={handleBackHome}>Terug naar de homepage</button>
                </div>
            </header>
        </>
    )
}

export default NotFound;