/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { RefreshCw, Layers, Plus, Info } from "react-feather";
import { Barcode } from "lucide-react";

import { MODAL_TYPES } from "../../../core/modals/modalTypes";
import { openModal } from "../../../core/redux/store/modalSlice";

const VARIANT_ATTRIBUTES_STATIC = [
  {
    id: 1,
    attributeName: "Size",
    attributeCode: "SIZE",
    attributeType: "SELECT",
    isRequired: true,
    status: "Active",
    values: [
      { valueName: "S", valueCode: "S", status: "Active" },
      { valueName: "M", valueCode: "M", status: "Active" },
      { valueName: "L", valueCode: "L", status: "Active" },
    ],
  },
  {
    id: 2,
    attributeName: "Color",
    attributeCode: "COLOR",
    attributeType: "COLOR",
    isRequired: false,
    status: "Active",
    values: [
      { valueName: "Red", valueCode: "#FF0000", status: "Active" },
      { valueName: "Blue", valueCode: "#0000FF", status: "Active" },
      { valueName: "Black", valueCode: "#000000", status: "Active" },
    ],
  },
];

const VariantInfo = ({ formData, handleChange, variantAttributes = VARIANT_ATTRIBUTES_STATIC }) => {
  const dispatch = useDispatch();

  /* =====================================================
     STATE
  ===================================================== */

  // selected values while generating variants
  const [selected, setSelected] = useState({});

  // actual product variants
  const [variants, setVariants] = useState(formData.variants || []);

  /* =====================================================
     SYNC EXISTING VARIANTS (EDIT PRODUCT FIX)
  ===================================================== */

  useEffect(() => {
    if (Array.isArray(formData.variants)) {
      setVariants(formData.variants);
    }
  }, [formData.variants]);

  /* =====================================================
     HELPERS
  ===================================================== */

  const hasVariants = variants.length > 0;

  const toggleValue = (attrCode, valueCode) => {
    setSelected((prev) => {
      const set = new Set(prev[attrCode] || []);
      set.has(valueCode) ? set.delete(valueCode) : set.add(valueCode);
      return { ...prev, [attrCode]: [...set] };
    });
  };

  const canGenerate = useMemo(
    () =>
      Object.values(selected).some(
        (v) => Array.isArray(v) && v.length > 0,
      ),
    [selected],
  );

  const summary = useMemo(() => {
    return variantAttributes
      .filter((a) => selected[a.attributeCode]?.length)
      .map((a) => ({
        name: a.attributeName,
        values: a.values
          .filter((v) =>
            selected[a.attributeCode]?.includes(v.valueCode),
          )
          .map((v) => v.valueName),
      }));
  }, [selected, variantAttributes]);

  /* =====================================================
     COMBINATION LOGIC
  ===================================================== */

  const generateCombinations = () => {
    const entries = Object.entries(selected).filter(
      ([, v]) => v.length > 0,
    );

    if (!entries.length) return [];

    const combine = (arr, i = 0) =>
      i === arr.length
        ? [{}]
        : arr[i][1].flatMap((v) =>
            combine(arr, i + 1).map((rest) => ({
              ...rest,
              [arr[i][0]]: v,
            })),
          );

    return combine(entries);
  };

  /* =====================================================
     GENERATE VARIANTS
  ===================================================== */

  const onGenerate = () => {
    if (!canGenerate) return;

    const combos = generateCombinations();

    const newVariants = combos.map((combo, i) => {
      const label = Object.entries(combo)
        .map(([k, v]) => `${k}:${v}`)
        .join(" / ");

      return {
        key: label,
        name: label,
        sku: `${formData.sku || "PRD"}-${i + 1}`,
        price: formData.salePrice || 0,
        stock: 0,
        barcode: "",
        status: "Active",
      };
    });

    setVariants(newVariants);
    handleChange({
      target: { name: "variants", value: newVariants },
    });
  };

  /* =====================================================
     UPDATE VARIANT FIELD
  ===================================================== */

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
    handleChange({
      target: { name: "variants", value: updated },
    });
  };

  /* =====================================================
     OPEN VARIANT ATTRIBUTE MODAL
  ===================================================== */

  const openAddVariantModal = () => {
    dispatch(
      openModal({
        name: MODAL_TYPES.VARIANT_ATTRIBUTE,
        payload: { mode: "ADD", record: null },
        options: { size: "lg" },
      }),
    );
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="row g-4">

      {/* ================= HEADER ================= */}
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="fw-bold mb-0 d-flex align-items-center">
            <Layers size={18} className="me-2" />
            Product Variants
          </h6>

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={openAddVariantModal}
          >
            <Plus size={14} className="me-1" />
            Add Variant Attribute
          </button>
        </div>
      </div>

      {/* ================= NO VARIANT MASTER ================= */}
      {variantAttributes.length === 0 && (
        <div className="col-12">
          <div className="p-4 bg-light rounded-4 border text-center">
            <Info size={22} className="text-muted mb-2" />
            <p className="fw-bold mb-1">No Variant Attributes Found</p>
            <p className="text-muted small mb-3">
              Create Size, Color or other attributes to enable variants.
            </p>
            <button className="btn btn-primary" onClick={openAddVariantModal}>
              <Plus size={14} className="me-1" />
              Create Variant Attribute
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 1 : GENERATE FLOW ================= */}
      {!hasVariants && variantAttributes.length > 0 && (
        <div className="col-12">
          <div className="p-4 bg-white rounded-4 shadow-sm border">
            <h6 className="fw-bold mb-1">
              Step 1: Select Variant Options
            </h6>
            <small className="text-muted">
              Choose applicable options for this product
            </small>

            <div className="mt-3">
              {variantAttributes.map((attr) => (
                <div key={attr.attributeCode} className="mb-3">
                  <div className="fw-bold small mb-1">
                    {attr.attributeName}
                  </div>

                  <div className="d-flex gap-2 flex-wrap">
                    {attr.values
                      .filter((v) => v.status === "Active")
                      .map((v) => (
                        <button
                          key={v.valueCode}
                          type="button"
                          className={`btn btn-sm rounded-pill ${
                            selected[attr.attributeCode]?.includes(
                              v.valueCode,
                            )
                              ? "btn-primary"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() =>
                            toggleValue(
                              attr.attributeCode,
                              v.valueCode,
                            )
                          }
                        >
                          {v.valueName}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary mt-2"
              disabled={!canGenerate}
              onClick={onGenerate}
            >
              <RefreshCw size={14} className="me-1" />
              Generate Variants
            </button>
          </div>
        </div>
      )}

      {/* ================= SUMMARY ================= */}
      {summary.length > 0 && hasVariants && (
        <div className="col-12">
          <div className="alert alert-soft-info rounded-4">
            <strong>Variants generated using:</strong>
            <ul className="mb-1 mt-1">
              {summary.map((s, i) => (
                <li key={i}>
                  {s.name} → {s.values.join(", ")}
                </li>
              ))}
            </ul>
            <strong>Total Variants:</strong> {variants.length}
          </div>
        </div>
      )}

      {/* ================= STEP 2 : VARIANT TABLE ================= */}
      {hasVariants && (
        <div className="col-12">
          <div className="p-4 bg-white rounded-4 shadow-sm border">
            <h6 className="fw-bold mb-3">
              Manage Product Variants
            </h6>

            <div className="table-responsive">
              <table className="table table-sm align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Variant</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>
                      <Barcode size={14} />
                    </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((v, i) => (
                    <tr key={v.key}>
                      <td className="fw-bold">{v.name}</td>

                      <td>
                        <input
                          className="form-control form-control-sm"
                          value={v.sku}
                          onChange={(e) =>
                            updateVariant(i, "sku", e.target.value)
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={v.price}
                          onChange={(e) =>
                            updateVariant(
                              i,
                              "price",
                              e.target.value,
                            )
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={v.stock}
                          onChange={(e) =>
                            updateVariant(
                              i,
                              "stock",
                              e.target.value,
                            )
                          }
                        />
                      </td>

                      <td>
                        <input
                          className="form-control form-control-sm"
                          value={v.barcode}
                          onChange={(e) =>
                            updateVariant(
                              i,
                              "barcode",
                              e.target.value,
                            )
                          }
                        />
                      </td>

                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={v.status}
                          onChange={(e) =>
                            updateVariant(
                              i,
                              "status",
                              e.target.value,
                            )
                          }
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default VariantInfo;
