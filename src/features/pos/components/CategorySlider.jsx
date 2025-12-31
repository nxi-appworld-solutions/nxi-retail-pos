import React from "react";

const CategorySlider = ({ categories, activeTab, setActiveTab }) => {
  return (
    <div className="tab-wrap">
      <ul className="tabs owl-carousel pos-category5">
        <li
          onClick={() => setActiveTab("all")}
          className={activeTab === "all" ? "active" : ""}
        >
          <a>
            <img src="assets/img/categories/category-01.svg" alt="All" />
          </a>
          <h6>All</h6>
        </li>
        {categories.map((cat) => (
          <li
            key={cat.code}
            onClick={() => setActiveTab(cat.code)}
            className={activeTab === cat.code ? "active" : ""}
          >
            <a>
              <img src={cat?.imageUrl} alt={cat.name} />
            </a>
            <h6>{cat.name}</h6>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySlider;
