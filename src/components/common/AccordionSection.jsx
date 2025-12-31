import React from "react";

const AccordionSection = ({
  id,
  title,
  icon: Icon,
  children,
  defaultOpen = true,
  parentId,
}) => {
  const collapseId = `${id}-collapse`;
  const headingId = `${id}-heading`;

  return (
    <div className="accordion-item border mb-3">
      <h2 className="accordion-header" id={headingId}>
        <button
          className={`accordion-button ${defaultOpen ? "" : "collapsed"} bg-light`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-expanded={defaultOpen}
          aria-controls={collapseId}
        >
          {Icon && <Icon className="text-primary me-2" size={18} />}
          {title}
        </button>
      </h2>

      <div
        id={collapseId}
        className={`accordion-collapse collapse ${defaultOpen ? "show" : ""}`}
        aria-labelledby={headingId}
        data-bs-parent={parentId ? `#${parentId}` : undefined}
      >
        <div className="accordion-body p-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
