export const breadcrubms = {
  createStore: [{ label: "Home", href: "/" }, { label: "Create Store" }],
  Update_Store: [{ label: "Home", href: "/" }, { label: "Edit Store" }],
  Stores: [{ label: "Home", href: "/" }, { label: "Stores" }],

  Update_Product: [
    { label: "Home", href: "/" },
    {
      label: "Products",
      dropdown: [
        { label: "Category", href: "/products/category" },
        { label: "Sub Category", href: "/products/sub-category" },
        { label: "Brands", href: "/products/brands" },
        { label: "Add Product", href: "/products/add-product" },
        { label: "Inventory", href: "/products/inventory" },
      ],
    },
    { label: "Edit Product" },
  ],

  // ============================================================================
  // Sales
  // ============================================================================

  /** Breadcrumb for orders listing and management */
  orders: [{ label: "Home", href: "/" }, { label: "Orders" }],

  /** Breadcrumb for customers listing */
  customers: [{ label: "Home", href: "/" }, { label: "Customers" }],

  // ============================================================================
  // Super Admin
  // ============================================================================
  packages: [{ label: "Home", href: "/" }, { label: "Pacakges" }],
  addPackage: [{ label: "Home", href: "/" }, { label: "Add Pacakge" }],
  editPackage: [{ label: "Home", href: "/" }, { label: "Edit Pacakge" }],

  packagesBankAcc: [{ label: "Home", href: "/" }, { label: "Bank Accounts" }],
  addPlatformBank: [
    { label: "Home", href: "/" },
    { label: "Add Bank Account" },
  ],

  // ============================================================================
  // Settings
  // ============================================================================

  /** Breadcrumb for domain managment */
  domain: [{ label: "Home", href: "/" }, { label: "Domain" }],

  // payments
  StripePayment: [
    { label: "Home", href: "/" },
    {
      label: "Payments",
      dropdown: [{ label: "Bank", href: "/payments/bank" }],
    },
    { label: "Stripe" },
  ],

  BankPayment: [
    { label: "Home", href: "/" },
    {
      label: "Payments",
      dropdown: [{ label: "Stripe", href: "/payments/stripe" }],
    },
    { label: "Bank" },
  ],

  addBlog: [
    { label: "Home", href: "/" },
    {
      label: "Blogs",
      dropdown: [{ label: "Manage Blog", href: "/blogs/manage" }],
    },
    { label: "Add Blog" },
  ],

  manageBlogs: [
    { label: "Home", href: "/" },
    {
      label: "Blogs",
      dropdown: [{ label: "Add Blog", href: "/blogs/add" }],
    },
    { label: "Manage Blog" },
  ],
};
