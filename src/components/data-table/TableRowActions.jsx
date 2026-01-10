import { Link } from "react-router-dom";
import { Eye, Edit, Trash2 } from "react-feather";

const ActionLink = ({ onClick, children, className = "" }) => {
  return (
    <Link
      to="#"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
    >
      {children}
    </Link>
  );
};

const TableRowActions = ({
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  canView = true,
  canEdit = true,
  canDelete = true,
}) => {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        {canView && (
          <ActionLink onClick={onView} className="me-2 p-2">
            <Eye className="feather-view" size={16} />
          </ActionLink>
        )}

        {canEdit && (
          <ActionLink onClick={onEdit} className="me-2 p-2">
            <Edit className="feather-edit" size={16} />
          </ActionLink>
        )}

        {canDelete && (
          <ActionLink onClick={onDelete} className="confirm-text p-2">
            <Trash2 className="feather-trash-2" size={16} />
          </ActionLink>
        )}
      </div>
    </div>
  );
};

export default TableRowActions;
