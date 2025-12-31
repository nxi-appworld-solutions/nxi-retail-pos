// utils/formUtils.js
export const generateFormData = ({ fields, images }) => {
  const fd = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    fd.append(key, value ?? "");
  });

  images?.forEach((img) => {
    if (img?.file instanceof File) {
      fd.append("Images", img.file);
    }
  });

  const existingPaths = images
    ?.filter((img) => img.isExisting && img.preview)
    .map((img) => img.preview);

  existingPaths?.forEach((path) => {
    fd.append("ExistingImagePaths", path);
  });

  return fd;
};
