// src/utils/form.js
export const handleEnterKey = (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // 👉 Default form submit रोक देंगे

    const currentTabIndex = e.target.tabIndex;
    const next = document.querySelector(`[tabindex="${currentTabIndex + 1}"]`);
    if (next) {
      next.focus();
    }
  }
};
