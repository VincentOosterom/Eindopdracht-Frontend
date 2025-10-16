import './Homepage.css'
import Sidebar from "../../../components/Sidebar/Sidebar.jsx";
import {companies} from "../../../data/companies.js";
import {useParams} from "react-router-dom";



function Homepage() {

    const { companyId } = useParams();
    const company = companies.find((c) => c.companyId === companyId);


    return (
        <>
            <div className="dashboard">
                <Sidebar/>
                <header className="dashboard-main">
                    <div className="dashboard-header-title">
                        <h2>Welkom terug, {company.title}</h2>
                    </div>
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