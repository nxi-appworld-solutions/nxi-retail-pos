import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { all_routes } from "../../routes/all_routes";
import RefreshIcon from "../../components/tooltip-content/refresh";
import CollapesIcon from "../../components/tooltip-content/collapes";
import CommonDatePicker from "../../components/date-picker/common-date-picker";
import CommonSelect from "../../components/select/common-select";
import DeleteModal from "../../components/delete-modal";
import { Editor } from "primereact/editor";
import useAppModal from "../../core/common/modal/useAppModal";
import { MODAL_TYPES } from "../../routes/modal_root/modalTypes";
import { api_url } from "../../environment";
import Loader from "../../components/loader/Loader";
import { productFormSchema } from "../../core/forms/formSchemas";
import { generateSKU, generateSlug } from "../../utils/constants";
import useForm from "../../core/hooks/useForm";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { form, setForm, handleChange } = useForm(productFormSchema);
  const [customFields, setCustomFields] = useState({
    warranty: false,
    manufacturer: false,
    expiry: false,
  });
  const [loading, setLoading] = useState(false);
  const { open } = useAppModal();
  const route = all_routes;
  const [tags, setTags] = useState(["Red", "Black"]);
  const [showVariantTable, setShowVariantTable] = useState(true);
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedSellingType, setSelectedSellingType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedBarcodeSymbol, setSelectedBarcodeSymbol] = useState(null);
  const [selectedTaxType, setSelectedTaxType] = useState(null);
  const [selectedDiscountType, setSelectedDiscountType] = useState(null);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [text, setText] = useState("");
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const [groups, setGroups] = useState([]);

  const [productType, setProductType] = useState(1); // 1: single, 2: variant
  const [variantAttributes, setVariantAttributes] = useState([]); // dropdown
  const [variants, setVariants] = useState([]); // table rows
  const [selectedValues, setSelectedValues] = useState([]);
  const [images, setImages] = useState([]);

  const { id } = useParams();
  const isEdit = !!id;

  // useEffect(() => {
  //   if (isEdit) {
  //     loadProduct();
  //   }
  // }, [id]);

  // const loadProduct = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`${api_url}/GetProduct?code=${id}`);
  //     const json = await res.json();

  //     if (json.status === 1) {
  //       const data = json.data;

  //       // 🔹 BASIC
  //       setForm({
  //         name: data.name,
  //         alias: data.alias,
  //         sku: data.c2,
  //         qty: data.d1,
  //         price: data.d2,
  //         discountValue: data.d3,
  //         qtyAlt: data.d4,
  //         priceAlt: data.d5,
  //         manufacturer: data.customFields?.manufacturer || "",
  //       });

  //       // 🔹 DROPDOWNS
  //       setSelectedStore(data.storeId);
  //       setSelectedWarehouse(data.warehouseId);
  //       setSelectedBrand(data.brandId);
  //       setSelectedUnit(data.unitId);
  //       setSelectedSellingType(data.sellingTypeId);
  //       setSelectedBarcodeSymbol(data.barcodeSymbolId);
  //       setSelectedTaxType(data.taxTypeId);
  //       setSelectedDiscountType(data.discountTypeId);

  //       // 🔥 Category + SubCategory
  //       setSelectedCategory(data.categoryId); // derive if needed
  //       setSelectedSubCategory(data.parentGrpCode);

  //       // 🔹 PRODUCT TYPE
  //       setProductType(data.productType);

  //       // 🔹 VARIANTS
  //       setVariants(data.variants || []);

  //       // 🔹 IMAGES
  //       setImages(
  //         (data.images || []).map((img, i) => ({
  //           id: i,
  //           url: img.imagePath,
  //           isExisting: true,
  //         })),
  //       );

  //       // 🔹 CUSTOM FIELDS
  //       setSelectedWarranty(data.customFields?.warranty || null);
  //       setDate1(data.customFields?.manufacturedDate || null);
  //       setDate2(data.customFields?.expiryDate || null);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCustomField = (name) => {
    setCustomFields((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [images]);

  const fetchVariants = async () => {
    const res = await fetch(`${api_url}/GetMaster?masterType=10`);
    const json = await res.json();

    console.log("Variant Attributes data:", json);

    const data = json?.data?.map((x) => ({
      label: x.name,
      value: x.code,
      values: x.values.split(","),
    }));

    setVariantAttributes(data);
  };

  // useEffect(() => {
  //   if (selectedAttribute) {
  //     const attr = variantAttributes.find((x) => x.value === selectedAttribute);

  //     if (attr) {
  //       const generated = attr.values.map((v, i) => ({
  //         name: attr.label,
  //         value: v,
  //         sku: `SKU-${Date.now()}-${i}`,
  //         qty: 0,
  //         price: 0,
  //       }));

  //       setVariants(generated);
  //       setProduct(true); // table show
  //     }
  //   }
  // }, [selectedAttribute, variantAttributes]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      sku: generateSKU(),
    }));
    loadMasters();
    fetchVariants();
  }, []);

  const loadMasters = async () => {
    const store = await getMasters(11);
    const warehouse = await getMasters(12);
    // const cat = await getMasters(5);
    // const subCat = await getMasters(5);
    const group = await getMasters(5);
    const brand = await getMasters(7);
    const unit = await getMasters(8);

    setWarehouses(warehouse);
    setStores(store);
    setGroups(group);
    // setCategories(cat);
    // setAllSubCategories(subCat);
    setBrands(brand);
    setUnits(unit);
  };

  const getMasters = async (masterType) => {
    setLoading(true);
    try {
      const res = await fetch(`${api_url}/Master?masterType=${masterType}`);
      const json = await res.json();
      console.log("json", json);

      if (json.status === 1) {
        return json?.data?.map((x) => ({
          label: x.name,
          value: x.code,
          parent: x.parentGrpCode,
        }));
      }

      return [];
    } catch (err) {
      console.error("Master Load Error:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // const handleCategoryChange = (value) => {
  //   setSelectedCategory(value);

  //   const filtered = allSubCategories.filter((x) => x.parent === value);

  //   console.log("filtered", filtered);
  //   setFilteredSubCategories(filtered);

  //   setSelectedSubCategory(null);
  // };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const preview = files.map((file) => ({
      id: Date.now() + Math.random(), // unique id
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...preview]);
  };

  const handleImageRemove = (id) => {
    setImages((prev) => {
      const imgToRemove = prev.find((img) => img.id === id);
      if (imgToRemove) {
        URL.revokeObjectURL(imgToRemove.url);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const sellingtype = [
    { value: 1, label: "Single" },
    { value: 2, label: "Variant" },
    { value: 3, label: "Service" },
    { value: 4, label: "Combo / Bundle" },
  ];

  const barcodesymbol = [
    { value: 1, label: "Code128" },
    { value: 2, label: "EAN-13" },
    { value: 3, label: "EAN-8" },
    { value: 4, label: "UPC" },
    { value: 5, label: "Code39" },
    { value: 6, label: "ITF-14" },
  ];

  const taxtype = [
    { label: "No Tax", value: 0 },
    { label: "Exclusive", value: 1 },
    { label: "Inclusive", value: 2 },
  ];

  const discountType = [
    { label: "No Discount", value: 0 },
    { label: "Percentage (%)", value: 1 },
    { label: "Flat (₹)", value: 2 },
  ];

  const warrenty = [
    { value: "choose", label: "Choose" },
    { value: "Replacement Warranty", label: "Replacement Warranty" },
    { value: "On-Site Warranty", label: "On-Site Warranty" },
    {
      value: "Accidental Protection Plan",
      label: "Accidental Protection Plan",
    },
  ];

  console.log("variants", selectedGroup);
  // const selectedAttr = variantAttributes.find(
  //   (x) => x.value === selectedAttribute,
  // );

  const selectedAttr = useMemo(() => {
    return variantAttributes.find((x) => x.value === selectedAttribute);
  }, [variantAttributes, selectedAttribute]);

  const valueOptions =
    selectedAttr?.values.map((v) => ({
      label: v,
      value: v,
    })) || [];

  // const generateVariants = (values) => {
  //   return values.map((v, i) => ({
  //     name: v,
  //     sku: `SKU-${Date.now()}-${i}`,
  //     qty: 0,
  //     price: 0,
  //   }));
  // };

  useEffect(() => {
    if (
      Array.isArray(selectedValues) &&
      selectedValues.length > 0 &&
      selectedAttr
    ) {
      setVariants((prev) => {
        return selectedValues?.map((v, i) => {
          const existing = prev.find((item) => item.value === v);

          return {
            name: selectedAttr.label,
            value: v,
            // sku: existing?.sku || `SKU-${v}-${i}`,
            sku: existing?.sku || `SKU-${selectedAttr.value}-${v}`,
            qty: existing?.qty || 0,
            price: existing?.price || 0,
          };
        });
      });
    } else {
      setVariants([]);
    }
  }, [selectedValues, selectedAttr]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // 🔹 BASIC MASTER
      formData.append("Code", 0);
      formData.append("MasterType", 6);
      formData.append("Name", form.name);
      formData.append("Alias", form.alias);
      formData.append("PrintName", form.slug);
      formData.append("ParentGrp", selectedGroup || 0);
      formData.append("C1", form.sku || "");

      // 🔹 STORE / WAREHOUSE
      formData.append("CM1", selectedStore || 0);
      formData.append("CM2", selectedWarehouse || 0);

      // 🔹 BRAND / UNIT / TYPES
      formData.append("CM3", selectedBrand || 0);
      formData.append("CM4", selectedUnit || 0);
      formData.append("CM5", selectedTaxType || 0);
      formData.append("CM6", selectedDiscountType || 0);
      formData.append("CM7", selectedSellingType || 0);
      formData.append("CM8", selectedBarcodeSymbol || 0);
      formData.append("CM9", productType || 0);

      // 🔹 PRICING
      formData.append("D1", form.qty || 0);
      formData.append("D2", form.price || 0);
      formData.append("D3", form.discountValue || 0);
      formData.append("D4", form.qtyAlt || 0);
      formData.append("D5", form.priceAlt || 0);

      // 🔹 DESCRIPTION
      formData.append("Remark", text || "");
      const variantJson = variants.map((v) => ({
        Attribute: v.name,
        Value: v.value,
        SKU: v.sku,
        Qty: Number(v.qty) || 0,
        Price: Number(v.price) || 0,
      }));

      formData.append("variants", JSON.stringify(variantJson));
      const customFieldJson =
        customFields.warranty ||
        customFields.manufacturer ||
        customFields.expiry
          ? {
              Warranty: selectedWarranty || "",
              Manufacturer: form.manufacturer || "",
              ManufacturedDate: date1 ? date1.toISOString() : null,
              ExpiryDate: date2 ? date2.toISOString() : null,
            }
          : null;

      formData.append(
        "customFields",
        customFieldJson ? JSON.stringify(customFieldJson) : "",
      );

      formData.append("customFields", JSON.stringify(customFieldJson));

      formData.append("images", JSON.stringify([]));
      images.forEach((img) => {
        formData.append("files", img.file);
      });

      const res = await fetch(`${api_url}/saveMaster`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data?.status === 1) {
        toast.success(data?.msg);
      } else {
        toast.error(data?.msg || "Error");
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader loading />}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Create Product</h4>
                <h6>Create new product</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
              <CollapesIcon />
              <li>
                <div className="page-btn">
                  <Link to={route.productlist} className="btn btn-secondary">
                    <i className="feather icon-arrow-left me-2" />
                    Back to Product
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          {/* /add */}
          <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="add-product">
              <div
                className="accordions-items-seperate"
                id="accordionSpacingExample"
              >
                <div className="accordion-item border mb-4">
                  <h2 className="accordion-header" id="headingSpacingOne">
                    <div
                      className="accordion-button collapsed bg-white"
                      data-bs-toggle="collapse"
                      data-bs-target="#SpacingOne"
                      aria-expanded="true"
                      aria-controls="SpacingOne"
                    >
                      <div className="d-flex align-items-center justify-content-between flex-fill">
                        <h5 className="d-flex align-items-center">
                          <i className="feather icon-info text-primary me-2" />
                          <span>Product Information</span>
                        </h5>
                      </div>
                    </div>
                  </h2>
                  <div
                    id="SpacingOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingSpacingOne"
                  >
                    <div className="accordion-body border-top">
                      <div className="row">
                        <div className="col-sm-4 col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Store<span className="text-danger ms-1">*</span>
                            </label>
                            <CommonSelect
                              className="w-100"
                              options={stores}
                              value={selectedStore}
                              onChange={(e) => setSelectedStore(e.value)}
                              placeholder="Choose"
                              filter={false}
                            />
                          </div>
                        </div>
                        <div className="col-sm-4 col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Warehouse
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <CommonSelect
                              className="w-100"
                              options={warehouses}
                              value={selectedWarehouse}
                              onChange={(e) => setSelectedWarehouse(e.value)}
                              placeholder="Choose"
                              filter={false}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4 col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Product Name
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              value={form?.name}
                              onChange={(e) => {
                                const name = e.target.value;
                                setForm((prev) => ({
                                  ...prev,
                                  name,
                                  slug: generateSlug(name),
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-4 col-12">
                          <div className="mb-3 list position-relative">
                            <label className="form-label">
                              Alias
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              name="alias"
                              className="form-control list"
                              value={form.alias}
                              onChange={handleChange}
                              disabled
                            />
                            {/* <button
                              type="submit"
                              className="btn btn-primaryadd"
                            >
                              Generate
                            </button> */}
                          </div>
                        </div>
                        <div className="col-sm-4 col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Slug<span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              name="slug"
                              className="form-control"
                              value={form?.slug}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="addservice-info">
                        <div className="row">
                          <div className="col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Group
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <CommonSelect
                                className="w-100"
                                options={groups}
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.value)}
                                placeholder="Choose"
                                filter={false}
                              />
                            </div>
                          </div>
                          <div className="col-sm-4 col-12">
                            <div className="mb-3 list position-relative">
                              <label className="form-label">
                                SKU<span className="text-danger ms-1">*</span>
                              </label>
                              <input
                                type="text"
                                name="sku"
                                className="form-control list"
                                value={form.sku}
                                onChange={(e) =>
                                  setForm({ ...form, sku: e.target.value })
                                }
                              />
                              <button
                                type="button"
                                className="btn btn-primaryadd"
                                onClick={() =>
                                  setForm((prev) => ({
                                    ...prev,
                                    sku: generateSKU(),
                                  }))
                                }
                              >
                                Generate
                              </button>
                            </div>
                          </div>
                          <div className="col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Selling Type
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <CommonSelect
                                className="w-100"
                                options={sellingtype}
                                value={selectedSellingType}
                                onChange={(e) =>
                                  setSelectedSellingType(e.value)
                                }
                                placeholder="Choose"
                                filter={false}
                              />
                            </div>
                          </div>
                          {/* <div className="col-sm-4 col-12">
                            <div className="mb-3">
                              <div className="add-newplus">
                                <label className="form-label">
                                  Category
                                  <span className="text-danger ms-1">*</span>
                                </label>
                                <Link
                                  data-bs-toggle="modal"
                                  onClick={() => open(MODAL_TYPES.CATEGORY)}
                                >
                                  <i className="feather icon-plus-circle plus-down-add" />
                                  <span>Add New</span>
                                </Link>
                              </div>
                              <CommonSelect
                                className="w-100"
                                options={categories}
                                value={selectedCategory}
                                onChange={(e) => handleCategoryChange(e.value)}
                                placeholder="Choose"
                                filter={false}
                              />
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div className="add-product-new">
                        <div className="row">
                          <div className="col-sm-4 col-12">
                            <div className="mb-3">
                              <div className="add-newplus">
                                <label className="form-label">
                                  Brand
                                  <span className="text-danger ms-1">*</span>
                                </label>
                              </div>
                              <CommonSelect
                                className="w-100"
                                options={brands}
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.value)}
                                placeholder="Choose"
                                filter={false}
                              />
                            </div>
                          </div>
                          <div className="col-sm-4 col-12">
                            <div className="mb-3">
                              <div className="add-newplus">
                                <label className="form-label">
                                  Unit
                                  <span className="text-danger ms-1">*</span>
                                </label>
                              </div>
                              <CommonSelect
                                className="w-100"
                                options={units}
                                value={selectedUnit}
                                onChange={(e) => setSelectedUnit(e.value)}
                                placeholder="Choose"
                                filter={false}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Barcode Symbology
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <CommonSelect
                                className="w-100"
                                options={barcodesymbol}
                                value={selectedBarcodeSymbol}
                                onChange={(e) =>
                                  setSelectedBarcodeSymbol(e.value)
                                }
                                placeholder="Choose"
                                filter={false}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Editor */}
                      <div className="col-lg-12">
                        <div className="summer-description-box">
                          <label className="form-label">Description</label>
                          <Editor
                            value={text}
                            onTextChange={(e) => setText(e.htmlValue)}
                            style={{ height: "200px" }}
                          />

                          <p className="fs-14 mt-1">Maximum 60 Words</p>
                        </div>
                      </div>
                      {/* /Editor */}
                    </div>
                  </div>
                </div>
                <div className="accordion-item border mb-4">
                  <h2 className="accordion-header" id="headingSpacingTwo">
                    <div
                      className="accordion-button collapsed bg-white"
                      data-bs-toggle="collapse"
                      data-bs-target="#SpacingTwo"
                      aria-expanded="true"
                      aria-controls="SpacingTwo"
                    >
                      <div className="d-flex align-items-center justify-content-between flex-fill">
                        <h5 className="d-flex align-items-center">
                          <i className="feather icon-life-buoy text-primary me-2" />
                          <span>Pricing &amp; Stocks</span>
                        </h5>
                      </div>
                    </div>
                  </h2>
                  <div
                    id="SpacingTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingSpacingTwo"
                  >
                    <div className="accordion-body border-top">
                      <div className="mb-3s">
                        <label className="form-label">
                          Product Type
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <div className="single-pill-product mb-3">
                          <ul
                            className="nav nav-pills"
                            id="pills-tab1"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <span
                                className="custom_radio me-4 mb-0 active"
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                              >
                                <input
                                  type="radio"
                                  checked={productType === 1}
                                  className="form-control"
                                  name="single"
                                  onChange={() => setProductType(1)}
                                />
                                <span className="checkmark" /> Single Product
                              </span>
                            </li>
                            <li className="nav-item" role="presentation">
                              <span
                                className="custom_radio me-2 mb-0"
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                              >
                                <input
                                  type="radio"
                                  checked={productType === 2}
                                  className="form-control"
                                  onChange={() => setProductType(2)}
                                  name="variant"
                                />
                                <span className="checkmark" /> Variable Product
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
                          <div className="single-product">
                            <div className="row">
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Quantity
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="qty"
                                    value={form.qty}
                                    className="form-control"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Price
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="price"
                                    value={form.price}
                                    className="form-control"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Tax Type
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <CommonSelect
                                    className="w-100"
                                    options={taxtype}
                                    value={selectedTaxType}
                                    onChange={(e) =>
                                      setSelectedTaxType(e.value)
                                    }
                                    placeholder="Select Option"
                                    filter={false}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Discount Type
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <CommonSelect
                                    className="w-100"
                                    options={discountType}
                                    value={selectedDiscountType}
                                    onChange={(e) =>
                                      setSelectedDiscountType(e.value)
                                    }
                                    placeholder="Choose"
                                    filter={false}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Discount Value
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input
                                    className="form-control"
                                    name="discountValue"
                                    value={form.discountValue}
                                    type="text"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Quantity Alert
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="qtyAlt"
                                    value={form.qtyAlt}
                                    className="form-control"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-profile"
                          role="tabpanel"
                          aria-labelledby="pills-profile-tab"
                        >
                          <div className="row select-color-add">
                            <div className="col-lg-6 col-sm-6 col-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Variant Attribute{" "}
                                  <span className="text-danger ms-1">*</span>
                                </label>
                                <div className="row">
                                  <div className="col-lg-10 col-sm-10 col-10">
                                    <CommonSelect
                                      options={variantAttributes}
                                      value={selectedAttribute}
                                      onChange={(e) => {
                                        setSelectedAttribute(e.value);
                                        setSelectedValues([]); // reset
                                        setVariants([]); // reset
                                      }}
                                    />
                                  </div>
                                  <div className="col-lg-2 col-sm-2 col-2 ps-0">
                                    <div className="add-icon tab">
                                      <Link
                                        to="#"
                                        className="btn btn-filter"
                                        onClick={() =>
                                          open(MODAL_TYPES.VARIANT, {
                                            data: null,
                                            onSucess: null,
                                          })
                                        }
                                      >
                                        <i className="feather feather-plus-circle" />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                {selectedAttr && (
                                  <div className=" col-lg-10 col-sm-10 col-10 mt-2">
                                    <label className="form-label">
                                      Select Values
                                    </label>
                                    <CommonSelect
                                      options={valueOptions}
                                      value={selectedValues}
                                      onChange={(e) =>
                                        setSelectedValues(e.value)
                                      }
                                      multiple
                                    />
                                  </div>
                                )}
                              </div>
                              {productType === "variant" &&
                                variants.length > 0 && (
                                  <div
                                    className={`selected-hide-color ${
                                      showVariantTable ? "d-block" : ""
                                    } `}
                                    id="input-show"
                                  >
                                    <label className="form-label">
                                      Variant Attribute{" "}
                                      <span className="text-danger ms-1">
                                        *
                                      </span>
                                    </label>
                                  </div>
                                )}
                            </div>
                          </div>
                          {variants.length > 0 && (
                            <div className="modal-body-table variant-table d-block">
                              <div className="table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Variant</th>
                                      <th>Value</th>
                                      <th>SKU</th>
                                      <th>Quantity</th>
                                      <th>Price</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {variants.map((v, i) => (
                                      <tr key={v.value}>
                                        <td>
                                          <input
                                            className="form-control"
                                            value={v.name}
                                            readOnly
                                          />
                                        </td>

                                        <td>
                                          <input
                                            className="form-control"
                                            value={v.value}
                                            readOnly
                                          />
                                        </td>

                                        <td>
                                          <input
                                            className="form-control"
                                            value={v.sku}
                                            onChange={(e) => {
                                              const updated = [...variants];
                                              updated[i].sku = e.target.value;
                                              setVariants(updated);
                                            }}
                                          />
                                        </td>

                                        <td>
                                          <input
                                            type="number"
                                            className="form-control"
                                            value={v.qty}
                                            onChange={(e) => {
                                              const updated = [...variants];
                                              updated[i].qty = e.target.value;
                                              setVariants(updated);
                                            }}
                                          />
                                        </td>

                                        <td>
                                          <input
                                            className="form-control"
                                            value={v.price}
                                            onChange={(e) => {
                                              const updated = [...variants];
                                              updated[i].price = e.target.value;
                                              setVariants(updated);
                                            }}
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item border mb-4">
                  <h2 className="accordion-header" id="headingSpacingThree">
                    <div
                      className="accordion-button collapsed bg-white"
                      data-bs-toggle="collapse"
                      data-bs-target="#SpacingThree"
                      aria-expanded="true"
                      aria-controls="SpacingThree"
                    >
                      <div className="d-flex align-items-center justify-content-between flex-fill">
                        <h5 className="d-flex align-items-center">
                          <i className="feather icon-image text-primary me-2" />
                          <span>Images</span>
                        </h5>
                      </div>
                    </div>
                  </h2>
                  <div
                    id="SpacingThree"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingSpacingThree"
                  >
                    <div className="accordion-body border-top">
                      <div className="text-editor add-list add">
                        <div className="col-lg-12">
                          <div className="add-choosen">
                            <div className="mb-3">
                              <div className="image-upload">
                                <input
                                  type="file"
                                  multiple
                                  onChange={handleImageChange}
                                />
                                <div className="image-uploads">
                                  <i className="feather icon-plus-circle plus-down-add me-0" />
                                  <h4>Add Images</h4>
                                </div>
                              </div>
                            </div>
                            <div className="phone-img-wrapper">
                              {images.map((img) => (
                                <div className="phone-img" key={img.id}>
                                  <img src={img.url} alt="preview" />

                                  <Link to="#">
                                    <i
                                      className="feather icon-x x-square-add remove-product"
                                      onClick={() => handleImageRemove(img.id)}
                                    />
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item border mb-4">
                  <h2 className="accordion-header" id="headingSpacingFour">
                    <div
                      className="accordion-button collapsed bg-white"
                      data-bs-toggle="collapse"
                      data-bs-target="#SpacingFour"
                      aria-expanded="true"
                      aria-controls="SpacingFour"
                    >
                      <div className="d-flex align-items-center justify-content-between flex-fill">
                        <h5 className="d-flex align-items-center">
                          <i className="feather icon-list text-primary me-2" />
                          <span>Custom Fields</span>
                        </h5>
                      </div>
                    </div>
                  </h2>
                  <div
                    id="SpacingFour"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingSpacingFour"
                  >
                    <div className="accordion-body border-top">
                      <div>
                        <div className="p-3 bg-light rounded d-flex align-items-center border mb-3">
                          <div className=" d-flex align-items-center">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="warranties"
                                checked={customFields.warranty}
                                onChange={() => handleCustomField("warranty")}
                              />

                              <label
                                className="form-check-label"
                                htmlFor="warranties"
                              >
                                Warranties
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="manufacturer"
                                checked={customFields.manufacturer}
                                onChange={() =>
                                  handleCustomField("manufacturer")
                                }
                              />

                              <label
                                className="form-check-label"
                                htmlFor="manufacturer"
                              >
                                Manufacturer
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="expiry"
                                checked={customFields.expiry}
                                onChange={() => handleCustomField("expiry")}
                              />

                              <label
                                className="form-check-label"
                                htmlFor="expiry"
                              >
                                Expiry
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          {customFields.warranty && (
                            <div className="col-sm-6 col-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Warranty
                                  <span className="text-danger ms-1">*</span>
                                </label>
                                <CommonSelect
                                  className="w-100"
                                  options={warrenty}
                                  value={selectedWarranty}
                                  onChange={(e) => setSelectedWarranty(e.value)}
                                  placeholder="Choose"
                                  filter={false}
                                />
                              </div>
                            </div>
                          )}
                          {customFields.manufacturer && (
                            <div className="col-sm-6 col-12">
                              <div className="mb-3 add-product">
                                <label className="form-label">
                                  Manufacturer
                                  <span className="text-danger ms-1">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="manufacturer"
                                  className="form-control"
                                  value={form.manufacturer}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="row">
                          {customFields.expiry && (
                            <>
                              <div className="col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Manufactured Date
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <div className="input-groupicon calender-input">
                                    <i className="feather icon-calendar info-img" />
                                    <CommonDatePicker
                                      value={date1}
                                      onChange={setDate1}
                                      className="w-100"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Expiry On
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <div className="input-groupicon calender-input">
                                    <i className="feather icon-calendar info-img" />
                                    <CommonDatePicker
                                      value={date2}
                                      onChange={setDate2}
                                      className="w-100"
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="d-flex align-items-center justify-content-end mb-4">
                <button type="button" className="btn btn-secondary me-2">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEdit ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </form>
          {/* /add */}
        </div>
        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0 text-gray-9">
            2025 - 2026 © Revergent Technologies. All Right Reserved
          </p>
          <p>
            Designed &amp; Developed by{" "}
            <Link
              to="https://revergent.in"
              target="_blank"
              className="text-primary"
            >
              Revergent
            </Link>
          </p>
        </div>
      </div>
      <DeleteModal />
    </>
  );
};

export default AddProduct;
