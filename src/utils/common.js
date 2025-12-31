import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// export function generateSlug(name) {
//   return name
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special chars with -
//     .replace(/^-+|-+$/g, ""); // Remove leading/trailing -
// }

export function generateSlug(name, options = {}) {
  const { separator = "-", lowercase = true } = options;
  let slug = name.replace(/[^a-zA-Z0-9]+/g, separator).replace(/^-+|-+$/g, "");
  return lowercase ? slug.toLowerCase() : slug;
}

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

export function handleRemoveImage({ images, setImages, index }) {
  const newImages = [...images];
  if (newImages[index]?.preview) URL.revokeObjectURL(newImages[index].preview);
  newImages.splice(index, 1);
  setImages(newImages);
}

export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num;
};

export const getFormattedDate = () => {
  return new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getFormattedTime = () =>
  new Date().toLocaleTimeString("en-US", { hour12: false });

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
// const handleProductClick = (setshowAlert, setSelectedProducts, showAlert, product) => {
//   setshowAlert(!showAlert);
//   setSelectedProducts((prev) => {
//     const exists = prev[product.code];
//     if (exists) {
//       // If already selected, remove it (toggle off)
//       const updated = { ...prev };
//       delete updated[product.code];
//       return updated;
//     } else {
//       // Add new product with quantity = 1
//       return { ...prev, [product.code]: { ...product, quantity: 1 } };
//     }
//   });
// };

// const handleQuantityChange = (setSelectedProducts, product, qty) => {
//   setSelectedProducts((prev) => ({
//     ...prev,
//     [product.code]: { ...prev[product.code], quantity: qty },
//   }));
// };

// export function handleImageChange({ e, setImages, existingImages = [] }) {
//   const files = Array.from(e.target.files);

//   // Filter out existing images to avoid duplicates
//   const filtered = files.filter(
//     (file) =>
//       !existingImages.some(
//         (img) => img.file.name === file.name && img.file.size === file.size
//       )
//   );

//   const newImages = filtered.map((file) => ({
//     file,
//     preview: URL.createObjectURL(file), // Show image preview
//   }));

//   setImages((prev) => [...prev, ...newImages]);
// }

export const handleImageChange = async ({
  e,
  setImages,
  existingImages = [],
}) => {
  const files = Array.from(e.target.files);
  const updatedImages = [...existingImages];

  for (const file of files) {
    let convertedFile = file;

    // Convert WebP to JPG using canvas
    if (file.type === "image/webp") {
      const imageBitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imageBitmap, 0, 0);

      const blob = await new Promise(
        (resolve) => canvas.toBlob(resolve, "image/jpeg", 0.95) // 95% quality JPG
      );

      convertedFile = new File([blob], file.name.replace(/\.webp$/, ".jpg"), {
        type: "image/jpeg",
      });
    }

    const preview = URL.createObjectURL(convertedFile);
    updatedImages.push({ file: convertedFile, preview });
  }

  setImages(updatedImages);
};

const getMimeTypeFromExtension = (filename) => {
  const ext = filename?.split(".").pop()?.toLowerCase();
  const types = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
  };
  return types[ext] || "application/octet-stream";
};

export const loadImagesFromServer = async (
  imageList,
  { cacheBust = true } = {}
) => {
  const imageObjs = await Promise.all(
    imageList.map(async (img, index) => {
      try {
        const bustParam = cacheBust ? `?t=${Date.now()}` : "";
        const fetchUrl = `${img.filePath}${bustParam}`;

        const response = await fetch(fetchUrl);
        const blob = await response.blob();

        const fileExt = img.fileName?.split(".").pop()?.toLowerCase();
        const fallbackMime = getMimeTypeFromExtension(img.fileName);
        const actualMime = blob.type || fallbackMime;

        let fixedFileName = img.fileName;
        if (fileExt === "webp" && actualMime === "image/jpeg") {
          fixedFileName = img.fileName.replace(/\.webp$/, ".jpg");
        }

        const file = new File([blob], fixedFileName, {
          type: actualMime,
        });

        const preview = URL.createObjectURL(file);

        return {
          file,
          preview,
          id: index,
          isExisting: true,
        };
      } catch (err) {
        console.error("❌ Failed to load image:", img.filePath, err);
        return null;
      }
    })
  );

  return imageObjs.filter(Boolean);
};

export const handleCollapseToggle = (
  e,
  dispatch,
  setToogleHeader,
  isHeaderCollapsed
) => {
  e.preventDefault();
  dispatch(setToogleHeader(!isHeaderCollapsed));
};
