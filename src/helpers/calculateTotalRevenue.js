export const calculateTotalRevenue = (appointments = [], services = []) => {
    return appointments.reduce((total, appointment) => {
        const service = services.find(
            s => s.id === appointment.serviceId
        );
        return total + (service?.price || 0);
    }, 0);
};