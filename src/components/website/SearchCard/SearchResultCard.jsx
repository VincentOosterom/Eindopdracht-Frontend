import './SearchResultCard.css'
import { Link} from "react-router-dom";


function SearchResultCard({title, description, name, image, address, companyId}) {
    return (
        <article className="company-card">
            <div className="company-logo">
                <img src={image} alt="logo-company"/>
            </div>
            <div className="company-info">
                <h3>{title}</h3>
                <p>{description}</p>
                <p>{address}</p>
                <Link to={`/boek-nu/${companyId}`}>
                <button>{name}</button>
                    </Link>
            </div>
        </article>
    )
}

export default SearchResultCard;