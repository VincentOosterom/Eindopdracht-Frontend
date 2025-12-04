import {useState, useEffect} from "react";
import api from "../../../api/api";
import "./AccountSchedule.css";

function AccountSchedule({days, services, companyId}) {
    const [availabilities, setAvailabilities] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [savingAvail, setSavingAvail] = useState(false);
    const [savingServices, setSavingServices] = useState(false);

    const [error, setError] = useState("");
    const [succes, setSucces] = useState("");

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

        if (succes) {
            timer = setTimeout(() => setSucces(""), 3000);
        }

        if (error) {
            timer = setTimeout(() => setError(""), 3000);
        }

        return () => clearTimeout(timer);
    }, [succes, error]);

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

    function handleClosedToggle(index, checked) {
        setAvailabilities((prev) =>
            prev.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        closed: checked,
                        // tijden zijn niet zo belangrijk als hij gesloten is
                    }
                    : item
            )
        );
    }

    async function handleAvailabilitySubmit(e) {
        e.preventDefault();
        setSavingAvail(true);
        setSucces(false);

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

            setSucces("Openingstijden opgeslagen!");
        } catch (err) {
            console.error("Fout bij opslaan openingstijden:", err);
            setError("Er ging iets mis tijdens het opslaan.");
        } finally {
            setSavingAvail(false);
        }
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
        setServiceList((prev) => [
            ...prev,
            {
                id: null,
                name: "",
                duration: "",
                price: "",
            },
        ]);
    }

    async function handleDeleteService(serivceId, index) {

        if (serivceId == null) {
            setServiceList((prev) => prev.filter((_, i) => i !== index));
            return
        }

        const confirmDelete = window.confirm("Weet je zeker dat je deze dienst wilt verwijderen?")
        if (!confirmDelete) return;

        try {
            await api.delete(`/services/${serivceId}`);
            setServiceList((prev) => prev.filter((_, i) => i !== index));
            setSucces("Uw dienst in succesvol verwijderd")
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
            setSucces("Diensten opgeslagen!");

        } catch (err) {
            console.error("Fout bij opslaan diensten:", err);
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
                <form className="availability-form" onSubmit={handleAvailabilitySubmit}>
                    <div className="availability-list">
                        {availabilities.map((day, index) => (
                            <div className="availability-row" key={day.dayOfWeek}>
                                <span className="day-label">{day.dayOfWeek}</span>

                                <input
                                    type="time"
                                    value={day.startTime}
                                    disabled={day.closed}
                                    onChange={(e) =>
                                        handleAvailabilityChange(
                                            index,
                                            "startTime",
                                            e.target.value
                                        )
                                    }
                                />
                                <input
                                    type="time"
                                    value={day.endTime}
                                    disabled={day.closed}
                                    onChange={(e) =>
                                        handleAvailabilityChange(
                                            index,
                                            "endTime",
                                            e.target.value
                                        )
                                    }
                                />
                                <label className="closed-toggle">
                                    <span className="toggle-text">Gesloten</span>

                                    <input
                                        type="checkbox"
                                        checked={day.closed}
                                        onChange={(e) => handleClosedToggle(index, e.target.checked)}
                                    />

                                    <span className="slider"></span>
                                </label>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn, saving-btn" disabled={savingAvail}>
                        {savingAvail ? "Opslaan..." : "Openingstijden opslaan"}
                    </button>
                </form>
            </article>

            {/* DIENSTEN */}
            <article className="account-availabilities">
                <h2>Diensten</h2>
                <form className="service-form" onSubmit={handleServiceSubmit}>
                    {serviceList.map((service, index) => (
                        <div className="service-row" key={service.id ?? index}>
                            <input
                                type="text"
                                value={service.name}
                                placeholder="Naam dienst"
                                onChange={(e) =>
                                    handleServiceChange(index, "name", e.target.value)
                                }
                            />
                            <input
                                type="text"
                                value={`${service.duration} min`}
                                onChange={(e) => {
                                    const numeric = e.target.value.replace(/[^0-9]/g, '');
                                    const numberValue = parseInt(numeric) || 0;

                                    handleServiceChange(index, "duration", numberValue);
                                }}
                            />
                            <input
                                type="text"
                                value={`€${service.price}`}
                                onChange={(e) => {
                                    const numeric = e.target.value.replace(/[^0-9.,]/g, '');

                                    const numberValue = parseFloat(numeric.replace(',', '.')) || 0;

                                    handleServiceChange(index, "price", numberValue);
                                }}
                            />

                            <button
                                type="button"
                                className="delete-btn"
                                onClick={() => handleDeleteService(service.id, index)}
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                    <div className="services-btn">
                        <button type="button" className="btn" onClick={handleAddService}>
                            Dienst toevoegen
                        </button>
                        <button type="submit" className="btn" disabled={savingServices}>
                            {savingServices ? "Opslaan..." : "Diensten opslaan"}
                        </button>
                    </div>

                    {succes && <p className="succes-message">{succes}</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
            </article>
        </section>
    );
}

export default AccountSchedule;
