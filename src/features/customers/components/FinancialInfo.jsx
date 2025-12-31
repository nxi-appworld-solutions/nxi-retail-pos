import React from "react";
import {
  DollarSign,
  Clock,
  AlertCircle,
  ShieldOff,
  Percent,
  CreditCard,
  TrendingUp,
  CheckCircle,
} from "react-feather";
import CreditProgressBar from "./CreditProgressBar";
import { IndianRupee } from "lucide-react";

const FinancialInfo = ({ formData, handleChange }) => {
  // Custom helper for checkbox handling
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    handleChange({ target: { name, value: checked } });
  };

  return (
    <>
      <div className="col-12">
        <CreditProgressBar
          limit={formData.creditLimit || 0}
          used={formData.currentOutstanding || 0}
        />
      </div>
      <div className="row g-4 animate__animated animate__fadeIn">
        {/* --- CREDIT & BALANCE SECTION --- */}
        <div className="col-12">
          <h6 className="fw-bold text-uppercase small text-muted border-bottom pb-2">
            Credit & Account Balances
          </h6>
        </div>

        <div className="col-md-4">
          <label className="form-label fw-bold small">
            Credit Limit (Amount)
          </label>
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-primary-light text-primary">
              <IndianRupee className="text-muted" size={16} />
            </span>
            <input
              type="number"
              name="creditLimit"
              className="form-control"
              placeholder="0.00"
              value={formData.creditLimit}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-4">
          <label className="form-label fw-bold small">
            Credit Period (Days)
          </label>
          <div className="input-group shadow-sm">
            <span className="input-group-text">
              <Clock size={16} />
            </span>
            <input
              type="number"
              name="creditDays"
              className="form-control"
              placeholder="30"
              value={formData.creditDays}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-4">
          <label className="form-label fw-bold small">
            Grace Period (Extra Days)
          </label>
          <input
            type="number"
            name="gracePeriod"
            className="form-control shadow-sm"
            placeholder="5"
            value={formData.gracePeriod}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold small">
            Opening Balance (As of Today)
          </label>
          <div className="input-group shadow-sm">
            <input
              type="number"
              name="openingBalance"
              className="form-control border-danger border-opacity-25"
              value={formData.openingBalance}
              onChange={handleChange}
            />
            <select
              name="balanceType"
              className="form-select bg-light fw-bold"
              value={formData.balanceType}
              onChange={handleChange}
            >
              <option value="Debit">Dr (Receive)</option>
              <option value="Credit">Cr (Pay)</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold small">
            Late Payment Interest (%)
          </label>
          <div className="input-group shadow-sm">
            <input
              type="number"
              name="lateInterest"
              className="form-control"
              placeholder="0.00"
              value={formData.lateInterest}
              onChange={handleChange}
            />
            <span className="input-group-text bg-white text-muted">Per Month</span>
          </div>
        </div>

        {/* --- BILLING & PAYMENT STRATEGY --- */}
        <div className="col-12 mt-4">
          <h6 className="fw-bold text-uppercase small text-muted border-bottom pb-2">
            Billing & Payment Strategy
          </h6>
        </div>

        {/* PAYMENT MODE FIELD (ADDED) */}
        <div className="col-md-4">
          <label className="form-label fw-bold small">
            Preferred Payment Mode
          </label>
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-success-light text-muted">
              <CreditCard size={16} />
            </span>
            <select
              name="preferredPaymentMode"
              className="form-select fw-semibold"
              value={formData.preferredPaymentMode}
              onChange={handleChange}
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI / QR Scan</option>
              <option value="Card">Card Payment</option>
              <option value="BankTransfer">Bank Transfer</option>
              <option value="Wallet">Digital Wallet</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>
        </div>

        <div className="col-md-4">
          <label className="form-label fw-bold small">
            Price List / Tier
          </label>
          <select
            name="priceList"
            className="form-select shadow-sm"
            value={formData.priceList}
            onChange={handleChange}
          >
            <option value="Standard">Standard Retail (MRP)</option>
            <option value="Wholesale">Wholesale Rate</option>
            <option value="Premium">Premium / VIP</option>
            <option value="Staff">Staff Rate</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label fw-bold small">
            Default Discount (%)
          </label>
          <div className="input-group shadow-sm">
            <span className="input-group-text text-success">
              <TrendingUp size={16} />
            </span>
            <input
              type="number"
              name="defaultDiscount"
              className="form-control"
              placeholder="0%"
              value={formData.defaultDiscount}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* --- BANKING & RISK CONTROL --- */}
        <div className="col-12 mt-4">
          <h6 className="fw-bold text-uppercase small text-muted border-bottom pb-2">
            Banking & Risk Management
          </h6>
        </div>

        <div className="col-md-12">
          <label className="form-label fw-bold small">
            Bank Account Detail (For Payouts/Refunds)
          </label>
          <input
            type="text"
            name="bankAccount"
            className="form-control shadow-sm"
            placeholder="Bank Name, A/c Number, IFSC Code"
            value={formData.bankAccount}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <div className="p-3 border rounded-3 bg-light d-flex align-items-center justify-content-between shadow-sm">
            <div>
              <h6 className="mb-0 fw-bold d-flex align-items-center">
                <ShieldOff size={18} className="me-2 text-danger" /> Strict
                Credit Stop
              </h6>
              <small className="text-muted">
                Block billing if customer has overdue payments
              </small>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input p-2"
                type="checkbox"
                name="isCreditBlocked"
                checked={formData.isCreditBlocked}
                onChange={handleCheckbox}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-3 border rounded-3 bg-light d-flex align-items-center justify-content-between shadow-sm">
            <div>
              <h6 className="mb-0 fw-bold d-flex align-items-center">
                <CheckCircle size={18} className="me-2 text-primary" />{" "}
                Bill-by-Bill Mapping
              </h6>
              <small className="text-muted">
                Track payments against specific invoice numbers
              </small>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input p-2"
                type="checkbox"
                name="billByBill"
                checked={formData.billByBill}
                onChange={handleCheckbox}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialInfo;
