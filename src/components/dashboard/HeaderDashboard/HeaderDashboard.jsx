import'./HeaderDashboard.css'

function HeaderDashboard({title, company}) {

    return (
        <>
            <div>
                <h2 className="dashboard-header-title">{title} {company}</h2>
            </div>
        </>
    )
}

export default HeaderDashboard;