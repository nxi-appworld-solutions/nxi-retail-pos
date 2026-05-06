export const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  if (isNaN(d)) return "";

  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getFormattedDate = () => {
  return new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

export const formatCurrency = (num) => `₹${Number(num || 0).toFixed(2)}`;

export const truncateText = (text, maxLength = 30) => {
  if (!text) return;
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
