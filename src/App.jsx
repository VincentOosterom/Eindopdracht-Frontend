
import './index.css'
import {Route, Routes} from "react-router-dom";
import Inloggen from "./pages/Inloggen/Inloggen.jsx";
import Register from "./pages/Registeren/Registeren.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import CompanyPage from "./pages/CompanyPage/CompanyPage.jsx";
import DashBoard from "./pages/DashboardPages/Homepage/Homepage.jsx";
import Agenda from "./pages/DashboardPages/Agenda/Agenda.jsx";
import Settings from "./pages/DashboardPages/Instellingen/Settings.jsx";
import Clients from "./pages/DashboardPages/Klanten/Clients.jsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/inloggen" element={<Inloggen />} />
                <Route path="/registeren" element={<Register />} />
                <Route path="/bedrijf/:companyId" element={<CompanyPage />} />
                <Route path="/dashboard/:companyId/" element={<DashBoard/>} />
                <Route path="/dashboard/:companyId/agenda" element={<Agenda/>} />
                <Route path="/dashboard/:companyId/klanten" element={<Clients/>} />
                <Route path="/dashboard/:companyId/instellingen" element={<Settings/>} />
            </Routes>
        </>
    )
}

export default App
