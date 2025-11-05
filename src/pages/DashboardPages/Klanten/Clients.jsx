import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar.jsx";
import HeaderDashboard from "../../../components/Dashboard/HeaderDashboard/HeaderDashboard.jsx";
import {useParams} from "react-router-dom";
import {companies} from "../../../dummyData/companies.js";

function Clients() {

    const {companyId} = useParams();
    const company = companies.find((c) => c.companyId === companyId);

    return (
        <>
            <div className="dashboard">
                <Sidebar/>
                <div className="dashboard-main">
                    <div className="dashboard-header">
                        <HeaderDashboard title="Klanten van" company={company.title}/>
                    </div>
                    <div className="clients_container">
                        <div className="clients_content">
                            <h2>Alle klanten</h2>
                            <input type="text"
                                   placeholder="Zoek klant"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Clients;