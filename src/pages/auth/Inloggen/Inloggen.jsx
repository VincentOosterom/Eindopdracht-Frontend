import './Inloggen.css'
import {useState} from "react";
import {NavLink, useNavigate,} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLeftLong} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../../context/AuthContext";
import api from "../../../api/api.js";
import {useAutoClearMessage} from "../../../helpers/useAutoClearMessage.js";
import usePageTitle from "../../../helpers/usePageTitle.js";


function decodeJwt(token) {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
}

function Inloggen() {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    usePageTitle("Inloggen", "Tijdslot");
    useAutoClearMessage(error, setError);

    function handleBack() {
        navigate("/");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Inloggen bij NOVI API
            const response = await api.post("login", {email, password});

            const token = response.data.token;
            const decoded = decodeJwt(token);
            const userId = decoded.userId;


            // 2. Bedrijf zoeken via ownerUserId
            const companyRes = await api.get(`/companies?ownerUserId=${userId}`);
            const company = companyRes.data[0];

            if (!company) {
                setError("Geen bedrijf gevonden voor deze gebruiker.");
                return;
            }

            const companyId = company.id;

// 3. Opslaan in AuthContext
            login({
                token,
                userId,
                companyId,
                roles: decoded.roles || [],
            });

// 4. Navigeren
            navigate(`/dashboard/${companyId}`);
        } catch {
            setError("Verkeerde inloggegevens");
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
                    <h2 id="login-heading">Welkom terug</h2>

                    <form className="login-form" onSubmit={handleSubmit} noValidate aria-labelledby="login-heading">
                        {error && (
                            <p className="error-message" role="alert">
                                {error}
                            </p>
                        )}
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
                </section>
            </main>
        </>
    )
}

export default Inloggen