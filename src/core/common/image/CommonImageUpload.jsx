import { useRef } from "react";
import { UploadCloud } from "react-feather";
import { Info } from "lucide-react";

const CommonImageUpload = ({ name, value, onChange }) => {
  const fileRef = useRef(null);

  return (
    <>
      <div
        className="card border-2 border-dashed rounded-3 p-4 text-center bg-light bg-opacity-50 cursor-pointer"
        style={{ height: 250 }}
        onClick={() => fileRef.current.click()}
      >
        {value ? (
          <img
            src={value}
            className="w-100 h-100 object-fit-contain rounded-3"
            alt="preview"
          />
        ) : (
          <>
            <div className="p-3 bg-white rounded-circle shadow-sm mb-3">
              <UploadCloud size={32} className="text-primary" />
            </div>
            <h6 className="fw-bold mb-1">Upload Icon</h6>
            <p className="text-muted small">
              PNG / SVG with transparent background (512x512px)
            </p>
          </>
        )}

        <input
          ref={fileRef}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) =>
            onChange({
              target: {
                name,
                value: URL.createObjectURL(e.target.files[0]),
              },
            })
          }
        />
      </div>

      <div className="mt-3 p-2 bg-soft-info rounded-3">
        <p className="small text-muted mb-0 d-flex align-items-center">
          <Info size={14} className="me-2 text-info" />
          This icon will appear on the POS grid and customer app.
        </p>
      </div>
    </>
  );
};

export default CommonImageUpload;
