import './Agenda.css'
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar.jsx";
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { companies } from "../../../dummy-data/companies.js";


function Agenda() {
    const {companyId} = useParams();
    const [events, setEvents] = useState([]);
    const company = companies.find(company => company.title === company.title);
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
    }, [])

    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.changeView(calendarView);
        }
    }, [calendarView]);


    // Dit haalt de afspraken op via de axios.get.
    useEffect(() => {
        async function fetchAppointments() {
            try {
                const res = await axios.get(`https://api.tijdslot.nl/companies/${companyId}/appointments`, {})

                const formattedEvents = res.data.map((appointment) => ({
                    title: appointment.clientName,
                    start: `${appointment.date}T${appointment.time}`,
                    end: `${appointment.date}T${calculateEndTime(appointment.time, 30)}`, // 30 min default duur
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.log("Fout bij het ophalen van de afspraken", error);
            }
        }
        fetchAppointments();
    }, [companyId]);

    // Functie om eindtijd te berekenen
    function calculateEndTime(startTime, durationMinutes) {
        const [hours, minutes] = startTime.split(":").map(Number);
        const date = new Date();
        date.setHours(hours)
        date.setMinutes(minutes + durationMinutes);
        return date.toTimeString().slice(0, 5);
    }

    // Als je op een datum klikt, komt er een alert voor een nieuwe afspraak
    const handleDateClick = async (info) => {
        const confirmNew = window.confirm(`Nieuwe afspraak op ${info.dateStr}`
        );
        if (!confirmNew) return;

        const naam = prompt("Naam klant")
        const email = prompt("E-mail klant")

        try {
            await axios.post(`https://api.tijdslot.nl/companies/${companyId}/appointments`, {
                clientName: naam,
                clientEmail: email,
                date: info.dateStr.split("T")[0],
                time: info.dateStr.split("T")[1].slice(0, 5)
            });
            alert("Afspraak toegevoegd");

            //     Herladen van afspraken na een nieuwe
            const response = await axios.get(`https://api.tijdslot.nl/companies/${companyId}/appointments`, {})
            setEvents(response.data.map((appointment) => ({
                title: appointment.clientName,
                start: `${appointment.date}T${appointment.time}`,
                end: `${appointment.date}T${appointment.time}`,
            })))
        } catch (error) {
            console.log("Fout bij het maken van deze afspraak", error);
        }
    }

    return (
        <>
            <div className="agenda">
                <Sidebar/>
                <div className="agenda-container">
                    <h1>Agenda van {company.title}</h1>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        ref={calendarRef} // zorgt ervoor dat Grid naar DAY gaat en geen week op telefoon
                        locale="nl"
                        allDaySlot={false}
                        slotMinTime="08:00:00"
                        slotMaxTime="18:00:00"
                        events={events}
                        height="80vh"
                        dateClick={handleDateClick}
                    />
                </div>
            </div>
        </>
    )
}

export default Agenda;