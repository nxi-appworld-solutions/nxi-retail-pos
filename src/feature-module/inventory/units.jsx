import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommonFooter from "../../core/common/footer/commonFooter";
import CommonDeleteModal from "../../core/common/modal/commonDeleteModal";
import CommonTableHeader from "../../core/common/table/tableHeader";
import TableTopFilter from "../../core/common/table/tableTopFilter";
import CommonTable from "../../core/common/table/commonTable";
import { generateColumns } from "../../utils/generateColumns";
import { unitColumn } from "../../utils/tableColumns";
import AddUnits from "../../components/modals/addUnit";

export const Units = () => {
  const data = useSelector((state) => state.rootReducer.unit_data);
  const [record, setRecord] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalKey, setModalKey] = useState(Date.now());

  const openModal = (isEdit = false, row = {}) => {
    // setIsEditMode(isEdit);
    // setRecord(row);
    // setModalKey(Date.now());
  };

  const handleSubmit = (formData) => {
    console.log(setIsEditMode ? "Updating" : "Creating", formData);
  };

  const handleEdit = (record) => {
    openModal(true, record);
  };

  const handleDelete = (record) => {
    console.log("Deleting", record);
    // open delete modal or dispatch delete
  };

  const columns = generateColumns(unitColumn, {
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <CommonTableHeader
            title="Category"
            modalId="add-category"
            onAdd={() => openModal()}
          />
          <div className="card table-list-card">
            <TableTopFilter />
            <CommonTable columns={columns} data={data} />
          </div>
        </div>
        <CommonFooter />
      </div>
      <AddUnits />
      <CommonDeleteModal />
    </>
  );
};
