import {NavLink, useNavigate} from "react-router-dom";
import "./Sidebar.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faCalendar, faPerson, faGear, faBackwardStep} from '@fortawesome/free-solid-svg-icons';



function Sidebar({ companyId }) {
    const navigate = useNavigate();

    function handleLogout() {
        navigate("/");
    }

    return (
        <>
            <aside className="sidebar">
                <div className="content">
                    <div className="logo-sidebar">
                        <h3>Tijdslot</h3>
                    </div>
                    <nav className="nav-sidebar">
                        <ul>
                            <li><NavLink to={`/dashboard/${companyId}`} className={({isActive}) => (isActive ? "active-sidebar" : "")}>
                                <FontAwesomeIcon icon={faHome} className="icon"/>
                                <span>Home</span>
                            </NavLink></li>
                            <li><NavLink to={`/dashboard/${companyId}/agenda`} className={({isActive}) => (isActive ? "active-sidebar" : "")}>
                                <FontAwesomeIcon icon={faCalendar} className="icon"/>
                                <span>Agenda</span>
                            </NavLink>
                            </li>
                            <li><NavLink to={`/dashboard/${companyId}/klanten`} className={({isActive}) => (isActive ? "active-sidebar" : "")}>
                                <FontAwesomeIcon icon={faPerson} className="icon"/>
                                <span>Klanten</span>
                            </NavLink>
                            </li>
                            <li><NavLink to={`/dashboard/${companyId}/instellingen`} className={({isActive}) => (isActive ? "active-sidebar" : "")}>
                                <FontAwesomeIcon icon={faGear} className="icon"/>
                                <span>Instellingen</span></NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="logout-btn">
                        <FontAwesomeIcon icon={faBackwardStep} className="icon"/>
                        <h3 onClick={handleLogout}>
                           <span>Uitloggen</span>
                        </h3>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar