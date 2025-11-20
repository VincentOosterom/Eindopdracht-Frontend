// Bereken eindtijd op basis van startTime ("10:00") + minuten
export function calculateEndTime(startTime, durationMinutes) {
    const [hours, minutes] = startTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + durationMinutes);
    return date.toTimeString().slice(0, 5);
}
