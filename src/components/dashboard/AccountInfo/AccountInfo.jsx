import {useState} from "react";
import api from "../../../api/api";
import "./AccountInfo.css";

function AccountInfo({company}) {
    // Bedrijfsinfo
    const [name, setName] = useState(company.name || "");
    const [bio, setBio] = useState(company.bio || "");


    // Wachtwoord
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const [showPassword, setShowPassword] = useState(false);


    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // ====== HANDLE COMPANY INFO SAVE ======
    async function handleSaveCompany() {
        setLoading(false);
        try {
            await api.patch(`/companies/${company.id}`, {
                name,
                bio,
            });

            setSuccess("Bedrijfsinformatie is bijgewerkt!");
            setTimeout(() => setSuccess(""), 2000);

        } catch {
            setError("Bijwerken mislukt.");
        }
        setLoading(false);
    }

    // ====== HANDLE PASSWORD CHANGE ======
    async function handlePasswordChange(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword !== confirmNewPassword) {
            setError("Nieuw wachtwoord komt niet overeen.");
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            setError("Wachtwoord moet minimaal 8 tekens, 1 hoofdletter, 1 cijfer en 1 speciaal teken bevatten");
            return;
        }

        try {
            await api.patch(`/users/${company.ownerUserId}`, {
                password: newPassword,
            });

            setSuccess("Wachtwoord succesvol gewijzigd!");

            // Leeg velden
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");

        } catch {
            setError("Wachtwoord wijzigen mislukt.");
        }
    }

    return (
        <section className="account-info">
            <h2>Bedrijfsgegevens</h2>
            {success && <p className="succes-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
            <section className="account-info-compleet">
                <article
                    className="company-data">
                    <label>
                        Bedrijfsnaam
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Bio / Beschrijving
                        <textarea
                            rows="3"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </label>

                    <button
                        type="submit"
                        onClick={handleSaveCompany}
                        className="account-button"
                        disabled={loading}>
                        Bedrijfsinformatie opslaan
                    </button>
                </article>


                {/* 🟢 WACHTWOORD MUTATION */}
                <form onSubmit={handlePasswordChange} className="password-form">

                    <label>
                        <div className="password-wrapper-account">
                            Huidig wachtwoord
                            <input
                                type={showPassword ? "text" : "password"}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                            <span
                                className="toggle-eye-account"
                                onClick={() => setShowPassword(!showPassword)}
                            > {showPassword ? "🙈" : "👁️"}</span>
                        </div>
                    </label>

                    <label>
                        Nieuw wachtwoord
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Herhaal nieuw wachtwoord
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit" className="account-button">
                        Wachtwoord wijzigen
                    </button>
                </form>
            </section>
        </section>
    );
}

export default AccountInfo;
