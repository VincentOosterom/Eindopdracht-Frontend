import {useState, useEffect} from "react";
import api from "../../../../api/api.js";
import "./AccountSchedule.css";

function AccountSchedule({days, services, companyId}) {
    const [availabilities, setAvailabilities] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [savingAvail, setSavingAvail] = useState(false);
    const [savingServices, setSavingServices] = useState(false);


    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [availabilitySuccess, setAvailabilitySuccess] = useState("");
    const [serviceSuccess, setServiceSuccess] = useState("");

    const DAY_ORDER = [
        "Maandag",
        "Dinsdag",
        "Woensdag",
        "Donderdag",
        "Vrijdag",
        "Zaterdag",
        "Zondag",
    ];

    // VOOR SUCCES MESSAGE
    useEffect(() => {
        let timer;

        if (success) {
            timer = setTimeout(() => setSuccess(""), 2000);
        }

        if (serviceSuccess) {
            timer = setTimeout(() => setServiceSuccess(""), 2000);
        }

        if (availabilitySuccess) {
            timer = setTimeout(() => setAvailabilitySuccess(""), 2000);
        }

        if (error) {
            timer = setTimeout(() => setError(""), 2000);
        }
        return () => clearTimeout(timer);
    }, [success, error, serviceSuccess, availabilitySuccess]);

    useEffect(() => {
        // ----- AVAILABILITIES LADEN -----
        const dayMap = {};
        if (Array.isArray(days)) {
            days.forEach((d) => {
                dayMap[d.dayOfWeek] = {
                    id: d.id,
                    dayOfWeek: d.dayOfWeek,
                    startTime: d.startTime || "09:00",
                    endTime: d.endTime || "18:00",
                    closed: false, // record bestaat = open
                };
            });
        }

        const mergedDays = DAY_ORDER.map((day) => {
            if (dayMap[day]) {
                return dayMap[day];
            }
            // geen record in API = gesloten
            return {
                id: null,
                dayOfWeek: day,
                startTime: "09:00",
                endTime: "18:00",
                closed: true,
            };
        });

        setAvailabilities(mergedDays);

        // ----- SERVICES LADEN -----
        if (Array.isArray(services)) {
            setServiceList(
                services.map((s) => ({
                    id: s.id,
                    name: s.name,
                    duration: s.duration,
                    price: s.price,
                }))
            );
        }
    }, [days, services]);

    // ====== AVAILABILITY HANDLERS ======
    function handleAvailabilityChange(index, field, value) {
        setAvailabilities((prev) =>
            prev.map((item, i) =>
                i === index ? {...item, [field]: value} : item
            )
        );
    }

    // ====== GESLOTEN DAGEN ======
    function handleClosedToggle(index, checked) {
        setAvailabilities((prev) =>
            prev.map((item, i) =>
                i === index
                    ? {
                        ...item, closed: checked,
                    }
                    : item
            )
        );
    }

    // ====== SERVICES HANDLERS  ======
    function handleServiceChange(index, field, value) {
        setServiceList((prev) =>
            prev.map((item, i) =>
                i === index ? {...item, [field]: value} : item
            )
        );
    }

    function handleAddService() {
        setServiceList((prev) => [...prev,
            {
                id: null,
                name: "",
                duration: "",
                price: "",
            },
        ]);
    }

    async function handleAvailabilitySubmit(e) {
        e.preventDefault();
        setSavingAvail(true);
        setSuccess("");
        try {
            for (const a of availabilities) {

                if (a.closed) {
                    if (a.id != null) {
                        await api.delete(`/availabilities/${a.id}`);
                    }
                    continue;
                }

                if (a.id == null) {
                    await api.post("/availabilities", {
                        companyId: Number(companyId),
                        dayOfWeek: a.dayOfWeek,
                        startTime: a.startTime || "09:00",
                        endTime: a.endTime || "18:00",
                    });
                } else {
                    await api.patch(`/availabilities/${a.id}`, {
                        companyId: Number(companyId),
                        dayOfWeek: a.dayOfWeek,
                        startTime: a.closed ? "" : a.startTime,
                        endTime: a.closed ? "" : a.endTime,
                    });
                }
            }

            setAvailabilitySuccess("Openingstijden opgeslagen!");
            setServiceSuccess("");
        } catch {
            setError("Er ging iets mis tijdens het opslaan.");
        } finally {
            setSavingAvail(false);
        }
    }

    async function handleDeleteService(serviceId, index) {

        if (serviceId == null) {
            setServiceList((prev) => prev.filter((_, i) => i !== index));
            return
        }

        const confirmDelete = window.confirm("Weet je zeker dat je deze dienst wilt verwijderen?")
        if (!confirmDelete) return;

        try {
            await api.delete(`/services/${serviceId}`);
            setServiceList((prev) => prev.filter((_, i) => i !== index));
            setSuccess("Uw dienst in succesvol verwijderd")
        } catch (error) {
            console.log(error);
            setError("Het is niet gelukt om deze dienst te verwijderen")
        }
    }

    async function handleServiceSubmit(e) {
        e.preventDefault();
        setSavingServices(true);

        try {
            for (const s of serviceList) {
                if (!s.name) continue;

                if (s.id == null) {
                    await api.post("/services", {
                        companyId: Number(companyId),
                        name: s.name,
                        duration: s.duration,
                        price: s.price,
                    });
                } else {
                    await api.patch(`/services/${s.id}`, {
                        companyId: Number(companyId),
                        name: s.name,
                        duration: s.duration,
                        price: s.price,
                    });
                }
            }
            setServiceSuccess("Diensten opgeslagen!");
            setAvailabilitySuccess("");
        } catch {
            setError("Er ging iets mis tijdens het opslaan.");
        } finally {
            setSavingServices(false);
        }
    }

    return (
        <section className="account-schedule">
            {/* OPENINGSTIJDEN */}
            <article className="account-availabilities">
                <h2>Openingstijden</h2>
                {availabilitySuccess && (
                    <p className="success-message">{availabilitySuccess}</p>)}
                {error && <p className="error-message" role="alert">{error} </p>}
                <form className="availability-form" onSubmit={handleAvailabilitySubmit}>
                    <ul className="availability-list">
                        {availabilities.map((day, index) => (
                            <li key={day.dayOfWeek}>
                                <fieldset className="availability-row">
                                    <legend className="day-label">
                                        {day.dayOfWeek}
                                    </legend>
                                    <input
                                        type="time"
                                        value={day.startTime}
                                        disabled={day.closed}
                                        onChange={(e) =>
                                            handleAvailabilityChange(
                                                index,
                                                "startTime",
                                                e.target.value)}/>
                                    <input
                                        type="time"
                                        value={day.endTime}
                                        disabled={day.closed}
                                        onChange={(e) =>
                                            handleAvailabilityChange(
                                                index,
                                                "endTime",
                                                e.target.value)}/>

                                    <label className="closed-toggle">
                                    <span className="toggle-text">
                                        {day.closed ? "Gesloten" : "Open"}
                                    </span>

                                        <input
                                            type="checkbox"
                                            checked={day.closed}
                                            onChange={(e) => handleClosedToggle(index, e.target.checked)}
                                        />

                                        <span className="slider"></span>
                                    </label>
                                </fieldset>
                            </li>
                        ))}
                    </ul>
                    <button type="submit" className="btn saving-btn" disabled={savingAvail}>
                        {savingAvail ? "Opslaan..." : "Openingstijden opslaan"}
                    </button>
                </form>
            </article>

            {/* DIENSTEN */}
            <article className="account-availabilities">
                <h2>Diensten</h2>
                {serviceSuccess && (
                    <p className="success-message" role="status" aria-live="polite">{serviceSuccess}</p>
                )}
                <form className="service-form" onSubmit={handleServiceSubmit}>
                    {serviceList.length === 0 ? (
                        <section>
                            <p><strong>Nog geen diensten ingesteld</strong></p>
                            <p>Voeg je eerste dienst toe zodat klanten afspraken kunnen maken.</p>
                        </section>
                    ) : (
                        <ul className="service-list">
                            {serviceList.map((service, index) => (
                                <li key={service.id ?? index}>
                                    <fieldset className="service-row">
                                        <legend className="visually-hidden">
                                            {service.name || "Dienst"}
                                        </legend>
                                        <label>
                                            <input
                                                type="text"
                                                value={service.name}
                                                placeholder="Naam dienst"
                                                onChange={(e) =>
                                                    handleServiceChange(index, "name", e.target.value)
                                                }
                                            />
                                        </label>

                                        <label>
                                            <input
                                                type="text"
                                                value={`${service.duration} min`}
                                                onChange={(e) => {
                                                    const numeric = e.target.value.replace(/[^0-9]/g, '');
                                                    handleServiceChange(
                                                        index,
                                                        "duration",
                                                        parseInt(numeric) || 0
                                                    );
                                                }}
                                            />
                                        </label>

                                        <label>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                placeholder="€"
                                                value={service.price}
                                                onChange={(e) => {
                                                    let value = e.target.value.replace(/[^0-9.,]/g, "");
                                                    value = value.replace(",", ".");
                                                    if ((value.match(/\./g) || []).length > 1) return;
                                                    handleServiceChange(index, "price", value);
                                                }}
                                                onBlur={() =>
                                                    handleServiceChange(
                                                        index,
                                                        "price",
                                                        service.price === "" ? "" : Number(service.price)
                                                    )
                                                }
                                            />
                                        </label>

                                        <button
                                            type="button"
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDeleteService(service.id, index)
                                            }
                                            aria-label={`Verwijder dienst ${service.name}`}
                                        >
                                            🗑️
                                        </button>
                                    </fieldset>
                                </li>
                            ))}
                        </ul>
                    )}
                    <section className="services-btn">
                        <button type="button" className="btn" onClick={handleAddService}>
                            Dienst toevoegen
                        </button>
                        <button type="submit" className="btn" disabled={savingServices}>
                            {savingServices ? "Opslaan..." : "Diensten opslaan"}
                        </button>
                    </section>
                </form>
            </article>
        </section>
    );
}

export default AccountSchedule;
