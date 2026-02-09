import {useState} from "react";
import api from "../../../../api/api.js";
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
    async function handleSaveCompany(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await api.patch(`/companies/${company.id}`, {
                name,
                bio,
            });

            setSuccess("Bedrijfsinformatie is bijgewerkt!");
            setTimeout(() => setSuccess(""), 2000);

        } catch {
            setError("Bijwerken mislukt.");
        } finally {
            setLoading(false);
        }
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
                oldPassword,
                password: newPassword,
            });

            setSuccess("Wachtwoord succesvol gewijzigd!");

            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");

        } catch {
            setError("Wachtwoord wijzigen mislukt.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="account-info" aria-labelledby="company-info-heading">
            <header>
                <h2 id="company-info-heading">Bedrijfsgegevens</h2>
            </header>

            {success && (
                <p className="success-message" role="status" aria-live="polite">
                    {success}
                </p>
            )}

            {error && (
                <p className="error-message" role="alert">
                    {error}
                </p>
            )}

            <section className="account-info-data">
                {/* BEDRIJFSGEGEVENS */}
                <form className="company-data" onSubmit={handleSaveCompany}>
                    <fieldset>
                        <legend className="visually-hidden">Bedrijfsinformatie</legend>
                        <label>
                            Bedrijfsnaam
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
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
                            className="account-button"
                            disabled={loading}
                        >
                            Bedrijfsinformatie opslaan
                        </button>
                    </fieldset>
                </form>

                {/* WACHTWOORD WIJZIGEN */}
                <form
                    onSubmit={handlePasswordChange}
                    className="password-form"
                    aria-labelledby="password-heading"
                >
                    <fieldset>
                        <legend id="password-heading">
                            Wachtwoord wijzigen
                        </legend>

                        <label>
                            Huidig wachtwoord
                            <div className="password-wrapper-account">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    className="toggle-eye-account"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={
                                        showPassword
                                            ? "Verberg wachtwoord"
                                            : "Toon wachtwoord"
                                    }
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
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
                                onChange={(e) =>
                                    setConfirmNewPassword(e.target.value)
                                }
                                required
                            />
                        </label>

                        <button type="submit" className="account-button">
                            Wachtwoord wijzigen
                        </button>
                    </fieldset>
                </form>

            </section>
        </section>

    );
}

export default AccountInfo;
