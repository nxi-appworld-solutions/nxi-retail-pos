import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useModal from "./useModal";
import { MODAL_REGISTRY } from "./modalRegistry";

const ModalRoot = () => {
  const { name, options, close } = useModal();
  const modalRef = useRef(null);
  const lastFocusedElement = useRef(null);

  /* -----------------------------
     ESC KEY HANDLER
  ----------------------------- */
  useEffect(() => {
    if (!options.closeOnEsc) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [close, options.closeOnEsc]);

  /* -----------------------------
     FOCUS TRAP + RESTORE
  ----------------------------- */
  useEffect(() => {
    lastFocusedElement.current = document.activeElement;

    const focusableSelectors =
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const focusableEls = modalRef.current?.querySelectorAll(focusableSelectors);

    const firstEl = focusableEls?.[0];
    const lastEl = focusableEls?.[focusableEls.length - 1];

    firstEl?.focus();

    const trapFocus = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    document.addEventListener("keydown", trapFocus);

    return () => {
      document.removeEventListener("keydown", trapFocus);
      lastFocusedElement.current?.focus();
    };
  }, []);

  // /* -----------------------------
  //    BODY SCROLL LOCK
  // ----------------------------- */
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, []);

  if (!name) return null;

  const ModalComponent = MODAL_REGISTRY[name];
  if (!ModalComponent) return null;

  /* -----------------------------
     BACKDROP CLICK
  ----------------------------- */
  const onBackdropClick = (e) => {
    if (!options.backdrop) return;
    if (e.target === e.currentTarget) close();
  };

  return createPortal(
    <>
      {/* BACKDROP */}
      <div
        className="modal-backdrop fade show"
        style={{
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      />

      {/* MODAL WRAPPER */}
      <div
        className="modal fade show d-block"
        role="dialog"
        aria-modal="true"
        onMouseDown={onBackdropClick}
      >
        <div
          ref={modalRef}
          className={`modal-dialog modal-${options.size} modal-dialog-centered`}
        >
          <ModalComponent />
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ModalRoot;
