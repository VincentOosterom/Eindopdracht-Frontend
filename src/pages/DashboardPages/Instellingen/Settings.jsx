import SideBar from "../../../components/dashboard/Sidebar/SideBar.jsx";
import {useParams} from "react-router-dom";
import {companies} from "../../../dummy-data/companies.js";
import './Settings.css'
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard/HeaderDashboard.jsx";

function Settings() {

    const {companyId} = useParams();
    const company = companies.find((c) => c.companyId === companyId);


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

                </main>
            </div>

        </>
    )
}

export default Settings;