import './SearchResultCard.css';
import {Link, useNavigate} from "react-router-dom";

function SearchResultCard({ company }) {
    const navigate = useNavigate();

    const {
        id,
        name,
        bio,
        address
    } = company;

    function handleCompanyPage(){
        navigate(`/boek-nu/${id}`);
    }

    return (
        <article className="company-card">
            <div className="company-info">
                    <h3>{name}</h3>

                    <p className="bio">
                        {bio || "Dit bedrijf heeft nog geen beschrijving toegevoegd."}
                    </p>

                    {address && <p className="address">{address}</p>}

                    <button className="book-btn" onClick={handleCompanyPage}>Boek nu</button>
                </div>

        </article>
    );
}

export default SearchResultCard;
