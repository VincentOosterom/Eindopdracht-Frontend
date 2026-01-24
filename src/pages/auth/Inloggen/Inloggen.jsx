import './Inloggen.css'
import {useState} from "react";
import {NavLink, useNavigate,} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLeftLong} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../../context/AuthContext";
import api from "../../../api/api.js";
import {useAutoClearMessage} from "../../../helpers/useAutoClearMessage.js";


function decodeJwt(token) {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
}

function Inloggen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    useAutoClearMessage(error, setError);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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
        } catch {
            setError("Verkeerd e-mailadres of wachtwoord.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <main className="login-page">
                <section className="login-container">

                    <button
                        type="button"
                        className="icon-back"
                        onClick={handleBack}
                        aria-label="Ga terug"
                    >
                        <FontAwesomeIcon icon={faLeftLong} />
                    </button>

                    <h1>Tijdslot</h1>

                    <header className="login-content">
                        <h2>Welkom terug</h2>
                    </header>

                    <form className="login-form" onSubmit={handleSubmit} noValidate>

                        <label htmlFor="email">E-mailadres</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            placeholder="Uw e-mailadres"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="password">Wachtwoord</label>
                        <div className="password-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Uw wachtwoord"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="toggle-eye"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={
                                    showPassword ? "Verberg wachtwoord" : "Toon wachtwoord"
                                }
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading ? "Bezig met inloggen" : "Inloggen"}
                        </button>

                    </form>

                    {error && (
                        <p className="error-message" role="alert">
                            {error}
                        </p>
                    )}

                </section>
            </main>

        </>
    )
}

export default Inloggen