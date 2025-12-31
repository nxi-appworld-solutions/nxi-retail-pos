// src/services/printQueue.js
import { openDB } from "idb";

const DB_NAME = "pos-print-db";
const STORE = "printJobs";

async function db() {
  return openDB(DB_NAME, 1, {
    upgrade(upgradeDb) {
      if (!upgradeDb.objectStoreNames.contains(STORE)) {
        upgradeDb.createObjectStore(STORE, { keyPath: "id" });
      }
    },
  });
}

export async function savePrintJob(job) {
  const d = await db();
  await d.put(STORE, job);
}

export async function getPendingPrintJobs() {
  const d = await db();
  return (await d.getAllFromIndex ? await d.getAllFromIndex(STORE) : await d.getAll(STORE)) || [];
}

export async function removePrintJob(id) {
  const d = await db();
  await d.delete(STORE, id);
}
