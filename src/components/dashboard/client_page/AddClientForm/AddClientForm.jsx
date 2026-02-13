import './AddClientForm.css'

import {useState} from "react";
import api from "../../../../api/api.js";
import "./AddClientForm.css";

function AddClientForm({companyId, onClientAdded, onCancel}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!name || !email) {
            setError("Naam en e-mail zijn verplicht.");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            setError("Vul een geldig e-mailadres in.");
            return;
        }

        if (phone.length > 10 || phone.length < 10) {
            setError("Telefoonnummer is niet correct");
            return;
        }

        setLoading(true);

        try {
            const res = await api.post("/clients", {
                companyId: Number(companyId),
                name,
                email,
                phone
            });

            onClientAdded(res.data);

        } catch {
            setError("Klant kon niet worden toegevoegd.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="add-client-form">
            <h2>Nieuwe klant</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Volledige naam"
                    />
                </label>

                <label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="E-mail"
                    />
                </label>

                <label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Telefoonnummer"/>
                </label>

                {error && <p className="error-msg">{error}</p>}

                <div className="btn-wrapper">
                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? "Bezig..." : "Opslaan"}
                    </button>

                    <button type="button" className="btn cancel" onClick={onCancel}>
                        Annuleren
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddClientForm;
