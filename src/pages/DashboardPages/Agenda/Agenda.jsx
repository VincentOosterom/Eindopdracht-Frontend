import './Agenda.css';
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import api from "../../../api/api.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { convertToISO } from "../../../helpers/date.js";
import { calculateEndTime } from "../../../helpers/time.js";


function Agenda() {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [calendarView, setCalendarView] = useState("timeGridWeek");
    const calendarRef = useRef(null);

    // 📌 Resizing (week naar day)
    useEffect(() => {
        function handleResize() {
            setCalendarView(window.innerWidth <= 768 ? "timeGridDay" : "timeGridWeek");
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.changeView(calendarView);
        }
    }, [calendarView]);

    // 📌 Afspraak laden uit NOVI API
    useEffect(() => {
        async function fetchAppointments() {
            try {
                const res = await api.get(`/appointments?userId=${user.userId}`);

                const formatted = res.data.map(appt => ({
                    id: appt.id,
                    title: appt.clientName,
                    start: `${convertToISO(appt.date)}T${appt.time}`,
                    end: `${convertToISO(appt.date)}T${calculateEndTime(appt.time, 30)}`,
                }));

                setEvents(formatted);
            } catch (err) {
                console.log("Fout bij ophalen afspraken:", err);
            }
        }

        fetchAppointments();
    }, [user.userId]);



    // 📌 Nieuwe afspraak toevoegen
    const handleDateClick = async (info) => {
        const confirmNew = window.confirm(`Nieuwe afspraak op: ${info.dateStr}?`);
        if (!confirmNew) return;

        const clientName = prompt("Naam klant:");
        const clientEmail = prompt("Email klant:");

        const [date, time] = info.dateStr.split("T");

        try {
            // POST i.p.v. GET
            await api.post(`/appointments`, {
                userId: user.userId,
                clientName,
                clientEmail,
                date,
                time
            });

            alert("Afspraak toegevoegd!");

            // Reload afspraken
            const res = await api.get(`/appointments?userId=${user.userId}`);
            const formatted = res.data.map(appt => ({
                title: appt.clientName,
                start: `${appt.date}T${appt.time}`,
                end: `${appt.date}T${appt.time}`,
            }));

            setEvents(formatted);

        } catch (err) {
            console.log("Fout bij toevoegen afspraak:", err);
        }
    };

    return (
        <div className="dashboard">
            <SideBar />

            <main className="agenda-container">
                <h1>Agenda van bedrijf #{user.userId}</h1>

                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    ref={calendarRef}
                    locale="nl"
                    allDaySlot={false}
                    slotMinTime="08:00:00"
                    slotMaxTime="18:00:00"
                    height="80vh"
                    events={events}
                    dateClick={handleDateClick}
                />
            </main>
        </div>
    );
}

export default Agenda;
