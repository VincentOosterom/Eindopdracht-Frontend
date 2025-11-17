import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import {useParams} from "react-router-dom";
import {companies} from "../../../dummy-data/companies.js";
import './Settings.css'
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";
import AccountInfo from "../../../components/dashboard/AccountInfo/AccountInfo.jsx";
import AccountSchedule from "../../../components/dashboard/AccountSchedule/AccountSchedule.jsx";

function Settings() {

    const {companyId} = useParams();
    const company = companies.find((c) => c.companyId === companyId);

    const days = [
        "Maandag",
        "Dinsdag",
        "Woensdag",
        "Donderdag",
        "Vrijdag",
        "Zaterdag",
        "Zondag"
    ];
    const services = [
        "Knippen",
        "Knippen & Baard",
        "Wassen, Knippen en Baard"
    ]


    return (
        <>
            <div className="dashboard">
                <SideBar/>
                <main className="dashboard-main">
                    <HeaderDashboard title="Instellingen" company={company.title}/>
                    <AccountInfo company={company}/>
                    <AccountSchedule days={days} services={services}/>
                </main>
            </div>

        </>
    )
}

export default Settings;