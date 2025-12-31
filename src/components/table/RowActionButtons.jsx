import React from "react";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash2 } from "react-feather";

interface Props {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  canView?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

const RowActionButtons: React.FC<Props> = ({
  onView,
  onEdit,
  onDelete,
  canView = true,
  canEdit = true,
  canDelete = true,
}) => {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        {canView && onView && (
          <Link
            to="#"
            className="me-2 p-2"
            onClick={(e) => {
              e.preventDefault();
              onView();
            }}
          >
            <Eye className="feather-view" />
          </Link>
        )}

        {canEdit && onEdit && (
          <Link
            to="#"
            className="me-2 p-2"
            onClick={(e) => {
              e.preventDefault();
              onEdit();
            }}
          >
            <Edit className="feather-edit" />
          </Link>
        )}

        {canDelete && onDelete && (
          <Link
            to="#"
            className="confirm-text p-2"
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
          >
            <Trash2 className="feather-trash-2" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default RowActionButtons;
