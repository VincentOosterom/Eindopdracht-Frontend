import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";
import AccountInfo from "../../../components/dashboard/AccountInfo/AccountInfo.jsx";
import AccountSchedule from "../../../components/dashboard/AccountSchedule/AccountSchedule.jsx";
import api from "../../../api/api.js";
import "./Settings.css";
import DashboardLoader from "../../../components/dashboard/DashboardLoader/DashboardLoader.jsx";

function Settings() {
    const {companyId} = useParams();

    const [company, setCompany] = useState(null);
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const [days, setDays] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {
        async function loadData() {
            try {
                // 1. BEDRIJF OPHALEN
                const companyRes = await api.get(`/companies/${companyId}`);
                setCompany(companyRes.data);

                // 2. SERVICES OPHALEN
                const servicesRes = await api.get(`/services?companyId=${companyId}`);
                setServices(servicesRes.data);

                const users = await api.get(`/users?companyId=${companyId}`);
                setUser(users.data);

                // 3. OPENINGSTIJDEN OPHALEN
                const availRes = await api.get(`/availabilities?companyId=${companyId}`);
                setDays(availRes.data);


            } catch {
                setError("Fout bij ophalen instellingen")
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [companyId]);


    if (loading) return <DashboardLoader text="Instellingen laden..."/>;
    if (!company) return <p>Bedrijf niet gevonden.</p>;

    return (
        <main className="dashboard">
            <SideBar/>
            <section className="dashboard-main">
                {error && <p className="error-message">{error}</p>}
                <HeaderDashboard title="Instellingen" company={company.name}/>

                {/* Bedrijfsgegevens */}
                <AccountInfo company={company} user={user}/>

                {/* Dienstaanbod + openingstijden */}
                <AccountSchedule days={days} services={services} companyId={companyId}/>
            </section>
        </main>
    );
}

export default Settings;
