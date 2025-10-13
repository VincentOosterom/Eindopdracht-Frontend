import './Inloggen.css'
import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";


function Inloggen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Controleert of e-mail & wachtwoord lang genoeg is

    const isDisabled = email.length < 10 && email.includes("@") || password.length < 5;

    const testUser = {
        email: "v-oosterom@hotmail.com",
        password: "Testuser123"
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("")

        if (!email.includes("@")) {
            setError("")
        }

        if (password !== testUser.password) {
            setError("Niet het juiste wachtwoord")
        }

        if (password === testUser.password && email === testUser.email ) {
            navigate("/dashboard")
        }

        setLoading(true)
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
                            disabled={isDisabled}>Inloggen
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