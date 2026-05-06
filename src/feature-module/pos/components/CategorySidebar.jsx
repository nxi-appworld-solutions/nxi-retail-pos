import React from "react";

const CategorySidebar = ({ categories, activeTab, setActiveTab }) => {
  return (
    <div className="category-sidebar">
      <div className="tab-wrap">
        <ul className="tabs owl-carousel pos-category5">
          {/* ALL */}
          <li
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "active" : ""}
          >
            <a>
              <img src="src/assets/img/categories/category-01.svg" alt="All" />
            </a>
            <h6>All</h6>
          </li>

          {/* CATEGORY LIST */}
          {categories.map((cat) => (
            <li
              key={cat.code}
              onClick={() => setActiveTab(Number(cat.code))}
              className={Number(activeTab) === Number(cat.code) ? "active" : ""}
            >
              <a>
                <img
                  src={
                    cat?.image ||
                    "https://th.bing.com/th/id/OIP.38eE6cQfShw5U-lGbkcMCgHaEo?w=300&h=187&c=7&r=0&o=7&pid=1.7&rm=3"
                  }
                  alt={cat.name}
                />
              </a>
              <h6>{cat.name}</h6>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySidebar;
