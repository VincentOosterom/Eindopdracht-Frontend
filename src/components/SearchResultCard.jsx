import './SearchResultCard.css'


function SearchResultCard({title, description, name, image, address}) {
    return (
        <article className="company-card">
            <div className="company-logo">
                <img src={image} alt="logo-company"/>
            </div>
            <div className="company-info">
                <h3>{title}</h3>
                <p>{description}</p>
                <p>{address}</p>
                <button>{name}</button>
            </div>
        </article>
    )
}

export default SearchResultCard;