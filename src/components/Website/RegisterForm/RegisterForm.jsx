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
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState(false);
    const [success, setSuccess] = useState(false);

    async function Register(e) {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Wachtwoorden komen niet overeen");
            return;
        }
        // Input niet rood, maar na error wel.
        setPasswordError(false);

        // Alles moet ingevuld zijn || en en.
        if (!name || !company || !email || !password || !confirmPassword) {
            setError("Let op, alle velden moeten ingevuld zijn.");
            return;
        }

        // Moeten 1 van deze tekens bevatten.
        if (!passwordRegex.test(password)) {
            setError("Wachtwoord moet minimaal 8 tekens, 1 hoofdletter, 1 cijfer en 1 speciaal teken bevatten");
            setPasswordError(true)
            return;
        }

        setLoading(true);

        setTimeout(async () => {
            try {
                const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/users', {
                        name,
                        company,
                        email,
                        password,
                        confirmPassword,
                    }, {
                        headers: {
                            'novi-education-project-id': 'd6200c4d-2a0a-435d-aba6-6171c6a7296e'
                        },
                    }
                );
                console.log(response);
                setSuccess(true);
            } catch (error) {
                console.log(error);
                setError('Fout opgetreden bij het registeren.');
            } finally {
                setLoading(false);
            }
        }, 5000)

        navigate("/login");

        // TEST IN CONSOLE
        const formData = {name, company, email};
        console.log("Nieuwe registratie:", formData);
        setLoading(false);
    }

    return (
        <>
            <section className="register-container">
                <form onSubmit={Register} className="register-form">
                    <div className="register-form-title">
                        <h2>Maak jouw account aan</h2>
                        <p>Gratis voor 14 dagen, geheel vrijblijvend.</p>
                    </div>
                    <div className="register-form-inputs">
                        <label htmlFor="firstname"></label>
                        <input
                            type="text"
                            name={"firstname"}
                            value={name}
                            placeholder="Voornaam"
                            onChange={(e) => setName(e.target.value)}
                            id="firstname"/>


                        <label htmlFor="company-name"></label>
                        <input
                            type="text"
                            name={"company-name"}
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Bedrijfsnaam"
                            id="company-name"/>

                        <label htmlFor="company-email"></label>
                        <input
                            type="email"
                            name={"company-email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Zakelijk e-mailadres"
                            id="company-email"/>

                        <label htmlFor="company-password"></label>
                        <input
                            type="password"
                            name={"company-password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Uw wachtwoord"
                            className={`password-input ${passwordError ? "error" : ""}`}
                            id="company-password"/>

                        <ul className="password-required">
                            <li>Minimaal 8 tekens</li>
                            <li>Minstens één hoofdletter</li>
                            <li>Minstens één cijfer</li>
                            <li>Minstens één speciaal teken</li>
                        </ul>

                        <label htmlFor="confirm-password"></label>
                        <input
                            type="password"
                            name={"confirm-password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Bevestig uw wachtwoord"
                            className={`password-input ${passwordError ? "error" : ""}`}
                            id="confirm-password"/>

                        <label htmlFor="zipcode"></label>
                        <input
                            type="text"
                            name={"zipcode"}
                            placeholder="Postcode"
                            id="zipcode"/>

                        <label htmlFor="city"></label>
                        <input
                            type="text"
                            name={"city"}
                            placeholder="Plaats"
                            id="city"/>

                        <label htmlFor="phone-number"></label>
                        <input
                            type="text"
                            name={"phone-number"}
                            placeholder="Telefoonnummer"
                            id="phone-number"/>
                    </div>
                    <button
                        type="submit">
                        {loading ? "Uw account wordt aangemaakt..." : "Registeren"}
                    </button>
                </form>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Uw account is succesvol aangemaakt!</p>}
            </section>
        </>
    )
}

export default RegisterForm;