import './RegisterForm.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function RegisterForm() {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    async function Register(e) {
        e.preventDefault();
        setError("");

        if (!name || !company || !email || !password || !confirmPassword) {
            setError("Let op, alle velden moeten ingevuld zijn.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Wachtwoorden komen niet overeen");
            return;
        }

        if (!passwordRegex.test(password)) {
            setError("Wachtwoord moet minimaal 8 tekens, 1 hoofdletter, 1 cijfer en 1 speciaal teken bevatten");
            setPasswordError(true);
            return;
        }

        setLoading(true);

        try {
            // 1. USER REGISTEREN
            const registerResponse = await axios.post(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/users",
                {
                    email,
                    password,
                    confirmPassword,
                    firstname: name,
                    lastname: company,
                    roles: [
                        "admin"
                    ]
                },
                {
                    headers: {
                        'novi-education-project-id': 'd6200c4d-2a0a-435d-aba6-6171c6a7296e'
                    }
                }
            );

            // userId ophalen
            const userId = registerResponse.data.userId;

            // 2. LOGIN OM TOKEN TE KRIJGEN
            const loginResponse = await axios.post(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/login",
                {
                    email,
                    password
                },
                {
                    headers: {
                        'novi-education-project-id': 'd6200c4d-2a0a-435d-aba6-6171c6a7296e'
                    }
                }
            );

            const token = loginResponse.data.token;

            // 3. PROFIEL AANMAKEN MET TOKEN
            await axios.post(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/profiles",
                {
                    userId: userId,
                    companyName: company,
                    bio: "",
                    profileImageUrl: ""
                },
                {
                    headers: {
                        'novi-education-project-id': 'd6200c4d-2a0a-435d-aba6-6171c6a7296e',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            // 4. SUCCES MELDING + NAVIGATE
            setSuccess(true);
            setTimeout(() => navigate("/inloggen"), 1500);

        } catch (err) {
            console.error(err);
            setError("Er ging iets mis tijdens het registreren.");
        } finally {
            setLoading(false);
        }
    }



    return (
        <section className="register-container">
            <form onSubmit={Register} className="register-form">

                <div className="register-form-title">
                    <h2>Maak jouw account aan</h2>
                    <p>Gratis voor 14 dagen, geheel vrijblijvend.</p>
                </div>

                <div className="register-form-inputs">

                    <label htmlFor="firstname">Voornaam</label>
                    <input
                        id="firstname"
                        type="text"
                        value={name}
                        placeholder="Voornaam"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="company-name">Bedrijfsnaam</label>
                    <input
                        id="company-name"
                        type="text"
                        value={company}
                        placeholder="Bedrijfsnaam"
                        onChange={(e) => setCompany(e.target.value)}
                    />

                    <label htmlFor="company-email">Zakelijk e-mailadres</label>
                    <input
                        id="company-email"
                        type="email"
                        value={email}
                        placeholder="Zakelijk e-mailadres"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="company-password">Wachtwoord</label>
                    <input
                        id="company-password"
                        type="password"
                        value={password}
                        placeholder="Wachtwoord"
                        className={passwordError ? "error" : ""}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <ul className="password-required">
                        <li>Minimaal 8 tekens</li>
                        <li>Minstens één hoofdletter</li>
                        <li>Minstens één cijfer</li>
                        <li>Minstens één speciaal teken</li>
                    </ul>

                    <label htmlFor="confirm-password">Bevestig wachtwoord</label>
                    <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        placeholder="Bevestig wachtwoord"
                        className={passwordError ? "error" : ""}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Uw account wordt aangemaakt..." : "Registreren"}
                </button>

            </form>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Uw account is succesvol aangemaakt!</p>}
        </section>
    );
}

export default RegisterForm;
