import './Homepage.css'
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import {companies} from "../../../dummy-data/companies.js";
import {useParams} from "react-router-dom";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";

function Homepage() {

    const {companyId} = useParams();
    const company = companies.find((c) => c.companyId === companyId);

    return (
        <>
            <div className="dashboard">
                <SideBar/>
                <main className="dashboard-main">
                    <header className="dashboard-header">
                        <HeaderDashboard title="Welkom terug," company={company.title}/>
                    </header>

                    <section className="dashboard-today">
                        <article>
                            <h3>Afspraken vandaag</h3>
                            <p>{company.appointmentsToday}</p>
                        </article>

                        <article>
                            <h3>Volgende afspraak</h3>
                            <p>{company.nextAppointment}</p>
                        </article>

                        <article className="make-appointment">
                            <h3>Afspraak maken</h3>
                        </article>
                    </section>

                    <section className="dashboard-quick-agenda">
                        <h3>Vandaag in één oogopslag</h3>
                        <table className="today-table">
                            <tbody>
                            <tr>
                                <th>Tijd</th>
                                <th>Klant</th>
                                <th>Dienst</th>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>09:00</td>
                                <td>Karin</td>
                                <td>Wassen en Knippen</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>10:00</td>
                                <td>Thomas</td>
                                <td>Knippen & Baard</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>

        </>
    )
}

export default Homepage;