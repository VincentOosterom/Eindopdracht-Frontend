import "./Homepage.css";
import {useEffect, useState} from "react";
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../../api/api.js";
import {convertToISO, getEndOfWeek, getStartOfWeek} from "../../../helpers/date.js";
import DashboardLoader from "../../../components/dashboard/DashboardLoader/DashboardLoader.jsx";
import DashboardAppointmentModal
    from "../../../components/dashboard/DashboardAppointmentModal/DashboardAppointmentModal.jsx";
import {calculateTax, calculateTotalRevenue} from "../../../helpers/calculateTotalRevenue.js";


function Homepage() {
    const {companyId} = useParams();
    const navigate = useNavigate();
    const [now, setNow] = useState(new Date());

    function handleGoToAgenda() {
        navigate(`/dashboard/${companyId}/agenda`);}


    const [company, setCompany] = useState(null);
    const [availabilities, setAvailabilities] = useState([]);
    const [appointments, setAppointments] = useState([]);

    // Alle afspraken van bedrijf
    const [appointmentsToday, setAppointmentsToday] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [services, setService] = useState([]);

    // Voor nieuwe afspraak
    const [showModal, setShowModal] = useState(false);

    const nextAppointment = (() => {
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        return appointmentsToday
            .map(appt => {
                const [h, m] = appt.time.split(":").map(Number);
                return {...appt, minutes: h * 60 + m};
            })
            .filter(appt => appt.minutes > currentMinutes)
            .sort((a, b) => a.minutes - b.minutes)[0] ?? null;
    })();

    // Aantal afspraken per week tonen
    const startOfWeek = getStartOfWeek(now);
    const endOfWeek = getEndOfWeek(now);


    const appointmentsThisWeek = appointments.filter((a) => {
        if (!a.date) return false;

        const iso = convertToISO(a.date);        // "11-12-2025" → "2025-12-11"
        const date = new Date(`${iso}T00:00:00`);

        return date >= startOfWeek && date <= endOfWeek;
    });

    const revenueThisWeek = calculateTotalRevenue(
        appointmentsThisWeek,
        services
    );

    const taxThisWeek = calculateTax(revenueThisWeek);


    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 60_000);
        return () => clearInterval(id);
    }, []);

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
                // Alle afspraken opslaan in variable
                const allAppointments = apptRes.data;
                setAppointments(allAppointments);

                // Service ophalen
                const getServices = await api.get(`/services?companyId=${companyId}`);

                // Alle services opslaan in variable
                const allServices = getServices.data;
                setService(allServices);

                const availRes = await api.get(`/availabilities?companyId=${companyId}`);
                setAvailabilities(availRes.data);

                const todayIso = new Date().toISOString().split("T")[0];

                const todayList = allAppointments.filter(
                    (appt) => convertToISO(appt.date) === todayIso);
                setAppointmentsToday(todayList);

            } catch {
                setError("Fout bij ophalen dashboard gegevens");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, [companyId]);


    if (loading) return <DashboardLoader text="Homepage laden.."/>;
    if (!company) return <p>Bedrijf niet gevonden.</p>;


    return (
        <section className="dashboard">
            <SideBar/>
            <main className="dashboard-main">
                <HeaderDashboard title="Welkom terug," company={company.name ?? ""}/>
                {error && <p className="error-message" role="alert">{error}</p>}

                <section className="dashboard-today">
                    <article>
                        <h3>Afspraken vandaag</h3>
                        <p>{appointmentsToday.length}</p>
                    </article>

                    <article>
                        <h3>Volgende afspraak</h3>
                        <p>
                            {nextAppointment
                                ? `${nextAppointment.time} - ${nextAppointment.clientName}`
                                : "Geen afspraken meer vandaag"}
                        </p>
                    </article>

                    <button className="button-appointment" onClick={() => setShowModal(true)}>
                        Nieuwe afspraak
                    </button>
                    {showModal && (
                        <DashboardAppointmentModal
                            services={services}
                            companyId={companyId}
                            availabilities={availabilities}
                            onClose={() => setShowModal(false)}
                        />
                    )}
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
                                <strong>{appointmentsThisWeek.length}</strong>
                            </li>
                            <li>
                                <p>Totale omzet deze week</p>
                                <strong>€{revenueThisWeek}</strong>
                            </li>
                            <li>
                                <p>BTW</p>
                                <strong>€{taxThisWeek}</strong>
                            </li>
                        </ul>
                    </article>
                </section>
            </main>
        </section>
    );
}

export default Homepage;
