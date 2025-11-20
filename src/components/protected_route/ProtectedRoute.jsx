import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
    const { userId } = useAuth();
    const { companyId } = useParams();

    if (!userId) {
        return <Navigate to="/inloggen" replace />;
    }

    if (companyId && userId.companyId !== companyId) {
        return <Navigate to={`/dashboard/${userId.companyId}`} replace />;
    }

    return children;
}
