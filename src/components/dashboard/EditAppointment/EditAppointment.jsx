import "./EditAppointment.css";
import {useState} from "react";



function EditAppointmentModal({
                                  event,
                                  services,
                                  onClose,
                                  onSave,
                                  onDelete
                              }) {

    const initialService = services.find(
        (s) => s.name === event.title.split(" - ")[0]
    );

    const [clientName, setClientName] = useState(event.extendedProps.clientName);
    const [clientEmail, setClientEmail] = useState(event.extendedProps.clientEmail);
    const [serviceId, setServiceId] = useState(initialService?.id || "");
    const [date, setDate] = useState(event.start.toISOString().slice(0, 10));
    const [time, setTime] = useState(event.start.toLocaleTimeString("en-Gb", {hour: "2-digit", minute: "2-digit"}));

    return (
        <section className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Afspraak bewerken</h2>
                <label>
                    Klantnaam
                    <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                </label>

                <label>
                    E-mail
                    <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                    />
                </label>

                <label>
                    Dienst
                    <select
                        value={serviceId}
                        onChange={(e) => setServiceId(Number(e.target.value))}
                    >
                        <option value="">Selecteer dienst</option>
                        {services.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name} ({s.duration} min)
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Datum
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>

                <label>
                    Tijd
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </label>

                <div className="modal-buttons">
                    <button
                        className="btn-save"
                        onClick={() =>
                            onSave({
                                id: event.id,
                                clientName,
                                clientEmail,
                                serviceId,
                                date,
                                time,
                            })
                        }
                    >
                        Opslaan
                    </button>

                    <button
                        className="btn-delete"
                        onClick={() => onDelete(event.id)}
                    >
                        Verwijderen
                    </button>

                    <button className="btn-cancel" onClick={onClose}>
                        Annuleren
                    </button>
                </div>
            </div>
        </section>
    );
}

export default EditAppointmentModal;
