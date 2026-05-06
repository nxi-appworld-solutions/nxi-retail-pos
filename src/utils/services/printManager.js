// src/services/printManager.js
import {
  savePrintJob,
  getPendingPrintJobs,
  removePrintJob,
} from "./printQueue";
import { renderReceiptHtml, renderEscPosBuffer } from "../../utils/printTemplates";
import { buildPrintPayloadFromOrder } from "../../utils/buildPrintPayloadFromOrder";

const LOCAL_PRINT_ENDPOINT = "http://localhost:3001/print"; // local print server

const PrintManager = {
  // top-level API
  async printReceipt(
    order,
    options = { printer: "receipt", transport: "auto" }
  ) {
    const payload = buildPrintPayloadFromOrder(order);
    // create a job object
    const job = {
      id: `pj_${Date.now()}`,
      type: "receipt",
      printer: options.printer,
      transport: options.transport,
      payload,
      createdAt: Date.now(),
      attempts: 0,
      status: "queued",
    };

    await savePrintJob(job);
    this._processQueue(); // start processing asynchronously
    return job;
  },

  async _processQueue() {
    const jobs = await getPendingPrintJobs();
    for (const job of jobs) {
      // simple single-worker approach: process one by one
      // implement locking if multi-tab
      try {
        await this._sendJobToTransport(job);
        await removePrintJob(job.id);
        // optionally notify UI of success
      } catch (err) {
        // mark attempt, maybe exponential backoff
        job.attempts = (job.attempts || 0) + 1;
        if (job.attempts > 5) {
          job.status = "failed";
          // keep failed jobs or remove based on policy
        } else {
          job.status = "queued";
          // next attempt later
        }
        await savePrintJob(job);
      }
    }
  },

  async _sendJobToTransport(job) {
    // choose transport: local server preferred
    if (job.transport === "local" || job.transport === "auto") {
      try {
        // For thermal printers, send binary ESC/POS buffer
        if (job.type === "receipt") {
          const escposBuffer = renderEscPosBuffer(job.payload);
          // send to local print service
          const resp = await fetch(LOCAL_PRINT_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream",
              "X-Printer-Name": job.printer || "",
            },
            body: escposBuffer, // ArrayBuffer or Blob
          });
          if (!resp.ok) throw new Error("Local print failed");
          return;
        }
      } catch (err) {
        // fallback to browser print
        console.warn("Local print failed, fallback", err);
      }
    }

    // Browser fallback: open printable window
    if (job.type === "receipt") {
      const html = renderReceiptHtml(job.payload);
      await PrintManager._printViaNewWindow(html);
      return;
    }

    throw new Error("No transport succeeded");
  },

  async _printViaNewWindow(html) {
    const w = window.open("", "_blank", "width=400,height=600");
    if (!w) throw new Error("Popup blocked");
    w.document.write(html);
    w.document.close();
    // Give time for resources to load
    await new Promise((r) => setTimeout(r, 300));
    w.focus();
    w.print();
    w.close();
  },
};

export default PrintManager;
