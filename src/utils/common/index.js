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
