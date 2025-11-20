import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const { companyId } = useParams();

    // FIX: Als user nog aan het laden is, render niks
    if (user === null) {
        return <p>Loading...</p>;
    }

    // Niet ingelogd
    if (!user.userId) {
        return <Navigate to="/inloggen" replace />;
    }

    // Verkeerde gebruiker
    if (String(companyId) !== String(user.userId)) {
        return <Navigate to={`/dashboard/${user.userId}`} replace />;
    }

    return children;
}
