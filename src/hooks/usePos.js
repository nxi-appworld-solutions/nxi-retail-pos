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
import { initiateEasebuzzPayment } from "../services/easebuzzService";
import { getFormattedDate } from "../utils/common";

export default function usePos({ socketUrl = null } = {}) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [voucherInfo, setVoucherInfo] = useState(null);
  const [lastSync, setLastSync] = useState(null);

  const isOnlineRef = useRef(navigator.onLine);

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
    allCategories: categories,
    allProducts: products,
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
