/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { closeModal } from "../../../../core/redux/modalSlice";
// import usePos from "../../../../hooks/usePos";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// const TABS = [
//   { key: "hold", label: "Onhold" },
//   { key: "unpaid", label: "Unpaid" },
//   { key: "paid", label: "Paid" },
// ];

// const OrdersModal = ({ isOpen = true, onSelectOrder }) => {
//   const dispatch = useDispatch();
//   const { fetchOrders } = usePos();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("hold");
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     loadOrders();
//   }, [activeTab]);

//   const loadOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await fetchOrders({ status: activeTab, q: search });
//       setOrders(res || []);
//     } catch {
//       toast.error("Unable to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   const demoOrders = [
//     {
//       orderId: 1,
//       orderNo: "45698",
//       cashier: "admin",
//       customer: { name: "Botsford" },
//       totalAmount: 900,
//       orderStatus: "hold",
//       createdOn: "2024-12-24T13:39:11",
//       note: "Customer need to recheck the product once",
//       items: [
//         { name: "Burger", qty: 2, price: 120 },
//         { name: "Mango Juice", qty: 1, price: 80 },
//       ],
//     },

//     {
//       orderId: 2,
//       orderNo: "78652",
//       cashier: "admin",
//       customer: { name: "James" },
//       totalAmount: 250,
//       orderStatus: "hold",
//       createdOn: "2024-12-23T11:22:33",
//       note: "",
//       items: [
//         { name: "Banana", qty: 6, price: 10 },
//         { name: "Apple", qty: 2, price: 40 },
//       ],
//     },

//     {
//       orderId: 3,
//       orderNo: "666659",
//       cashier: "admin",
//       customer: { name: "Lucia" },
//       totalAmount: 900,
//       orderStatus: "unpaid",
//       createdOn: "2024-12-24T13:39:11",
//       note: "",
//       items: [
//         { name: "Pizza", qty: 1, price: 500 },
//         { name: "Coke", qty: 2, price: 50 },
//       ],
//     },

//     {
//       orderId: 4,
//       orderNo: "99885",
//       cashier: "admin",
//       customer: { name: "Anastasia" },
//       totalAmount: 1200,
//       orderStatus: "unpaid",
//       createdOn: "2024-12-22T10:10:45",
//       note: "Customer will pay at counter",
//       items: [
//         { name: "Veg Sandwich", qty: 3, price: 100 },
//         { name: "Milkshake", qty: 1, price: 150 },
//       ],
//     },

//     {
//       orderId: 5,
//       orderNo: "10112",
//       cashier: "admin",
//       customer: { name: "Hugo" },
//       totalAmount: 1000,
//       orderStatus: "paid",
//       createdOn: "2024-12-24T13:39:11",
//       note: "",
//       items: [{ name: "Laptop Charger", qty: 1, price: 1000 }],
//     },

//     {
//       orderId: 6,
//       orderNo: "11002",
//       cashier: "admin",
//       customer: { name: "Antonio" },
//       totalAmount: 9100,
//       orderStatus: "paid",
//       createdOn: "2024-12-23T13:39:11",
//       note: "High value order",
//       items: [
//         { name: "Smartphone", qty: 1, price: 9000 },
//         { name: "Cover", qty: 1, price: 100 },
//       ],
//     },
//   ];

//   const filtered = demoOrders.filter((o) =>
//     JSON.stringify(o).toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <div className="modal-backdrop fade show" />
//       <div className="modal fade show d-block pos-modal" role="dialog" aria-modal="true">
//         <div className="modal-dialog modal-md modal-dialog-centered">
//           <div className="modal-content">
//             {/* Header */}
//             <div className="modal-header bg-secondary text-white">
//               <h5 className="modal-title text-white">Orders</h5>
//               <button
//                 type="button"
//                 className="modal-close-btnx"
//                 onClick={() => dispatch(closeModal("orders"))}
//               >
//                 ✖
//               </button>
//             </div>

//             <div className="modal-body">
//               {/* Tabs */}
//               <ul className="nav nav-tabs mb-3">
//                 {TABS.map((tab) => (
//                   <li className="nav-item" key={tab.key}>
//                     <button
//                       className={`nav-link ${
//                         activeTab === tab.key ? "active" : ""
//                       }`}
//                       onClick={() => setActiveTab(tab.key)}
//                     >
//                       {tab.label}
//                     </button>
//                   </li>
//                 ))}
//               </ul>

//               {/* Search */}
//               <div className="input-icon-start pos-search position-relative mb-3">
//                 <span className="input-icon-addon">
//                   <i className="ti ti-search" />
//                 </span>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search order or customer"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>

//               {/* Order List */}
//               <div
//                 className="order-body"
//                 style={{ maxHeight: "60vh", overflowY: "auto" }}
//               >
//                 {loading && (
//                   <p className="text-center text-muted">Loading...</p>
//                 )}

//                 {!loading && filtered.length === 0 && (
//                   <p className="text-center text-muted">No orders found</p>
//                 )}

//                 {filtered.map((order) => (
//                   <div className="card bg-light mb-3" key={order.orderId}>
//                     <div className="card-body">
//                       <span className="badge bg-dark fs-12 mb-2">
//                         Order ID : #{order.orderNo}
//                       </span>

//                       <div className="row g-3 mb-2">
//                         <div className="col-md-6">
//                           <p className="fs-14 mb-1">
//                             <strong>Cashier :</strong> {order.cashier}
//                           </p>
//                           <p className="fs-14">
//                             <strong>Total :</strong> ₹{order.totalAmount}
//                           </p>
//                         </div>
//                         <div className="col-md-6">
//                           <p className="fs-14 mb-1">
//                             <strong>Customer :</strong>{" "}
//                             {order.customer?.name || "Walk-in"}
//                           </p>
//                           <p className="fs-14">
//                             <strong>Date :</strong>{" "}
//                             {new Date(order.createdOn).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>

//                       {order.note && (
//                         <div className="bg-info-transparent p-2 rounded text-center my-2">
//                           <p className="text-info fw-medium">{order.note}</p>
//                         </div>
//                       )}

//                       <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
//                         <button
//                           className="btn btn-md btn-orange"
//                           onClick={() => onSelectOrder(order)}
//                         >
//                           Open Order
//                         </button>

//                         <Link to="#" className="btn btn-md btn-teal">
//                           View Products
//                         </Link>

//                         <button className="btn btn-md btn-indigo">Print</button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrdersModal;


/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useMemo, useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { closeModal } from "../../../../core/redux/modalSlice";
// import usePos from "../../../../hooks/usePos";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// /*
//   Advanced Orders Modal for POS
//   - Summary bar
//   - Tabs (hold / unpaid / paid)
//   - Advanced filters (date, cashier, amount, sort)
//   - Colored badges, order type
//   - Items preview + item count
//   - Payment info
//   - Customer details
//   - Right side order detail panel
//   - Quick actions
//   - Load more / pagination (simulated)
// */

// const TABS = [
//   { key: "hold", label: "Onhold" },
//   { key: "unpaid", label: "Unpaid" },
//   { key: "paid", label: "Paid" },
// ];

// const STATUS_COLOR = {
//   hold: "bg-warning text-dark",
//   unpaid: "bg-danger text-white",
//   paid: "bg-success text-white",
//   refunded: "bg-secondary text-white",
//   cancelled: "bg-dark text-white",
// };

// const ORDER_TYPES = ["DINE_IN", "TAKEAWAY", "DELIVERY", "ONLINE"];

// const DEMO_COUNT = 80; // change to generate more demo orders

// // Demo data generator
// const makeDemoOrders = (count = 20) => {
//   const names = ["Hugo", "Antonio", "Lucia", "James", "Anastasia", "Botsford", "Sonia", "Ravi", "Aisha"];
//   const cashiers = ["admin", "cashier1", "cashier2"];
//   const products = [
//     { name: "Burger", price: 120 },
//     { name: "Pizza", price: 500 },
//     { name: "Coke", price: 50 },
//     { name: "Mango Juice", price: 80 },
//     { name: "Laptop Charger", price: 1000 },
//     { name: "Smartphone", price: 9000 },
//     { name: "Veg Sandwich", price: 100 },
//     { name: "Milkshake", price: 150 },
//   ];

//   const res = [];
//   for (let i = 1; i <= count; i++) {
//     const status = i % 3 === 0 ? "paid" : i % 3 === 1 ? "hold" : "unpaid";
//     const type = ORDER_TYPES[i % ORDER_TYPES.length];
//     const cashier = cashiers[i % cashiers.length];
//     const customerName = names[i % names.length];
//     const itemsCount = 1 + (i % 4);
//     const items = [];
//     let total = 0;
//     for (let k = 0; k < itemsCount; k++) {
//       const p = products[(i + k) % products.length];
//       const qty = 1 + ((i + k) % 3);
//       items.push({ name: p.name, qty, price: p.price });
//       total += p.price * qty;
//     }
//     const createdOn = new Date(Date.now() - (i * 60 + (i % 60)) * 60 * 1000).toISOString(); // spaced timestamps
//     const order = {
//       orderId: i,
//       orderNo: (40000 + i).toString(),
//       cashier,
//       customer: { name: customerName, phone: `9${Math.floor(100000000 + Math.random() * 900000000)}` },
//       totalAmount: total,
//       orderStatus: status,
//       orderType: type,
//       payment: {
//         method: status === "paid" ? (i % 2 === 0 ? "Card" : "Cash") : status === "unpaid" ? "Pending" : "Partially Paid",
//         paidAmount: status === "paid" ? total : status === "hold" ? 0 : Math.round(total * 0.5),
//         invoice: `INV-${new Date(createdOn).toISOString().slice(0,10).replace(/-/g,"")}-${i}`,
//       },
//       createdOn,
//       updatedOn: new Date(Date.now() - (i * 25) * 1000).toISOString(),
//       note: i % 5 === 0 ? "Customer requested extra napkins" : "",
//       items,
//       tags: i % 7 === 0 ? ["urgent"] : [],
//     };
//     res.push(order);
//   }
//   return res;
// };

// const OrdersModal = ({ isOpen = true, onSelectOrder }) => {
//   const dispatch = useDispatch();
//   const { fetchOrders } = usePos(); // optional: if available, will try to use
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // UI state
//   const [activeTab, setActiveTab] = useState("hold");
//   const [search, setSearch] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");
//   const [cashierFilter, setCashierFilter] = useState("all");
//   const [minAmount, setMinAmount] = useState("");
//   const [maxAmount, setMaxAmount] = useState("");
//   const [sortBy, setSortBy] = useState("newest");
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   // pagination / load more
//   const PAGE_SIZE = 12;
//   const [page, setPage] = useState(1);
//   const listRef = useRef(null);

//   // load initial data: try fetchOrders else demo
//   useEffect(() => {
//     loadInitial();
//   }, []);

//   // reload on tab change or filters reset
//   useEffect(() => {
//     setPage(1);
//   }, [activeTab, search, dateFrom, dateTo, cashierFilter, minAmount, maxAmount, sortBy]);

//   const loadInitial = async () => {
//     setLoading(true);
//     try {
//       if (fetchOrders) {
//         // attempt real backend; fallback to demo if it fails
//         try {
//           const res = await fetchOrders({});
//           setOrders(res || makeDemoOrders(DEMO_COUNT));
//         } catch {
//           setOrders(makeDemoOrders(DEMO_COUNT));
//         }
//       } else {
//         setOrders(makeDemoOrders(DEMO_COUNT));
//       }
//     } catch (err) {
//       toast.error("Unable to load orders");
//       setOrders(makeDemoOrders(DEMO_COUNT));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Derived lists + summary
//   const filteredOrders = useMemo(() => {
//     const lower = search.trim().toLowerCase();
//     return orders
//       .filter((o) => {
//         // tab filter
//         if (activeTab && o.orderStatus !== activeTab) return false;
//         // search
//         if (lower) {
//           const hay = `${o.orderNo} ${o.customer?.name} ${o.cashier} ${o.items.map(it => it.name).join(" ")}`.toLowerCase();
//           if (!hay.includes(lower)) return false;
//         }
//         // date range
//         if (dateFrom) {
//           const from = new Date(dateFrom);
//           if (new Date(o.createdOn) < from) return false;
//         }
//         if (dateTo) {
//           const to = new Date(dateTo);
//           // include the whole day
//           if (new Date(o.createdOn) > new Date(to.getTime() + 24*60*60*1000 - 1)) return false;
//         }
//         // cashier
//         if (cashierFilter !== "all" && o.cashier !== cashierFilter) return false;
//         // amount
//         if (minAmount && Number(o.totalAmount) < Number(minAmount)) return false;
//         if (maxAmount && Number(o.totalAmount) > Number(maxAmount)) return false;

//         return true;
//       })
//       .sort((a, b) => {
//         if (sortBy === "newest") return new Date(b.createdOn) - new Date(a.createdOn);
//         if (sortBy === "oldest") return new Date(a.createdOn) - new Date(b.createdOn);
//         if (sortBy === "high") return b.totalAmount - a.totalAmount;
//         if (sortBy === "low") return a.totalAmount - b.totalAmount;
//         return 0;
//       });
//   }, [orders, activeTab, search, dateFrom, dateTo, cashierFilter, minAmount, maxAmount, sortBy]);

//   const paged = useMemo(() => {
//     const start = 0;
//     const end = page * PAGE_SIZE;
//     return filteredOrders.slice(start, end);
//   }, [filteredOrders, page]);

//   const summary = useMemo(() => {
//     const totalOrders = orders.length;
//     const todayStart = new Date(); todayStart.setHours(0,0,0,0);
//     const totals = { totalOrders, hold:0, unpaid:0, paid:0, salesToday:0 };
//     orders.forEach(o => {
//       totals[o.orderStatus] = (totals[o.orderStatus] || 0) + 1;
//       if (new Date(o.createdOn) >= todayStart) totals.salesToday += Number(o.totalAmount || 0);
//     });
//     return totals;
//   }, [orders]);

//   const cashiers = useMemo(() => {
//     const set = new Set();
//     orders.forEach(o => set.add(o.cashier));
//     return ["all", ...Array.from(set)];
//   }, [orders]);

//   // actions
//   const handleOpenOrder = (o) => {
//     setSelectedOrder(o);
//     onSelectOrder?.(o);
//   };

//   const handlePrint = (o) => {
//     console.log("Print", o);
//     toast.success(`Printing order ${o.orderNo}`);
//   };

//   const handleRefund = (o) => {
//     console.log("Refund", o);
//     toast.info(`Refund requested for ${o.orderNo}`);
//   };

//   const handleMarkPaid = (o) => {
//     console.log("Mark paid", o);
//     toast.success(`Order ${o.orderNo} marked as paid (mock)`);
//   };

//   const handleSendInvoice = (o) => {
//     console.log("Send invoice", o);
//     toast.success(`Invoice sent for ${o.orderNo} (mock)`);
//   };

//   const canLoadMore = paged.length < filteredOrders.length;

//   // small utility to render items preview
//   const itemsPreview = (items = []) => {
//     if (!items || items.length === 0) return "0 items";
//     const names = items.slice(0, 2).map(it => `${it.name}×${it.qty}`);
//     return `${items.length} items (${names.join(", ")}${items.length > 2 ? ", ..." : ""})`;
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="modal-backdrop fade show" />
//       <div className="modal fade show d-block pos-modal" role="dialog" aria-modal="true">
//         <div
//           className="modal-dialog modal-lg modal-dialog-centered"
//           style={{ maxWidth: "980px", width: "96%" }}
//         >
//           <div className="modal-content">
//             {/* Header */}
//             <div className="modal-header bg-secondary text-white d-flex align-items-center justify-content-between">
//               <div>
//                 <h5 className="modal-title mb-0">Orders</h5>
//                 <small className="text-white-50">Advanced POS Order Manager</small>
//               </div>
//               <div>
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-light me-2"
//                   onClick={() => { /* refresh */ loadInitial(); }}
//                 >
//                   Refresh
//                 </button>
//                 <button
//                   type="button"
//                   className="modal-close-btnx btn btn-sm btn-outline-light"
//                   onClick={() => dispatch(closeModal("orders"))}
//                 >
//                   ✖
//                 </button>
//               </div>
//             </div>

//             {/* Body */}
//             <div className="modal-body" style={{ padding: 12 }}>
//               {/* Top summary bar */}
//               <div className="d-flex gap-2 align-items-center mb-3" style={{ flexWrap: "wrap" }}>
//                 <div className="p-2 rounded shadow-sm bg-white">
//                   <strong>{summary.totalOrders}</strong> Orders
//                 </div>
//                 <div className="p-2 rounded shadow-sm bg-white">
//                   <span className="me-2">Hold</span>
//                   <span className="badge rounded-pill bg-warning text-dark">{summary.hold || 0}</span>
//                 </div>
//                 <div className="p-2 rounded shadow-sm bg-white">
//                   <span className="me-2">Unpaid</span>
//                   <span className="badge rounded-pill bg-danger">{summary.unpaid || 0}</span>
//                 </div>
//                 <div className="p-2 rounded shadow-sm bg-white">
//                   <span className="me-2">Paid</span>
//                   <span className="badge rounded-pill bg-success">{summary.paid || 0}</span>
//                 </div>
//                 <div className="ms-auto p-2 rounded shadow-sm bg-white">
//                   <small className="text-muted">Sales Today</small>
//                   <div><strong>₹{summary.salesToday.toFixed(2)}</strong></div>
//                 </div>
//               </div>

//               <div className="row g-3">
//                 {/* Left: list + filters */}
//                 <div className="col-md-8">
//                   {/* Tabs */}
//                   <ul className="nav nav-tabs mb-2">
//                     {TABS.map((t) => (
//                       <li className="nav-item" key={t.key}>
//                         <button
//                           className={`nav-link ${activeTab === t.key ? "active" : ""}`}
//                           onClick={() => setActiveTab(t.key)}
//                         >
//                           {t.label}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>

//                   {/* Filters */}
//                   <div className="d-flex gap-2 mb-3 flex-wrap">
//                     <div style={{ minWidth: 180 }} className="input-group">
//                       <span className="input-group-text">Search</span>
//                       <input
//                         className="form-control"
//                         placeholder="order, customer, item..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                       />
//                     </div>

//                     <div className="input-group" style={{ minWidth: 160 }}>
//                       <span className="input-group-text">From</span>
//                       <input type="date" className="form-control" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
//                     </div>

//                     <div className="input-group" style={{ minWidth: 160 }}>
//                       <span className="input-group-text">To</span>
//                       <input type="date" className="form-control" value={dateTo} onChange={e => setDateTo(e.target.value)} />
//                     </div>

//                     <div className="input-group" style={{ minWidth: 140 }}>
//                       <span className="input-group-text">Cashier</span>
//                       <select className="form-select" value={cashierFilter} onChange={e => setCashierFilter(e.target.value)}>
//                         {cashiers.map(c => <option key={c} value={c}>{c}</option>)}
//                       </select>
//                     </div>

//                     <div className="input-group" style={{ minWidth: 120 }}>
//                       <span className="input-group-text">Min</span>
//                       <input type="number" className="form-control" value={minAmount} onChange={e=>setMinAmount(e.target.value)} />
//                     </div>

//                     <div className="input-group" style={{ minWidth: 120 }}>
//                       <span className="input-group-text">Max</span>
//                       <input type="number" className="form-control" value={maxAmount} onChange={e=>setMaxAmount(e.target.value)} />
//                     </div>

//                     <div className="input-group ms-auto" style={{ minWidth: 160 }}>
//                       <span className="input-group-text">Sort</span>
//                       <select className="form-select" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
//                         <option value="newest">Newest</option>
//                         <option value="oldest">Oldest</option>
//                         <option value="high">High Amount</option>
//                         <option value="low">Low Amount</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Orders list */}
//                   <div ref={listRef} style={{ maxHeight: "58vh", overflowY: "auto", paddingRight: 8 }}>
//                     {loading && <div className="text-center py-4 text-muted">Loading orders...</div>}

//                     {!loading && paged.length === 0 && <div className="text-center py-4 text-muted">No orders found</div>}

//                     {paged.map((order) => (
//                       <div key={order.orderId} className="card mb-2">
//                         <div className="card-body p-2">
//                           <div className="d-flex align-items-start gap-2">
//                             <div style={{ width: 8 }}>
//                               {/* status stripe */}
//                               <div style={{
//                                 width: 6, height: 54, borderRadius: 4,
//                                 background: order.orderStatus === "paid" ? "#198754" : order.orderStatus === "unpaid" ? "#dc3545" : "#fd7e14"
//                               }} />
//                             </div>

//                             <div style={{ flex: 1 }}>
//                               <div className="d-flex align-items-start">
//                                 <div>
//                                   <div className="d-flex align-items-center gap-2">
//                                     <strong>#{order.orderNo}</strong>
//                                     <span className={`badge ${STATUS_COLOR[order.orderStatus] || "bg-secondary"}`}>{order.orderStatus}</span>
//                                     <span className="badge bg-info text-dark">{order.orderType}</span>
//                                   </div>
//                                   <div className="text-muted small">{order.customer?.name} • {order.customer?.phone}</div>
//                                 </div>

//                                 <div className="ms-auto text-end">
//                                   <div><strong>₹{Number(order.totalAmount).toFixed(2)}</strong></div>
//                                   <div className="small text-muted">{new Date(order.createdOn).toLocaleString()}</div>
//                                 </div>
//                               </div>

//                               <div className="d-flex justify-content-between align-items-center mt-2">
//                                 <div className="small text-muted">
//                                   {itemsPreview(order.items)} • {order.items.reduce((s,i)=>s+i.qty,0)} pcs
//                                   {order.note ? <span className="ms-2 badge bg-light text-dark">{order.note}</span> : null}
//                                 </div>

//                                 <div className="d-flex align-items-center gap-1">
//                                   {/* quick actions dropdown */}
//                                   <div className="dropdown">
//                                     <button className="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
//                                       ⋮
//                                     </button>
//                                     <ul className="dropdown-menu dropdown-menu-end">
//                                       <li><button className="dropdown-item" onClick={() => handleOpenOrder(order)}>Open Order</button></li>
//                                       <li><button className="dropdown-item" onClick={() => handlePrint(order)}>Print</button></li>
//                                       <li><button className="dropdown-item" onClick={() => handleSendInvoice(order)}>Send Invoice</button></li>
//                                       <li><hr className="dropdown-divider" /></li>
//                                       <li><button className="dropdown-item text-danger" onClick={() => handleRefund(order)}>Refund</button></li>
//                                       {order.orderStatus !== "paid" && <li><button className="dropdown-item" onClick={() => handleMarkPaid(order)}>Mark as Paid</button></li>}
//                                     </ul>
//                                   </div>

//                                   <button className="btn btn-sm btn-link" onClick={() => setSelectedOrder(order)}>Details</button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}

//                     {/* load more */}
//                     {canLoadMore && (
//                       <div className="text-center my-2">
//                         <button className="btn btn-sm btn-outline-primary" onClick={() => setPage(p => p + 1)}>Load more</button>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right: details panel */}
//                 <div className="col-md-4">
//                   <div className="card" style={{ height: "100%" }}>
//                     <div className="card-body d-flex flex-column" style={{ minHeight: 260 }}>
//                       <div className="d-flex justify-content-between align-items-start">
//                         <h6 className="mb-1">Order Details</h6>
//                         <small className="text-muted">Select an order</small>
//                       </div>

//                       {!selectedOrder && (
//                         <div className="flex-grow-1 d-flex align-items-center justify-content-center text-muted">
//                           <div>
//                             <div className="mb-2 text-center">No order selected</div>
//                             <div className="small text-muted">Click "Details" or an order to view</div>
//                           </div>
//                         </div>
//                       )}

//                       {selectedOrder && (
//                         <>
//                           <div className="mb-2">
//                             <div className="d-flex justify-content-between align-items-center">
//                               <strong>#{selectedOrder.orderNo}</strong>
//                               <span className={`badge ${STATUS_COLOR[selectedOrder.orderStatus] || "bg-secondary"}`}>{selectedOrder.orderStatus}</span>
//                             </div>
//                             <div className="small text-muted">{new Date(selectedOrder.createdOn).toLocaleString()}</div>
//                             <div className="mt-2"><strong>{selectedOrder.customer?.name}</strong> • {selectedOrder.customer?.phone}</div>
//                           </div>

//                           <div className="mb-2">
//                             <div className="small text-muted">Payment</div>
//                             <div><strong>{selectedOrder.payment?.method}</strong> • Paid: ₹{selectedOrder.payment?.paidAmount}</div>
//                             <div className="small text-muted">Invoice: {selectedOrder.payment?.invoice}</div>
//                           </div>

//                           <div className="mb-2">
//                             <div className="small text-muted">Items</div>
//                             <ul className="list-group list-group-flush" style={{ maxHeight: 160, overflowY: "auto" }}>
//                               {selectedOrder.items.map((it, idx) => (
//                                 <li key={idx} className="list-group-item py-1 px-0 d-flex justify-content-between align-items-center">
//                                   <div>
//                                     <div><strong>{it.name}</strong></div>
//                                     <div className="small text-muted">₹{it.price} × {it.qty}</div>
//                                   </div>
//                                   <div><strong>₹{(it.price * it.qty).toFixed(2)}</strong></div>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>

//                           {selectedOrder.note && (
//                             <div className="mb-2">
//                               <div className="small text-muted">Note</div>
//                               <div className="p-2 bg-light rounded">{selectedOrder.note}</div>
//                             </div>
//                           )}

//                           <div className="mt-auto d-flex gap-2">
//                             <button className="btn btn-primary w-100" onClick={() => handlePrint(selectedOrder)}>Print</button>
//                             <button className="btn btn-outline-secondary w-100" onClick={() => handleSendInvoice(selectedOrder)}>Send</button>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div> {/* row */}
//             </div> {/* modal-body */}
//           </div> {/* modal-content */}
//         </div> {/* modal-dialog */}
//       </div>
//     </>
//   );
// };

// export default OrdersModal;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../core/redux/modalSlice";
import usePos from "../../../../hooks/usePos";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

/* -----------------------------------
      CONSTANTS & BADGE COLORS
-------------------------------------*/

const TABS = [
  { key: "hold", label: "Onhold" },
  { key: "unpaid", label: "Unpaid" },
  { key: "paid", label: "Paid" },
];

const STATUS_COLOR = {
  hold: "bg-warning text-dark",
  unpaid: "bg-danger text-white",
  paid: "bg-success text-white",
  refunded: "bg-secondary text-white",
  cancelled: "bg-dark text-white",
};

const ORDER_TYPES = ["DINE_IN", "TAKEAWAY", "DELIVERY", "ONLINE"];

const DEMO_COUNT = 80;

/* -----------------------------------
      DEMO ORDER GENERATOR
-------------------------------------*/
const makeDemoOrders = (count = 20) => {
  const names = [
    "Hugo",
    "Antonio",
    "Lucia",
    "James",
    "Anastasia",
    "Botsford",
    "Ravi",
    "Aisha",
    "Sonia",
  ];
  const cashiers = ["admin", "cashier1", "cashier2"];
  const products = [
    { name: "Burger", price: 120 },
    { name: "Pizza", price: 500 },
    { name: "Coke", price: 50 },
    { name: "Mango Juice", price: 80 },
    { name: "Laptop Charger", price: 1000 },
    { name: "Smartphone", price: 9000 },
    { name: "Veg Sandwich", price: 100 },
    { name: "Milkshake", price: 150 },
  ];

  const orders = [];

  for (let i = 1; i <= count; i++) {
    const status = i % 3 === 0 ? "paid" : i % 3 === 1 ? "hold" : "unpaid";
    const type = ORDER_TYPES[i % ORDER_TYPES.length];
    const cashier = cashiers[i % cashiers.length];
    const customerName = names[i % names.length];

    const itemsCount = 1 + (i % 4);
    const items = [];
    let total = 0;

    for (let k = 0; k < itemsCount; k++) {
      const p = products[(i + k) % products.length];
      const qty = 1 + ((i + k) % 3);
      items.push({ name: p.name, qty, price: p.price });
      total += p.price * qty;
    }

    const createdOn = new Date(
      Date.now() - (i * 90 + (i % 45)) * 60 * 1000
    ).toISOString();

    orders.push({
      orderId: i,
      orderNo: (40000 + i).toString(),
      cashier,
      customer: {
        name: customerName,
        phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
      },
      totalAmount: total,
      orderStatus: status,
      orderType: type,
      payment: {
        method:
          status === "paid"
            ? i % 2 === 0
              ? "Card"
              : "Cash"
            : status === "unpaid"
            ? "Pending"
            : "Partially Paid",
        paidAmount:
          status === "paid" ? total : status === "hold" ? 0 : Math.round(total * 0.5),
        invoice: `INV-${createdOn.slice(0, 10).replace(/-/g, "")}-${i}`,
      },
      createdOn,
      updatedOn: new Date(Date.now() - i * 30 * 1000).toISOString(),
      note: i % 7 === 0 ? "Customer requested extra napkins" : "",
      items,
      tags: i % 6 === 0 ? ["urgent"] : [],
    });
  }

  return orders;
};

/* -----------------------------------
      MAIN COMPONENT
-------------------------------------*/

const OrdersModal = ({ isOpen = true, onSelectOrder }) => {
  const dispatch = useDispatch();
  const { fetchOrders } = usePos();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [activeTab, setActiveTab] = useState("hold");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [cashierFilter, setCashierFilter] = useState("all");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [selectedOrder, setSelectedOrder] = useState(null);

  // pagination
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      let result = null;

      if (fetchOrders) {
        try {
          result = await fetchOrders({});
        } catch {
          result = makeDemoOrders(DEMO_COUNT);
        }
      } else {
        result = makeDemoOrders(DEMO_COUNT);
      }

      setOrders(result || []);
    } catch {
      toast.error("Failed loading orders");
      setOrders(makeDemoOrders(DEMO_COUNT));
    } finally {
      setLoading(false);
    }
  };

  // re-apply pagination when filters/tabs change
  useEffect(() => setPage(1), [
    activeTab,
    search,
    dateFrom,
    dateTo,
    cashierFilter,
    minAmount,
    maxAmount,
    sortBy,
  ]);

  /* -----------------------------------
        FILTERED ORDERS
  -------------------------------------*/
  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();

    return orders
      .filter((o) => {
        if (o.orderStatus !== activeTab) return false;

        if (q) {
          const str = `${o.orderNo} ${o.customer?.name} ${o.cashier} ${o.items
            .map((i) => i.name)
            .join(" ")}`.toLowerCase();
          if (!str.includes(q)) return false;
        }

        if (dateFrom && new Date(o.createdOn) < new Date(dateFrom)) return false;
        if (dateTo && new Date(o.createdOn) > new Date(dateTo)) return false;

        if (cashierFilter !== "all" && o.cashier !== cashierFilter) return false;

        if (minAmount && Number(o.totalAmount) < Number(minAmount)) return false;
        if (maxAmount && Number(o.totalAmount) > Number(maxAmount)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest")
          return new Date(b.createdOn) - new Date(a.createdOn);
        if (sortBy === "oldest")
          return new Date(a.createdOn) - new Date(b.createdOn);
        if (sortBy === "high") return b.totalAmount - a.totalAmount;
        if (sortBy === "low") return a.totalAmount - b.totalAmount;
        return 0;
      });
  }, [
    orders,
    activeTab,
    search,
    dateFrom,
    dateTo,
    cashierFilter,
    minAmount,
    maxAmount,
    sortBy,
  ]);

  const pagedOrders = filteredOrders.slice(0, page * PAGE_SIZE);
  const canLoadMore = pagedOrders.length < filteredOrders.length;

  /* -----------------------------------
        SUMMARY COUNTS
  -------------------------------------*/
  const summary = useMemo(() => {
    return {
      total: orders.length,
      hold: orders.filter((o) => o.orderStatus === "hold").length,
      unpaid: orders.filter((o) => o.orderStatus === "unpaid").length,
      paid: orders.filter((o) => o.orderStatus === "paid").length,
      salesToday: orders
        .filter((o) => o.orderStatus === "paid")
        .reduce((s, o) => s + o.totalAmount, 0),
    };
  }, [orders]);

  const cashiers = useMemo(() => ["all", ...new Set(orders.map((o) => o.cashier))], [
    orders,
  ]);

  /* -----------------------------------
        UTILITIES
  -------------------------------------*/
  const previewItems = (items) => {
    if (!items || items.length === 0) return "No items";
    const preview = items
      .slice(0, 2)
      .map((i) => `${i.name}×${i.qty}`)
      .join(", ");
    return `${items.length} items (${preview}${items.length > 2 ? ", ..." : ""})`;
  };

  const handleSelect = (o) => {
    setSelectedOrder(o);
    onSelectOrder?.(o);
  };

  /* -----------------------------------
          CONDITIONAL RENDER
  -------------------------------------*/

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show" />

      <div className="modal fade show d-block pos-modal">
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          style={{ maxWidth: "980px", width: "96%" }}
        >
          <div className="modal-content">

            {/* HEADER */}
            <div className="modal-header bg-primary text-white">
              <div>
                <h5 className="modal-title mb-0">Orders Manager</h5>
                {/* <small>Advanced POS Order Manager</small> */}
              </div>

              <button
                className="btn btn-light btn-sm"
                onClick={loadOrders}
              >
                Refresh
              </button>

              <button
                className="btn btn-outline-light btn-sm ms-2"
                onClick={() => dispatch(closeModal("orders"))}
              >
                ✖
              </button>
            </div>

            {/* BODY */}
            <div className="modal-body" style={{ padding: "10px 14px" }}>

              {/* SUMMARY BAR */}
              <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                <span className="badge bg-secondary p-2">
                  {summary.total} Orders
                </span>

                <span className="badge bg-warning text-dark p-2">
                  Hold {summary.hold}
                </span>

                <span className="badge bg-danger p-2">
                  Unpaid {summary.unpaid}
                </span>

                <span className="badge bg-success p-2">
                  Paid {summary.paid}
                </span>

                <div className="ms-auto text-end">
                  <small className="text-muted">Sales Today</small>
                  <div className="fw-bold">
                    ₹{summary.salesToday.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="row g-3">

                {/* LEFT SIDE: TABS + FILTERS + LIST */}
                <div className="col-md-8">

                  {/* TABS */}
                  <ul className="nav nav-tabs small mb-2">
                    {TABS.map((t) => (
                      <li className="nav-item" key={t.key}>
                        <button
                          className={`nav-link ${
                            activeTab === t.key ? "active" : ""
                          }`}
                          onClick={() => setActiveTab(t.key)}
                        >
                          {t.label}
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* FILTERS — COMPACT GRID */}
                  <div className="pos-filters mb-2">
                    <div className="filter-row">
                      <div className="filter-item">
                        <label>Search</label>
                        <input
                          className="form-control form-control-sm"
                          placeholder="Order, customer, item..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>

                      <div className="filter-item">
                        <label>From</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                        />
                      </div>

                      <div className="filter-item">
                        <label>To</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="filter-row">
                      <div className="filter-item">
                        <label>Cashier</label>
                        <select
                          className="form-select form-select-sm"
                          value={cashierFilter}
                          onChange={(e) => setCashierFilter(e.target.value)}
                        >
                          {cashiers.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div className="filter-item">
                        <label>Min</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={minAmount}
                          onChange={(e) => setMinAmount(e.target.value)}
                        />
                      </div>

                      <div className="filter-item">
                        <label>Max</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={maxAmount}
                          onChange={(e) => setMaxAmount(e.target.value)}
                        />
                      </div>

                      <div className="filter-item">
                        <label>Sort</label>
                        <select
                          className="form-select form-select-sm"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="newest">Newest</option>
                          <option value="oldest">Oldest</option>
                          <option value="high">High Amount</option>
                          <option value="low">Low Amount</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* ORDER LIST */}
                  <div
                    style={{
                      maxHeight: "60vh",
                      overflowY: "auto",
                      paddingRight: 6,
                    }}
                  >
                    {loading && (
                      <div className="text-center text-muted py-3">
                        Loading...
                      </div>
                    )}

                    {!loading && pagedOrders.length === 0 && (
                      <div className="text-center text-muted py-3">
                        No orders found
                      </div>
                    )}

                    {pagedOrders.map((o) => (
                      <div className="card mb-2" key={o.orderId}>
                        <div className="card-body p-2">

                          <div className="d-flex gap-2">
                            {/* LEFT COLOR STRIPE */}
                            <div
                              style={{
                                width: 6,
                                borderRadius: 4,
                                background:
                                  o.orderStatus === "paid"
                                    ? "#198754"
                                    : o.orderStatus === "unpaid"
                                    ? "#dc3545"
                                    : "#fd7e14",
                              }}
                            />

                            {/* MAIN INFO */}
                            <div style={{ flex: 1 }}>
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <div className="d-flex align-items-center gap-2">
                                    <strong>#{o.orderNo}</strong>
                                    <span
                                      className={`badge ${STATUS_COLOR[o.orderStatus]}`}
                                    >
                                      {o.orderStatus}
                                    </span>
                                    <span className="badge bg-info text-dark">
                                      {o.orderType}
                                    </span>
                                  </div>

                                  <div className="small text-muted">
                                    {o.customer?.name} • {o.customer?.phone}
                                  </div>
                                </div>

                                <div className="text-end">
                                  <strong>₹{o.totalAmount.toFixed(2)}</strong>
                                  <div className="small text-muted">
                                    {new Date(o.createdOn).toLocaleString()}
                                  </div>
                                </div>
                              </div>

                              <div className="d-flex justify-content-between mt-2">
                                <div className="small text-muted">
                                  {previewItems(o.items)}
                                  {o.tags?.includes("urgent") && (
                                    <span className="badge bg-danger ms-2">
                                      Urgent
                                    </span>
                                  )}
                                </div>

                                <div className="d-flex gap-1">
                                  <div className="dropdown">
                                    <button
                                      className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                    >
                                      ⋮
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                      <li>
                                        <button
                                          className="dropdown-item"
                                          onClick={() => handleSelect(o)}
                                        >
                                          Open Order
                                        </button>
                                      </li>
                                      <li>
                                        <button className="dropdown-item">
                                          Print
                                        </button>
                                      </li>
                                      <li>
                                        <button className="dropdown-item">
                                          Send Invoice
                                        </button>
                                      </li>
                                    </ul>
                                  </div>

                                  <button
                                    className="btn btn-sm btn-link"
                                    onClick={() => setSelectedOrder(o)}
                                  >
                                    Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {canLoadMore && (
                      <div className="text-center py-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setPage((p) => p + 1)}
                        >
                          Load more
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT PANEL: ORDER DETAILS */}
                <div className="col-md-4">
                  <div className="card" style={{ height: "100%" }}>
                    <div className="card-body d-flex flex-column">
                      {!selectedOrder && (
                        <div className="text-muted text-center mt-5">
                          Select an order to view details
                        </div>
                      )}

                      {selectedOrder && (
                        <>
                          <div>
                            <h6>
                              Order #{selectedOrder.orderNo}{" "}
                              <span
                                className={`badge ${
                                  STATUS_COLOR[selectedOrder.orderStatus]
                                }`}
                              >
                                {selectedOrder.orderStatus}
                              </span>
                            </h6>
                            <small className="text-muted">
                              {new Date(
                                selectedOrder.createdOn
                              ).toLocaleString()}
                            </small>

                            <div className="mt-2">
                              <strong>{selectedOrder.customer?.name}</strong>
                              <br />
                              {selectedOrder.customer?.phone}
                            </div>
                          </div>

                          <hr />

                          <div>
                            <small className="text-muted">Payment</small>
                            <div>
                              {selectedOrder.payment.method} • Paid: ₹
                              {selectedOrder.payment.paidAmount}
                            </div>
                            <div className="small text-muted">
                              Invoice: {selectedOrder.payment.invoice}
                            </div>
                          </div>

                          <hr />

                          <div style={{ flex: 1, overflowY: "auto" }}>
                            <small className="text-muted">Items</small>

                            <ul className="list-group list-group-flush mt-1">
                              {selectedOrder.items.map((i, idx) => (
                                <li
                                  key={idx}
                                  className="list-group-item py-1 d-flex justify-content-between"
                                >
                                  <div>
                                    {i.name}
                                    <div className="small text-muted">
                                      ₹{i.price} × {i.qty}
                                    </div>
                                  </div>
                                  <strong>₹{i.price * i.qty}</strong>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {selectedOrder.note && (
                            <div className="mt-3">
                              <small className="text-muted">Note</small>
                              <div className="p-2 bg-light rounded">
                                {selectedOrder.note}
                              </div>
                            </div>
                          )}

                          <div className="mt-3 d-flex gap-2">
                            <button className="btn btn-primary w-100">
                              Print
                            </button>
                            <button className="btn btn-outline-secondary w-100">
                              Send Invoice
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* STYLES FOR FILTER SECTION */}
      <style>{`
        .pos-filters {
          background: #f8f9fa;
          padding: 8px 10px;
          border-radius: 6px;
        }
        .pos-filters .filter-row {
          display: flex;
          gap: 10px;
          margin-bottom: 6px;
        }
        .pos-filters .filter-item {
          flex: 1;
          min-width: 120px;
        }
        .pos-filters label {
          font-size: 11px;
          margin-bottom: 2px;
          color: #666;
          font-weight: 500;
        }
        .pos-filters input,
        .pos-filters select {
          height: 30px !important;
          font-size: 13px !important;
        }
      `}</style>
    </>
  );
};

export default OrdersModal;

