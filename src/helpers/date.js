// Converteert DD-MM-YYYY naar YYYY-MM-DD
export function convertToISO(dateString) {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
}

// Converteert YYYY-MM-DD naar DD-MM-YYYY
export function convertToNL(iso) {
    const [year, month, day] = iso.split("-");
    return `${day}-${month}-${year}`;
}

// Check of een datum vandaag is
export function isToday(dateString) {
    const iso = convertToISO(dateString);
    const today = new Date().toISOString().split("T")[0];
    return iso === today;
}
