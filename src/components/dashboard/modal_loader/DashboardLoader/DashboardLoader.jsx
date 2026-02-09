import "./DashboardLoader.css";

function DashboardLoader({ text = "Dashboard laden..." }) {
    return (
        <div className="dashboard-loader-overlay">
            <div className="dashboard-loader">
                <div className="spinner"></div>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default DashboardLoader;
