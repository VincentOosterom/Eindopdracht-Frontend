import './Homepage.css'
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar.jsx";
import {companies} from "../../../dummyData/companies.js";
import {useParams} from "react-router-dom";
import HeaderDashboard from "../../../components/Dashboard/HeaderDashboard/HeaderDashboard.jsx";

function Homepage() {

    const { companyId } = useParams();
    const company = companies.find((c) => c.companyId === companyId);

    return (
        <>
            <div className="dashboard">
                <Sidebar/>
                <header className="dashboard-main">
                       <HeaderDashboard title="Welkom terug," company={company.title} />
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
                </header>
            </div>
        </>
    )
}

export default Homepage;