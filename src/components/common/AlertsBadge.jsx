// small AlertsBadge component
import React from 'react';
import { useSelector } from 'react-redux';

const AlertsBadge = () => {
  const alerts = useSelector(s => s.alerts.list.filter(a=>!a.resolved));
  if (!alerts.length) return null;
  return (
    <div className="alerts-badge">
      <button className="btn btn-danger">{alerts.length}</button>
      {/* clicking can open a modal with alert details */}
    </div>
  );
};
