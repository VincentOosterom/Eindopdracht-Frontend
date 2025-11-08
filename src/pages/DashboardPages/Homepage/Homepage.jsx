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

                    <section className="dashboard-content-today">
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
                </main>
            </div>

        </>
    )
}

export default Homepage;