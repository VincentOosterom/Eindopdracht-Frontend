import Sidebar from "../../../components/dashboard/Sidebar/Sidebar.jsx";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";
import {useParams} from "react-router-dom";
import {companies} from "../../../dummy-data/companies.js";

function Clients() {

    const {companyId} = useParams();
    const company = companies.find((c) => c.companyId === companyId);

    return (
        <>
            <div className="dashboard">
                <aside className="dashboard-sidebar">
                    <Sidebar />
                </aside>

                <main className="dashboard-main">
                    <header className="dashboard-header">
                        <HeaderDashboard title="Klanten van" company={company.title}/>
                    </header>

                    <div className="clients_container">
                        <div className="clients_content">
                            <h2>Alle klanten</h2>
                            <input type="text"
                                   placeholder="Zoek klant"/>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Clients;