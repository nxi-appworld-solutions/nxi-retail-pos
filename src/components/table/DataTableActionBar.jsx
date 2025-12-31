import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";

interface Props {
  onExportPdf: () => void;
  onExportExcel: () => void;
  onRefresh: () => void;
  onToggleCollapse: () => void;
  isHeaderCollapsed: boolean;
  showIcons?: {
    pdf?: boolean,
    excel?: boolean,
    refresh?: boolean,
    collapse?: boolean,
  };
  exportData?: any[];
}

const TableActionBar: React.FC<Props> = ({
  onExportPdf,
  onExportExcel,
  onRefresh,
  showIcons = {
    pdf: true,
    excel: true,
    refresh: true,
    collapse: true,
  },
}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.rootReducer.toggle_header);

  return (
    <>
      <ul className="table-top-head">
        {showIcons.pdf && (
          <li onClick={onExportPdf}>
            <Tooltip title="Pdf">
              <Link to="#">
                <ImageWithBasePath
                  src="assets/img/icons/pdf-icon.svg"
                  alt="img"
                />
              </Link>
            </Tooltip>
          </li>
        )}

        {showIcons.excel && (
          <li onClick={onExportExcel}>
            <Tooltip title="Excel">
              <Link to="#">
                <ImageWithBasePath
                  src="assets/img/icons/excel-icon.svg"
                  alt="img"
                />
              </Link>
            </Tooltip>
          </li>
        )}

        {showIcons.refresh && (
          <li
            onClick={(e) => {
              e.preventDefault();
              onRefresh();
            }}
          >
            <Tooltip title="Refresh">
              <Link to="#">
                <i className="ti ti-refresh"></i>
              </Link>
            </Tooltip>
          </li>
        )}

        {showIcons.collapse && (
          <li onClick={(e) => e.preventDefault()}>
            <Tooltip title="Collapse">
              <Link
                to="#"
                id="collapse-header"
                className={`${data ? "active" : ""}`}
                onClick={() => {
                  dispatch(setToogleHeader(!data));
                }}
              >
                <i className="ti ti-chevron-up"></i>
              </Link>
            </Tooltip>
          </li>
        )}
      </ul>
    </>
  );
};

export default TableActionBar;
