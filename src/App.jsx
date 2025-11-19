import './index.css'
import {Route, Routes} from "react-router-dom";
import Inloggen from "./pages/Auth/Inloggen/Inloggen.jsx";
import Register from "./pages/Auth/Registeren/Registeren.jsx";
import Homepage from "./pages/Website/Homepage/Homepage.jsx";
import CompanyPage from "./pages/Website/CompanyPage/CompanyPage.jsx";
import DashBoard from "./pages/DashboardPages/Homepage/Homepage.jsx";
import Agenda from "./pages/DashboardPages/Agenda/Agenda.jsx";
import Settings from "./pages/DashboardPages/Instellingen/Settings.jsx";
import Clients from "./pages/DashboardPages/Klanten/Clients.jsx";
import NotFound from "./pages/Website/NotFound/NotFound.jsx";


function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/inloggen" element={<Inloggen />} />
                <Route path="/registeren" element={<Register />} />
                <Route path="/boek-nu/:userId" element={<CompanyPage />} />
                <Route path="/dashboard/:userId/" element={<DashBoard />} />
                <Route path="/dashboard/:userId/agenda" element={<Agenda/>} />
                <Route path="/dashboard/:userId/klanten" element={<Clients/>} />
                <Route path="/dashboard/:userId/instellingen" element={<Settings/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </>
    )
}

export default App
