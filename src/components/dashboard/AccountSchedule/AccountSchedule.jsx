import './AccountSchedule.css'

function AccountSchedule({days, services}) {
    return (
        <section className="account-schedule">
            <article className="account-availabilities">
                <h2>Beschikbaarheid</h2>
                <form className="availability-form">
                    <div className="availability-list">
                        {days.map((dayName, index) => (
                            <div className="availability-row" key={index}>
                                <span className="day-label">{dayName}</span>

                                <input
                                    type="time"
                                    name={`start-${index}`}
                                    defaultValue="09:00"
                                />

                                <input
                                    type="time"
                                    name={`end-${index}`}
                                    defaultValue="18:00"
                                />

                                <div className="closed-checkbox">
                                    <label>
                                        Gesloten
                                        <input type="checkbox"/>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn">
                        Openingstijden opslaan
                    </button>
                </form>
            </article>

            <article className="account-availabilities">
                <h2>Diensten</h2>
                <form className="service-form">
                    {services.map((service, index) => (
                        <div className="service-row" key={index}>
                            <input
                                type="text"
                                name={service}
                                defaultValue={service}/>
                        </div>
                    ))}
                    <div className="service-btns">
                        <button type="submit" className="btn">
                            Dienst toevoegen
                        </button>
                        <button type="submit" className="btn">
                            Diensten opslaan
                        </button>
                    </div>
                </form>
            </article>
        </section>
    )
}

export default AccountSchedule