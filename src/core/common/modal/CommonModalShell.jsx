import { X, RefreshCw, CheckCircle } from "react-feather";

const CommonModalShell = ({
  title,
  subtitle,
  icon: Icon,
  loading,
  onClose,
  onSubmit,
  children,
}) => {
  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block animate__animated animate__fadeI" tabIndex="-1">
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="modal-header bg-light px-4 py-3">
              <div className="d-flex align-items-center">
                {Icon && (
                  <div className="p-2 bg-primary bg-opacity-10 rounded-3 me-3">
                    <Icon size={22} />
                  </div>
                )}
                <div>
                  <h5 className="fw-bold mb-0">{title}</h5>
                  <p className="text-muted small mb-0">{subtitle}</p>
                </div>
              </div>

              <button
                className="btn btn-white border shadow-sm rounded-circle p-2 line-height-0"
                onClick={onClose}
              >
                <X size={18} />
              </button>
            </div>

            {/* BODY */}
            <div className="modal-body px-4 py-4 bg-white">{children}</div>

            {/* FOOTER */}
            <div className="modal-footer bg-light px-4 py-3">
              <button className="btn btn-outline-secondary" onClick={onClose}>
                Discard
              </button>

              <button
                className="btn btn-primary ms-2"
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="me-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="me-2" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonModalShell;
