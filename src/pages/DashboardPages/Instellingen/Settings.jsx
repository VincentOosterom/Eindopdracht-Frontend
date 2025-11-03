import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar.jsx";
import {useParams} from "react-router-dom";
import {companies} from "../../../dummyData/companies.js";
import './Settings.css'
import HeaderDashboard from "../../../components/Dashboard/HeaderDashboard/HeaderDashboard.jsx";

function Settings() {

    const {companyId} = useParams();
    const company = companies.find((c) => c.companyId === companyId);


    return (
        <>
            <div className="dashboard">
                <Sidebar/>
                <div className="dashboard-main">
                    <div className="dashboard-header">
                        <HeaderDashboard title="Instellingen" company={company.title} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Settings;