import React from "react";
import TaxCategoryForm from "./Tax/TaxCategoryForm";
import { Link } from "react-router-dom";
import { all_routes } from "../../Router/all_routes";

const Busy = () => {
  const route = all_routes;
  const [taxCategoryModal, setTaxCategoryModal] = React.useState(false);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <h3>Busy Accounting Integration Coming Soon...</h3>
          <div className="text-muted">
            We are working hard to bring Busy Accounting integration to our
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Features</h5>
                  <div className="d-flex justify-content my-4 gap-2 flex-wrap">
                    <button
                      className="btn btn-primary mr-20"
                      onClick={() => setTaxCategoryModal(true)}
                    >
                      Tax Category
                    </button>
                    <Link to={route.maintenance} className="btn btn-primary">Under Maintenance</Link>
                    <button className="btn btn-primary">Sync Invoices</button>
                    <button className="btn btn-primary">
                      Real-time Updates
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Benefits</h5>
                  <div className="d-flex justify-content my-4 gap-2 flex-wrap">
                    <button className="btn btn-primary">
                      Automated Data Entry
                    </button>
                    <button className="btn btn-primary">
                      Improved Accuracy
                    </button>
                    <button className="btn btn-primary">Time Savings</button>
                    <button className="btn btn-primary">
                      Better Financial Insights
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TaxCategoryForm
        show={taxCategoryModal}
        onClose={() => setTaxCategoryModal(false)}
      />
    </>
  );
};

export default Busy;
