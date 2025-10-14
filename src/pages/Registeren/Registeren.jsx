import NavBar from "../../components/NavBar/NavBar.jsx";
import './Registeren.css'
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import Footer from "../../components/Footer/Footer.jsx";


function Register() {
    return (
        <>
            <header className="registeren-header">
                <NavBar/>
                <div className="register">
                    <div className="register-title">
                        <h1>Tijdslot. De eerste 14 dagen gratis</h1>
                        <p>Maak een account aan en begin met het plannen van je afspraken.</p>
                    </div>
                    <RegisterForm/>
                </div>
            </header>
            <Footer/>
        </>
    )
}

export default Register;