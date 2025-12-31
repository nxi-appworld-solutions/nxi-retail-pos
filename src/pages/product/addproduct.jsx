import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "feather-icons-react/build/IconComponents";
import { toast } from "react-toastify";

// Constants & Utilities
import { all_routes } from "../../Router/all_routes";
import {
  generateSlug,
  handleImageChange as baseHandleImageChange,
  handleRemoveImage,
  loadImagesFromServer,
} from "../../utils/common";
import { API_URL } from "../../environment";
import { DISCOUNT_TYPES, PRODUCT_TYPES, TAX_TYPES } from "../../constants";
import { useDropdownState } from "../../utils/useDropdownState";
import { useMasterList } from "../../hooks/useMasterList";

// UI Components
import Loader from "../../components/loader/loader";
import ProductInfo from "../../components/product/ProductInfo";
import PricingStock from "../../components/product/PricingStock";
import ProductImages from "../../components/product/ProductImages";
import AddCategory from "../../components/modals/addCategory";
import AddUnit from "../../components/modals/addUnit";
import RefreshIcon from "../../core/common/tooltip-content/refresh";
import CollapesIcon from "../../core/common/tooltip-content/collapes";
import { generateFormData } from "../../utils/formUtils";
import { Button, Spinner } from "react-bootstrap";
import useForm from "../../hooks/useForm";

const initialData = {
  code: 0,
  name: "",
  alias: "",
  printName: "",
  parentGrp: 0,
  productSlug: "",
  sku: "",
  unit: "",
  description: "",
  productType: 0,
  productTypeName: "",
  qty: "",
  minQty: "",
  price: "",
  discount: "",
  taxType: 0,
  taxTypeName: "",
  discountType: "",
  discountTypeName: "",
  isActive: true,
  masterType: 6,
  users: "Admin",
  images: [],
};

const AddProduct = () => {
  const { handleEnterKey } = useForm(initialData);
  const { productlist } = all_routes;
  const location = useLocation();
  const navigate = useNavigate();
  const product = location?.state?.product;
  const [formData, setFormData] = useState(initialData);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errors, setErrors] = React.useState({ alias: "" });
  const { list: category, refetch: refetchCategory } = useMasterList(5);
  const { list: unit, refetch: refetchUnit } = useMasterList(8);

  const {
    dropdowns,
    setDropdowns,
    getValue,
    getLabel,
    clear: clearDropdowns,
  } = useDropdownState({
    selectedCategory: null,
    selectedUnit: null,
    selectedProductType: null,
    selectedTaxType: null,
    selectedDiscountType: null,
  });

  useEffect(() => {
    if (product) {
      fetchProductDet(product?.code);
    } else {
      generateSKU();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const fetchProductDet = async (code) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/GetProductMasterDetails/6?code=${code}`
      );
      const result = await res.json();
      const data = result?.data[0];

      const formatted = {
        ...initialData,
        code: data.code,
        name: data.name,
        alias: data.alias,
        printName: data.printName,
        productSlug: data.slug ?? generateSlug(data.name),
        sku: data.sku,
        qty: data.qty,
        minQty: data.minQty,
        price: data.price,
        discount: data.discount,
        description: data.description,
        isActive: data.isActive,
      };

      setDropdowns({
        selectedCategory: { value: data.parentGrp, label: data.parentGrpName },
        selectedUnit: { value: data.unit, label: data.unitName },
        selectedProductType: {
          value: data.productType,
          label: data.productTypeName,
        },
        selectedTaxType: { value: data.taxType, label: data.taxTypeName },
        selectedDiscountType: {
          value: data.discountType,
          label: data.discountTypeName,
        },
      });

      setFormData(formatted);

      const imagesFromServer = await loadImagesFromServer(
        data?.imageList || []
      );
      setImages(imagesFromServer);
    } catch (error) {
      toast.error("Failed to fetch product details.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSKU = async () => {
    try {
      const res = await fetch(`${API_URL}/GenerateSku/generate-sku`);
      const { sku } = await res.json();
      setFormData((prev) => ({ ...prev, sku }));
    } catch {
      toast.error("Failed to generate SKU");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      // ...(name === "name" && { productSlug: generateSlug(value) }),
    }));
  };

  const handleClear = () => {
    navigate(-1);
    setFormData(initialData);
    clearDropdowns();
    setImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const fields = {
        Code: formData.code,
        Name: formData.name,
        alias: formData.alias,
        PrintName: formData.printName || formData.name,
        ParentGrp: getValue("selectedCategory"),
        Unit: getValue("selectedUnit"),
        ProductType: getValue("selectedProductType"),
        ProductTypeName: getLabel("selectedProductType"),
        TaxType: getValue("selectedTaxType"),
        TaxTypeName: getLabel("selectedTaxType"),
        DiscountType: getValue("selectedDiscountType"),
        DiscountTypeName: getLabel("selectedDiscountType"),
        Description: formData.description,
        Qty: formData.qty,
        MinQty: formData.minQty,
        Price: formData.price,
        Discount: formData.discount,
        // Slug: formData.productSlug,
        Sku: formData.sku,
        deactiveMaster: formData.isActive ? false : true,
        MasterType: formData.masterType,
        Users: formData.users,
      };
      console.log("fields", fields);
      const payload = generateFormData({ fields, images });

      const res = await fetch(`${API_URL}/SaveProductMasterDetails`, {
        method: "POST",
        body: payload,
      });

      const result = await res.json();

      if (result?.status === 1) {
        toast.success(result.msg || "Product saved successfully");
        handleClear();
        generateSKU();
      } else {
        toast.error(result.msg || "Failed to save product");
      }
    } catch {
      toast.error("Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (type) => {
    setActiveModal(type); // 'unit' or 'category'
    setIsModalVisible(true);
    setSelectedItem(null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const handleAddedOrUpdated = () => {
    if (activeModal === "unit") {
      refetchUnit();
    } else if (activeModal === "category") {
      refetchCategory();
    }
    closeModal();
  };

  // 👉 Name पर blur/keydown/enter event
  const handleNameEvents = (e) => {
    const { value } = e.target;
    handleChange({
      target: { name: "name", value },
    });
    // PrintName में copy
    handleChange({
      target: { name: "printName", value },
    });
  };
  console.log("formData", formData);

  // 👉 Alias पर blur/keydown/enter event
  const handleAliasEvents = (e) => {
    const { value } = e.target;

    if (
      value.trim() &&
      value.trim().toLowerCase() === formData?.name?.trim().toLowerCase()
    ) {
      setErrors((prev) => ({
        ...prev,
        alias: "Alias and Name cannot be the same.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, alias: "" }));
    }

    handleChange({
      target: { name: "alias", value },
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header d-flex justify-content-between align-items-center">
            <div className="page-title">
              <h4>{product ? "Edit Product" : "Create Product"}</h4>
              <h6>{product ? "Edit existing product" : "Add a new product"}</h6>
            </div>
            <ul className="table-top-head d-flex gap-2">
              <li>
                <RefreshIcon />
              </li>
              <li>
                <CollapesIcon />
              </li>

              <li>
                <Link to={productlist} className="btn btn-secondary">
                  <ArrowLeft className="me-2" /> Back to Products
                </Link>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="add-product-form">
            <div className="add-product">
              <ProductInfo
                formData={formData}
                handleChange={handleChange}
                onEnterKey={handleEnterKey}
                onAliasEvents={handleAliasEvents}
                onNameEvents={handleNameEvents}
                generateSKU={generateSKU}
                dropdowns={dropdowns}
                setDropdowns={setDropdowns}
                unit={unit}
                category={category}
                isLoading={isLoading}
                onAddUnit={() => openModal("unit")}
                onAddCategory={() => openModal("category")}
                errors={errors}
              />
              <PricingStock
                formData={formData}
                handleChange={handleChange}
                options={{
                  productType: PRODUCT_TYPES,
                  taxType: TAX_TYPES,
                  discountType: DISCOUNT_TYPES,
                }}
                dropdowns={dropdowns}
                setDropdowns={setDropdowns}
                isLoading={isLoading}
              />
              <ProductImages
                images={images}
                setImages={setImages}
                handleImageChange={(e) =>
                  baseHandleImageChange({
                    e,
                    setImages,
                    existingImages: images,
                  })
                }
                handleRemoveImage={(index) =>
                  handleRemoveImage({ images, setImages, index })
                }
                isLoading={isLoading}
              />
            </div>

            <div className="col-lg-12 d-flex justify-content-end my-4">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={handleClear}
                disabled={isLoading}
              >
                Cancel
              </button>
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    {product ? "Updating..." : "Adding..."}
                  </>
                ) : product ? (
                  "Update"
                ) : (
                  "Add Product"
                )}
              </Button>
            </div>
          </form>
        </div>

        <footer className="footer bg-white border-top p-3 d-sm-flex justify-content-between">
          <p className="mb-0 text-gray-9">
            2014 - 2025 © NXI. All Right Reserved
          </p>
          <p>
            Designed & Developed by{" "}
            <Link to="#" className="text-primary">
              Xcel Technology
            </Link>
          </p>
        </footer>
      </div>

      {/* Modal rendering logic */}
      {activeModal === "unit" && (
        <AddUnit
          show={isModalVisible}
          handleClose={closeModal}
          selectedRecord={selectedItem}
          onSuccess={handleAddedOrUpdated}
        />
      )}

      {activeModal === "category" && (
        <AddCategory
          show={isModalVisible}
          handleClose={closeModal}
          selectedRecord={selectedItem}
          onSuccess={handleAddedOrUpdated}
        />
      )}
    </>
  );
};

export default AddProduct;
