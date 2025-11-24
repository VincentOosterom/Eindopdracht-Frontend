import "./Clients.css";
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../../api/api.js";

function Clients() {
    const { companyId } = useParams();
    const [clients, setClients] = useState([]);
    const [company , setCompany] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    // STATE: zoekterm input
    const [searchClient, setSearchClient] = useState("");


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



    // FILTER: filter klanten op zoekterm
    const filteredClients = clients.filter((client) =>
        client.name.toLowerCase().includes(searchClient.toLowerCase())
    );


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

                        <input
                            type="text"
                            placeholder="Zoek klant..."
                            value={searchClient}
                            onChange={(e) => setSearchClient(e.target.value)}
                        />
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
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">Geen klanten gevonden</td>
                                </tr>
                            )}
                            </tbody>
                            {error && <p>Er is een fout opgetreden</p>}
                        </table>
                    </section>
                </section>

            </main>
        </div>
    );
}

export default Clients;
