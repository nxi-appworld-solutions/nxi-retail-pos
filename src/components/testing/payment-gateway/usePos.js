// import { useState, useEffect, useCallback } from "react";
// import { toast } from "react-toastify";
// import { getVchNo, posCategoriesWithItems } from "../services/service";

// export default function usePos() {
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState([]);
//   const [categories, setCategories] = useState([]); // only categories
//   const [products, setProducts] = useState([]);
//   const [voucherInfo, setVoucherInfo] = useState(null);

//   const [lastSync, setLastSync] = useState(null);

//   const loadVoucherNumber = useCallback(async () => {
//     try {
//       const resp = await getVchNo(9);
//       setVoucherInfo(resp?.data[0]);
//     } catch (err) {
//       toast.error("Voucher Error: " + err.message);
//     }
//   }, []);

//   const loadSummary = async () => {
//     setLoading(true);
//     try {
//       const resp = await posCategoriesWithItems();
//       // console.log("resp", resp);
//       setSummary(resp?.data || []);
//     } catch (err) {
//       toast.error("Summary Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadCategories = useCallback(async () => {
//     try {
//       const resp = await posCategoriesWithItems(1);
//       setCategories(resp?.data || []);
//     } catch (err) {
//       toast.error("Categories Error: " + err.message);
//     }
//   }, []);

//   const loadProducts = useCallback(async () => {
//     try {
//       const resp = await posCategoriesWithItems(2);
//       setProducts(resp?.data || []);
//     } catch (err) {
//       toast.error("Products Error: " + err.message);
//     }
//   }, []);

//   console.log("loading", loading);

//   // useEffect(() => {
//   //   fetchSummary();
//   //   fetchCategories(1);
//   //   fetchProducts(2);
//   //   fetchVchNo(9);
//   // }, []);

//   useEffect(() => {
//     const initialLoad = async () => {
//       setLoading(true);

//       try {
//         const [summaryRes, categoriesRes, productsRes, vchRes] =
//           await Promise.all([
//             posCategoriesWithItems(),
//             posCategoriesWithItems(1),
//             posCategoriesWithItems(2),
//             getVchNo(9),
//           ]);

//         setSummary(summaryRes?.data || []);
//         setCategories(categoriesRes?.data || []);
//         setProducts(productsRes?.data || []);
//         setVoucherInfo(vchRes?.data[0]);

//         setLastSync(Date.now());
//       } catch (err) {
//         toast.error("POS Load Error: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initialLoad();
//   }, []);

//   // ------------------------------
//   // ⭐ 2) SILENT BACKGROUND REFRESH
//   // ------------------------------
//   useEffect(() => {
//     const timer = setInterval(() => {
//       console.log("🔄 Silent background sync...");
//       loadCategories();
//       loadProducts();
//       // voucher no optional
//       setLastSync(Date.now());
//     }, 5 * 60 * 1000); // refresh every 5 mins

//     return () => clearInterval(timer);
//   }, [loadCategories, loadProducts]);

//   // ------------------------------
//   // ⭐ Hook Return Object
//   // ------------------------------
//   return {
//     loading,
//     summary,
//     categories,
//     products,
//     voucherInfo,
//     voucherNumber: voucherInfo,
//     ORDNO: voucherInfo?.vchNo,

//     lastSync,

//     loadSummary,
//     reloadCategories: loadCategories,
//     reloadProducts: loadProducts,
//     reloadVoucherNumber: loadVoucherNumber,
//   };
// }

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";

import {
  saveCategories,
  saveProducts,
  getCategoriesFromCache,
  getProductsFromCache,
  enqueueOrder,
  getPendingOrders,
  removeOrder,
  saveMeta,
  getMeta,
} from "../services/cache";

import { initSocket } from "../services/socket";
import { getVchNo, posCategoriesWithItems } from "../services/service";
import { api } from "../services/api";
import { initiateEasebuzzPayment } from "../services/easebuzzService";
import { getFormattedDate } from "../utils/common";

export default function usePos({ socketUrl = null } = {}) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [voucherInfo, setVoucherInfo] = useState(null);
  const [lastSync, setLastSync] = useState(null);

  const isOnlineRef = useRef(navigator.onLine);

  // console.log("voucherInfo", voucherInfo);
  // console.log("categories", categories);
  // console.log("products", products);

  // ----------------------------------------------------
  // 1) ORDER SUBMISSION
  // ----------------------------------------------------
  const postOrderToServer = useCallback(async (payload) => {
    setLoading(true);
    try {
      const resp = await initiateEasebuzzPayment(payload);

      // console.log("[usePos20202] initiateEasebuzzPayment response:", resp);

      if (!resp) {
        toast.error("Server did not respond.");
        return { success: false, data: null };
      }

      // Normalise order response for frontend UI
      const order = {
        orderId: resp?.orderId ?? 0,
        orderNo: resp?.orderNo ?? null,
        orderDate: getFormattedDate(new Date().toLocaleString()),
        // status: resp?.status,
        // msg: resp?.msg,
        customer: payload.accName,
        payment: payload.paymentMethod,
        totals: { grandTotal: payload.payAmt },
      };

      if (resp?.status === 1) {
        return { status: resp?.status, msg: resp?.msg, data: order };
      }

      // fallback to resp.msg if available
      toast.error(resp.msg || "Order could not be saved.");
      return { status: resp?.status, msg: resp?.msg, data: order };
    } catch (err) {
      toast.error(err?.message || "Order saving error");
      return { status: 0, msg: err };
    } finally {
      setLoading(false);
    }
  }, []);

  // ----------------------------------------------------
  // 2) API FETCH HELPERS
  // ----------------------------------------------------
  const fetchCategoriesApi = useCallback(async () => {
    const resp = await posCategoriesWithItems(1);
    return resp?.data || [];
  }, []);

  const fetchProductsApi = useCallback(async () => {
    const resp = await posCategoriesWithItems(2);
    return resp?.data || [];
  }, []);

  const fetchVoucherApi = useCallback(async () => {
    const resp = await getVchNo(9);
    return resp?.data?.[0] || null;
  }, []);

  // ----------------------------------------------------
  // 3) CACHE LOADING (FAST)
  // ----------------------------------------------------
  const loadFromCache = useCallback(async () => {
    const cachedCats = await getCategoriesFromCache();
    const cachedProds = await getProductsFromCache();

    if (cachedCats?.length) setCategories(cachedCats);
    if (cachedProds?.length) setProducts(cachedProds);

    const meta = await getMeta("lastSync");
    if (meta) setLastSync(meta);
  }, []);

  // ----------------------------------------------------
  // 4) INITIAL ONLINE LOAD
  // ----------------------------------------------------
  const initialLoad = useCallback(async () => {
    if (!navigator.onLine) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // try parallel network fetch
      const [catRes, prodRes, vch] = await Promise.allSettled([
        fetchCategoriesApi(),
        fetchProductsApi(),
        fetchVoucherApi(),
      ]);

      // categories
      if (catRes.status === "fulfilled") {
        setCategories(catRes.value);
        await saveCategories(catRes.value);
      } else {
        toast.warn("Categories load failed, using cache.");
      }

      // products
      if (prodRes.status === "fulfilled") {
        setProducts(prodRes.value);
        await saveProducts(prodRes.value);
      } else {
        toast.warn("Products load failed, using cache.");
      }

      // voucher
      if (vch.status === "fulfilled") setVoucherInfo(vch.value || null);

      const now = Date.now();
      setLastSync(now);
      await saveMeta("lastSync", now);
    } catch (err) {
      toast.error("POS init failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchCategoriesApi, fetchProductsApi, fetchVoucherApi]);

  // ----------------------------------------------------
  // 5) BACKGROUND SILENT SYNC
  // ----------------------------------------------------
  const silentSync = useCallback(async () => {
    if (!navigator.onLine) return;

    try {
      const [catRes, prodRes] = await Promise.all([
        fetchCategoriesApi(),
        fetchProductsApi(),
      ]);

      // apply minimal updates: here we replace (simple). Could be diff-merge.
      if (catRes?.length) {
        setCategories(catRes);
        await saveCategories(catRes);
      }

      if (prodRes?.length) {
        setProducts(prodRes);
        await saveProducts(prodRes);
      }

      const now = Date.now();
      setLastSync(now);
      await saveMeta("lastSync", now);
      console.log("Silent sync success", new Date(now).toLocaleTimeString());
    } catch (err) {
      console.warn("Silent sync failed:", err?.message || err);
    }
  }, [fetchCategoriesApi, fetchProductsApi]);

  // ------------------------------------------
  // 6) OFFLINE ORDER QUEUE
  // ------------------------------------------
  const enqueueOrderForSync = useCallback(
    async (payload) => {
      if (navigator.onLine) {
        const res = await postOrderToServer(payload);
        if (res.success) return res;

        await enqueueOrder(payload);
        // toast.info("Order saved offline & queued.");
        toast.info("Order queued for sync.");
        return { success: false, queued: true };
      }

      await enqueueOrder(payload);
      toast.warn("Offline mode: order queued.");
      return { success: false, queued: true };
    },
    [postOrderToServer]
  );

  const processPendingOrders = useCallback(async () => {
    if (!navigator.onLine) return;

    const pending = await getPendingOrders();

    for (let rec of pending) {
      const res = await postOrderToServer(rec.order);
      if (res.success) removeOrder(rec.id); // remove from queue
    }
  }, [postOrderToServer]);

  // ----------------------------------------------------
  // 7) SOCKET UPDATES
  // ----------------------------------------------------
  const setupSocket = useCallback(() => {
    if (!socketUrl) return null;

    const socket = initSocket(socketUrl);

    socket.on("connect", () => {
      console.log("Socket connected", socket.id);
    });

    socket.on("disconnect", () => console.log("disconnected"));

    socket.on("product.updated", (payload) => {
      setProducts((prev) => {
        const updated = prev.map((p) =>
          p.code === payload.code ? { ...p, ...payload } : p
        );
        (async () => await saveProducts(updated))();
        return updated;
      });
    });

    socket.on("category.updated", (payload) => {
      setCategories((prev) => {
        const updated = prev.map((c) =>
          c.code === payload.code ? { ...c, ...payload } : c
        );
        (async () => await saveCategories(updated))();
        return updated;
      });
    });

    socket.on("stock.updated", (payload) => {
      setProducts((prev) => {
        const updated = prev.map((p) =>
          p.code === payload.code ? { ...p, stock: payload.stock } : p
        );
        (async () => await saveProducts(updated))();
        return updated;
      });
    });

    return socket;
  }, [socketUrl]);

  // socket.on("product.updated", (payload) => {
  //   // payload: { id, ...fields }
  //   setProducts((prev) => {
  //     const idx = prev.findIndex(
  //       (p) => p.id === payload.id || p.code === payload.code
  //     );
  //     if (idx === -1) return [payload, ...prev]; // new product
  //     const next = [...prev];
  //     next[idx] = { ...next[idx], ...payload };
  //     return next;
  //   });
  // optional: update cache
  // saveProducts(updatedProductsList);
  // saveProducts(
  //   ((arr) => {
  //     arr;
  //     return null;
  //   })()
  // ); // skip heavy; or call saveProducts later
  // });

  // socket.on("category.updated", (payload) => {
  //   setCategories((prev) => {
  //     const idx = prev.findIndex(
  //       (c) => c.code === payload.code || c.id === payload.id
  //     );
  //     if (idx === -1) return [payload, ...prev];
  //     const next = [...prev];
  //     next[idx] = { ...next[idx], ...payload };
  //     return next;
  //   });
  // });

  // socket.on("stock.updated", (payload) => {
  //   // update product stock quickly
  //   setProducts((prev) =>
  //     prev.map((p) =>
  //       p.code === payload.code ? { ...p, stock: payload.stock } : p
  //     )
  //   );
  // });

  //   socket.on("disconnect", () => {
  //     console.log("Socket disconnected");
  //   });
  // }, [socketUrl]);

  // ---------- order queue and reconciliation ----------
  // const enqueueOrderForSync = useCallback(async (order) => {
  //   // called when placing order; if offline then enqueue, if online try to push
  //   if (navigator.onLine) {
  //     try {
  //       const resp = await postOrderToServer(order);
  //       return resp;
  //     } catch (err) {
  //       // enqueue on failure
  //       await enqueueOrder(order);
  //       toast.info("Order queued for background sync.");
  //     }
  //   } else {
  //     await enqueueOrder(order);
  //     toast.info("You are offline — order queued.");
  //   }
  // }, []);

  // const processPendingOrders = useCallback(async () => {
  //   if (!navigator.onLine) return;
  //   try {
  //     const pending = await getPendingOrders();
  //     for (const rec of pending) {
  //       try {
  //         await postOrderToServer(rec.order);
  //         await removeOrder(rec.id);
  //         console.log("Order synced", rec.id);
  //       } catch (err) {
  //         console.warn("Order sync failed for", rec.id, err?.message);
  //         // keep it in queue for retry
  //       }
  //     }
  //   } catch (err) {
  //     console.warn("Processing pending orders failed:", err?.message);
  //   }
  // }, []);

  // ---------- connectivity listeners ----------

  /* --------------------------
     8) ONLINE/OFFLINE LISTENERS
  --------------------------- */

  useEffect(() => {
    const onOnline = () => {
      isOnlineRef.current = true;
      toast.info("Network restored. Syncing...");
      silentSync();
      processPendingOrders();
    };

    const onOffline = () => {
      isOnlineRef.current = false;
      toast.warn("You are offline. Orders will be queued.");
    };

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, [silentSync, processPendingOrders]);

  // ---------- initial workflow ----------
  // useEffect(() => {
  //   (async () => {
  //     // 1) load from cache (fast)
  //     await loadFromCache();
  //     // 2) initial network load (if online)
  //     await initialLoad();
  //     // 4) process any queued orders
  //     await processPendingOrders();
  //   })();

  //   // 3) setup socket
  //   setupSocket();
  // }, [initialLoad, loadFromCache, setupSocket, processPendingOrders]);

  /* --------------------------
     9) INITIAL LOAD
  --------------------------- */
  useEffect(() => {
    (async () => {
      await loadFromCache();
      await initialLoad();
      await processPendingOrders();
    })();

    const socket = setupSocket();
    return () => socket?.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* --------------------------
     10) PERIODIC background silent sync
  --------------------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      silentSync();
      processPendingOrders();
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(timer);
  }, [silentSync, processPendingOrders]);

  /* --------------------------
     EXPOSED API
  --------------------------- */
  return {
    loading,
    categories,
    products,
    voucherInfo,
    voucherNumber: voucherInfo?.vchNo,

    lastSync,

    reloadCategories: fetchCategoriesApi,
    reloadProducts: fetchProductsApi,
    reloadVoucher: fetchVoucherApi,

    // processPendingOrders,
    // 🔥 order handlers
    saveFinalOrder: postOrderToServer,
    enqueueOrderForSync,
  };
}
