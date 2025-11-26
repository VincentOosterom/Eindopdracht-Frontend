import './CompanyPage.css';
import {useParams} from "react-router-dom";
import NavBar from "../../../components/website/NavBar/NavBar.jsx";
import AppointmentForm from "../../../components/website/Appointment_form/AppointmentForm.jsx";
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

    // ---- SERVICES OPHALEN ----
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


    if (!company) return <p>Bedrijf niet gevonden</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <header className="company-page-header">
                <NavBar/>

                <div className="full-company-content">
                    <div className="company-info">
                        <SearchResultCard
                            key={company.id}
                            title={company.name}
                            description={company.bio}
                            company={company}
                            address={company.address}
                            name="Boek nu"
                        />
                        <h3>Onze openingstijden</h3>
                        {availabilities.length > 0 &&
                            availabilities.map((availability) => (
                                <p key={availability.id}>{availability.dayOfWeek} - {availability.startTime} tot {availability.endTime}</p>
                            ))
                        }
                    </div>

                    <div className="appointment-content">
                        <AppointmentForm
                            companyId={companyId}
                            services={services}
                        />
                    </div>
                </div>
            </header>
            <Footer/>
        </>
    );
}

export default CompanyPage;
