import './Homepage.css'
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import {companies} from "../../../dummy-data/companies.js";
import {useNavigate, useParams} from "react-router-dom";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";


function Homepage() {

    const {companyId} = useParams();
    const company = companies.find((c) => c.companyId === companyId);
    const navigate = useNavigate();

    function handleGoToAgenda() {
        navigate(`/dashboard/${companyId}/agenda`);
    }
    

    return (
        <>
            <div className="dashboard">
                <SideBar/>
                <main className="dashboard-main">
                    <HeaderDashboard title="Welkom terug," company={company.title}/>


                    <section className="dashboard-today">
                        <article>
                            <h3>Afspraken vandaag</h3>
                            <p>{company.appointmentsToday}</p>
                        </article>

                        <article>
                            <h3>Volgende afspraak</h3>
                            <p>{company.nextAppointment}</p>
                        </article>

                        <button type="button" className="button-appointment">Afspraak maken</button>
                    </section>

                    <section className="quick-look-section">

                        <section className="dashboard-quick-agenda">
                            <h3>Vandaag in één oogopslag</h3>

                            <table className="today-table">
                                <thead>
                                <tr>
                                    <th>Tijd</th>
                                    <th>Klant</th>
                                    <th>Dienst</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>09:00</td>
                                    <td>Karin</td>
                                    <td>Wassen en Knippen</td>
                                </tr>
                                <tr>
                                    <td>10:00</td>
                                    <td>Thomas</td>
                                    <td>Knippen & Baard</td>
                                </tr>
                                </tbody>
                            </table>

                            <button type="button" onClick={handleGoToAgenda}>
                                Bekijk volledige agenda
                            </button>
                        </section>

                        <article className="dashboard-quick-this-week">
                            <h3>Weekoverzicht</h3>

                            <ul className="stats-list">
                                <li>
                                    <p>Afspraken deze week</p>
                                    <strong>{company.appointmentsThisWeek}</strong>
                                </li>
                                <li>
                                    <p>Totale omzet</p>
                                    <strong>€{company.revenuesThisWeek}</strong>
                                </li>
                            </ul>
                        </article>

                    </section>

                </main>
            </div>

        </>
    )
}

export default Homepage;