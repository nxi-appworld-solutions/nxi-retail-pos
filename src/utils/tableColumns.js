export const categoryColumn = [
  {
    title: "Category",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Print Name",
    dataIndex: "printName",
    sorter: (a, b) => a.printName.localeCompare(b.printName),
  },
  {
    title: "Creation By",
    dataIndex: "creationBy",
    sorter: (a, b) => new Date(a.creationBy) - new Date(b.creationBy),
  },
  {
    title: "Creation Time",
    dataIndex: "creationTime",
    sorter: (a, b) => new Date(a.creationTime) - new Date(b.creationTime),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (val) => (
      <span
        className={`badge ${val === "Active" ? "bg-success" : "bg-danger"}`}
      >
        {val}
      </span>
    ),
  },
  {
    type: "actions",
    actions: ["edit", "delete"],
  },
];

export const unitColumn = [
  {
    title: "Unit",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Print Name",
    dataIndex: "printName",
    sorter: (a, b) => a.printName.localeCompare(b.printName),
  },
  {
    title: "Creation By",
    dataIndex: "creationBy",
    sorter: (a, b) => new Date(a.creationBy) - new Date(b.creationBy),
  },
  {
    title: "Creation Time",
    dataIndex: "creationTime",
    sorter: (a, b) => new Date(a.creationTime) - new Date(b.creationTime),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (val) => (
      <span
        className={`badge ${val === "Active" ? "bg-success" : "bg-danger"}`}
      >
        {val}
      </span>
    ),
  },
  {
    type: "actions",
    actions: ["edit", "delete"],
  },
];
