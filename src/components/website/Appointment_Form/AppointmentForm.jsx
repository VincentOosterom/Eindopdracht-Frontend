import './AppointmentForm.css';
import {useState, useEffect} from "react";
import api from "../../../api/api";
import {doTimesOverlap} from "../../../helpers/appointments";


function AppointmentForm({services, companyId, availabilities}) {

    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');


    const [availableTimes, setAvailableTimes] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    // 1. Haal alle bestaande afspraken op voor dit bedrijf
    useEffect(() => {
        async function fetchAppointments() {
            const res = await api.get(`/appointments?companyId=${companyId}`);
            setAppointments(res.data);
        }

        fetchAppointments();
    }, [companyId]);


    // 3. Genereer alle tijden op basis van openingstijden + service duur + bestaande afspraken
    useEffect(() => {
        if (!selectedDate || !selectedService) return;

        const service = services.find(s => s.id === Number(selectedService));
        const duration = service?.duration || 30;

        const weekdayNames = [
            "Zondag",
            "Maandag",
            "Dinsdag",
            "Woensdag",
            "Donderdag",
            "Vrijdag",
            "Zaterdag",
        ];

        const jsDate = new Date(selectedDate);
        const weekday = weekdayNames[jsDate.getDay()];

        const availability = availabilities.find(a => a.dayOfWeek === weekday);
        if (!availability) {
            setAvailableTimes([]);
            return;
        }

        const start = availability.startTime;
        const end = availability.endTime;

        let current = start;
        const times = [];

        while (current < end) {
            const [h, m] = current.split(":");
            const date = new Date();
            date.setHours(h);
            date.setMinutes(Number(m) + duration);

            const nextTime = date.toTimeString().slice(0, 5);

            if (nextTime <= end) {
                times.push(current);
            }

            current = nextTime;
        }

        // Afspraken filteren
        const dayString = selectedDate.split("-").reverse().join("-");
        // alle afspraken op geselecteerde dag
        const todaysAppointments = appointments.filter(
            a => a.date === dayString
        );

        const freeTimes = times.filter(t => {
            // gevonden dienst voor deze tijdslot
            const service = services.find(s => s.id === Number(selectedService));
            const duration = service?.duration || 30;

            // check voor elke afspraak op die dag
            for (const appt of todaysAppointments) {
                const serviceOfExisting = services.find(s => s.id === appt.serviceId);
                const durationExisting = serviceOfExisting?.duration || 30;

                if (doTimesOverlap(
                    t,
                    duration,
                    appt.time,
                    durationExisting
                )) {
                    // OVERLAPPING TIME → blokkeren
                    return false;
                }
            }

            // geen overlap → tijd vrij
            return true;
        });
        setAvailableTimes(freeTimes);

    }, [selectedDate, selectedService, appointments, services, availabilities]);


    async function handleSubmit(e) {
        e.preventDefault();

        if (!clientName || !clientEmail || !selectedDate || !selectedTime) {
            setError("Vul alle velden in.");
            return;
        }

        const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
        if (selectedDateTime < new Date()) {
            setError("Je kunt geen afspraak in het verleden maken.");
            return;
        }

        const backendDate = selectedDate.split("-").reverse().join("-");

        try {
            await api.post("/appointments", {
                companyId: Number(companyId),
                clientName,
                clientEmail,
                serviceId: Number(selectedService),
                date: backendDate,
                time: selectedTime,
            });

            await api.post("/clients", {
                companyId: Number(companyId),
                name: clientName,
                email: clientEmail,
                phone: clientPhone,
            });

            setSuccess("Afspraak is succesvol geplaatst");

            setClientName("");
            setClientEmail("");
            setSelectedService("");
            setSelectedDate("");
            setSelectedTime("");
            setClientPhone("");

        } catch (err) {
            console.error(err);
            setError("Kon de afspraak niet opslaan.");
        }
    }

    return (
        <form className="appointment-form" onSubmit={handleSubmit}>
            <h2>Maak hier uw afspraak</h2>
            <label>
                Voornaam
                <input value={clientName} onChange={(e) => setClientName(e.target.value)}/>
            </label>

            <label>
                E-mail
                <input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)}/>
            </label>

            <label>
                Telefoonnummer:
                <input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)}/>
            </label>

            <label>
                Kies dienst
                <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                >
                    <option value="">-- Kies een dienst --</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name} (€{service.price})
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Datum
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                />

            </label>

            <label>
                Tijd
                <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                >
                    <option value="">-- Kies een tijd --</option>
                    {availableTimes.map((time) => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
            </label>

            <button type="submit">Afspraak maken</button>
            {success && <p className="succes-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default AppointmentForm;
