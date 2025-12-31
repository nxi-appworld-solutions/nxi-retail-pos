// src/components/common/QuickActions.jsx
import React from "react";
import { Link } from "react-router-dom";

const QuickActions = ({ onFind, onAdd, onScan }) => (
  <>
    <Link className="btn btn-primary btn-icon fs-20" onClick={onFind}>
      <i className="ti ti-search" />
    </Link>

    <Link className="btn btn-primary btn-icon fs-20" onClick={onAdd}>
      <i className="ti ti-user-plus" />
    </Link>

    <Link className="btn btn-primary btn-icon fs-20" onClick={onScan}>
      <i className="ti ti-scan" />
    </Link>
  </>
);

export default QuickActions;
