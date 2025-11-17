import './AccountInfo.css'

import {useState} from "react";
import axios from "axios";
import "./AccountInfo.css";


function AccountInfo({company}) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // HANDLE PASSWORD CHANGE
    async function handlePasswordChange(e) {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setError("Nieuw wachtwoord komt niet overeen!");
            return;
        }

        try {
            await axios.patch(
                `http://localhost:8080/api/users/${company.companyId}/password`,
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }
            );

            setSuccess("Uw wachtwoord is gewijzigd!");

            // velden leegmaken
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");

        } catch (error) {
            console.error("Wachtwoord wijzigen mislukt:", error);
            setError("Wachtwoord wijzigen mislukt");
        }
    }

    return (
        <section className="account-info">
            {/* ⭐ BEDRIJFSINFO */}
            <div className="first-colum">
                <label htmlFor="company-name" className="account-label">
                    Bedrijfsnaam:
                    <input
                        type="text"
                        id="company-name"
                        defaultValue={company.title}
                    />
                </label>

                <label htmlFor="company-email" className="account-label">
                    Zakelijk e-mail:
                    <input
                        type="email"
                        id="company-email"
                        defaultValue={company.userEmail}
                    />
                </label>
            </div>

            <form onSubmit={handlePasswordChange} className="password-form">
                <div className="second-colum">
                    <label htmlFor="old-password" className="account-label">
                        Huidig wachtwoord
                        <input
                            type="password"
                            id="old-password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="new-password" className="account-label">
                        Nieuw wachtwoord
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="third-colum">
                    <label htmlFor="confirm-password" className="account-label">
                        Herhaal nieuw wachtwoord
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit" className="account-button">
                        Wachtwoord wijzigen
                    </button>
                    <p>{success && <p className="success-message">{success}</p>}</p>
                    <p>{error && <p className="error-message">{error}</p>}</p>
                </div>
            </form>
        </section>
    );
}

export default AccountInfo;