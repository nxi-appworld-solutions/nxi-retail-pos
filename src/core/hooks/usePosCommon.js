// import { useMemo } from "react";

// const usePosCommon = ({
//   categories = [],
//   products = [],
//   activeTab = "all",
//   searchTerm = ""
// }) => {

//   // 1. Products grouped by category code
//   const productsByCategory = useMemo(() => {
//     const map = {};
//     for (const p of products) {
//       if (!map[p.parentGrp]) map[p.parentGrp] = [];
//       map[p.parentGrp].push(p);
//     }
//     return map;
//   }, [products]);

//   // 2. Categories with items
//   const mergedCategories = useMemo(() => {
//     return categories.map((c) => ({
//       ...c,
//       items: productsByCategory[c.code] || [],
//     }));
//   }, [categories, productsByCategory]);

//   // 3. Flatten products
//   const allProducts = useMemo(() => {
//     return mergedCategories.flatMap((cat) =>
//       (cat.items || []).map((item) => ({
//         ...item,
//         categoryCode: cat.code,
//         categoryName: cat.name,
//       }))
//     );
//   }, [mergedCategories]);

//   // 4. Filter by category
//   const categoryFilteredProducts = useMemo(() => {
//     if (activeTab === "all") return allProducts;
//     return allProducts.filter((p) => p.categoryCode === activeTab);
//   }, [allProducts, activeTab]);

//   // 5. Search filter
//   const visibleProducts = useMemo(() => {
//     if (!searchTerm) return categoryFilteredProducts;
//     const q = searchTerm.trim().toLowerCase();

//     return categoryFilteredProducts.filter((p) =>
//       String(p.code ?? "").includes(q) ||
//       String(p.barcode ?? "").includes(q) ||
//       String(p.name ?? "").toLowerCase().includes(q)
//     );
//   }, [categoryFilteredProducts, searchTerm]);

//   // 5. Utility: total visible products
//   const totalVisibleProducts = visibleProducts.length;

//   return {
//     categories: mergedCategories,
//     products: visibleProducts,
//     totalVisibleProducts: visibleProducts.length,
//   };
// };

// export default usePosCommon;

import { useMemo } from "react";

const usePosCommon = ({ catalog = [], activeTab = "all", searchTerm = "" }) => {
  // 1️⃣ Flatten products
  const allProducts = useMemo(() => {
    return catalog.flatMap((cat) =>
      (cat.products || []).map((p) => ({
        ...p,
        categoryCode: cat.code,
        categoryName: cat.name,
      })),
    );
  }, [catalog]);

  // 2️⃣ Category filter (🔥 FIXED)
  const categoryFilteredProducts = useMemo(() => {
    if (activeTab === "all") return allProducts;

    return allProducts.filter(
      (p) => Number(p.categoryCode) === Number(activeTab),
    );
  }, [allProducts, activeTab]);

  // 3️⃣ Search filter (🔥 FIXED)
  const visibleProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    if (!q) return categoryFilteredProducts;

    return categoryFilteredProducts.filter(
      (p) =>
        String(p.code ?? "").includes(q) ||
        String(p.name ?? "")
          .toLowerCase()
          .includes(q),
    );
  }, [categoryFilteredProducts, searchTerm]);

  console.log("All products:", visibleProducts);

  return {
    categories: catalog,
    products: visibleProducts,
    totalVisibleProducts: visibleProducts.length,
  };
};

export default usePosCommon;
