import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";
import AccountInfo from "../../../components/dashboard/AccountInfo/AccountInfo.jsx";
import AccountSchedule from "../../../components/dashboard/AccountSchedule/AccountSchedule.jsx";
import api from "../../../api/api.js";
import "./Settings.css";

function Settings() {
    const { companyId } = useParams();

    const [company, setCompany] = useState(null);
    const [services, setServices] = useState([]);
    const [days, setDays] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                // 1. BEDRIJF OPHALEN
                const companyRes = await api.get(`/companies/${companyId}`);
                setCompany(companyRes.data);

                // 2. SERVICES OPHALEN
                const servicesRes = await api.get(`/services?companyId=${companyId}`);
                setServices(servicesRes.data);

                // 3. OPENINGSTIJDEN OPHALEN
                const availRes = await api.get(`/availabilities?companyId=${companyId}`);
                setDays(availRes.data);

            } catch (err) {
                console.error("Fout bij ophalen instellingen:", err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [companyId]);

    if (loading) return <p>Instellingen laden...</p>;
    if (!company) return <p>Bedrijf niet gevonden.</p>;

    return (
        <div className="dashboard">
            <SideBar />
            <main className="dashboard-main">
                <HeaderDashboard title="Instellingen" company={company.name} />

                {/* Bedrijfsgegevens */}
                <AccountInfo company={company}  />

                {/* Dienstaanbod + openingstijden */}
                <AccountSchedule days={days} services={services} companyId={companyId} />
            </main>
        </div>
    );
}

export default Settings;
