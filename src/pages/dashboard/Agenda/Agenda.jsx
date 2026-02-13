import './Agenda.css';
import SideBar from "../../../components/dashboard/header_sidebar/Sidebar/SideBar.jsx";
import React, {useEffect, useRef, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import api from "../../../api/api.js";
import {convertToISO} from "../../../helpers/date.js";
import {calculateEndTime} from "../../../helpers/time.js";
import {useParams} from "react-router-dom";
import EditAppointmentModal from "../../../components/dashboard/agenda_page/EditAppointment/EditAppointment.jsx";
import HeaderDashboard from "../../../components/dashboard/header_sidebar/HeaderDashboard/HeaderDashboard.jsx";
import usePageTitle from "../../../helpers/usePageTitle.js";
import {useMemo} from "react";


function Agenda() {
    const { companyId } = useParams();
    usePageTitle("Agenda", "Dashboard");

    const [company, setCompany] = useState(null);
    const [services, setServices] = useState([]);
    const [events, setEvents] = useState([]);
    const [calendarView, setCalendarView] = useState("timeGridWeek");
    const calendarRef = useRef(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Lookup map voor services
    const serviceMap = useMemo(() => {
        return Object.fromEntries(
            services.map(service => [service.id, service])
        );
    }, [services]);

    // ====================== DATA LADEN ======================
    useEffect(() => {
        async function loadAgenda() {
            setLoading(true);
            setError(null);

            try {
                const [companyRes, servicesRes, appointmentsRes] =
                    await Promise.all([
                        api.get(`/companies/${companyId}`),
                        api.get(`/services?companyId=${companyId}`),
                        api.get(`/appointments?companyId=${companyId}`)
                    ]);

                const companyData = companyRes.data;
                const servicesData = servicesRes.data;
                const appointmentsData = appointmentsRes.data;

                setCompany(companyData);
                setServices(servicesData);

                const serviceLookup = Object.fromEntries(
                    servicesData.map(s => [s.id, s])
                );

                const formattedEvents = appointmentsData.map((appointment) => {
                    const service = serviceLookup[appointment.serviceId];

                    return {
                        id: appointment.id,
                        title: `${service?.name || "Dienst"} - ${appointment.clientName}`,
                        start: `${convertToISO(appointment.date)}T${appointment.time}`,
                        end: `${convertToISO(appointment.date)}T${calculateEndTime(
                            appointment.time,
                            service?.duration || 30
                        )}`,
                        extendedProps: {
                            clientName: appointment.clientName,
                            clientEmail: appointment.clientEmail,
                            serviceId: appointment.serviceId,
                            rawDate: appointment.date,
                            time: appointment.time
                        }
                    };
                });

                setEvents(formattedEvents);

            } catch {
                setError("Agenda kon niet geladen worden. Probeer het opnieuw.");
            } finally {
                setLoading(false);
            }
        }

        loadAgenda();
    }, [companyId]);

    // ====================== Responsive view ======================
    useEffect(() => {
        function handleResize() {
            setCalendarView(
                window.innerWidth <= 768 ? "timeGridDay" : "timeGridWeek"
            );
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const apiCalendar = calendarRef.current?.getApi();
        if (apiCalendar) apiCalendar.changeView(calendarView);
    }, [calendarView]);

    // ====================== REFRESH NA DELETE/UPDATE ======================
    async function refreshAppointments() {
        try {
            const res = await api.get(`/appointments?companyId=${companyId}`);

            const formatted = res.data.map((appointment) => {
                const service = serviceMap[appointment.serviceId];

                return {
                    id: appointment.id,
                    title: `${service?.name || "Dienst"} - ${appointment.clientName}`,
                    start: `${convertToISO(appointment.date)}T${appointment.time}`,
                    end: `${convertToISO(appointment.date)}T${calculateEndTime(
                        appointment.time,
                        service?.duration || 30
                    )}`,
                    extendedProps: {
                        clientName: appointment.clientName,
                        clientEmail: appointment.clientEmail,
                        serviceId: appointment.serviceId,
                        rawDate: appointment.date,
                        time: appointment.time
                    }
                };
            });

            setEvents(formatted);
        } catch {
            setError("Afspraken vernieuwen mislukt.");
        }
    }

    async function handleDeleteEvent(eventId) {
        if (!window.confirm("Weet je zeker dat je deze afspraak wilt verwijderen?"))
            return;

        try {
            await api.delete(`/appointments/${eventId}`);
            await refreshAppointments();
        } catch {
            setError("Verwijderen mislukt.");
        }

        setShowModal(false);
    }

    async function handleSaveEvent(data) {
        const backendDate = data.date.split("-").reverse().join("-");

        try {
            await api.patch(`/appointments/${data.id}`, {
                clientName: data.clientName,
                clientEmail: data.clientEmail,
                serviceId: Number(data.serviceId),
                date: backendDate,
                time: data.time,
            });

            await refreshAppointments();

        } catch {
            setError("Afspraken bewerken mislukt.");
        }

        setShowModal(false);
    }

    return (
        <section className="dashboard">
            <SideBar />
            <main className="agenda-container">
                <HeaderDashboard
                    title="Agenda van"
                    company={company?.name}
                />
                {error && (
                    <p className="error-message" role="alert">
                        {error}
                    </p>
                )}
                {loading ? (
                    <p>Agenda laden...</p>
                ) : (
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay"
                        }}
                        buttonText={{
                            today: "Vandaag",
                            month: "Maand",
                            week: "Week",
                            day: "Dag",
                        }}
                        ref={calendarRef}
                        locale="nl"
                        allDaySlot={false}
                        slotMinTime="08:00:00"
                        slotMaxTime="23:00:00"
                        height="80vh"
                        nowIndicator={true}
                        selectOverlap={false}
                        events={events}
                        editable={true}
                        eventClick={(info) => {
                            setSelectedEvent(info.event);
                            setShowModal(true);
                        }}
                    />
                )}

                {showModal && selectedEvent && (
                    <EditAppointmentModal
                        event={selectedEvent}
                        services={services}
                        onClose={() => setShowModal(false)}
                        onSave={handleSaveEvent}
                        onDelete={handleDeleteEvent}
                    />
                )}
            </main>
        </section>
    );
}

export default Agenda;