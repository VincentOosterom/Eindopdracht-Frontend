import './index.css'
import {Route, Routes} from "react-router-dom";
import Inloggen from "./pages/auth/Inloggen/Inloggen.jsx";
import Register from "./pages/auth/Registeren/Registeren.jsx";
import Homepage from "./pages/website/Homepage/Homepage.jsx";
import CompanyPage from "./pages/website/CompanyPage/CompanyPage.jsx";
import DashBoard from "./pages/dashboard/Homepage/Homepage.jsx";
import Agenda from "./pages/dashboard/Agenda/Agenda.jsx";
import Settings from "./pages/dashboard/Instellingen/Settings.jsx";
import Clients from "./pages/dashboard/Klanten/Clients.jsx";
import NotFound from "./pages/website/NotFound/NotFound.jsx";
import ProtectedRoute from "./routes/protected_route/ProtectedRoute.jsx";
import AboutUs from "./pages/website/AboutUs/AboutUs.jsx";


function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/over-ons" element={<AboutUs />}/>
                <Route path="/inloggen" element={<Inloggen/>}/>
                <Route path="/registeren" element={<Register/>}/>
                <Route path="/boek-nu/:companyId/" element={<CompanyPage/>}/>
                <Route path="/dashboard/:companyId/" element={
                    <ProtectedRoute>
                        <DashBoard/>
                    </ProtectedRoute>
                }
                />
                <Route path="/dashboard/:companyId/agenda" element={
                    <ProtectedRoute>
                        <Agenda/>
                    </ProtectedRoute>
                }
                />
                <Route path="/dashboard/:companyId/klanten" element={
                    <ProtectedRoute>
                        <Clients/>
                    </ProtectedRoute>
                }
                />
                <Route path="/dashboard/:companyId/instellingen" element={
                    <ProtectedRoute>
                        <Settings/>
                    </ProtectedRoute>
                }
                />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    )
}

export default App
