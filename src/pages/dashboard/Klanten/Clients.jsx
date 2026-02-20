import "./Clients.css";
import SideBar from "../../../components/dashboard/header_sidebar/Sidebar/SideBar.jsx";
import HeaderDashboard from "../../../components/dashboard/header_sidebar/HeaderDashboard/HeaderDashboard.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../../api/api.js";
import AddClientForm from "../../../components/dashboard/client_page/AddClientForm/AddClientForm.jsx";
import DashboardLoader from "../../../components/dashboard/modal_loader/DashboardLoader/DashboardLoader.jsx";
import {useAutoClearMessage} from "../../../helpers/useAutoClearMessage.js";
import usePageTitle from "../../../helpers/usePageTitle.js";


function Clients() {
    usePageTitle("Klanten", "Dashboard");
    const {companyId} = useParams();
    const [clients, setClients] = useState([]);
    const [company, setCompany] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    useAutoClearMessage(error, setError);
    useAutoClearMessage(success, setSuccess);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);


    // STATE: zoekterm input
    const [searchClient, setSearchClient] = useState("");

    // FILTER: filter klanten op zoekterm
    const filteredClients = clients.filter((client) =>
        client?.name?.toLowerCase().includes(searchClient.toLowerCase())
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
            } catch {
                setError("Kon klanten niet ophalen");
            } finally {
                setLoading(false);
            }
        }
        fetchClients();
    }, [companyId]); // opnieuw laden wanneer companyId verandert


    function handleClientAdded(newClient) {
        setClients((prev) => [...prev, newClient]);
        setShowForm(false);
        setSuccess("Nieuw klant toegevoegd");
    }


    async function handleDeleteClient(clientId) {
        if (!clientId) return;
        const confirmDelete = window.confirm(
            "Weet je zeker dat je deze klant wilt verwijderen?"
        );
        if (!confirmDelete) return;

        try {
            await api.delete(`/clients/${clientId}`);

            setClients((prev) => prev.filter((c) => c.id !== clientId));
            setSuccess(true);
        } catch {
            setError("Kon de klant niet verwijderen.")
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <DashboardLoader text="Klanten laden..."/>;
    if (!company) return <p>Bedrijf niet gevonden.</p>;

    return (
        <main className="dashboard">
            <SideBar/>

            <section className="dashboard-main">
                <HeaderDashboard
                    title="Klanten van" company={company.name ?? ""}
                />
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <section className="clients-container">
                    <article className="clients-content">
                        <h2>Alle klanten</h2>

                        <article className="search_add">
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
                        </article>

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
                    </article>

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
                    </section>
                </section>
            </section>
        </main>
    );
}

export default Clients;
