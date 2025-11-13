import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import {useParams} from "react-router-dom";
import {companies} from "../../../dummy-data/companies.js";
import './Settings.css'
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";

function Settings() {

    const {companyId} = useParams();
    const company = companies.find((c) => c.companyId === companyId);
    const days = [
        "Maandag",
        "Dinsdag",
        "Woensdag",
        "Donderdag",
        "Vrijdag",
        "Zaterdag",
        "Zondag"
    ];
    const services = [
        "Knippen",
        "Knippen & Baard",
        "Wassen, Knippen en Baard"
    ]




    return (
        <>
            <div className="dashboard">
                <SideBar/>
                <main className="dashboard-main">
                    <header className="dashboard-header">
                        <HeaderDashboard title="Instellingen" company={company.title}/>
                    </header>
                    <section className="account-info">
                        <div className="first-colum">
                            <label htmlFor="company-name" className="account-label">Bedrijfsnaam:
                                <input type="text" id="company-name" value={company.title}/>
                            </label>
                            <label htmlFor="company-email" className="account-label">Zakelijk e-mail:
                                <input type="email" id="company-email" value={company.userEmail}/>
                            </label>
                        </div>

                        <div className="second-colum">
                            <label htmlFor="company-password" className="account-label">Wachtwoord
                                <input type="password" id="company-password" value={company.userPassword}/>
                            </label>
                            <label htmlFor="new-password" className="account-label">Nieuw wachtwoord
                                <input type="text" id="new-password"/>
                            </label>
                        </div>

                        <div className="third-colum">
                            <label htmlFor="new-password-confirm" className="account-label">Herhaal nieuw wachtwoord
                                <input type="text" id="new-password-confirm"/>
                            </label>
                            <button type="submit" className="account-button">
                                <p>Wachtwoord wijzigen</p>
                            </button>
                        </div>
                    </section>
                    <section className="account-schedule">
                        <article className="account-availabilities">
                            <h2>Beschikbaarheid</h2>
                            <form className="availability-form">
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
                                            defaultValue="17:00"
                                        />

                                        <label className="closed-checkbox">
                                            <input type="checkbox" />
                                        </label>
                                    </div>
                                ))}

                                <button type="submit" className="save-btn"></button>
                            </form>
                        </article>
                        <article className="account-service">
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
                                <button type="submit" className="save-btn"></button>
                            </form>
                        </article>
                    </section>
                </main>
            </div>

        </>
    )
}

export default Settings;