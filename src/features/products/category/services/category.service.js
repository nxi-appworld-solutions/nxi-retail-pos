export const getCategories = async () => {
  return [
    { id: "1", name: "Electronics", parentId: null, gstRate: 18, visibleInPOS: true },
    { id: "2", name: "Mobiles", parentId: "1", gstRate: 18, visibleInPOS: true },
    { id: "3", name: "Fashion", parentId: null, gstRate: 5, visibleInPOS: true },
  ];
};
