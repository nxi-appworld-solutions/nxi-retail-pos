import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Modal, Button, Form, Stack } from "react-bootstrap";
import { X } from "react-feather";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";

/**
 * Preview Excel Data in a grid with edit/delete capabilities
 *
 * Props:
 * - show: boolean
 * - onClose: () => void
 * - data: object[]
 * - onDeleteRow: (rowIndex: number) => void
 * - onSave: (updatedData: { updated: object[], fullData: object[] }) => void
 */
const ExcelPreviewModal = ({ show, onClose, data, onDeleteRow, onSave }) => {
  const gridRef = useRef(null);
  const dirty = useRef({});
  const [rowData, setRowData] = useState([]);
  const [quickFilter, setQuickFilter] = useState("");

  // Populate table with index-tracked data
  useEffect(() => {
    if (Array.isArray(data)) {
      const withIndexes = data.map((item, index) => ({
        ...item,
        _rowIndex: index,
      }));
      setRowData(withIndexes);
    }
  }, [data]);

  // Column builder with dynamic header generation
  const columnDefs = useMemo(() => {
    if (!data?.length) return [];

    const headers = Object.keys(data[0]);

    return [
      ...headers.map((key, index) => ({
        headerName: key,
        field: key,
        editable: true,
        flex: index === 0 ? 2 : 1,
        minWidth: index === 0 ? 180 : 120,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        valueParser: (p) => (p.newValue ?? "").trim(),
        cellRenderer: ({ value }) =>
          typeof value === "string" &&
          (value.startsWith("http") || value.startsWith("data:image")) ? (
            <img
              src={value}
              alt=""
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          ) : (
            value ?? ""
          ),
      })),
      {
        headerName: "❌",
        width: 80,
        pinned: "right",
        cellRenderer: () => (
          <button className="btn btn-sm btn-outline-danger">Del</button>
        ),
        onCellClicked: (params) => {
          onDeleteRow?.(params.data._rowIndex);
        },
        suppressMenu: true,
      },
    ];
  }, [data, onDeleteRow]);

  // Track edits
  const onCellValueChanged = useCallback((params) => {
    const { _rowIndex, ...rest } = params.data;
    dirty.current[_rowIndex] = { ...rest };
  }, []);

  const handleSaveChanges = () => {
    const updated = Object.values(dirty.current);
    if (onSave) {
      onSave({
        updated,
        fullData: rowData,
      });
    }
    dirty.current = {};
  };

  const handleQuickSearch = (e) => {
    const value = e.target.value;
    setQuickFilter(value);
    gridRef.current?.api?.setQuickFilter(value);
  };

  const clearSearch = () => {
    setQuickFilter("");
    gridRef.current?.api?.setQuickFilter("");
  };

  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="xl"
      centered
      backdrop="static"
      fullscreen="sm-down"
    >
      <Modal.Header>
        <Modal.Title>🔍 Excel Data Preview</Modal.Title>
        <button
          type="button"
          className="modal-close-button"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={14} />
        </button>
      </Modal.Header>

      <Modal.Body style={{ height: "75vh", paddingBottom: 0 }}>
        {/* Top Bar */}
        <Stack direction="horizontal" gap={2} className="mb-3 flex-wrap">
          <Form.Control
            size="sm"
            placeholder="Search all fields…"
            value={quickFilter}
            onChange={handleQuickSearch}
            style={{ maxWidth: 300 }}
          />
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => gridRef.current?.api?.exportDataAsCsv()}
          >
            ⬇️ Export CSV
          </Button>
        </Stack>

        <div
          className="ag-theme-quartz"
          style={{
            height: "90%",
            minHeight: 300,
            width: "100%",
            overflowX: "auto",
          }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              sortable: true,
              resizable: true,
              editable: true,
              filter: true,
              floatingFilter: true,
            }}
            immutableData
            getRowId={(r) => r.data._rowIndex}
            enableCellTextSelection
            animateRows
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </Modal.Body>

      <Modal.Footer className="justify-content-between">
        {/* <Button
          variant="primary"
          onClick={handleSaveChanges}
          disabled={Object.keys(dirty.current).length === 0}
        >
          💾 Save Changes
        </Button> */}
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExcelPreviewModal;
