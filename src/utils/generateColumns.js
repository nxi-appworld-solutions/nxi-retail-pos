import React from "react";
import { Link } from "react-router-dom";

/**
 * Generates table columns dynamically
 * @param {Array} columnConfig - Configuration for columns
 * @param {Function} handlers - Action handlers (like edit, delete)
 */
export const generateColumns = (columnConfig = [], handlers = {}) => {
  return columnConfig.map((col) => {
    if (col.type === "actions") {
      return {
        title: col.title || "Actions",
        key: col.key || "actions",
        render: (_, record) => (
          <div className="action-table-data">
            <div className="edit-delete-action">
              {col.actions.includes("edit") && (
                <button
                  className="me-2 p-2 btn btn-link"
                  onClick={() => handlers.onEdit?.(record)}
                >
                  <i data-feather="edit" className="feather-edit"></i>
                </button>
              )}
              {col.actions.includes("delete") && (
                <button
                  className="p-2 btn btn-link"
                  onClick={() => handlers.onDelete?.(record)}
                >
                  <i data-feather="trash-2" className="feather-trash-2"></i>
                </button>
              )}
            </div>
          </div>
        ),
      };
    }

    return {
      title: col.title,
      dataIndex: col.dataIndex,
      key: col.key || col.dataIndex,
      render: col.render || undefined,
    };
  });
};
