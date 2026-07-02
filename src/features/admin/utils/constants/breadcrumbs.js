const Home_Url = "/";

export const breadcrubms = {
  // === Main ===
  createStore: [{ label: "Home", href: Home_Url }, { label: "Create Store" }],
  // Products
  categories: [
    { label: "Home", href: Home_Url },
    {
      label: "Products",
      dropdown: [
        { label: "Sub Category", href: "/products/sub-category" },
        { label: "Brands", href: "/products/brands" },
        { label: "Add Product", href: "/products/add-product" },
        { label: "Inventory", href: "/products/inventory" },
      ],
    },
    { label: "Category" },
  ],
  subCategory: [
    { label: "Home", href: Home_Url },
    {
      label: "Products",
      dropdown: [
        { label: "Category", href: "/products/category" },
        { label: "Brands", href: "/products/brands" },
        { label: "Add Product", href: "/products/add-product" },
        { label: "Inventory", href: "/products/inventory" },
      ],
    },
    { label: "Subcategory" },
  ],
  brands: [
    { label: "Home", href: Home_Url },
    {
      label: "Products",
      dropdown: [
        { label: "Category", href: "/products/category" },
        { label: "Sub Category", href: "/products/sub-category" },
        { label: "Add Product", href: "/products/add-product" },
        { label: "Inventory", href: "/products/inventory" },
      ],
    },
    { label: "Brands" },
  ],
  inventory: [
    { label: "Home", href: Home_Url },
    {
      label: "Products",
      dropdown: [
        { label: "Category", href: "/products/category" },
        { label: "Sub Category", href: "/products/sub-category" },
        { label: "Brands", href: "/products/brands" },
        { label: "Add Product", href: "/products/add-product" },
      ],
    },
    { label: "Inventory" },
  ],
  addProduct: [
    { label: "Home", href: Home_Url },
    {
      label: "Products",
      dropdown: [
        { label: "Category", href: "/products/category" },
        { label: "Sub Category", href: "/products/sub-category" },
        { label: "Brands", href: "/products/brands" },
        { label: "Inventory", href: "/products/inventory" },
      ],
    },
    { label: "Add Product" },
  ],

  // Blog
  addBlog: [
    { label: "Home", href: Home_Url },
    {
      label: "Blogs",
      dropdown: [{ label: "Manage Blog", href: "/blogs/manage" }],
    },
    { label: "Add Blog" },
  ],
  manageBlogs: [
    { label: "Home", href: Home_Url },
    {
      label: "Blogs",
      dropdown: [{ label: "Add Blog", href: "/blogs/add" }],
    },
    { label: "Manage Blog" },
  ],

  // payment
  bankPayment: [
    { label: "Home", href: Home_Url },
    {
      label: "Payments",
      dropdown: [{ label: "Stripe", href: "/payments/stripe" }],
    },
    { label: "Bank" },
  ],

  // === Settings ===
  // Legal
  privacyPolicy: [
    { label: "Home", href: Home_Url },
    {
      label: "Legal",
      dropdown: [
        { label: "Legal & Terms", href: "/legal/terms-and-conditions" },
        { label: "Return Policy", href: "/legal/return-policy" },
      ],
    },
    { label: "Privacy Policy" },
  ],
  termsAndConditions: [
    { label: "Home", href: Home_Url },
    {
      label: "Legal",
      dropdown: [
        { label: "Privacy Policy", href: "/legal/privacy-policy" },
        { label: "Return Policy", href: "/legal/return-policy" },
      ],
    },
    { label: "Terms & Conditions" },
  ],
  returnPolicy: [
    { label: "Home", href: Home_Url },
    {
      label: "Legal",
      dropdown: [
        { label: "Privacy Policy", href: "/legal/privacy-policy" },
        { label: "Legal & Terms", href: "/legal/terms-and-conditions" },
      ],
    },
    { label: "Return Policy" },
  ],

  // Support
  customerSupport: [
    { label: "Home", href: Home_Url },
    {
      label: "Support",
      dropdown: [
        { label: "FAQ", href: "/support/faq" },
        { label: "Shopping Guide", href: "/support/shopping-guide" },
      ],
    },
    { label: "Customer Support" },
  ],
  faq: [
    { label: "Home", href: Home_Url },
    {
      label: "Support",
      dropdown: [
        { label: "Customer Support", href: "/support/customer-support" },
        { label: "Shopping Guide", href: "/support/shopping-guide" },
      ],
    },
    { label: "Faq" },
  ],
  shoppingGuide: [
    { label: "Home", href: Home_Url },
    {
      label: "Support",
      dropdown: [
        { label: "Customer Support", href: "/support/customer-support" },
        { label: "FAQ", href: "/support/faq" },
      ],
    },
    { label: "Shopping Guide" },
  ],

  // Company
  about: [{ label: "Home", href: Home_Url }, { label: "About" }],
};
