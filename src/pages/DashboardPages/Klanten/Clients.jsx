import './Clients.css'
import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";
import {useParams} from "react-router-dom";
import {companies} from "../../../dummy-data/companies.js";


function Clients() {

    const {companyId} = useParams();
    const company = companies.find((c) => c.companyId === companyId);

    return (
        <>
            <div className="dashboard">
                <SideBar/>

                <main className="dashboard-main">
                    <header className="dashboard-header">
                        <HeaderDashboard title="Klanten van" company={company.title}/>
                    </header>

                    <section className="clients-container">
                        <div className="clients-content">
                            <h2>Alle klanten</h2>
                            <input
                                type="text"
                                placeholder="Zoek klant"
                            />
                        </div>
                        <section className="clients-table">
                            <table>
                                <thead>
                                <tr>
                                    <th>Naam:</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Jan de Vries</td>
                                </tr>
                                <tr>
                                    <td>Sophie Jansen</td>
                                </tr>
                                <tr>
                                    <td>Sophie Jansen</td>
                                </tr>
                                <tr>
                                    <td>Sophie Jansen</td>
                                </tr>
                                <tr>
                                    <td>Sophie Jansen</td>
                                </tr>
                                </tbody>
                            </table>

                        </section>
                    </section>
                </main>
            </div>
        </>
    )
}

export default Clients;