import './RegisterForm.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../../../api/api.js";

function RegisterForm() {
    const [name, setName] = useState(""); // voornaam
    const [company, setCompany] = useState(""); // bedrĳfsnaam
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    function decodeJwt(token) {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    }

    async function Register(e) {
        e.preventDefault();
        setError("");

        if (!name || !company || !email || !password || !confirmPassword) {
            setError("Let op, alle velden moeten ingevuld zijn.");
            return;
        }

        if (!email.includes("@") || !email.includes("."))  {
            setError("Vul een geldig e-mailadres in.");
        }

        if (password !== confirmPassword) {
            setError("Wachtwoorden komen niet overeen");
            return;
        }

        if (!passwordRegex.test(password)) {
            setError("Wachtwoord moet minimaal 8 tekens, 1 hoofdletter, 1 cijfer en 1 speciaal teken bevatten");
            return;
        }

        setLoading(true);

        try {
            // 1. USER AANMAKEN
            const userRes = await api.post(
                "/users",
                {
                    email,
                    password,
                    firstname: name,
                    lastname: "",
                    roles: ["admin"],
                    companyId: null
                },
                {
                    headers: {
                        "novi-education-project-id": "d6200c4d-2a0a-435d-aba6-6171c6a7296e"
                    }
                }
            );

            console.log(userRes.data);

            // 2. DIRECT INLOGGEN
            const loginRes = await api.post(
                "/login",
                {email, password},
                {
                    headers: {
                        "novi-education-project-id": "d6200c4d-2a0a-435d-aba6-6171c6a7296e"
                    }
                }
            );

            const token = loginRes.data.token;
            const decoded = decodeJwt(token);
            const userId = (decoded.userId);

            // Auth headers voor alles daarna
            const authHeaders = {
                "novi-education-project-id": "d6200c4d-2a0a-435d-aba6-6171c6a7296e",
                "Authorization": `Bearer ${token}`
            };

            // 3. COMPANY AANMAKEN
            const companyRes = await api.post(
                "/companies",
                {
                    ownerUserId: Number(userId),
                    name: company,
                    bio: "",
                    profileImageUrl: ""

                },
                {headers: authHeaders}
            );

            const createdCompanyId = companyRes.data.id;

            // 4. USER KOPPELEN AAN COMPANY
            await api.patch(
                `/users/${userId}`,
                {companyId: createdCompanyId},
                {headers: authHeaders}
            );

            // 5. SUCCES
            setLoading(true);
            setTimeout(() => navigate("/inloggen"), 1500);

        } catch (err) {
            console.error(err);
            if (axios.isAxiosError(err)) {
                // --- Dubbel e-mail adres ---
                if (err.response?.status === 409) {
                    setError("Dit e-mailadres is al in gebruik. Probeer in te loggen of gebruik een ander e-mailadres.");
                    return;
                }

                // --- Validatie fout van backend ---
                if (err.response?.status === 400) {
                    setError("Ongeldige invoer. Controleer je gegevens.");
                    return;
                }

                // --- Geen autorisatie (token probleem) ---
                if (err.response?.status === 401 || err.response?.status === 403) {
                    setError("Onvoldoende rechten om dit account aan te maken.");
                    return;
                }
            }

            // Standaard fout
            setError("Er ging iets mis bij het registreren. Probeer het opnieuw.");
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
                        className={error ? "error" : ""}
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
                        className={error ? "error" : ""}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Uw account wordt aangemaakt..." : "Registreren"}
                </button>

            </form>

            {error && <p className="error-message">{error}</p>}
        </section>
    );
}

export default RegisterForm;
