import './CompanyPage.css';
import {useParams} from "react-router-dom";
import NavBar from "../../../components/website/header_footer_navbar/NavBar/NavBar.jsx";
import AppointmentForm from "../../../components/website/company_page/AppointmentForm/AppointmentForm.jsx";
import {useEffect, useState} from "react";
import api from "../../../api/api";
import Footer from "../../../components/website/header_footer_navbar/Footer/Footer.jsx";
import DashboardLoader from "../../../components/dashboard/modal_loader/DashboardLoader/DashboardLoader.jsx";
import usePageTitle from "../../../helpers/usePageTitle.js";


function CompanyPage() {
    const {companyId} = useParams();

    const [company, setCompany] = useState(null);
    const [services, setServices] = useState([]);
    const [availabilities, setAvailabilities] = useState([]);

    const [error, setError] = useState("");
    const [emptyMessage, setEmptyMessage] = useState("");
    const [loading, setLoading] = useState(true);

    usePageTitle(
        company
            ? `Maak je afspraak bij ${company.name}`
            : "Maak je afspraak"
    );

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
        if (!loading) {
            if (services.length === 0 || availabilities.length === 0) {
                setEmptyMessage(
                    "Dit bedrijf heeft nog geen diensten en/of openingstijden toegevoegd."
                );
            } else {
                setEmptyMessage("");
            }
        }
    }, [loading, services, availabilities]);

    if (loading) return <DashboardLoader text="Bedrijf wordt opgehaald"/>;
    if (error) return <p className="error-message">{error}</p>;
    if (!company) return null;

    return (
        <>
            <main className="company-page-header">
                <NavBar/>
                <header className="company-header">
                    {emptyMessage && (
                        <p className="error-message">{emptyMessage}</p>
                    )}
                    <h1>{company.name}</h1>
                    <p>
                        {company.bio || company.name + " " + "heeft nog geen bio toegevoegd."}
                    </p>
                </header>

                <section className="full-info-section">
                    <article className="company-details">
                        <section className="company-info-description">
                            <article className="company-info-availabilities">
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
                            </article>

                            <article className="company-info-services">
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
                            </article>
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