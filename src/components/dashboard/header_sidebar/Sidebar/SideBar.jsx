import {NavLink, useNavigate, useParams,} from "react-router-dom";
import "./SideBar.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHome,
    faCalendar,
    faPerson,
    faGear,
    faSpinner,
    faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";
import {useAuth} from "../../../../context/AuthContext.jsx";



function SideBar() {
    const navigate = useNavigate();
    const { companyId } = useParams()
    const [loading, setLoading] = useState(false)
    const { logout } = useAuth();


    function handleLogout() {
        setLoading(true);
        setTimeout(() => {
            logout();
            navigate("/inloggen");
        }, 1500);


    }

    return (
        <>
            <aside className="sidebar">
                <section className="content">
                    <div className="logo-sidebar">
                        <h3>Tijdslot</h3>
                    </div>
                    <nav className="nav-sidebar">
                        <ul>
                            <li><NavLink to={`/dashboard/${companyId}`} end className={({isActive}) => (isActive ? "active-sidebar" : "")}>
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
                    <button className="logout-btn" onClick={handleLogout} disabled={loading}>
                        <FontAwesomeIcon
                            icon={loading ? faSpinner : faRightFromBracket}
                            spin={loading}
                            className="icon"
                        />
                        <span>
                            {loading ? "Uitloggen..." : "Uitloggen"}
                        </span>
                    </button>
                </section>
            </aside>
        </>
    )
}

export default SideBar