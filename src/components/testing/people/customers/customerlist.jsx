import React from "react";
import DataTable from "../../common/DataTable";
import ImageTextCell from "../../table/ImageTextCell";
import RowActionButtons from "../../table/RowActionButtons";

const CustomerList = ({ data, onEdit, onDelete, loading }) => {
  const columns = [
    { title: "Code", dataIndex: "code", render: (t) => <>{t}</> },
    {
      title: "Customer",
      dataIndex: "name",
      render: (_, r) => <ImageTextCell imageSrc={r.image} text={r.name} />,
    },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Country", dataIndex: "country" },
    {
      title: "Action",
      render: (_, r) => (
        <RowActionButtons
          onEdit={() => onEdit(r)}
          onDelete={() => onDelete(r)}
        />
      ),
    },
  ];

  return <DataTable columns={columns} dataSource={data} loading={loading} />;
};

export default CustomerList;
