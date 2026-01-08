import './RegisterForm.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../../../api/api.js";

function RegisterForm() {
    const [name, setName] = useState(""); // voornaam
    const [company, setCompany] = useState(""); // bedrĳfsnaam
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newCompany, setNewCompany] = useState([]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");


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

        if (!email.includes("@") || !email.includes(".")) {
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
                    firstname: name,
                    email,
                    password,
                    lastname: "",
                    roles: ["admin"],
                }
            );

            console.log("Nieuw user:", userRes.data);

            const userId = userRes.data.id;

            // 2. DIRECT INLOGGEN (token krijgen)
            const loginRes = await api.post(
                "/login",
                {email, password},
            );

            const token = loginRes.data.token;
            const decoded = decodeJwt(token);
            console.log("Decoded JWT:", decoded);

            // 3. COMPANY AANMAKEN MET ZELFDE ID ALS USER
            const companyRes = await api.post(
                "/companies",
                {
                    id: userId,            // ★ BELANGRIJK: ID = USER ID
                    ownerUserId: userId,   // ★ koppelt automatisch
                    name: company,
                    bio: "",
                    street: street,
                    city: city,
                    zip: zip,
                },
            );

            setNewCompany(companyRes.data)



            setSuccess("Account succesvol aangemaakt!");

            setTimeout(() => navigate("/inloggen"), 1500);

        } catch (err) {

            if (axios.isAxiosError(err)) {
                if (err.response?.status === 409) {
                    setError("Dit e-mailadres is al in gebruik.");
                    return;
                }
                if (err.response?.status === 400) {
                    setError("Ongeldige invoer. Controleer je gegevens.");
                    return;
                }
            }
            setError("Er ging iets mis bij het registreren. Probeer opnieuw.");
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
                    <label htmlFor="zipcode">Postcode</label>
                    <input type="text"
                           id="zipcode"
                           value={zip}
                           placeholder="Uw postcode"
                           onChange={(e) => setZip(e.target.value)}
                    />
                    <label htmlFor="city">Plaats</label>
                    <input type="text"
                           id="city"
                           value={city}
                           placeholder="Uw plaats"
                           onChange={(e) => setCity(e.target.value)}
                    />
                    <label htmlFor="street">Straat & Huisnummer</label>
                    <input type="text"
                           id="street"
                           value={street}
                           placeholder="Straat & Huisnummer"
                           onChange={(e) => setStreet(e.target.value)}
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
                    {success ? "Uw account wordt aangemaakt..." : "Registreren"}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>


        </section>
    );
}

export default RegisterForm;
