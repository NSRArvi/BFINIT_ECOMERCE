const Home_Url = "/";

export const breadcrubms = {
  // === Main ===
  createStore: [{ label: "Home", href: Home_Url }, { label: "Create Store" }],
  themes: [{ label: "Home", href: Home_Url }, { label: "Themes" }],
  // Products
  categories: [
    { label: "Home", href: Home_Url },
    {
      label: "Products",
      dropdown: [
        { label: "Sub Category", href: "/products/sub-category" },
        { label: "Brands", href: "/products/brands" },
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
      href: "/blogs",
    },
    { label: "Add Blog" },
  ],
  manageBlogs: [{ label: "Home", href: Home_Url }, { label: "Blogs" }],

  domain: [
    { label: "Home", href: Home_Url },
    {
      label: "Domains",
      dropdown: [{ label: "Subdomain", href: "/settings/subdomain" }],
    },
    { label: "Domain" },
  ],

  subdomain: [
    { label: "Home", href: Home_Url },
    {
      label: "Domains",
      dropdown: [{ label: "Domain", href: "/settings/domain" }],
    },
    { label: "Subdomain" },
  ],

  // payment
  stripePayment: [
    { label: "Home", href: Home_Url },
    {
      label: "Payments",
      dropdown: [{ label: "Bank", href: "/settings/payments/manage-bank" }],
    },
    { label: "Stripe" },
  ],

  bankPayment: [
    { label: "Home", href: Home_Url },
    {
      label: "Payments",
      dropdown: [{ label: "Stripe", href: "/settings/payments/stripe" }],
    },
    { label: "Bank" },
  ],

  shippingZones: [{ label: "Home", href: Home_Url }, { label: "Shipping" }],

  addShippingZone: [
    { label: "Home", href: Home_Url },
    { label: "Add Shipping Zone" },
  ],

  // === Settings ===
  // Legal
  privacyPolicy: [
    { label: "Home", href: Home_Url },
    {
      label: "Legal",
      dropdown: [
        {
          label: "Legal & Terms",
          href: "/settings/legal/terms-and-conditions",
        },
        { label: "Return Policy", href: "/settings/legal/return-policy" },
      ],
    },
    { label: "Privacy Policy" },
  ],
  termsAndConditions: [
    { label: "Home", href: Home_Url },
    {
      label: "Legal",
      dropdown: [
        { label: "Privacy Policy", href: "/settings/legal/privacy-policy" },
        { label: "Return Policy", href: "/settings/legal/return-policy" },
      ],
    },
    { label: "Terms & Conditions" },
  ],
  returnPolicy: [
    { label: "Home", href: Home_Url },
    {
      label: "Legal",
      dropdown: [
        { label: "Privacy Policy", href: "/settings/legal/privacy-policy" },
        {
          label: "Legal & Terms",
          href: "/settings/legal/terms-and-conditions",
        },
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
        { label: "FAQ", href: "/settings/support/faq" },
        { label: "Shopping Guide", href: "/settings/support/shopping-guide" },
      ],
    },
    { label: "Customer Support" },
  ],
  faq: [
    { label: "Home", href: Home_Url },
    {
      label: "Support",
      dropdown: [
        {
          label: "Customer Support",
          href: "/settings/support/customer-support",
        },
        { label: "Shopping Guide", href: "/settings/support/shopping-guide" },
      ],
    },
    { label: "Faq" },
  ],
  shoppingGuide: [
    { label: "Home", href: Home_Url },
    {
      label: "Support",
      dropdown: [
        {
          label: "Customer Support",
          href: "/settings/support/customer-support",
        },
        { label: "FAQ", href: "/settings/support/faq" },
      ],
    },
    { label: "Shopping Guide" },
  ],

  // Company
  about: [
    { label: "Home", href: Home_Url },
    { label: "Company", href: "/settings/company/about" },
    { label: "About" },
  ],

  seo: [{ label: "Home", href: Home_Url }, { label: "SEO & Meta" }],

  // Account Settings
  billing: [{ label: "Home", href: Home_Url }, { label: "Billing" }],
  billingPlans: [
    { label: "Home", href: Home_Url },
    { label: "Billing", href: "/account/billing" },
    { label: "Plans" },
  ],

  customers: [{ label: "Home", href: "/" }, { label: "Customers" }],
};
