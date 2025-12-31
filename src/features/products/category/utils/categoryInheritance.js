export const applyCategoryInheritance = (product, category) => ({
  ...product,
  gstRate: product.gstRate ?? category.gstRate,
  allowDiscount: product.allowDiscount ?? category.allowDiscount,
  visibleInPOS: product.visibleInPOS ?? category.visibleInPOS,
  stockTracking: product.stockTracking ?? category.stockTracking
});
