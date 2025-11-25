import './CompanyPage.css';
import {useParams} from "react-router-dom";
import NavBar from "../../../components/website/NavBar/NavBar.jsx";
import { companies } from "/src/dummy-data/companies.js";
import AppointmentForm from "../../../components/website/Appointment_form/AppointmentForm.jsx";
import {useEffect, useState} from "react";
import axios from "axios";


function CompanyPage() {

    const [services, setServices] = useState([]);

    const {companyId} = useParams();
    const company = companies.find(c => c.companyId === companyId);

    if (!company) return <p>Bedrijf niet gevonden</p>

    useEffect(() => {
        async function fetchServices() {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `https://novi-backend-api-wgsgz.ondigitalocean.app/api/services?userId=${companyId}`,
                {
                    headers: {
                        "novi-education-project-id": "d6200c4d-2a0a-435d-aba6-6171c6a7296e",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            setServices(response.data);
        }

        fetchServices();
    }, [companyId]);


    return (
        <>
            <header className="company-page-header">
                <div>
                    <NavBar/>
                </div>
                <div className="companies-page">
                    <img src={company.image} alt="Bedrijfslogo"/>
                    <div className="companies-page-content">
                        <h1>{company.title}</h1>
                        <p>{company.description}</p>
                        <p>{company.address}</p>
                    </div>
                </div>
                <div className="appointment-content">
                    <AppointmentForm companyId={companyId} services={services} />
                </div>
            </header>
        </>

    )
}

export default CompanyPage;