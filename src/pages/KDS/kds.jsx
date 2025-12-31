import React, { useState, useEffect } from "react";
import {
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Timer,
  ChefHat,
  Flame,
  Bell,
  Volume2,
  VolumeX,
  TrendingUp,
  Zap,
  Server,
  NotebookPen,
} from "lucide-react";

const KDSSystem = () => {
  const initialOrders = [
    {
      id: "ORD-001",
      orderNumber: "101",
      table: "T-12",
      customer: "Rahul Kumar",
      status: "pending",
      priority: "high",
      items: [
        {
          id: 1,
          name: "Butter Chicken",
          qty: 2,
          notes: "Extra spicy",
          station: "Main",
          time: 12,
          completed: false,
        },
        {
          id: 2,
          name: "Garlic Naan",
          qty: 4,
          notes: "Crispy",
          station: "Tandoor",
          time: 5,
          completed: false,
        },
        {
          id: 3,
          name: "Dal Makhani",
          qty: 1,
          notes: "Less butter",
          station: "Main",
          time: 8,
          completed: false,
        },
        // Added extra items to demonstrate scrolling
        {
          id: 8,
          name: "Veg Kebab Platter",
          qty: 1,
          notes: "",
          station: "Tandoor",
          time: 15,
          completed: false,
        },
        {
          id: 9,
          name: "Papad",
          qty: 3,
          notes: "Roasted",
          station: "Cold",
          time: 2,
          completed: false,
        },
      ],
      time: "2 min ago",
      elapsedTime: 2,
      estimatedTime: 15,
      server: "Priya",
    },
    {
      id: "ORD-002",
      orderNumber: "102",
      table: "T-05",
      customer: "Sharma Family",
      status: "preparing",
      priority: "normal",
      items: [
        {
          id: 4,
          name: "Paneer Tikka",
          qty: 1,
          notes: "No Onion",
          station: "Tandoor",
          time: 10,
          completed: false,
        },
        {
          id: 5,
          name: "Veg Biryani",
          qty: 2,
          notes: "Medium spicy",
          station: "Main",
          time: 18,
          completed: false,
        },
      ],
      time: "5 min ago",
      elapsedTime: 5,
      estimatedTime: 20,
      server: "Amit",
    },
    {
      id: "ORD-003",
      orderNumber: "103",
      table: "T-08",
      customer: "Neha Gupta",
      status: "ready",
      priority: "normal",
      items: [
        {
          id: 6,
          name: "Chicken Biryani",
          qty: 1,
          notes: "",
          station: "Main",
          time: 20,
          completed: true,
        },
        {
          id: 7,
          name: "Raita",
          qty: 1,
          notes: "",
          station: "Cold",
          time: 2,
          completed: true,
        },
      ],
      time: "15 min ago",
      elapsedTime: 15,
      estimatedTime: 18,
      server: "Priya",
    },
    {
      id: "ORD-004",
      orderNumber: "104",
      table: "T-02",
      customer: "Ravi Singh",
      status: "pending",
      priority: "low",
      items: [
        {
          id: 10,
          name: "Masala Dosa",
          qty: 2,
          notes: "Extra chutney",
          station: "Main",
          time: 10,
          completed: false,
        },
      ],
      time: "1 min ago",
      elapsedTime: 1,
      estimatedTime: 12,
      server: "Ravi",
    },
    {
      id: "ORD-005",
      orderNumber: "105",
      table: "Pickup",
      customer: "Online Order",
      status: "preparing",
      priority: "high",
      items: [
        {
          id: 11,
          name: "Pizza Margherita",
          qty: 1,
          notes: "Light cheese",
          station: "Oven",
          time: 15,
          completed: false,
        },
        {
          id: 12,
          name: "Coke",
          qty: 2,
          notes: "With ice",
          station: "Cold",
          time: 1,
          completed: false,
        },
        {
          id: 13,
          name: "Fries",
          qty: 1,
          notes: "Extra crispy",
          station: "Fryer",
          time: 8,
          completed: false,
        },
      ],
      time: "7 min ago",
      elapsedTime: 7,
      estimatedTime: 15,
      server: "Online",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("all");
  const [station, setStation] = useState("all");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer: Updates elapsed time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => ({
          ...order,
          elapsedTime: order.elapsedTime + 1,
        }))
      );
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Handler functions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const toggleItemComplete = (orderId, itemId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          const updatedItems = order.items.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          );

          const relevantItems = updatedItems.filter(
            (item) => station === "all" || item.station === station
          );
          const allCompleted =
            relevantItems.length > 0 &&
            relevantItems.every((item) => item.completed);

          let newStatus = order.status;
          if (
            order.status !== "ready" &&
            allCompleted &&
            order.status !== "pending"
          ) {
            newStatus = "ready";
          } else if (order.status === "ready" && !allCompleted) {
            newStatus = "preparing";
          }

          return {
            ...order,
            items: updatedItems,
            status: newStatus,
          };
        }
        return order;
      })
    );
  };

  const removeOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  // Filter Logic
  const filteredOrders = orders
    .filter((order) => {
      const statusMatch = filter === "all" || order.status === filter;
      // Filter station only checks if the order *contains* an item for the station
      const stationMatch =
        station === "all" ||
        order.items.some((item) => item.station === station);
      return statusMatch && stationMatch;
    })
    .sort((a, b) => {
      // Sort by Priority: high > normal > low
      const priorityOrder = { high: 3, normal: 2, low: 1 };
      const priorityDiff =
        priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Secondary sort by Overdue status (Overdue first)
      const aOverdue = a.elapsedTime > a.estimatedTime;
      const bOverdue = b.elapsedTime > b.estimatedTime;
      if (aOverdue !== bOverdue) return aOverdue ? -1 : 1;

      // Tertiary sort by Elapsed Time (Longest time first)
      return b.elapsedTime - a.elapsedTime;
    });

  // Utility functions for status display
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="status-icon" />;
      case "preparing":
        return <Flame className="status-icon" />;
      case "ready":
        return <CheckCircle className="status-icon" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "NEW ORDER";
      case "preparing":
        return "IN PROGRESS";
      case "ready":
        return "READY FOR PICKUP";
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "preparing":
        return "status-preparing";
      case "ready":
        return "status-ready";
      default:
        return "";
    }
  };

  // Get all unique stations for the filter buttons
  const uniqueStations = [
    ...new Set(
      orders.flatMap((order) => order.items.map((item) => item.station))
    ),
  ];

  return (
    <div className="kds-container">
      {/* Header */}
      <div className="kds-header">
        <div className="header-left">
          <ChefHat size={36} />
          <h1>Kitchen Dashboard System</h1>
        </div>
        <div className="header-right">
          <div className="time-display">
            <Clock size={20} />
            <span>
              {new Date().toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <button
            className={`sound-toggle ${soundEnabled ? "active" : ""}`}
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="kds-filters">
        <div className="filter-group">
          <label>Status:</label>
          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All ({orders.length})
            </button>
            <button
              className={`${
                filter === "pending" ? "active" : ""
              } filter-pending`}
              onClick={() => setFilter("pending")}
            >
              New ({orders.filter((o) => o.status === "pending").length})
            </button>
            <button
              className={`${
                filter === "preparing" ? "active" : ""
              } filter-preparing`}
              onClick={() => setFilter("preparing")}
            >
              In Progress (
              {orders.filter((o) => o.status === "preparing").length})
            </button>
            <button
              className={`${filter === "ready" ? "active" : ""} filter-ready`}
              onClick={() => setFilter("ready")}
            >
              Ready ({orders.filter((o) => o.status === "ready").length})
            </button>
          </div>
        </div>
        <div className="filter-group">
          <label>Station:</label>
          <div className="filter-buttons">
            <button
              className={station === "all" ? "active" : ""}
              onClick={() => setStation("all")}
            >
              All Stations
            </button>
            {uniqueStations.sort().map((s) => (
              <button
                key={s}
                className={station === s ? "active" : ""}
                onClick={() => setStation(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="orders-grid">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className={`order-card ${getStatusClass(order.status)} ${
              order.priority === "high" ? "priority-high" : ""
            } ${order.elapsedTime > order.estimatedTime ? "overdue" : ""}`}
          >
            {/* Card Header */}
            <div className="card-header">
              <div className="order-info">
                <div className="table-number">
                  <Zap size={14} /> {order.table}
                </div>
                <div className="order-number">
                  <span className="order-label">#</span>
                  {order.orderNumber}
                </div>
              </div>
              <div className={`status-badge ${getStatusClass(order.status)}`}>
                {getStatusIcon(order.status)}
                <span>{getStatusText(order.status)}</span>
              </div>
            </div>

            {/* Timer */}
            <div className="order-timer">
              <Timer size={18} />
              <span className="elapsed-time">{order.elapsedTime} min</span>
              <span className="separator">/</span>
              <span className="estimated-time">
                {order.estimatedTime} min (ETA)
              </span>
              {order.elapsedTime > order.estimatedTime && (
                <div className="overdue-badge">
                  <TrendingUp size={16} /> OVERDUE
                </div>
              )}
            </div>

            {/* Customer Info */}
            <div className="customer-info">
              <Server size={16} />
              <span className="server-name">Server: **{order.server}**</span>
              <User size={16} className="user-icon" />
              <span className="customer-name">{order.customer}</span>
              {order.priority === "high" && (
                <div className="priority-badge">⚠️ PRIORITY</div>
              )}
            </div>

            {/* Items List (The scrollable area) */}
            <div className="items-list-container">
              <div className="items-list">
                {order.items
                  .filter(
                    (item) => station === "all" || item.station === station
                  ) // Filter items by selected station
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`item ${item.completed ? "completed" : ""}`}
                      onClick={() => toggleItemComplete(order.id, item.id)}
                    >
                      <div className="item-checkbox">
                        {item.completed ? (
                          <CheckCircle size={20} className="check-icon" />
                        ) : (
                          <div className="checkbox-empty" />
                        )}
                      </div>
                      <div className="item-details">
                        <div className="item-header">
                          <span className="item-name">{item.name}</span>
                          <span className="item-qty">x{item.qty}</span>
                        </div>
                        {item.notes && (
                          <div className="item-notes">
                            <NotebookPen size={12} />
                            **NOTE:** {item.notes}
                          </div>
                        )}
                        <div className="item-meta">
                          <span className="item-station">
                            **Station:** {item.station}
                          </span>
                          <span className="item-time">
                            **Prep Time:** {item.time} min
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Actions */}
            <div className="card-actions">
              {order.status === "pending" && (
                <button
                  className="btn btn-primary btn-start"
                  onClick={() => updateOrderStatus(order.id, "preparing")}
                >
                  <Flame size={18} /> Start
                </button>
              )}
              {order.status === "preparing" && (
                <button
                  className="btn btn-success btn-ready"
                  disabled={
                    !order.items
                      .filter(
                        (item) => station === "all" || item.station === station
                      )
                      .every((item) => item.completed)
                  }
                  onClick={() => updateOrderStatus(order.id, "ready")}
                >
                  <CheckCircle size={18} /> Mark Ready
                </button>
              )}
              {order.status === "ready" && (
                <button
                  className="btn btn-complete"
                  onClick={() => removeOrder(order.id)}
                >
                  <Bell size={18} /> Complete/Serve
                </button>
              )}
              <button
                className="btn btn-cancel"
                onClick={() => removeOrder(order.id)}
              >
                <XCircle size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="empty-state">
          <ChefHat size={80} />
          <h2>No Active Orders</h2>
          <p>The kitchen is quiet! Time for a quick break.</p>
        </div>
      )}

      <style>{`
        /* --- Colors & Fonts (Consistent Theme) --- */
        :root {
            --color-primary: #f59e0b; /* Zomato/McDonald's inspired Orange/Yellow */
            --color-primary-dark: #d97706;
            --color-background: #f1f5f9; /* Light Gray Background */
            --color-card-bg: #ffffff;
            --color-text-dark: #1f2937;
            --color-text-medium: #4b5563;
            --color-text-light: #9ca3af;

            --color-pending: #ef4444; /* Red */
            --color-pending-bg: #fee2e2;
            --color-preparing: #3b82f6; /* Blue for In Progress */
            --color-preparing-bg: #dbeafe;
            --color-ready: #10b981; /* Green */
            --color-ready-bg: #d1fae5;

            --color-high-priority: #c53030;
        }

        /* --- Card Content Styles --- */


        .order-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        {/* .order-number {
          font-size: 32px;
          font-weight: 900;
          color: var(--color-text-dark);
          line-height: 1;
        } */}
        
        {/* .order-label {
            font-size: 14px;
            font-weight: 500;
            color: var(--color-text-light);
            margin-right: 2px;
        } */}

        {/* .table-number {
          background: var(--color-primary);
          color: white;
          padding: 6px 14px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        } */}

        .status-pending { background: var(--color-pending-bg); color: var(--color-pending); }
        .status-preparing { background: var(--color-preparing-bg); color: var(--color-preparing); }
        .status-ready { background: var(--color-ready-bg); color: var(--color-ready); }

        {/* .order-timer {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          padding: 10px;
          background: #f8fafc;
          border-radius: 8px;
          font-weight: 600;
          flex-shrink: 0; /* Important: prevents timer from shrinking */
        } */}

        {/* .elapsed-time {
          color: var(--color-pending);
          font-size: 18px;
          font-weight: 700;
        }

        .estimated-time {
          color: var(--color-text-light);
          font-size: 13px;
        } */}

        {/* .overdue-badge {
          background: var(--color-pending);
          color: white;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 4px;
        } */}

        .customer-info {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px dashed #e5e7eb;
          color: var(--color-text-medium);
          font-size: 14px;
          flex-shrink: 0; /* Important: prevents info from shrinking */
        }
        
        .user-icon {
            margin-left: 10px;
        }

        .customer-name {
            font-weight: 600;
            color: var(--color-text-dark);
        }

        .server-name {
          color: var(--color-text-light);
          font-size: 13px;
        }
        
        .priority-badge {
          background: var(--color-high-priority);
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.5px;
          margin-left: auto;
        }
        
        /* FIX: Scrollable Area */
        .items-list-container {
            flex-grow: 1; /* Allows container to take up remaining vertical space */
            overflow-y: auto; /* Adds scrollbar when content overflows */
            margin-bottom: 15px;
            padding-right: 5px; /* Space for scrollbar */
        }
        
        .items-list-container::-webkit-scrollbar {
            width: 8px;
        }

        .items-list-container::-webkit-scrollbar-thumb {
            background-color: #cbd5e0;
            border-radius: 4px;
        }

        .items-list-container::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
        }
        
        /* End Scroll Fix */

        .item {
          display: flex;
          gap: 12px;
          padding: 10px 12px;
          margin-bottom: 8px;
          background: #f8fafc;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
        }

        .item:hover {
          background: #eef1f4;
          border-left-color: var(--color-primary);
        }

        .item.completed {
          opacity: 0.6;
          background: #e5e7eb;
          border-left-color: var(--color-ready);
        }
        
        .item.completed .item-name {
             text-decoration: line-through;
        }

        .item-checkbox {
          flex-shrink: 0;
          padding-top: 1px;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2px;
        }

        .item-name {
          font-weight: 700;
          font-size: 15px;
        }

        .item-qty {
          background: var(--color-primary);
          color: white;
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
        }

        .item-meta {
          display: flex;
          gap: 10px;
          font-size: 11px;
          color: var(--color-text-light);
          margin-top: 4px;
        }
        
        .item-notes {
          display: flex;
          align-items: flex-start;
          gap: 4px;
          margin-top: 6px;
          padding: 6px;
          background: #fffbe9;
          border-left: 3px solid #f97316;
          border-radius: 4px;
          font-size: 12px;
          color: #b45309;
        }
        
        .item-notes strong {
            color: #d97706;
        }


        /* --- Actions --- */

        .card-actions {
          display: flex;
          gap: 8px;
          margin-top: auto; /* Pushes action buttons to the bottom */
          flex-shrink: 0; /* Important: prevents actions from shrinking */
        }

        .btn {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .btn-primary { background: var(--color-primary); color: white; }
        .btn-success { background: var(--color-ready); color: white; }
        .btn-complete { background: var(--color-preparing); color: white; } /* Blue for Complete/Serve */
        .btn-cancel { 
            background: #ef4444; 
            color: white; 
            flex: 0 0 auto; 
            padding: 12px; 
            box-shadow: 0 2px 4px rgba(239, 68, 68, 0.4);
        }

        .btn-cancel:hover { background: var(--color-high-priority); }


        /* --- Media Queries for Responsiveness --- */
        @media (max-width: 768px) {
          .orders-grid {
            grid-template-columns: 1fr;
          }
          
          .order-card {
            height: 500px; /* Adjust height for mobile */
          }

          .kds-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 15px;
          }
          
          .kds-filters {
            padding: 15px;
          }

          .filter-group {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .filter-buttons button {
              font-size: 12px;
              padding: 6px 10px;
          }
        }
      `}</style>

      <style>{`
    /* --- Colors & Fonts (Consistent Theme) --- */
    :root {
        --color-primary: #f59e0b; /* Orange/Yellow */
        --color-primary-dark: #d97706;
        --color-background: #f1f5f9; /* Light Gray Background */
        --color-card-bg: #ffffff;
        --color-text-dark: #1f2937;
        --color-text-medium: #4b5563;
        --color-text-light: #9ca3af;

        --color-pending: #ef4444; /* Red */
        --color-pending-bg: #fee2e2;
        --color-preparing: #3b82f6; /* Blue for In Progress */
        --color-preparing-bg: #dbeafe;
        --color-ready: #10b981; /* Green */
        --color-ready-bg: #d1fae5;

        --color-high-priority: #c53030;
    }
    
    * {
        box-sizing: border-box;
    }
    
    /* Global Reset for KDS */
    .kds-container * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* --- 1. Fixed Layout Container (Fixes Scrolling) --- */
    .kds-container {
        height: 100vh; /* KEY: Full viewport height */
        display: flex; 
        flex-direction: column; /* Stacks header, filters, and grid vertically */
        background: var(--color-background);
        padding: 0; 
        font-family: 'Inter', sans-serif;
        color: var(--color-text-dark);
        overflow: hidden; /* Prevent body scroll */
    }

    /* --- 2. Header (Compact & Fixed) --- */
    .kds-header {
        background: var(--color-card-bg);
        border-radius: 0; /* Remove rounding for full width bar */
        padding: 12px 20px; /* Reduced vertical padding (Compact) */
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05); /* Lighter shadow */
        flex-shrink: 0; /* KEY: Stays fixed at its size */
        z-index: 100; 
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .header-left svg {
        color: var(--color-primary);
        font-size: 24px; /* Reduced Icon Size */
    }

    .header-left h1 {
        font-size: 22px; /* Smaller font */
        font-weight: 700;
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .time-display {
        gap: 6px;
        font-size: 14px; /* Smaller font */
        padding: 6px 10px;
        border-radius: 6px;
        background: #f8fafc;
        font-weight: 600;
    }

    .sound-toggle {
        padding: 8px; /* Smaller button */
        border-radius: 6px;
        border: none;
        cursor: pointer;
        background: #e5e7eb;
        color: var(--color-text-medium);
        transition: all 0.3s ease;
    }

    .sound-toggle.active {
        background: var(--color-ready);
        color: white;
    }


    /* --- 3. Filters (Compact & Fixed) --- */

    .kds-filters {
        background: var(--color-card-bg);
        border-radius: 0;
        padding: 10px 20px; /* Reduced vertical padding (Compact) */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
        display: flex;
        flex-direction: column;
        gap: 10px; /* Reduced gap */
        flex-shrink: 0; /* KEY: Stays fixed at its size */
        z-index: 90; 
        border-bottom: 1px solid #e5e7eb;
    }

    .filter-group {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .filter-group label {
        font-weight: 600; 
        font-size: 13px; /* Smaller font */
        color: var(--color-primary-dark);
        min-width: 50px;
    }

    .filter-buttons {
        display: flex;
        gap: 6px; /* Reduced gap */
        flex-wrap: wrap;
    }

    .filter-buttons button {
        padding: 6px 12px; /* Smaller buttons */
        border-radius: 6px;
        font-size: 12px; /* Smaller font */
        background: #e5e7eb;
        border: none;
        cursor: pointer;
        font-weight: 600;
        color: var(--color-text-medium);
    }
    
    .filter-buttons button.active {
        background: var(--color-primary); 
        color: white; 
    }

    /* --- 4. Orders Grid (The Scrolling Area) --- */

    .orders-grid {
        display: grid;
        /* KEY OPTIMIZATION: Reduced minmax to fit more cards per row */
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
        gap: 15px; /* Reduced gap between cards */
        
        overflow-y: auto; /* KEY: Makes this area scrollable */
        padding: 15px 20px; /* Reduced padding */
        flex-grow: 1; /* KEY: Fills remaining vertical space */
        align-content: start; /* Fixes grid alignment issue */
    }

    .orders-grid::-webkit-scrollbar {
        width: 8px;
    }
    .orders-grid::-webkit-scrollbar-thumb {
        background-color: #cbd5e0;
        border-radius: 4px;
    }
    .orders-grid::-webkit-scrollbar-track {
        background: var(--color-background);
    }

    /* --- 5. Card Content Styles (Compacted) --- */

    .order-card {
        background: var(--color-card-bg);
        border-radius: 10px; /* Smaller rounding */
        padding: 15px; /* Reduced card padding */
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        border-left: 4px solid #e5e7eb; 
        
        display: flex;
        flex-direction: column;
        height: 500px; /* Optimized smaller fixed height */
    }
    
    .order-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e7eb;
        flex-shrink: 0; /* Important: prevents header from shrinking */
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid #e5e7eb;
        flex-shrink: 0;
      }

    .order-number {
        font-size: 28px; /* Smaller font */
        font-weight: 900;
    }
    
    .table-number {
        padding: 4px 10px; /* Smaller tag */
        font-size: 13px;
    }

    .status-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 13px;
        text-transform: uppercase;
        padding: 5px 10px; /* Smaller badge */
        font-size: 11px;
    }

    .order-timer {
        display: flex;
        gap: 8px;
        align-items: center;
        background: #f8fafc;
        border-radius: 8px;
        margin-bottom: 10px;
        padding: 6px;
        font-size: 15px;
        font-weight: 600;
        flex-shrink: 0;
      }

      .elapsed-time {
        color: var(--color-pending);
        font-size: 16px;
        font-weight: 700;
      }

      .estimated-time {
        color: var(--color-text-light);
        font-size: 11px;
      }

    .overdue-badge {
        background: var(--color-pending);
        color: white;
        border-radius: 6px;
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 3px 8px;
        font-size: 10px;
      }

    .customer-info {
        gap: 6px;
        margin-bottom: 10px;
        padding-bottom: 8px;
        font-size: 12px;
        flex-shrink: 0;
    }
    
    .priority-badge {
        padding: 3px 6px;
        font-size: 9px;
    }

    /* --- 6. Items List (Scrollable within Card) --- */
    .items-list-container {
        flex-grow: 1; 
        overflow-y: auto; 
        margin-bottom: 10px; /* Reduced margin */
        padding-right: 5px; 
    }

    /* Scrollbar styles for inner list */
    .items-list-container::-webkit-scrollbar {
        width: 6px;
    }

    .item {
        padding: 8px 10px; /* Reduced item padding */
        margin-bottom: 6px;
    }

    .item-name {
        font-size: 14px; /* Smaller font */
    }

    .item-qty {
        padding: 2px 6px;
        font-size: 11px;
    }

    .item-notes {
        padding: 4px;
        font-size: 11px;
    }

    .item-meta {
        font-size: 10px;
        margin-top: 2px;
    }

    /* --- 7. Actions (Compact) --- */
    .card-actions {
        gap: 6px;
        margin-top: auto; 
        flex-shrink: 0;
    }

    .btn {
        padding: 10px; /* Smaller buttons */
        border-radius: 8px;
        font-size: 12px;
    }
    
    .btn-cancel { 
        padding: 10px; 
    }
    
    /* Status Colors */
    .order-card.status-pending { border-left-color: var(--color-pending); }
    .order-card.status-preparing { border-left-color: var(--color-preparing); }
    .order-card.status-ready { border-left-color: var(--color-ready); }
    .order-card.priority-high { border-top: 1px dashed var(--color-high-priority); border-right: 1px dashed var(--color-high-priority); }
    .order-card.overdue { background: var(--color-pending-bg); }

    /* Empty State */
    .empty-state {
        padding: 50px;
        text-align: center;
        color: var(--color-text-light);
    }
    .empty-state h2 { color: var(--color-text-medium); margin-top: 10px; }
    
    @media (max-width: 768px) {
      .orders-grid {
        grid-template-columns: 1fr;
        padding: 10px;
        gap: 10px;
      }
      .kds-header, .kds-filters {
        padding-left: 10px;
        padding-right: 10px;
      }
      .order-card {
        height: 480px; 
      }
    }
`}</style>
    </div>
  );
};

export default KDSSystem;
