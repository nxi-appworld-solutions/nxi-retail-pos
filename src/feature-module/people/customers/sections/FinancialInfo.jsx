import React from "react";
import { Clock, Lock, CheckCircle } from "react-feather";
import CreditProgressBar from "./CreditProgressBar";
import { IndianRupee } from "lucide-react";

const FinancialInfo = ({ formData, handleChange }) => {
  const creditEnabled = formData.config?.allowCredit;

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold text-uppercase text-muted mb-0">
          Financial & Accounting
        </h6>
        <span
          className={`badge px-3 py-2 ${
            creditEnabled
              ? "bg-success bg-opacity-10 text-success"
              : "bg-secondary bg-opacity-10 text-muted"
          }`}
        >
          {creditEnabled ? (
            <>
              <CheckCircle size={14} className="me-1" />
              Credit Enabled
            </>
          ) : (
            <>
              <Lock size={14} className="me-1" />
              Credit Disabled
            </>
          )}
        </span>
      </div>
      {creditEnabled && (
        <div className="mb-3">
          <CreditProgressBar
            limit={Number(formData.creditLimit || 0)}
            used={Number(formData.currentOutstanding || 0)}
          />
        </div>
      )}
      <div
        className={`card border-0 shadow-sm rounded-3 mb-3 ${!creditEnabled ? "opacity-75" : ""}`}
      >
        <div className="card-body p-3">
          <h6 className="fw-bold mb-2 small">Credit Terms</h6>

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-semibold mb-1">
                Credit Limit
              </label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light">
                  <IndianRupee size={14} />
                </span>
                <input
                  type="number"
                  name="creditLimit"
                  className="form-control"
                  value={formData.creditLimit}
                  onChange={handleChange}
                  disabled={!creditEnabled}
                  placeholder="e.g. 50000"
                />
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold mb-1">
                Credit Days
              </label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light">
                  <Clock size={14} />
                </span>
                <input
                  type="number"
                  name="creditDays"
                  className="form-control"
                  value={formData.creditDays}
                  onChange={handleChange}
                  disabled={!creditEnabled}
                  placeholder="e.g. 30"
                />
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold mb-1">
                Grace Days
              </label>
              <input
                type="number"
                name="gracePeriod"
                className="form-control form-control-sm"
                value={formData.gracePeriod}
                onChange={handleChange}
                disabled={!creditEnabled}
                placeholder="e.g. 5"
              />
            </div>
          </div>

          {!creditEnabled && (
            <div className="mt-2 text-muted small d-flex align-items-center">
              <Lock size={14} className="me-1" />
              Enable <b className="mx-1">Allow Credit Sales</b> from
              Configuration
            </div>
          )}
        </div>
      </div>
      <div className="p-3 border rounded-3 mb-3">
        <h6 className="fw-bold mb-2 small">Opening Balance</h6>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-semibold mb-1">
              Balance Amount
            </label>
            <div className="input-group input-group-sm">
              <input
                type="number"
                name="openingBalance"
                className="form-control"
                value={formData.openingBalance}
                onChange={handleChange}
              />
              <select
                name="balanceType"
                className="form-select bg-light fw-semibold"
                value={formData.balanceType}
                onChange={handleChange}
              >
                <option value="Debit">Dr (Customer owes)</option>
                <option value="Credit">Cr (Advance received)</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-semibold mb-1">
              Late Interest (% / Month)
            </label>
            <input
              type="number"
              name="lateInterest"
              className="form-control form-control-sm"
              value={formData.lateInterest}
              onChange={handleChange}
              disabled={!creditEnabled}
              placeholder="e.g. 2% per month"
            />
          </div>
        </div>
      </div>
      <div className="p-3 border border-dashed rounded-3 mb-3">
        <h6 className="fw-bold mb-2 small">
          Bank Details <span className="text-muted">(Optional)</span>
        </h6>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-semibold mb-1">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              className="form-control form-control-sm"
              value={formData.bankName || ""}
              onChange={handleChange}
              placeholder="e.g. State Bank of India"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-semibold mb-1">
              Account Holder
            </label>
            <input
              type="text"
              name="bankAccountHolder"
              className="form-control form-control-sm"
              value={formData.bankAccountHolder || ""}
              onChange={handleChange}
              placeholder="Name as per bank account"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-semibold mb-1">
              Account Number
            </label>
            <input
              type="text"
              name="bankAccountNumber"
              className="form-control form-control-sm"
              value={formData.bankAccountNumber || ""}
              onChange={handleChange}
              placeholder="e.g. 1234567890"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-semibold mb-1">
              IFSC Code
            </label>
            <input
              type="text"
              name="bankIFSC"
              className="form-control form-control-sm text-uppercase"
              maxLength={11}
              value={formData.bankIFSC || ""}
              onChange={handleChange}
              placeholder="e.g. SBIN0000123"
            />
          </div>
        </div>
      </div>
      <div
        className={`p-2 bg-light border rounded-3 d-flex justify-content-between align-items-center ${!creditEnabled ? "opacity-50" : ""}`}
      >
        <div>
          <div className="fw-semibold small">Bill-by-Bill Accounting</div>
          <small className="text-muted">
            Invoice-wise outstanding tracking
          </small>
        </div>
        <div className="form-check form-switch m-0">
          <input
            className="form-check-input"
            type="checkbox"
            name="billByBill"
            checked={formData.billByBill}
            onChange={handleChange}
            disabled={!creditEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialInfo;
