import {useState} from "react";
import api from "../../../api/api";
import "./AccountInfo.css";

function AccountInfo({company}) {
    // Bedrijfsinfo
    const [name, setName] = useState(company.name || "");
    const [bio, setBio] = useState(company.bio || "");
    const [profileImageUrl, setProfileImageUrl] = useState(company.profileImageUrl || "");

    // Wachtwoord
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // ====== HANDLE COMPANY INFO SAVE ======
    async function handleSaveCompany() {
        try {
            await api.patch(`/companies/${company.id}`, {
                name,
                bio,
                profileImageUrl
            });

            setSuccess("Bedrijfsinformatie is bijgewerkt!");
            setTimeout(() => setSuccess(""), 2000);

        } catch (err) {
            console.error(err);
            setError("Bijwerken mislukt.");
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

        try {
            await api.patch(`/users/${company.ownerUserId}`, {
                password: newPassword,
            });

            setSuccess("Wachtwoord succesvol gewijzigd!");

            // Leeg velden
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");

        } catch (err) {
            console.error("Wachtwoord wijzigen mislukt:", err);
            setError("Wachtwoord wijzigen mislukt.");
        }
    }

    return (
        <section className="account-info">
            <h2>Bedrijfsgegevens</h2>
            <div className="company-data">
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

                <label>
                    Profielfoto URL
                    <input
                        type="text"
                        value={profileImageUrl}
                        onChange={(e) => setProfileImageUrl(e.target.value)}
                        placeholder="https://..."
                    />
                </label>
                <button onClick={handleSaveCompany} className="account-button">
                    Bedrijfsinformatie opslaan
                </button>
            </div>


            {/* 🟢 WACHTWOORD MUTATION */}
            <form onSubmit={handlePasswordChange} className="password-form">
                <h2>Wachtwoord wijzigen</h2>

                <label>
                    Huidig wachtwoord
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
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

            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </section>
    );
}

export default AccountInfo;
