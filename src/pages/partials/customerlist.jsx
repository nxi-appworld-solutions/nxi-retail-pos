/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleExportToExcel } from "../../utils/exportToExcel";
import DataTable from "../../components/common/DataTable";
import { API_URL } from "../../environment";

import CommonFooter from "../../core/common/footer/commonFooter";
import EntityFormModal from "../../components/modals/addCustomer";
import DataTableHeader from "../../components/table/DataTableHeader";

import ImageTextCell from "../../components/table/ImageTextCell";
import CommonDeleteModal from "../../components/modals/deleteRecord";
import RowActionButtons from "../../components/table/RowActionButtons";

const initialfield = {
  code: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  countryCode: null,
  stateCode: null,
  cityCode: null,
  address: "",
  status: true,
  CreatedBy: "Raja",
  image: "",
};

const CustomerList = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState(initialfield);

  const countryOptions = [
    { label: "Choose Country", value: "" },
    { label: "India", value: "India" },
    { label: "USA", value: "USA" },
  ];

  const cityOptions = [
    { label: "Choose Country", value: "" },
    { label: "United Kingdom", value: "United Kingdom" },
    { label: "United State", value: "United State" },
  ];

  const stateOptions = [
    { label: "Choose Country", value: "" },
    { label: "United Kingdom", value: "United Kingdom" },
    { label: "United State", value: "United State" },
  ];

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      render: (text, record) => <>CU{text}</>,
      sorter: (a, b) => a.code.length - b.code.length,
    },
    {
      title: "Customer",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, record) => (
        <ImageTextCell imageSrc={record?.image} text={record?.name} />
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },

    {
      title: "Country",
      dataIndex: "country",
      sorter: (a, b) => a.country.length - b.country.length,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <RowActionButtons
          // onView={() => handleViewRow(record)}
          onEdit={() => handleEditRow(record)}
          onDelete={() => handleDeleteRow(record)}
        />
      ),
      sorter: (a, b) => a.createdby.length - b.createdby.length,
    },
  ];

  const handleEditRow = (record) => {
    fetchEditFormData(record?.code);
    setSelectedItem(record);
    setShowModal(true);
  };

  const handleDeleteRow = (record) => {
    setSelectedItem(record);
    setDeleteModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/SaveOrUpdateCustomerDet/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      // console.log(result);
      toast.success(result?.msg);
      if (result.status === 1) {
        handleReset();
        setShowModal(false);
        fetchData();
      }
    } catch (er) {
      toast.error("Error:" + er);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/GetCustomerMasterDet/customers`);
      const result = await res.json();
      console.log(result);

      const data = result?.data?.map((item) => {
        return {
          id: item.code,
          image: item.image,
          code: item.code,
          name: item.name,
          email: item.email,
          phone: item.phone,
          country: item.countryName,
          status: item.status ? "Active" : "Inactive",
          createdby: item.createdBy,
          createdOn: item.createdOn,
        };
      });
      setTableData(data);
    } catch (ex) {
      toast.error("Error :" + ex);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmDelete = async () => {
    if (!selectedItem?.id) return;
    setIsDeleting(true);
    setIsLoading(true);
    try {
      const resp = await fetch(
        `${API_URL}/DeleteMasterByTypeAndCode?tranType=1&masterType=2&code=${selectedItem?.id}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      const res = await resp.json();

      if (res.status === 1) {
        toast.success(res.msg || "customer deleted successfully");
        fetchData();
      } else {
        toast.error(res.msg || "Failed to delete customer");
      }
    } catch {
      toast.error("Error deleting customer");
    } finally {
      setIsDeleting(false);
      setDeleteModal(false);
      setSelectedItem(null);
      setIsLoading(false);
    }
  };

  const handleImageChange = (event, reader) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: reader,
    }));
  };

  const handleLocationChange = (location) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      countryCode: location.country?.value,
      stateCode: location.state?.value,
      cityCode: location.city?.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReset = () => {
    setFormData(initialfield);
    setSelectedItem(null);
    setDeleteModal(false);
  };

  const fetchEditFormData = async (custId) => {
    setIsLoading(true);
    setFormData(initialfield);
    try {
      const res = await fetch(
        `${API_URL}/GetCustomerMasterDet/customers?code=${custId}`
      );
      const result = await res.json();
      const data = result.data[0];
      // console.log(data);
      const toOption = (code, name) => ({ value: code, label: name });

      setFormData({
        ...data,
        image: data.image,
        country: toOption(data.countryCode, data.countryName),
        state: toOption(data.stateCode, data.stateName),
        city: toOption(data.cityCode, data.cityName),
      });
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <DataTableHeader
            title="Customer List"
            subtitle="Manage your customers"
            addButtonLabel="Add New Customer"
            onNavigate={() => setShowModal(true)}
            showImport={false}
            onExportPdf={() => {
              toast.info("Export to PDF is not implemented yet");
            }}
            onExportExcel={() => handleExportToExcel(tableData)}
            onRefresh={fetchData}
          />
          <DataTable columns={columns} dataSource={tableData} />
        </div>
        <CommonFooter />
        <EntityFormModal
          isOpen={showModal}
          formData={formData}
          onImageChange={handleImageChange}
          onLocationChange={handleLocationChange}
          onInputChange={handleInputChange}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          onReset={handleReset}
          isLoading={isLoading}
          isEditMode={Boolean(selectedItem)}
        />
        <CommonDeleteModal
          onShow={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Product"
          message={`Are you sure you want to delete the product : "${selectedItem?.name}"?`}
          isDeleting={isDeleting}
        />
      </div>
    </>
  );
};

export default CustomerList;
