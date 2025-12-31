// TaxRateTable.jsx
import React, { useState } from "react";

const TaxRateTable = () => {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    setRows([...rows, { igst: 0, cgst: 0, sgst: 0, type: "", basis: "" }]);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...rows];
    updated[index][name] = value;
    setRows(updated);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Change in Tax Rates</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>IGST %</th>
            <th>CGST %</th>
            <th>SGST %</th>
            <th>Tax Type</th>
            <th>Basis</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>
                <input
                  type="number"
                  name="igst"
                  value={row.igst}
                  onChange={(e) => handleChange(i, e)}
                  className="w-full border px-2"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="cgst"
                  value={row.cgst}
                  onChange={(e) => handleChange(i, e)}
                  className="w-full border px-2"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="sgst"
                  value={row.sgst}
                  onChange={(e) => handleChange(i, e)}
                  className="w-full border px-2"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="type"
                  value={row.type}
                  onChange={(e) => handleChange(i, e)}
                  className="w-full border px-2"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="basis"
                  value={row.basis}
                  onChange={(e) => handleChange(i, e)}
                  className="w-full border px-2"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={addRow}
        className="mt-3 bg-green-500 text-white px-3 py-1 rounded"
      >
        + Add Row
      </button>
    </div>
  );
};

export default TaxRateTable;
