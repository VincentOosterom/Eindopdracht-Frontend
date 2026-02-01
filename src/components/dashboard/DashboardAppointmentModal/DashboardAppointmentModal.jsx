import AppointmentForm from "../../website/Appointment_Form/AppointmentForm.jsx";
import "./DashboardAppointmentModal.css";

export default function DashboardAppointmentModal({
                                                      services,
                                                      companyId,
                                                      availabilities,
                                                      onClose,
                                                  }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Sluiten"
                >
                    ✕
                </button>

                <AppointmentForm
                    title="Nieuwe afspraak toevoegen"
                    services={services}
                    companyId={companyId}
                    availabilities={availabilities}
                />
            </div>
        </div>
    );
}
