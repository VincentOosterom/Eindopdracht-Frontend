
import './index.css'
import {Route, Routes} from "react-router-dom";
import Inloggen from "./pages/Inloggen/Inloggen.jsx";
import Register from "./pages/Registeren/Registeren.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import CompanyPage from "./pages/CompanyPage/CompanyPage.jsx";
import DashBoard from "./pages/Dashboard/DashBoard.jsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/inloggen" element={<Inloggen />} />
                <Route path="/registeren" element={<Register />} />
                <Route path="/company/:companyId" element={<CompanyPage />} />
                <Route path="/dashboard/:companyId" element={<DashBoard/>} />
            </Routes>
        </>
    )
}

export default App
