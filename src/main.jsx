import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom';
import ProtectedRoute from "./components/protected_route/ProtectedRoute.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <Router>
                <App/>
            </Router>
        </AuthProvider>
    </StrictMode>,
)
