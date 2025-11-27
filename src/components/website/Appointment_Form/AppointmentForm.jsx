import './AppointmentForm.css'
import {useState} from "react";
import axios from "axios";

function AppointmentForm({services, companyId}) {

    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedService, setSelectedService] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await axios.post('/api/appointments',
            {
                userId: companyId,
                clientName,
                clientEmail,
                serviceId: selectedService,
                date: selectedDate,
                time: selectedTime,
            }, {
                headers: {
                    'novi-education-project-id': 'd6200c4d-2a0a-435d-aba6-6171c6a7296e',

                }
            })
    }

    return (
        <form className="appointment-form" onSubmit={handleSubmit}>
            <h2>Maak hier uw afspraak</h2>
            <label>
                Voornaam
                <input
                    type="text"
                    placeholder="Uw naam"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                />
            </label>

            <label>
                E-mail
                <input
                    type="email"
                    placeholder="E-mail"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                />
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
                />
            </label>

            <label>
                Tijd
                <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                />
            </label>

            <button type="submit">Afspraak maken</button>
        </form>
    );
}

export default AppointmentForm;
