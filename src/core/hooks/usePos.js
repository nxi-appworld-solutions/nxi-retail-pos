import { useState, useEffect, useCallback, useRef } from "react";
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
} from "../../utils/services/cache";

import { initSocket } from "../../utils/services/socket";
import { getVchNo, posCatalog } from "../../utils/services/service";
import { initiateEasebuzzPayment } from "../../utils/services/easebuzzService";
import { getFormattedDate } from "../../utils/common";
import toast from "react-hot-toast";

export default function usePos({ socketUrl = null } = {}) {
  const [loading, setLoading] = useState(true);
  const [catalog, setCatalog] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [products, setProducts] = useState([]);
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
  const fetchCatalogApi = useCallback(async () => {
    const resp = await posCatalog();
    console.log("Catalog API response:", resp);
    return resp?.data || [];
  }, []);

  const fetchVoucherApi = useCallback(async () => {
    const resp = await getVchNo(9);
    console.log("Voucher API response:", resp);
    return resp?.data?.[0] || null;
  }, []);

  // ----------------------------------------------------
  // 3) CACHE LOADING (FAST)
  // ----------------------------------------------------
  const loadFromCache = useCallback(async () => {
    const cachedCatalog = await getCategoriesFromCache();

    if (cachedCatalog?.length) setCatalog(cachedCatalog);

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
      const [catalogRes, vch] = await Promise.allSettled([
        fetchCatalogApi(),
        fetchVoucherApi(),
      ]);

      // ✅ Catalog
      if (catalogRes.status === "fulfilled") {
        setCatalog(catalogRes.value);
        await saveCategories(catalogRes.value); // reuse cache
      } else {
        toast.warn("Catalog load failed, using cache.");
      }

      // ✅ Voucher
      if (vch.status === "fulfilled") {
        setVoucherInfo(vch.value || null);
      }

      const now = Date.now();
      setLastSync(now);
      await saveMeta("lastSync", now);
    } catch (err) {
      toast.error("POS init failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchCatalogApi, fetchVoucherApi]);

  // ----------------------------------------------------
  // 5) BACKGROUND SILENT SYNC
  // ----------------------------------------------------
  const silentSync = useCallback(async () => {
    if (!navigator.onLine) return;

    try {
      const catalog = await fetchCatalogApi();

      if (catalog?.length) {
        setCatalog(catalog);
        await saveCategories(catalog);
      }

      const now = Date.now();
      setLastSync(now);
      await saveMeta("lastSync", now);

      console.log("Silent sync success", new Date(now).toLocaleTimeString());
    } catch (err) {
      console.warn("Silent sync failed:", err?.message || err);
    }
  }, [fetchCatalogApi]);

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
    [postOrderToServer],
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
      setCatalog((prev) =>
        prev.map((cat) => ({
          ...cat,
          products: cat.products.map((p) =>
            p.code === payload.code ? { ...p, ...payload } : p,
          ),
        })),
      );
    });

    socket.on("stock.updated", (payload) => {
      setCatalog((prev) =>
        prev.map((cat) => ({
          ...cat,
          products: cat.products.map((p) =>
            p.code === payload.code ? { ...p, stock: payload.stock } : p,
          ),
        })),
      );
    });

    socket.on("stock.updated", (payload) => {
      setProducts((prev) => {
        const updated = prev.map((p) =>
          p.code === payload.code ? { ...p, stock: payload.stock } : p,
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
    const timer = setInterval(
      () => {
        silentSync();
        processPendingOrders();
      },
      5 * 60 * 1000,
    ); // 5 minutes
    return () => clearInterval(timer);
  }, [silentSync, processPendingOrders]);

  /* --------------------------
     EXPOSED API
  --------------------------- */
  return {
    loading,
    catalog,
    voucherInfo,
    voucherNumber: voucherInfo?.vchNo,

    lastSync,

    reloadCatalog: fetchCatalogApi,
    reloadVoucher: fetchVoucherApi,

    // processPendingOrders,
    // 🔥 order handlers
    saveFinalOrder: postOrderToServer,
    enqueueOrderForSync,
  };
}
