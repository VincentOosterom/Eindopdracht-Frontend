export const calculateTotalRevenue = (appointments = [], services = []) => {
    return appointments.reduce((total, appointment) => {
        const service = services.find(
            s => s.id === appointment.serviceId
        );
        return total + (service?.price || 0);
    }, 0);
};


export function calculateTax(totalRevenue) {
    return Number(((totalRevenue * 9) / 109).toFixed(2));
}