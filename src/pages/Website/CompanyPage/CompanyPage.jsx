import './CompanyPage.css';
import {useParams} from "react-router-dom";
import NavBar from "../../../components/website/NavBar/NavBar.jsx";
import AppointmentForm from "../../../components/website/Appointment_Form/AppointmentForm.jsx";
import {useEffect, useState} from "react";
import api from "../../../api/api";
import SearchResultCard from "../../../components/website/SearchResult/SearchResultCard.jsx";
import Footer from "../../../components/website/Footer/Footer.jsx";

function CompanyPage() {
    const {companyId} = useParams();

    const [company, setCompany] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availabilities, setAvailabilities] = useState([]);

    // ---- BEDRIJF OPHALEN ----
    useEffect(() => {
        async function fetchCompany() {
            try {
                const res = await api.get(`/companies/${companyId}`);
                setCompany(res.data);
            } catch (err) {
                console.error("Kon bedrijf niet ophalen:", err);
            }
        }

        fetchCompany();
    }, [companyId]);

    // ---- SERVICES OPHALEN & AVAILABILITIES OPHALEN ----
    useEffect(() => {
        async function fetchServices() {
            try {
                const res = await api.get(`/services?companyId=${companyId}`);
                setServices(res.data);

                const AvailResponse = await api.get(`/availabilities?companyId=${companyId}`);
                setAvailabilities(AvailResponse.data);

            } catch (err) {
                console.error("Kon services niet ophalen:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, [companyId]);

    if (loading) return <p className="loading-message-company">Loading...</p>;
    if (!company) return <p>Bedrijf niet gevonden</p>;

    return (
        <>
            <header className="company-page-header">
                <NavBar/>
                <section className="full-info-section">
                    <div className="full-company-content">
                        <article className="company-info">
                            <h2>{company.name}</h2>
                            <p>
                                {company.bio || "Bedrijf heeft nog geen bio toegevoegd!"}
                            </p>
                        </article>
                        <article className="company-info-description">
                            <div className="company-info-availabilities">
                                <h3>Onze openingstijden</h3>
                                {availabilities.length > 0 ? (
                                    availabilities.map((availability) => (
                                        <p key={availability.id}>{availability.dayOfWeek} - {availability.startTime} tot {availability.endTime}</p>
                                    ))
                                ) : (
                                    <p>Geen openingstijden gevonden</p>
                                )
                                }
                            </div>
                            <article className="company-info-services">
                                <h3>Onze diensten</h3>
                                {services.length > 0 ? (
                                    services.map((service) => (
                                        <p key={service.id}>{service.name} (€{service.price} & {service.duration} min)
                                            </p>

                                    ))
                                ) : (
                                    <p>Geen diensten gevonden</p>
                                )}
                            </article>
                        </article>
                    </div>

                    <section className="appointment-content">
                        <AppointmentForm
                            companyId={companyId}
                            services={services}
                            availabilities={availabilities}

                        />
                    </section>
                </section>
            </header>
            <Footer/>
        </>
    );
}

export default CompanyPage;
