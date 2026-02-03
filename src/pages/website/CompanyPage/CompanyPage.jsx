import './CompanyPage.css';
import {useParams} from "react-router-dom";
import NavBar from "../../../components/website/NavBar/NavBar.jsx";
import AppointmentForm from "../../../components/website/Appointment_Form/AppointmentForm.jsx";
import {useEffect, useState} from "react";
import api from "../../../api/api";
import Footer from "../../../components/website/Footer/Footer.jsx";
import DashboardLoader from "../../../components/dashboard/DashboardLoader/DashboardLoader.jsx";

function CompanyPage() {
    const {companyId} = useParams();

    const [error, setError] = useState("");

    const [company, setCompany] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availabilities, setAvailabilities] = useState([]);

    useEffect(() => {
        async function fetchCompanyPageData() {
            try {
                const [companyRes, servicesRes, availRes] = await Promise.all([
                    api.get(`/companies/${companyId}`),
                    api.get(`/services?companyId=${companyId}`),
                    api.get(`/availabilities?companyId=${companyId}`)
                ]);

                setCompany(companyRes.data);
                setServices(servicesRes.data);
                setAvailabilities(availRes.data);
            } catch {
                setError("Fout bij het ophalen van bedrijfsgegevens");
            } finally {
                setLoading(false);
            }
        }

        fetchCompanyPageData();
    }, [companyId]);

    useEffect(() => {
        if (!loading && services.length === 0 || availabilities.length === 0) {
            setError(
                "Dit bedrijf heeft nog geen diensten en/of openingstijden toegevoegd."
            );
        }
    }, [services, loading, availabilities]);

    if (loading) return <DashboardLoader text="Bedrijf wordt opgehaald"/>
    if (!company) return <p className="error-message">{error}</p>;

    return (
        <>
            <main className="company-page-header">
                <NavBar/>
                <header className="company-header">
                    {error && <p className="error-message">{error}</p>}
                    <h1>{company.name}</h1>
                    <p>
                        {company.bio || "Bedrijf heeft nog geen bio toegevoegd!"}
                    </p>
                </header>

                <section className="full-info-section">
                    <article className="company-details">
                        <section className="company-info-description">
                            <section className="company-info-availabilities">
                                <h2>Onze openingstijden</h2>
                                {availabilities.length > 0 ? (
                                    <ul>
                                        {availabilities.map((availability) => (
                                            <li key={availability.id}>
                                                {availability.dayOfWeek} – {availability.startTime} tot {availability.endTime}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Geen openingstijden gevonden</p>
                                )}
                            </section>

                            <section className="company-info-services">
                                <h2>Onze diensten</h2>

                                {services.length > 0 ? (
                                    <ul>
                                        {services.map((service) => (
                                            <li key={service.id}>
                                                {service.name} (€{service.price} – {service.duration} min)
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Geen diensten gevonden</p>
                                )}
                            </section>
                        </section>
                    </article>

                    <aside className="appointment-content">
                        <AppointmentForm
                            companyId={companyId}
                            title="Maak hier uw afspraak bij:"
                            title_company={company.name}
                            company={company}
                            services={services}
                            availabilities={availabilities}
                        />
                    </aside>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default CompanyPage;