🕒 Tijdslot

Tijdslot is een online afspraakplanner voor freelancers en ondernemers.
Bedrijven kunnen afspraken beheren, klanten laten boeken en agenda’s synchroniseren.

🎯 Over dit project

Tijdslot is ontwikkeld als onderdeel van de opleiding Full-Stack Developer.
Het project demonstreert kennis van frontend-ontwikkeling met React (Vite), component-architectuur, state management en
routing.

Het doel is om een gebruiksvriendelijke, efficiënte en schaalbare omgeving te creëren waarin ondernemers hun tijd en
klanten kunnen beheren.

⚙️ Functionaliteiten

✨ Inloggen met bedrijfsaccount

📅 Afsprakenoverzicht via interactieve kalender

👥 Klantbeheer

⚙️ Instellingen per bedrijf

🔒 Unieke bedrijfs-URL’s zoals /dashboard/:companyId

📱 Responsief ontwerp met mobiele sidebar

🧠 Technologieën
Technologie Omschrijving
React (Vite)    Frontend framework voor snelle webapplicaties
React Router Routing voor dynamische pagina’s per bedrijf
Font Awesome Iconen voor navigatie en UI
CSS Modules / Media Queries Gestileerde, responsive componenten

# **Installatiehandleiding – Tijdslot**

1. Vereisten

Voor het draaien van deze applicatie zijn de volgende onderdelen vereist:

Node.js (versie 18 of hoger)

npm (meegeleverd met Node.js)

Een moderne browser (Chrome, Edge of Firefox)

Internetverbinding (voor communicatie met de NOVI Backend API)

2. Repository clonen

Clone de repository via GitHub:

git clone https://github.com/VincentOosterom/Eindopdracht-Frontend.git

Navigeer daarna naar de projectmap:

cd Eindopdracht-Frontend

3. Installeren van dependencies

Installeer alle benodigde packages:

npm install

## ****_4. Aanmaken van de API-map_****

Binnen de rootmap van het project bevindt zich de map src.

Maak binnen src een nieuwe map aan met de naam:

src/api

In deze map maak je een bestand aan:

api.js

**5. Configuratie van de API-interceptor**

Plaats in api.js de volgende configuratie:

**Daarna** 

7.Applicatie starten

Start de development server met:

npm run dev

````import axios from "axios";

const api = axios.create({
baseURL: "https://novi-backend-api-wgsgz.ondigitalocean.app/api",
});

api.interceptors.request.use((config) => {
if (!config.headers) {
config.headers = {};
}

    // NOVI project header
    config.headers["novi-education-project-id"] =
        "d6200c4d-2a0a-435d-aba6-6171c6a7296e";

    // Token uit localStorage -> Authorization header
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        const { token } = JSON.parse(storedUser);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});````

export default api;
