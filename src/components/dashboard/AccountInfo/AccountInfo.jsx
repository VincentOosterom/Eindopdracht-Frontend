import './AccountInfo.css'


function AccountInfo({company}) {


    return (

        <section className="account-info">
            <div className="first-colum">
                <label htmlFor="company-name" className="account-label">Bedrijfsnaam:
                    <input type="text" id="company-name" value={company.title}/>
                </label>
                <label htmlFor="company-email" className="account-label">Zakelijk e-mail:
                    <input type="email" id="company-email" value={company.userEmail}/>
                </label>
            </div>

            <div className="second-colum">
                <label htmlFor="company-password" className="account-label">Wachtwoord
                    <input type="password" id="company-password" value={company.userPassword}/>
                </label>
                <label htmlFor="new-password" className="account-label">Nieuw wachtwoord
                    <input type="text" id="new-password"/>
                </label>
            </div>

            <div className="third-colum">
                <label htmlFor="new-password-confirm" className="account-label">Herhaal nieuw wachtwoord
                    <input type="text" id="new-password-confirm"/>
                </label>
                <button type="submit" className="account-button">
                    <p>Wachtwoord wijzigen</p>
                </button>
            </div>
        </section>
    )
}

export default AccountInfo;