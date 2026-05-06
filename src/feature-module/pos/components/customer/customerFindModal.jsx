import React, { useEffect, useMemo, useState } from "react";
import { Search, User } from "react-feather";
import BaseModal from "../../../../core/common/modal/baseModal";
import Loader from "../../../../components/loader/Loader";
import useCustomers from "../../../../core/hooks/useCustomers";
import useModal from "../../../../routes/modal_root/useModal";

const CustomerFindModal = ({ onSelect }) => {
  const { close, payload } = useModal();
  const { customers, loading, fetchCustomers } = useCustomers();
  const [search, setSearch] = useState("");

  // =====================================================
  // FETCH CUSTOMERS
  // =====================================================
  useEffect(() => {
    fetchCustomers();
  }, []);

  // =====================================================
  // FILTERED CUSTOMERS
  // =====================================================
  const filteredCustomers = useMemo(() => {
    const value = search.toLowerCase().trim();

    return (customers || []).filter(
      (c) =>
        c?.name?.toLowerCase().includes(value) ||
        c?.phone?.toLowerCase().includes(value) ||
        c?.email?.toLowerCase().includes(value),
    );
  }, [search, customers]);

  // =====================================================
  // SELECT CUSTOMER
  // =====================================================
  const handleSelect = (customer) => {
    onSelect?.(customer);
    close?.();
  };

  // if (!isOpen) return null;

  return (
    <>
      {loading && <Loader loading />}

      <BaseModal title="Find Customer" size="md">
        <div className="new-employee-field">
          {/* SEARCH */}
          <div className="mb-3 position-relative">
            <Search
              size={16}
              className="position-absolute text-muted"
              style={{
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
              }}
            />

            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search by name, phone or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          {/* CUSTOMER LIST */}
          <div
            className="border rounded overflow-auto"
            style={{ maxHeight: "400px" }}
          >
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <User size={32} className="mb-2 opacity-50" />
                <p className="mb-0 fs-13">No customers found</p>
              </div>
            ) : (
              filteredCustomers.map((customer) => (
                <div
                  key={customer.code}
                  className="d-flex align-items-center justify-content-between p-3 border-bottom customer-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelect(customer)}
                >
                  <div>
                    <h6 className="mb-1 fs-14 fw-semibold">{customer.name}</h6>

                    <div className="text-muted fs-12">
                      {customer.phone || "No Phone"}
                      {customer.email && ` • ${customer.email}`}
                    </div>
                  </div>

                  <span
                    className={`badge ${
                      customer.status === "Active"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {customer.status || "Inactive"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default CustomerFindModal;
