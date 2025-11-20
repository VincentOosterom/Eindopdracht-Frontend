import './Inloggen.css'
import {useState} from "react";
import {NavLink, useNavigate,} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLeftLong} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";


function Inloggen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    function handleBack() {
        navigate('/')
    }

    function decodeJwt(token) {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login',
                {
                    email,
                    password,
                },
                {
                    headers: {
                            'novi-education-project-id': 'd6200c4d-2a0a-435d-aba6-6171c6a7296e'
                    }
                },)

            console.log(response)

            const token = response.data.token;
            const decoded = decodeJwt(token);
            const userId = decoded.userId;

            login({
                token: token,
                userId: userId,
            });

            navigate(`/dashboard/${userId}`);

        } catch (error) {
            console.log(error)
            setError("Verkeerd wachtwoord of e-mailadres")
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <header className="login-page">
                <section className="login-container">
                    <div className="icon-back" onClick={handleBack}>
                        <FontAwesomeIcon icon={faLeftLong}/>
                        <p>Homepage</p>
                    </div>
                    <h1>Tijdslot</h1>
                    <div className="login-content">
                        <h2>Welkom Terug</h2>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Uw E-mail"
                            onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="Password"></label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Uw Wachtwoord"
                            onChange={(e) => setPassword(e.target.value)}/>
                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        > Inloggen
                        </button>
                        <div className="forget-password">
                            <NavLink to="/wachtwoord-vergeten">Wachtwoord vergeten</NavLink>
                        </div>
                    </form>

                    {error && <p className="error-message">{error}</p>}
                    {loading && <p>Bezig met inloggen</p>}

                </section>
            </header>
        </>
    )
}

export default Inloggen