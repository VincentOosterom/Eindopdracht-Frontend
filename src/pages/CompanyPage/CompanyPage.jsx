import './CompanyPage.css';
import {useParams} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { companies } from "/src/data/companies.js";


function CompanyPage() {

    const {companyId} = useParams();
    const company = companies.find(company => company.companyId === companyId);

    if (!company) return <p>Bedrijf niet gevonden</p>


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
            </header>
        </>

    )
}

export default CompanyPage;