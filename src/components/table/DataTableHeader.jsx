import React from "react";
import { Download } from "react-feather";
import { Link } from "react-router-dom";
import TableActionBar from "./DataTableActionBar";

interface Props {
  title: string;
  subtitle?: string;
  importLabel?: string;
  addButtonLabel?: string;
  showImport?: boolean;
  onNavigate?: () => void;
  showImportModal?: () => void;
  onExportExcel?: () => void;
  onExportPdf?: () => void;
  onRefresh?: () => void;
  showIcons?: {
    pdf?: boolean,
    excel?: boolean,
    refresh?: boolean,
    collapse?: boolean,
  };
  exportData?: any[];
}

const DataTableHeader: React.FC<Props> = ({
  title,
  subtitle,
  importLabel = "Import",
  addButtonLabel,
  showImport = false,
  onNavigate = () => {},
  showImportModal = () => {},
  onExportExcel = () => {},
  onExportPdf = () => {},
  onRefresh = () => {},
  showIcons = {
    pdf: true,
    excel: true,
    refresh: true,
    collapse: true,
  },
  exportData = [],
}) => {
  return (
    <div className="page-header">
      <div className="add-item d-flex">
        <div className="page-title">
          <h4>{title}</h4>
          <h6>{`Manage your ${subtitle}s`}</h6>
        </div>
      </div>
      <TableActionBar
        onExportPdf={onExportPdf}
        onExportExcel={onExportExcel}
        onRefresh={onRefresh}
        showIcons={showIcons}
      />
      <div className="page-btn">
        <button className="btn btn-primary" onClick={onNavigate}>
          <i className="ti ti-circle-plus me-1" /> Add {title}
        </button>
      </div>

      {showImport && (
        <div className="page-btn import">
          <Link
            to="#"
            className="btn btn-secondary color"
            onClick={showImportModal}
          >
            <Download className="feather me-2" />
            {importLabel || "Import"}
          </Link>
        </div>
      )}
    </div>
  );
};

export default DataTableHeader;
