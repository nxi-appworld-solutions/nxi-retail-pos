// Sync storeType across browser tabs + optimize updates
const STORE_KEY = "pos_storeType";

export const storeTypeMiddleware = (store) => {
  let lastSavedType = localStorage.getItem(STORE_KEY);
  let saveTimeout = null;

  // LISTEN from Redux actions
  return (next) => (action) => {
    const result = next(action);

    if (action.type === "storeType/setStoreType") {
      const state = store.getState();
      const current = state.storeType.storeType;

      // Skip unnecessary updates
      if (current === lastSavedType) return result;

      lastSavedType = current;

      // Debounced write (avoids heavy write operations)
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        localStorage.setItem(STORE_KEY, current);
      }, 120);
    }

    return result;
  };
};

// LISTEN for changes from OTHER TABS
export function registerCrossTabListener(store) {
  window.addEventListener("storage", (e) => {
    if (e.key !== STORE_KEY) return;

    const newValue = e.newValue;

    // Sync Redux store if value changed in another tab
    if (newValue) {
      store.dispatch({
        type: "storeType/setStoreType",
        payload: newValue,
      });
    }
  });
}
