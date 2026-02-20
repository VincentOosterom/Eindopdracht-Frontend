import "./DashboardLoader.css";

function DashboardLoader({ text = "Dashboard laden..." }) {
    return (
        <section className="dashboard-loader-overlay">
            <article className="dashboard-loader">
                <div className="spinner"></div>
                <p>{text}</p>
            </article>
        </section>
    );
}

export default DashboardLoader;
