import './Inloggen.css'
import {useState} from "react";
import {NavLink, useNavigate,} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLeftLong} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../../context/AuthContext";
import api from "../../../api/api.js";


function decodeJwt(token) {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
}

function Inloggen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {login} = useAuth();

    function handleBack() {
        navigate("/");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // 1. Inloggen bij NOVI API
            const response = await api.post("login", {email, password});

            const token = response.data.token;
            const decoded = decodeJwt(token);
            const userId = decoded.userId;

// 1. Bedrijf zoeken via ownerUserId
            const companyRes = await api.get(`/companies?ownerUserId=${userId}`);
            const company = companyRes.data[0];

            if (!company) {
                setError("Geen bedrijf gevonden voor deze gebruiker.");
                return;
            }

            const companyId = company.id;

// 2. Opslaan in AuthContext
            login({
                token,
                userId,
                companyId,
                roles: decoded.roles || [],
            });

// 3. Navigeren
            navigate(`/dashboard/${companyId}`);
            console.log("companyId =", companyId);
        } catch (err) {
            console.error(err);
            setError("Verkeerd e-mailadres of wachtwoord.");
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