import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { setToogleHeader } from "../../core/redux/action";

const TableHeaderActions = ({
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

  const isCollapsed = useSelector(
    (state) => state.rootReducer.toggle_header
  );

  const handleClick = (cb) => (e) => {
    e.preventDefault();
    if (cb) cb();
  };

  return (
    <ul className="table-top-head">
      {showIcons.pdf && onExportPdf && (
        <li>
          <Tooltip title="PDF">
            <Link to="#" onClick={handleClick(onExportPdf)}>
              <ImageWithBasePath
                src="assets/img/icons/pdf-icon.svg"
                alt="pdf"
              />
            </Link>
          </Tooltip>
        </li>
      )}

      {showIcons.excel && onExportExcel && (
        <li>
          <Tooltip title="Excel">
            <Link to="#" onClick={handleClick(onExportExcel)}>
              <ImageWithBasePath
                src="assets/img/icons/excel-icon.svg"
                alt="excel"
              />
            </Link>
          </Tooltip>
        </li>
      )}

      {showIcons.refresh && onRefresh && (
        <li>
          <Tooltip title="Refresh">
            <Link to="#" onClick={handleClick(onRefresh)}>
              <i className="ti ti-refresh" />
            </Link>
          </Tooltip>
        </li>
      )}

      {showIcons.collapse && (
        <li>
          <Tooltip title="Collapse">
            <Link
              to="#"
              id="collapse-header"
              className={isCollapsed ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setToogleHeader(!isCollapsed));
              }}
            >
              <i className="ti ti-chevron-up" />
            </Link>
          </Tooltip>
        </li>
      )}
    </ul>
  );
};

export default TableHeaderActions;
