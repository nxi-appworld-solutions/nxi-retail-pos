# Frontant Admin Project Structure

This document outlines the complete project structure for the Frontant admin panel, a React-based application.

```
frontant-admin/
├── .babelrc
├── .eslintrc.json
├── .gitignore
├── .npmrc
├── package-lock.json
├── package.json
├── public/
│   ├── favicon.svg
│   ├── index.html
│   ├── manifest.json
│   ├── web.config
│   ├── assets/
│   │   ├── animations/
│   │   │   └── maintenance.json
│   │   └── img/
│   │       ├── apple-touch-icon.png
│   │       ├── coming-soon.png
│   │       ├── download-img.png
│   │       ├── favicon.png
│   │       ├── img-01.jpg
│   │       ├── img-1.jpg
│   │       ├── img-02.jpg
│   │       ├── img-2.jpg
│   │       ├── img-03.jpg
│   │       ├── img-3.jpg
│   │       ├── img-04.jpg
│   │       ├── img-4.jpg
│   │       ├── img-05.jpg
│   │       ├── img-5.jpg
│   │       ├── join-call.jpg
│   │       ├── join-call1.jpg
│   │       ├── login-user.png
│   │       ├── logo-1.png
│   │       ├── logo-1.svg
│   │       ├── logo-small-1.png
│   │       ├── logo-small.png
│   │       ├── logo-white-1.png
│   │       ├── logo-white.svg
│   │       ├── logo.png
│   │       ├── logo.svg
│   │       ├── qr.svg
│   │       ├── sending-img.png
│   │       ├── sign.svg
│   │       ├── space-upgrade.jpg
│   │       ├── authentication/
│   │       ├── avatar/
│   │       ├── barcode/
│   │       ├── bg/
│   │       ├── blogs/
│   │       ├── brand/
│   │       ├── categories/
│   │       ├── company/
│   │       ├── customer/
│   │       ├── file-manager/
│   │       ├── flags/
│   │       ├── icons/
│   │       ├── invoice/
│   │       ├── invoice-templates/
│   │       ├── media/
│   │       ├── products/
│   │       ├── profiles/
│   │       ├── social/
│   │       ├── store/
│   │       └── supplier/
│   └── templates/
│       ├── product_template.xlsx
│       └── products_stock_template.xlsx
└── src/
    ├── customStyle.scss
    ├── environment.jsx
    ├── i18n.jsx
    ├── index.js
    ├── posStyle.scss
    ├── components/
    │   ├── InvoiceReportFilters.jsx
    │   ├── InvoiceReportTable.jsx
    │   ├── Maintenance.jsx
    │   ├── admin/
    │   ├── Busy/
    │   ├── common/
    │   ├── custom/
    │   ├── date-picker/
    │   ├── date-range-picker/
    │   ├── forms/
    │   ├── loader/
    │   ├── modals/
    │   ├── product/
    │   ├── Summary/
    │   ├── table/
    │   ├── testing/
    │   └── Transaction/
    ├── constants/
    │   ├── data.js
    │   ├── form.js
    │   ├── index.js
    │   ├── people/
    │   └── transactions/
    ├── core/
    │   ├── breadcrumbs.jsx
    │   ├── common/
    │   ├── img/
    │   ├── json/
    │   ├── loader/
    │   ├── modals/
    │   ├── pagination/
    │   └── redux/
    ├── feature-module/
    │   ├── Application/
    │   ├── components/
    │   ├── content/
    │   ├── coupons/
    │   ├── dashboard/
    │   ├── ecommerce/
    │   ├── FinanceAccounts/
    │   ├── hrm/
    │   ├── inventory/
    │   ├── layout-pages/
    │   ├── loader/
    │   ├── pages/
    │   ├── people/
    │   ├── pos/
    │   ├── purchases/
    │   ├── Reports/
    │   ├── sales/
    │   ├── settings/
    │   ├── stock/
    │   ├── super-admin/
    │   ├── uiinterface/
    │   └── usermanagement/
    ├── hooks/
    │   ├── useCustomers.js
    │   ├── useDashboardSummary.js
    │   ├── useDiscounts.js
    │   ├── useEasebuzz.js
    │   ├── useFetchTransactionData.js
    │   ├── useForm.js
    │   ├── useLocationData.js
    │   ├── useMasterList.js
    │   ├── useModal.js
    │   ├── useOnlinePayment.js
    │   ├── useOrderFlow.js
    │   ├── usePos.js
    │   ├── usePosCommon.js
    │   └── useOrderFlow/
    ├── InitialPage/
    │   ├── themeSettings.jsx
    │   └── Sidebar/
    ├── modules/
    │   ├── customers/
    │   ├── pos/
    │   ├── products/
    │   ├── reports/
    │   ├── sales/
    │   └── vendors/
    ├── pages/
    │   ├── dashboard/
    │   ├── KDS/
    │   ├── partials/
    │   ├── people/
    │   ├── POS/
    │   ├── product/
    │   ├── reports/
    │   └── transactions/
    ├── Router/
    │   ├── all_routes.jsx
    │   ├── authPages.jsx
    │   ├── headerLayout.jsx
    │   ├── kdsLayout.jsx
    │   ├── posLayout.jsx
    │   ├── privateRoute.jsx
    │   ├── router.jsx
    │   └── router.link.jsx
    ├── services/
    │   ├── api.js
    │   ├── cache.js
    │   ├── easebuzzService.js
    │   ├── printManager.js
    │   ├── printQueue.js
    │   ├── service.js
    │   └── socket.js
    ├── shared/
    │   ├── components/
    │   ├── constants/
    │   ├── hooks/
    │   └── utils/
    ├── style/
    │   ├── css/
    │   ├── fonts/
    │   ├── i18n/
    │   ├── icons/
    │   └── scss/
    └── utils/
        ├── antdDate.js
        ├── buildOrderPayload.js
        ├── buildPrintPayloadFromOrder.js
        ├── common.js
        ├── exportToExcel.js
        ├── form.js
        ├── formUtils.js
        ├── generateColumns.js
        ├── importToExcel.js
        ├── modalFields.js
        ├── pdfGenerator.js
        ├── pos.js
        ├── printTemplates.js
        ├── tableColumns.js
        ├── useDropdownState.js
        └── people/
```

## Key Directories and Files

- **public/**: Static assets and HTML template
- **src/**: Source code
  - **components/**: Reusable UI components
  - **constants/**: Application constants
  - **core/**: Core application logic
  - **feature-module/**: Feature-specific modules
  - **hooks/**: Custom React hooks
  - **modules/**: Modular components (customers, pos, etc.)
  - **pages/**: Page components
  - **Router/**: Routing configuration
  - **services/**: API and service layers
  - **shared/**: Shared utilities and components
  - **style/**: Styling files
  - **utils/**: Utility functions

This structure supports a scalable React application with modular architecture for an admin panel managing POS, inventory, customers, and more.

src/
├── app/ # App bootstrapping
│ ├── index.js
│ ├── i18n.jsx
│ └── environment.jsx
│
├── modules/ # ⭐ BUSINESS DOMAINS (MAIN)
│ ├── customers/
│ ├── vendors/
│ ├── products/
│ ├── pos/
│ ├── sales/
│ ├── inventory/
│ ├── reports/
│ └── finance/
│
├── shared/ # ⭐ REUSABLE ACROSS MODULES
│ ├── components/
│ ├── hooks/
│ ├── utils/
│ └── constants/
│
├── services/ # API, socket, print, payments
├── Router/
├── style/
└── assets/ # moved from public (optional)
