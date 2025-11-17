import "./Clients.css";
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {companies} from "../../../dummy-data/companies.js";

function Clients() {

    const {companyId} = useParams();
    const company = companies.find((c) => c.companyId === companyId);

    // STATE: klanten van de API
    const [clients, setClients] = useState([]);

    // STATE: zoekterm input
    const [searchClient, setSearchClient] = useState("");

    // API CALL: haal alle klanten op
    useEffect(() => {
        async function fetchClients() {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/clients?companyId=${companyId}`
                );

                setClients(response.data); // zet klanten in state
            } catch (error) {
                console.error("Kon klanten niet ophalen:", error);
            }
        }

        fetchClients();
    }, [companyId]); // opnieuw laden wanneer companyId verandert


    // FILTER: filter klanten op zoekterm
    const filteredClients = clients.filter((client) =>
        client.name.toLowerCase().includes(searchClient.toLowerCase())
    );


    return (
        <div className="dashboard">
            <SideBar/>

            <main className="dashboard-main">
                <HeaderDashboard
                    title="Klanten van"
                    company={company.title}
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
                            <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Email</th>
                            </tr>
                            </thead>

                            <tbody>
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <tr key={client.id}>
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
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

            </main>
        </div>
    );
}

export default Clients;
