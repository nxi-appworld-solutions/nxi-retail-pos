import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../environment";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import Loader from "../../components/loader/loader";

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const record = location.state?.product;

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/GetProductMasterDetails/6?code=${record?.code}`
      );
      const result = await response.json();
      if (result?.status === 1 && Array.isArray(result?.data)) {
        // console.log("result?.data", result?.data);
        setProduct(result.data[0]);
      } else {
        toast.error(result?.msg || "Failed to load product");
      }
    } catch (ex) {
      toast.error(ex?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (record) getProducts();
    else toast.error("No product ID found.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  const productInfo = product
    ? [
        { label: "Product", value: product.name },
        { label: "Category", value: product.parentGrpName },
        { label: "Unit", value: product.unitName },
        { label: "SKU", value: product.sku },
        { label: "Minimum Qty", value: product.minQty },
        { label: "Quantity", value: product.qty },
        { label: "Tax", value: product.taxTypeName },
        { label: "Discount Type", value: product.discountTypeName },
        { label: "Price", value: product.price },
        { label: "Status", value: product.status },
        { label: "Description", value: product.description },
      ]
    : [];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Product Details</h4>
            <h6>Full details of a product</h6>
          </div>
        </div>
        {isLoading && <Loader />}
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-8 col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="bar-code-view">
                  <ImageWithBasePath
                    src="assets/img/barcode/barcode1.png"
                    alt="barcode"
                  />
                  <a className="printimg">
                    <ImageWithBasePath
                      src="assets/img/icons/printer.svg"
                      alt="print"
                    />
                  </a>
                </div>
                <div className="productdetails">
                  <ul className="product-bar">
                    {productInfo?.map(({ label, value }, idx) => (
                      <li key={idx}>
                        <h4>{label}</h4>
                        <h6>{value ?? "N/A"}</h6>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4 col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="slider-product-details">
                  <div className="owl-carousel owl-theme product-slide">
                    {/* {(product?.imagePaths || []).map((img, i) => ( */}
                    <div className="slider-product" key={"i"}>
                      <ImageWithBasePath
                        src={product?.imageList[0]?.filePath}
                        alt={product?.imageList[0]?.fileName || "product image"}
                      />
                      {/* <h4>{img.name || `Image ${i + 1}`}</h4>
                        <h6>{img.size || ""}</h6> */}
                    </div>
                    {/* ))} */}
                    {product?.imagePaths?.length === 0 && (
                      <p>No images available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
