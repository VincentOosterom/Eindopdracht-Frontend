import'./HeaderDashboard.css'

function HeaderDashboard({title, company}) {

    return (
            <header>
                <h2 className="dashboard-header-title">{title} {company}</h2>
            </header>
    )
}

export default HeaderDashboard;