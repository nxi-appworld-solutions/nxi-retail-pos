import { openDB } from "idb";

const DB_NAME = "pos-db";
const DB_VER = 1;
const CATEGORIES_STORE = "categories";
const PRODUCTS_STORE = "products";
const ORDERS_QUEUE = "orders";
const META_STORE = "meta";

export async function getDb() {
  return openDB(DB_NAME, DB_VER, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(CATEGORIES_STORE))
        db.createObjectStore(CATEGORIES_STORE, { keyPath: "id" });
      if (!db.objectStoreNames.contains(PRODUCTS_STORE))
        db.createObjectStore(PRODUCTS_STORE, { keyPath: "id" });
      if (!db.objectStoreNames.contains(ORDERS_QUEUE))
        db.createObjectStore(ORDERS_QUEUE, {
          keyPath: "id",
          autoIncrement: true,
        });
      if (!db.objectStoreNames.contains(META_STORE))
        db.createObjectStore(META_STORE);
    },
  });
}

export async function saveCategories(list = []) {
  const db = await getDb();
  const tx = db.transaction("categories", "readwrite");
  const store = tx.objectStore("categories");
  await store.clear();
  for (const c of list) await store.put({ ...c, id: c.code ?? c.id ?? c.name });
  await tx.done;
}

export async function getCategoriesFromCache() {
  const db = await getDb();
  return (await db.getAll("categories")) || [];
}

export async function saveProducts(list = []) {
  const db = await getDb();
  const tx = db.transaction("products", "readwrite");
  const store = tx.objectStore("products");
  await store.clear();
  for (const p of list) await store.put({ ...p, id: p.code ?? p.id });
  await tx.done;
}

export async function getProductsFromCache() {
  const db = await getDb();
  return (await db.getAll("products")) || [];
}

export async function enqueueOrder(order) {
  const db = await getDb();
  const tx = db.transaction("orders", "readwrite");
  const id = await tx.objectStore("orders").add({
    order,
    status: "pending",
    createdAt: Date.now(),
  });
  await tx.done;
  return id;
}

export async function getPendingOrders() {
  const db = await getDb();
  return db.getAll("orders");
}

export async function removeOrder(id) {
  const db = await getDb();
  const tx = db.transaction("orders", "readwrite");
  await tx.objectStore("orders").delete(id);
  await tx.done;
}

export async function saveMeta(key, val) {
  const db = await getDb();
  await db.put("meta", val, key);
}
export async function getMeta(key) {
  const db = await getDb();
  return db.get("meta", key);
}
