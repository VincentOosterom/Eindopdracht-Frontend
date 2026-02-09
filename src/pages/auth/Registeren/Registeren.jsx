import NavBar from "../../../components/website/header_footer_navbar/NavBar/NavBar.jsx";
import './Registeren.css'
import RegisterForm from "../../../components/website/register_page/RegisterForm/RegisterForm.jsx";
import Footer from "../../../components/website/header_footer_navbar/Footer/Footer.jsx";
import usePageTitle from "../../../helpers/usePageTitle.js";


function Register() {

    usePageTitle("Registeren", "Tijslot");

    return (
        <>
            <header className="register-header">
                <NavBar/>
                <section className="register">
                    <article className="register-content">
                        <h1>De eerste 14 dagen gratis!</h1>
                        <p>Maak een account aan en begin met het plannen van je afspraken.</p>
                    </article>
                    <RegisterForm/>
                </section>
            </header>
            <Footer/>
        </>
    )
}

export default Register;