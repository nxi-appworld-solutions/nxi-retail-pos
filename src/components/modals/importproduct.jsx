/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import Select from "react-select";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { X } from "react-feather";
import { toast } from "react-toastify";
import { filterEmptyRows, readExcelFile } from "../../utils/importToExcel";
import ExcelPreviewModal from "./ExcelPreviewModal";
import { API_URL, PUBLIC_URL } from "../../environment";
import Loader from "../loader/loader";
import { generateSlug } from "../../utils/common";
import { normalizeExcelHeader } from "../../utils/importToExcel"; // Import it

const ImportProduct = ({
  title,
  label = "Select Action",
  show,
  actionOptions,
  handleClose,
  onSuccess,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!show) resetForm();
  }, [show]);

  const resetForm = () => {
    setSelectedOption(null);
    setSelectedFile(null);
    setPreviewData([]);
  };

  const handleSelectOption = (option) => {
    if (selectedOption?.value !== option?.value) {
      resetForm();
      setSelectedOption(option);
    } else {
      setSelectedOption(option);
    }
  };

  // const templateMap = {
  //   product: "/templates/product_template.xlsx",
  //   stock: "/templates/product_stock_template.xlsx",
  // };

  const templateMap = {
    product: `${PUBLIC_URL}/templates/product_template.xlsx`,
    stock: `${PUBLIC_URL}/templates/product_stock_template.xlsx`,
  };

  const handleDownloadTemplate = () => {
    if (!selectedOption?.value) return toast.warning("Select an option first");
    const url = templateMap[selectedOption.value];
    if (!url) return toast.error("Template not found");

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `template_${selectedOption.value}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generate_sku = async () => {
    try {
      const res = await fetch(`${API_URL}/GenerateSku/generate-sku`);
      const { sku } = await res.json();
      return sku || "";
    } catch {
      return "";
    }
  };

  const get_master_name_to_code = async (masterType, name) => {
    try {
      const res = await fetch(
        `${API_URL}/GetMasterNameToCode?masterType=${masterType}&name=${name}`
      );
      const { data } = await res.json();
      console.log("data", data);
      return data || "";
    } catch {
      return "";
    }
  };

  const handleFileChange = async (event) => {
    if (!selectedOption) {
      toast.warning("Please select action.");
      return;
    }

    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);

    readExcelFile(
      file,
      async (parsed) => {
        if (
          !Array.isArray(parsed) ||
          parsed.length < 2 ||
          !Array.isArray(parsed[0])
        ) {
          toast.error("Invalid file format. Ensure the first row has headers.");
          return;
        }

        const [rawHeaders, ...rows] = parsed;
        const headers = rawHeaders.map(normalizeExcelHeader);

        const formatted = await Promise.all(
          rows.map(async (row) => {
            const rowData = headers.reduce((obj, key, i) => {
              obj[key || `Column${i + 1}`] = row[i];
              return obj;
            }, {});

            return {
              ...rowData,
              ...(selectedOption?.value === "product" && {
                Sku: await generate_sku(),
              }),
            };
          })
        );
        const nonEmptyRows = filterEmptyRows(formatted);

        console.log("Parsed data with headers:", nonEmptyRows);
        setPreviewData(nonEmptyRows);
        setShowPreviewModal(true);
      },
      (err) => {
        console.error("Excel read error:", err);
        toast.error("Failed to read Excel file.");
      }
    );
  };

  const handleDeleteRow = (rowIndex) => {
    const updated = [...previewData];
    updated.splice(rowIndex, 1);
    setPreviewData(updated);
  };

  const handlePreviewDataChange = (updatedData) => {
    setPreviewData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!selectedOption || !selectedFile) {
      toast.warning("Please select action and upload file.");
      setIsLoading(false);
      return;
    }
    if (previewData.length === 0) {
      toast.warning("No data to import.");
      setIsLoading(false);
      return;
    }

    // previewData is already an array of row objects
    const validRows = previewData.filter((rowObj) => {
      const qty = parseFloat(rowObj.Qty);
      return !isNaN(qty) && qty > 0;
    });

    if (validRows.length === 0) {
      toast.warning("No valid rows found with Qty > 0.");
      setIsLoading(false);
      return;
    }

    // if (!rowObj.Name || typeof rowObj.Name !== "string") {
    //   toast.warning("Some rows are missing product Name.");
    //   return;
    // }

    try {
      if (selectedOption.value === "product") {
        await savingProducts(validRows);
      } else if (selectedOption.value === "stock") {
        await updatingStock(validRows);
      } else {
        toast.error("Invalid action selected.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const savingProducts = async (validRows) => {
    // Convert each row to the required format
    const convertedRows = await Promise.all(
      validRows.map(async (rowObj) => {
        const parentGrpArr = await get_master_name_to_code(
          5,
          rowObj?.ParentGrp
        ); // masterType 5 = Parent Group
        const unitCodeArr = await get_master_name_to_code(8, rowObj?.Unit); // masterType 8 = Unit

        console.log("parentGrpArr", parentGrpArr);
        console.log("unitCodeArr", unitCodeArr);

        // if (parentGrpArr.length === 0 || unitCodeArr.length === 0) {
        //   toast.error("Invalid Parent Group or Unit in row.");
        //   setIsLoading(false);
        //   return null; // Skip this row
        // }

        return {
          Code: 0,
          Name: rowObj.Name || "",
          PrintName: rowObj.PrintName || "",
          ParentGrp: parentGrpArr[0]?.value || 0,
          Slug: generateSlug(rowObj.Name),
          Sku: rowObj.Sku || "",
          Unit: unitCodeArr[0]?.value || 0,
          Description: rowObj.Description || "",
          ProductType: rowObj.ProductType === "non-veg" ? 2 : 1 || 1,
          ProductTypeName: rowObj.ProductType || "Veg",
          Qty: parseFloat(rowObj.Qty) || 0,
          MinQty: parseFloat(rowObj.MinQty) || 0,
          Price: parseFloat(rowObj.Price) || 0,
          Discount: parseFloat(rowObj.DiscountValue) || 0,
          TaxType: 1,
          TaxTypeName: "Exclusive",
          DiscountType: 1,
          DiscountTypeName: "Cash",
          IsActive: true,
          MasterType: 6,
          Users: "admin",
          Images: [],
        };
      })
    );

    const payload = { ImportProducts: convertedRows };

    try {
      const request = await fetch(`${API_URL}/SaveProductsFromExcel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await request.json();
      toast.success(data.msg || "Products imported successfully!");
      handleClose();
      onSuccess();
    } catch (err) {
      toast.error("Error importing products.");
    } finally {
      setIsLoading(false);
    }
  };

  const updatingStock = async (validRows) => {
    const convertedRows = validRows.map((rowObj) => ({
      Name: rowObj.Name || "",
      Qty: parseFloat(rowObj.Qty) || 0,
    }));

    const payload = { importStocks: convertedRows };
    // console.log("Payload for stock update:", payload);

    try {
      const response = await fetch(`${API_URL}/UpdateStockFromExcel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      toast.success(data.msg || "Stock updated successfully!");
      handleClose();
      onSuccess();
    } catch (err) {
      toast.error("Error updating stock.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <button
            type="button"
            className="modal-close-button"
            aria-label="Close"
            onClick={() => {
              resetForm();
              handleClose();
            }}
          >
            <X size={12} />
          </button>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={12}>
                <Form.Group controlId="productSelect">
                  <Form.Label>
                    {label} <span className="text-danger">*</span>
                  </Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={actionOptions}
                    value={selectedOption}
                    onChange={handleSelectOption}
                    isSearchable={false}
                    placeholder="Choose"
                  />
                </Form.Group>
              </Col>

              <Col md={12} className="mt-3">
                <Button
                  variant="outline-primary"
                  onClick={handleDownloadTemplate}
                  disabled={!selectedOption}
                >
                  Download Sample File
                </Button>
              </Col>

              <Col md={12} className="mt-3 mb-3">
                <Form.Group controlId="fileUpload">
                  <Form.Label>Upload Excel File</Form.Label>
                  <div className="image-upload download">
                    <Form.Control
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileChange}
                      className="form-control-file"
                    />
                    <div className="image-uploads mt-2 text-center">
                      <ImageWithBasePath
                        src="assets/img/download-img.png"
                        alt="img"
                      />
                      <h4>
                        Drag and drop a <span>file to upload</span>
                      </h4>
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-between flex-wrap gap-2">
            <div>
              {previewData.length > 0 && (
                <Button
                  className="me-2"
                  variant="outline-secondary"
                  onClick={() => setShowPreviewModal(true)}
                >
                  🔍 Preview Again
                </Button>
              )}
            </div>

            <div className="d-flex gap-2 ms-auto">
              <Button
                variant="secondary"
                onClick={() => {
                  resetForm();
                  handleClose();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || previewData.length === 0}
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Importing...
                  </>
                ) : (
                  "💾 Save"
                )}
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Preview Modal */}
      <ExcelPreviewModal
        show={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        data={previewData}
        onDeleteRow={handleDeleteRow}
        onDataChange={handlePreviewDataChange}
      />
    </>
  );
};

export default ImportProduct;
