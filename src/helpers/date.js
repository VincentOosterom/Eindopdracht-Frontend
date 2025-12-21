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

 export function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay(); // 0 = zondag
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // maandag
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

export function getEndOfWeek(date) {
    const start = getStartOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
}
