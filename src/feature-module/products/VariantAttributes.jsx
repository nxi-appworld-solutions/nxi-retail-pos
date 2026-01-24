import { useDispatch } from "react-redux";
import { Edit2, Layers } from "react-feather";

import PageHeader from "../../components/data-table/PageHeader";
import DataTableCard from "../../components/data-table/DataTable";
import { openModal } from "../../core/redux/store/modalSlice";
import { MODAL_TYPES } from "../../core/modals/modalTypes";

const VariantAttributes = () => {
  const dispatch = useDispatch();

  /* API DATA (DEMO) */
  const attributeList = [
    {
      id: 1,
      attributeName: "Size",
      attributeCode: "SIZE",
      attributeType: "SELECT",
      isRequired: true,
      status: "Active",
      values: [
        { valueName: "S", valueCode: "S" },
        { valueName: "M", valueCode: "M" },
        { valueName: "L", valueCode: "L" },
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
        { valueName: "Red", valueCode: "#ff0000" },
        { valueName: "Blue", valueCode: "#0000ff" },
        { valueName: "Black", valueCode: "#000000" },
      ],
    },
  ];

  /* ------------------ COLUMNS ------------------ */

  const columns = [
    {
      title: "Attribute",
      dataIndex: "attributeName",
      render: (v) => <span className="fw-bold">{v}</span>,
    },

    {
      title: "Attr Code",
      dataIndex: "attributeCode",
      render: (v) => (
        <span className="fw-bold font-monospace">{v}</span>
      ),
    },

    {
      title: "Type",
      dataIndex: "attributeType",
      render: (v) => {
        const map = {
          SELECT: "bg-info",
          MULTI: "bg-primary",
          TEXT: "bg-secondary",
          NUMBER: "bg-warning text-dark",
          COLOR: "bg-danger",
        };
        return (
          <span className={`badge ${map[v]}`}>
            {v}
          </span>
        );
      },
    },

    {
      title: "Values",
      dataIndex: "values",
      render: (values = [], row) =>
        values.length ? (
          <div className="d-flex flex-wrap gap-1">
            {values.map((v, i) => (
              <span
                key={i}
                className="badge bg-light text-dark"
              >
                {v.valueName}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-warning small">
            No values
          </span>
        ),
    },

    {
      title: "Value Codes",
      dataIndex: "values",
      render: (values = [], row) =>
        values.length ? (
          <div className="d-flex flex-wrap gap-1">
            {values.map((v, i) => (
              <span
                key={i}
                className="badge bg-secondary"
              >
                {row.attributeType === "COLOR" ? (
                  <span
                    className="d-inline-block rounded-circle"
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: v.valueCode,
                    }}
                  />
                ) : (
                  v.valueCode
                )}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-muted small">—</span>
        ),
    },

    {
      title: "Mandatory",
      dataIndex: "isRequired",
      align: "center",
      render: (v) => (
        <span
          className={`badge ${
            v ? "bg-danger" : "bg-light text-dark"
          }`}
        >
          {v ? "Yes" : "No"}
        </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (v) => (
        <span
          className={`badge ${
            v === "Active"
              ? "bg-success"
              : "bg-warning text-dark"
          }`}
        >
          {v}
        </span>
      ),
    },

    {
      title: "Action",
      width: 80,
      align: "center",
      render: (_, row) => (
        <Edit2
          size={16}
          className="cursor-pointer text-primary"
          title="Edit Attribute"
          onClick={() =>
            dispatch(
              openModal({
                name: MODAL_TYPES.VARIANT_ATTRIBUTE,
                payload: {
                  mode: "EDIT",
                  record: row,
                },
                options: { size: "lg" },
              })
            )
          }
        />
      ),
    },
  ];

  /* ------------------ UI ------------------ */

  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader
          title="Variant Attributes"
          subtitle="Attributes and their values"
          icon={<Layers size={20} />}
          actions={[
            {
              label: "Add Attribute",
              icon: <i className="ti ti-circle-plus" />,
              onClick: () =>
                dispatch(
                  openModal({
                    name: MODAL_TYPES.VARIANT_ATTRIBUTE,
                    payload: { mode: "ADD", record: null },
                    options: { size: "lg" },
                  })
                ),
            },
          ]}
        />

        <DataTableCard
          columns={columns}
          dataSource={attributeList}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default VariantAttributes;
