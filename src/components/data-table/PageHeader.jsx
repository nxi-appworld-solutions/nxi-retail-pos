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
        {actions.map((action, index) => {
          if (action.children) {
            return (
              <div key={index} className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  {action.icon} {action.label}
                </button>

                <ul className="dropdown-menu">
                  {action.children.map((child, i) => (
                    <li key={i}>
                      <button className="dropdown-item" onClick={child.onClick}>
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          return (
            <button
              key={index}
              className="btn btn-primary"
              onClick={action.onClick}
            >
              {action.icon} {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DataTableHeader;
