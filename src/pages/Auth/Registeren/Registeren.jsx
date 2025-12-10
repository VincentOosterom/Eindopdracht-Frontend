import NavBar from "../../../components/website/NavBar/NavBar.jsx";
import './Registeren.css'
import RegisterForm from "../../../components/website/RegisterForm/RegisterForm.jsx";
import Footer from "../../../components/website/Footer/Footer.jsx";


function Register() {
    return (
        <>
            <header className="register-header">
                <NavBar/>
                <section className="register">
                    <div className="register-title">
                        <h1>Tijdslot. De eerste 14 dagen gratis</h1>
                        <p>Maak een account aan en begin met het plannen van je afspraken.</p>
                    </div>
                    <RegisterForm/>
                </section>
            </header>
            <Footer/>
        </>
    )
}

export default Register;