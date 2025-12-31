import React from "react";
import { InputNumber, Button, Image, Table, Popconfirm, Tooltip } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, updateQty } from "../../../core/redux/transactionSlice";

export default function ProductTable() {
  // const handleQtyChange = (qty, record) => {
  //   setProducts((prev) =>
  //     prev.map((p) =>
  //       p.code === record.code ? { ...p, qty, totalCost: qty * p.price } : p
  //     )
  //   );
  // };
  const products = useSelector((state) => state.transaction.products);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <ImageWithBasePath
            className="avatar avatar-md me-2"
            src={record.imageList[0]?.filePath}
            alt={text}
            width={40}
            height={40}
            style={{ marginRight: 8 }}
            preview={false}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      render: (qty, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Button
            icon={<MinusCircleOutlined />}
            // onClick={() => onQtyChange(qty - 1, record)}
            onClick={() =>
              dispatch(updateQty({ code: record.code, qty: record.qty - 1 }))
            }
            disabled={qty <= 1}
          />
          <InputNumber
            min={1}
            value={qty}
            // onChange={(val) => onQtyChange(val, record)}
            onChange={(val) =>
              dispatch(updateQty({ code: record.code, qty: val }))
            }
          />
          <Button
            icon={<PlusCircleOutlined />}
            // onClick={() => onQtyChange(qty + 1, record)}
            onClick={() =>
              dispatch(updateQty({ code: record.code, qty: record.qty + 1 }))
            }
          />
        </div>
      ),
    },
    {
      title: "Purchase Price(₹)",
      dataIndex: "price",
      key: "price",
      render: (price, record) => (
        <InputNumber min={price} value={price} disabled />
      ),
    },
    {
      title: "Discount(₹)",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Tax(%)",
      dataIndex: "taxPer",
      key: "taxPer",
    },
    {
      title: "Tax Amt(₹)",
      dataIndex: "taxAmt",
      key: "taxAmt",
    },
    {
      title: "Unit Cost(₹)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total Cost(₹)",
      dataIndex: "totalCost",
      key: "totalCost",
    },
    {
      title: "Action",
      key: "action",
      // render: (_, record) => (
      //   // <Button danger onClick={() => onRemove(record)}>
      //   <Button danger onClick={() => dispatch(removeProduct(record))}>
      //     Remove
      //   </Button>
      // ),
      render: (_, record) => (
        <Popconfirm
          title="Remove Product"
          description="Are you sure you want to remove this product?"
          onConfirm={() => dispatch(removeProduct(record))}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip title="Remove">
            <Button
              type="text"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="card table-list-card">
      <div className="card-body">
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={products}
            pagination={false}
            rowKey="code"
          />
        </div>
      </div>
    </div>
  );
}
