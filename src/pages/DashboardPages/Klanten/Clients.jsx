import "./Clients.css";
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../../api/api.js";
import AddClientForm from "../../../components/dashboard/AddClientForm/AddClientForm.jsx";


function Clients() {
    const {companyId} = useParams();
    const [clients, setClients] = useState([]);
    const [company, setCompany] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // STATE: zoekterm input
    const [searchClient, setSearchClient] = useState("");

    // FILTER: filter klanten op zoekterm
    const filteredClients = clients.filter((client) =>
        client.name.toLowerCase().includes(searchClient.toLowerCase())
    );

    // API CALL: haal alle klanten op
    useEffect(() => {
        async function fetchClients() {
            try {
                const clientResponse = await api.get(
                    `/clients?companyId=${companyId}`);
                setClients(clientResponse.data);

                const companyRes = await api.get(`/companies/${companyId}`);
                setCompany(companyRes.data);

            } catch (error) {
                console.error("Kon klanten niet ophalen:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchClients();
    }, [companyId]); // opnieuw laden wanneer companyId verandert

    if (loading) return <p>Klanten worden geladen</p>;
    if (!company) return <p>Bedrijf niet gevonden.</p>;

    function handleClientAdded(newClient) {
        setClients((prev) => [...prev, newClient]);
        setShowForm(false);
        setSuccessMessage("Nieuw klant toegevoegd");
        setInterval(() => {
            setSuccessMessage("");
        }, 1500)
    }

    async function handleDeleteClient(clientId) {
        if (!clientId) return;

        const confirmDelete = window.confirm(
            "Weet je zeker dat je deze klant wilt verwijderen?"
        );
        if (!confirmDelete) return;

        try {
            await api.delete(`/clients/${clientId}`);

            // Verwijder lokaal
            setClients((prev) => prev.filter((c) => c.id !== clientId));

            setSuccessMessage(true);

        } catch (err) {
            console.error("Fout bij verwijderen klant:", err);
            setError("Kon de klant niet verwijderen.")
        }
    }


    return (
        <div className="dashboard">
            <SideBar/>

            <main className="dashboard-main">
                <HeaderDashboard
                    title="Klanten van" company={company.name ?? ""}
                />
                <section className="clients-container">
                    <div className="clients-content">
                        <h2>Alle klanten</h2>

                        <div className="search_add">
                            <input
                                type="text"
                                placeholder="Zoek klant..."
                                value={searchClient}
                                onChange={(e) => setSearchClient(e.target.value)}
                            />
                            <button className="btn"
                                    onClick={() => setShowForm(true)}>
                                + Klant toevoegen
                            </button>
                        </div>

                        {showForm && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <AddClientForm
                                        companyId={companyId}
                                        onClientAdded={handleClientAdded}
                                        onCancel={() => setShowForm(false)}
                                    />
                                </div>
                            </div>
                        )}

                    </div>

                    <section className="clients-table">
                        <table>
                            <tbody>
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <tr key={client.id}>
                                        <td>Klantnummer : {client.id}</td>
                                        <td>Voornaam : {client.name}</td>
                                        <td>E-mailadres : {client.email}</td>
                                        <td>Telefoonnummer: {client.phone}</td>
                                        <td onClick={() => handleDeleteClient(client.id)} className="client-delete">
                                            🗑️ Klant verwijderen
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">Geen klanten gevonden</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        {error && <p>Er is een fout opgetreden</p>}
                        {successMessage && <p>{successMessage}</p>}
                    </section>
                </section>

            </main>
        </div>
    );
}

export default Clients;
