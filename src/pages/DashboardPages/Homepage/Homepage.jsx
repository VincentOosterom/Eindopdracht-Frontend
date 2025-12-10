import "./Homepage.css";
import { useEffect, useState } from "react";
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/api.js";
import { convertToISO } from "../../../helpers/date.js"; // pad evt. a


function Homepage() {
    const { companyId } = useParams();
    const navigate = useNavigate();

    const [company, setCompany] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [appointmentsToday, setAppointmentsToday] = useState([]);
    const [loading, setLoading] = useState(true);
    const [services, setService] = useState([]);

    useEffect(() => {
        async function loadDashboard() {
            try {
                // 1. Company ophalen
                const companyRes = await api.get(`/companies/${companyId}`);
                setCompany(companyRes.data);

                // 2. Afspraken ophalen voor dit bedrijf
                const apptRes = await api.get(
                    `/appointments?companyId=${companyId}`
                );
                const allAppointments = apptRes.data;
                setAppointments(allAppointments);

                const getServices = await api.get(`/services?companyId=${companyId}`);

                const allServices = getServices.data;
                setService(allServices);

                const todayIso = new Date().toISOString().split("T")[0];

                const todayList = allAppointments.filter(
                    (appt) => convertToISO(appt.date) === todayIso
                );

                setAppointmentsToday(todayList);
            } catch (err) {
                console.error("Fout bij ophalen dashboard data:", err);
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, [companyId]);

    function handleGoToAgenda() {
        navigate(`/dashboard/${companyId}/agenda`);
    }

    if (loading) return <p>Dashboard laden...</p>;
    if (!company) return <p>Bedrijf niet gevonden.</p>;

    const nextAppointment = appointmentsToday[0];

    return (
        <div className="dashboard">
            <SideBar />
            <main className="dashboard-main">

                {/* HEADER */}
                <HeaderDashboard
                    title="Welkom terug,"
                    company={company.name ?? ""}
                />

                {/* SECTION: Vandaag */}
                <section className="dashboard-today">
                    <article>
                        <h3>Afspraken vandaag</h3>
                        <p>{appointmentsToday.length}</p>
                    </article>

                    <article>
                        <h3>Volgende afspraak</h3>
                        <p>
                            {appointmentsToday.length > 0
                                ? `${nextAppointment.time} - ${nextAppointment.clientName}`
                                : "Geen afspraken gepland"}
                        </p>
                    </article>

                    <button className="button-appointment">
                        Nieuwe afspraak
                    </button>
                </section>

                {/* SECTION: Quick look */}
                <section className="quick-look-section">

                    {/* Vandaag agenda */}
                    <section className="dashboard-quick-agenda">
                        <h3>Vandaag in één oogopslag</h3>

                        <table className="today-table">
                            <thead>
                            <tr>
                                <th>Tijd</th>
                                <th>Klant</th>
                                <th>Dienst</th>
                            </tr>
                            </thead>

                            <tbody>
                            {appointmentsToday.length > 0 ? (
                                appointmentsToday.map((appt) => (
                                    <tr key={appt.id}>
                                        <td>{appt.time}</td>
                                        <td>{appt.clientName}</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">Geen afspraken</td>
                                </tr>
                            )}
                            </tbody>
                        </table>

                        <button onClick={handleGoToAgenda}>
                            Bekijk volledige agenda
                        </button>
                    </section>

                    {/* Weekoverzicht (placeholder tot je weekberekening maakt) */}
                    <article className="dashboard-quick-this-week">
                        <h3>Weekoverzicht</h3>

                        <ul className="stats-list">
                            <li>
                                <p>Afspraken deze week</p>
                                <strong>{appointments.length}</strong>
                            </li>
                            <li>
                                <p>Totale omzet</p>
                                <strong>0</strong>
                                {/* omzet komt als jij services koppelt */}
                            </li>
                        </ul>
                    </article>
                </section>

            </main>
        </div>
    );
}

export default Homepage;
