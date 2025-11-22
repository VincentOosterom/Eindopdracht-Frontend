import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const { companyId } = useParams();

    // 1. AuthContext is nog aan het laden
    if (user === undefined) {
        return <p>Loading...</p>;
    }

    // 2. Niet ingelogd
    if (!user || !user.companyId) {
        return <Navigate to="/inloggen" replace />;
    }

    // 3. Proberen dashboard van ander bedrijf te openen
    if (companyId && String(companyId) !== String(user.companyId)) {
        return <Navigate to={`/dashboard/${user.companyId}`} replace />;
    }

    // 4. Toegang OK
    return children;
}
