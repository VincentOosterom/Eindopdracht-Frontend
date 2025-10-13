import './RegisterForm.css'
import App from "../../App.jsx";
import {useState} from "react";
import Footer from "../Footer/Footer.jsx";
import {useNavigate} from "react-router-dom";

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



    async function handleSubmit(e) {
        // Voorkomt refresh
        e.preventDefault();

        // Error is nog leeg maar kan iets verwachten
        setError("");

        // Input niet rood, maar na error wel.
        setPasswordError(false);

        // Alles moet ingevuld zijn || en en.
        if (!name || !company || !email || !password || !confirmPassword) {
            setError("Let op, alle velden moeten ingevuld zijn.");
            return;
        }

        // controleert wachtwoorden met elkaar
        if (password !== confirmPassword) {
            setError("Wachtwoord komt niet overeen");
            setPasswordError(true);
            return;
        }

        // Moeten 1 van deze tekens bevatten.
        if (!passwordRegex.test(password)) {
            setError("Wachtwoord moet minimaal 8 tekens, 1 hoofdletter, 1 cijfer en 1 speciaal teken bevatten");
            setPasswordError(true)
            return;
        }

        setLoading(true);

        // TEST IN CONSOLE
        const formData = {name, company, email};
        console.log("Nieuwe registratie:", formData);
        navigate("/dashboard")
        setLoading(false);
    }

    return (
        <>
            <section className="register-container">
                <form onSubmit={handleSubmit} className="register-form">
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
                            onChange={(e) => setName(e.target.value)}/>

                        <label htmlFor="company-name"></label>
                        <input
                            type="text"
                            name={"company-name"}
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Bedrijfsnaam"/>

                        <label htmlFor="company-email"></label>
                        <input
                            type="email"
                            name={"company-email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Zakelijk e-mailadres"/>

                        <label htmlFor="company-password"></label>
                        <input
                            type="password"
                            name={"company-password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Uw wachtwoord"
                            className={`password-input ${passwordError ? "error" : ""}`}/>

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
                            className={`password-input ${passwordError ? "error" : ""}`}/>

                        <label htmlFor="zipcode"></label>
                        <input
                            type="text"
                            name={"zipcode"}
                            placeholder="Postcode"/>

                        <label htmlFor="city"></label>
                        <input
                            type="text"
                            name={"city"}
                            placeholder="Plaats"/>

                        <label htmlFor="phone-number"></label>
                        <input
                            type="text"
                            name={"phone-number"}
                            placeholder="Telefoonnummer"/>
                    </div>
                    <button type="submit">Registeren</button>
                </form>

                {error && <p className="error-message">{error}</p>}
                {/*Of loading wordt getoond of error*/}
                {loading && !error && <p className="loading-message">Registratie verwerken</p>}
            </section>
        </>
    )
}

export default RegisterForm;