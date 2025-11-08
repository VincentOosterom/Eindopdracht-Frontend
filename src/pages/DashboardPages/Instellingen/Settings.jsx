import Sidebar from "../../../components/dashboard/Sidebar/Sidebar.jsx";
import {useParams} from "react-router-dom";
import {companies} from "../../../dummy-data/companies.js";
import './Settings.css'
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";

function Settings() {

    const {companyId} = useParams();
    const company = companies.find((c) => c.companyId === companyId);


    return (
        <>
            <div className="dashboard">
                <aside className="dashboard-sidebar">
                    <Sidebar/>
                </aside>
                <main className="dashboard-main">
                    <header className="dashboard-header">
                        <HeaderDashboard title="Instellingen" company={company.title}/>
                    </header>

                </main>
            </div>

        </>
    )
}

export default Settings;