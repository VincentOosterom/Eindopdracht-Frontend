import './InfoCard.css'

function InfoCard({image, title, subtitle}) {
    return (
        <article className="info-card">
            <div className="info-card-image">
                <img src={image} alt="Icon"/>
            </div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
        </article>
    )
}

export default InfoCard;