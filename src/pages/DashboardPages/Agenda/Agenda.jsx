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
import {useParams} from "react-router-dom";


function Agenda() {
    const { companyId } = useParams();
    const [events, setEvents] = useState([]);
    const [calendarView, setCalendarView] = useState("timeGridWeek");
    const calendarRef = useRef(null);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 768) {
                setCalendarView("timeGridDay");
            } else {
                setCalendarView("timeGridWeek");
            }
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

    // Afspraken ophalen
    useEffect(() => {
        async function fetchAppointments() {
            try {
                const res = await api.get(
                    `/appointments?companyId=${companyId}`
                );

                const formattedEvents = res.data.map((appointment) => ({
                    id: appointment.id,
                    title: appointment.clientName,
                    start: `${convertToISO(appointment.date)}T${
                        appointment.time
                    }`,
                    end: `${convertToISO(appointment.date)}T${calculateEndTime(
                        appointment.time,
                        30
                    )}`, // 30 min default
                }));

                setEvents(formattedEvents);
            } catch (error) {
                console.log(
                    "Fout bij het ophalen van de afspraken",
                    error
                );
            }
        }

        fetchAppointments();
    }, [companyId]);

    // Nieuwe afspraak maken
    const handleDateClick = async (info) => {
        const confirmNew = window.confirm(
            `Nieuwe afspraak op ${info.dateStr}?`
        );
        if (!confirmNew) return;

        const clientName = prompt("Naam klant:");
        const clientEmail = prompt("E-mail klant:");

        if (!clientName || !clientEmail) return;

        const [isoDate, time] = info.dateStr.split("T");
        // isoDate = YYYY-MM-DD, maar jouw backend verwacht dd-mm-yyyy
        const [year, month, day] = isoDate.split("-");
        const backendDate = `${day}-${month}-${year}`;

        try {
            await api.post(`/appointments`, {
                companyId: Number(companyId),
                clientName,
                clientEmail,
                serviceId: 1, // TODO: koppelen aan echte service
                date: backendDate,
                time: time.slice(0, 5),
            });

            // Na toevoegen opnieuw laden:
            const res = await api.get(
                `/appointments?companyId=${companyId}`
            );
            const formatted = res.data.map((appointment) => ({
                id: appointment.id,
                title: appointment.clientName,
                start: `${convertToISO(appointment.date)}T${
                    appointment.time
                }`,
                end: `${convertToISO(appointment.date)}T${calculateEndTime(
                    appointment.time,
                    30
                )}`,
            }));
            setEvents(formatted);
        } catch (error) {
            console.log("Fout bij het maken van deze afspraak", error);
        }
    };
    return (
        <div className="dashboard">
            <SideBar />

            <main className="agenda-container">
                <h1>Agenda van bedrijf</h1>

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
