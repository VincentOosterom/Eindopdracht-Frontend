import AppointmentForm from "../../../website/company_page/AppointmentForm/AppointmentForm.jsx";
import "./DashboardAppointmentModal.css";

export default function DashboardAppointmentModal({
                                                      services,
                                                      companyId,
                                                      availabilities,
                                                      onClose,
                                                  }) {
    return (
        <section className="modal-overlay">
            <article className="modal-content">
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
            </article>
        </section>
    );
}
