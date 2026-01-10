import TableActionBar from "./TableHeaderActions";

const DataTableHeader = ({
  title,
  subtitle,
  description,
  actions = [],
  tableActions,
}) => {
  return (
    <div className="page-header">
      {/* TITLE */}
      <div className="add-item d-flex">
        <div className="page-title">
          <h4>{title}</h4>
          {subtitle && <h6>{subtitle}</h6>}
          {description && <small className="text-muted">{description}</small>}
        </div>
      </div>

      {/* TABLE ICON ACTIONS */}
      {tableActions && (
        <TableActionBar
          onExportExcel={tableActions.onExportExcel}
          onExportPdf={tableActions.onExportPdf}
          onRefresh={tableActions.onRefresh}
          showIcons={tableActions.showIcons}
        />
      )}

      {/* PRIMARY ACTIONS */}
      <div className="d-flex gap-2 page-btn">
        {actions
          .filter((action) => action.show !== false)
          .map((action, index) => (
            <button
              key={index}
              className={`btn btn-${action.variant === "secondary" ? "secondary" : "primary"}`}
              onClick={action.onClick}
            >
              {action.icon && <span className="me-1">{action.icon}</span>}
              {action.label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default DataTableHeader;
