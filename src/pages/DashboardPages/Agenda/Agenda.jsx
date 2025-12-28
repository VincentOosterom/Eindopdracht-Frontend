import './Agenda.css';
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import api from "../../../api/api.js";
import { convertToISO } from "../../../helpers/date.js";
import { calculateEndTime } from "../../../helpers/time.js";
import { useParams } from "react-router-dom";
import EditAppointmentModal from "../../../components/dashboard/EditAppointment/EditAppointment.jsx";
import DashboardLoader from "../../../components/dashboard/DashboardLoader/DashboardLoader.jsx";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";
import AppointmentForm from "../../../components/website/Appointment_Form/AppointmentForm.jsx";
import DashboardAppointmentModal
    from "../../../components/dashboard/DashboardAppointmentModal/DashboardAppointmentModal.jsx";

function Agenda() {
    const { companyId } = useParams();

    const [company, setCompany] = useState(null);
    const [services, setServices] = useState([]);
    const [events, setEvents] = useState([]);
    const [calendarView, setCalendarView] = useState("timeGridWeek");
    const calendarRef = useRef(null);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [clickedSlot, setClickedSlot] = useState(null); // { isoDate, time, backendDate



    // ============== 1. Bedrijf ophalen ==============
    useEffect(() => {
        async function fetchCompany() {
            try {
                const res = await api.get(`/companies/${companyId}`);
                setCompany(res.data);
            } catch (err) {
                console.log("Bedrijf ophalen mislukt:", err);
            }
        }
        fetchCompany();
    }, [companyId]);

    // ============== 2. Services ophalen ==============
    useEffect(() => {
        async function fetchServices() {
            try {
                const res = await api.get(`/services?companyId=${companyId}`);
                setServices(res.data);
            } catch (err) {
                console.error("Services ophalen mislukt:", err);
            }
        }
        fetchServices();
    }, [companyId]);


    // ============== 3. Afspraken ophalen ==============
    async function refreshAppointments() {
        try {
            const res = await api.get(`/appointments?companyId=${companyId}`);

            const formatted = res.data.map((appointment) => {
                const service = services.find(s => s.id === appointment.serviceId);

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
        } catch (error) {
            console.log("Afspraken ophalen mislukt:", error);
        }
    }

    useEffect(() => {
        if (services.length > 0) {
            refreshAppointments();
        }
    }, [services, companyId]);



    // ====================== 4. Layout responsive ======================
    useEffect(() => {
        function handleResize() {
            setCalendarView(window.innerWidth <= 768 ? "timeGridDay" : "timeGridWeek");
        }


        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const api = calendarRef.current?.getApi();
        if (api) api.changeView(calendarView);
    }, [calendarView]);



    // ====================== 5. Nieuwe afspraak ======================
    const handleDateClick = (info) => {
        setClickedSlot({
            date: info.date,          // Date object
            dateStr: info.dateStr     // "2025-12-11T13:30"
        });
        setShowCreateModal(true);
    };


    // ====================== 6. VERWIJDER afspraak ======================
    async function handleDeleteEvent(eventId) {
        if (!window.confirm("Weet je zeker dat je deze afspraak wilt verwijderen?")) return;

        await api.delete(`/appointments/${eventId}`);
        refreshAppointments();
        setShowModal(false);
    }


    // ====================== 7. BEWERK afspraak ======================
    async function handleSaveEvent(data) {
        const backendDate = data.date.split("-").reverse().join("-");

        await api.patch(`/appointments/${data.id}`, {
            clientName: data.clientName,
            clientEmail: data.clientEmail,
            serviceId: Number(data.serviceId),
            date: backendDate,
            time: data.time,
        });

        refreshAppointments();
        setShowModal(false);
    }
    return (
        <div className="dashboard">
            <SideBar />

            <main className="agenda-container">
                <HeaderDashboard title="Agenda -" company={company?.name} />

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
                        list: "Lijst"
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
                    dateClick={handleDateClick}
                    eventClick={(info) => {
                        setSelectedEvent(info.event);
                        setShowModal(true);

                    }}
                />

                {showModal && selectedEvent && (
                    <EditAppointmentModal
                        event={selectedEvent}
                        services={services}
                        onClose={() => setShowModal(false)}
                        onSave={handleSaveEvent}
                        onDelete={handleDeleteEvent}
                    />
                )}

                {showCreateModal && clickedSlot && (
                    <DashboardAppointmentModal
                        initialDate={clickedSlot.date}
                        services={services}
                        companyId={companyId}
                        onClose={() => setShowCreateModal(false)}
                        onSuccess={() => {
                            refreshAppointments();
                            setShowCreateModal(false);
                        }}
                    />
                )}
            </main>
        </div>
    );
}

export default Agenda;
