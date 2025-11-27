import './SearchResultCard.css';
import {useNavigate} from "react-router-dom";

function SearchResultCard({ company }) {
    const navigate = useNavigate();

    const {
        id,
        name,
        bio,
        address
    } = company;

    function handleGoCompanyPage(){
        navigate(`/boek-nu/${id}`);
    }

    return (
        <article className="search-result-card">
            <div className="search-result-card-content">
                    <h3>{name}</h3>

                    <p className="bio">
                        {bio || "Dit bedrijf heeft nog geen beschrijving toegevoegd."}
                    </p>

                    {address && <p className="address">{address}</p>}

                    <button className="book-btn" onClick={handleGoCompanyPage}>Boek nu</button>
                </div>
        </article>
    );
}

export default SearchResultCard;
