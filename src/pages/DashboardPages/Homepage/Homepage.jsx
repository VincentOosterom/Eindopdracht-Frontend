import "./Homepage.css";
import { useEffect, useState } from "react";
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/api.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { convertToISO, isToday } from "../../../helpers/date.js";


function Homepage() {
    const { companyId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // STATES
    const [profile, setProfile] = useState(null);
    const [appointmentsToday, setAppointmentsToday] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // === FETCH DASHBOARD DATA ===
    useEffect(() => {
        async function loadDashboard() {
            try {
                // 1. PROFIEL (bedrijfnaam etc)
                const profileRes = await api.get(`/profiles/${user.userId}`);
                setProfile(profileRes.data);

                // 2. APPOINTMENTS
                const appointmentRes = await api.get(`/appointments?userId=${user.userId}`);
                const allAppointments = appointmentRes.data;
                setAppointments(allAppointments);

                // Vandaag filteren
                const today = new Date().toISOString().split("T")[0];
                const todayList = allAppointments.filter(a => isToday(a.date));
                setAppointmentsToday(todayList);

            } catch (error) {
                console.error("Fout bij ophalen dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, [user.userId]);

    function handleGoToAgenda() {
        navigate(`/dashboard/${companyId}/agenda`);
    }

    if (loading) return <p>Dashboard laden...</p>;

    return (
        <div className="dashboard">
            <SideBar />
            <main className="dashboard-main">

                {/* HEADER */}
                <HeaderDashboard
                    title="Welkom terug,"
                    company={profile?.companyName ?? "Jouw bedrijf"}
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
                                ? `${appointmentsToday[0].time} - ${appointmentsToday[0].clientName}`
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
                                        <td>{appt.serviceId}</td>
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
                                <strong>€0</strong>
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
