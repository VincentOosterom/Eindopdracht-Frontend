import './Inloggen.css'
import {useState} from "react";
import {NavLink, useNavigate,} from "react-router-dom";
import {companies} from "../../data/companies.js";


function Inloggen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(false);

        const company = companies.find(
            (c) => c.userEmail === email && c.userPassword === password);
        setError("");

        if (company) {
            setError("")
            navigate(`/dashboard/${company.companyId}`)
        } else {
            setError("Verkeerde wachtwoord of e-mailadres")
        }
    }

    return (
        <>
            <header className="login-page">
                <section className="login-container">
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
                        >Inloggen
                        </button>
                        <div className="forget-password">
                            <NavLink to="/wachtwoord-vergeten">Wachtwoord vergeten</NavLink>
                        </div>
                    </form>

                    {error && <p>{error}</p>}
                    {loading && <p>Bezig met inloggen</p>}

                </section>
            </header>
        </>
    )
}

export default Inloggen