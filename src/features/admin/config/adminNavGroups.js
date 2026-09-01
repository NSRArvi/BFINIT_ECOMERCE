import {
  Store,
  CornerDownRight,
  CreditCard,
  Globe,
  House,
  Newspaper,
  Package,
  Search,
  Palette,
  ShoppingCart,
  Scale,
  LifeBuoy,
  Building2,
  Users,
  Truck,
} from "lucide-react";

export const adminNavGroups = [
  {
    groupName: "main",
    links: [
      {
        icon: House,
        name: "Home",
        url: "/",
      },
      {
        icon: Store,
        name: "Stores",
        url: "/stores",
      },
      {
        icon: Palette,
        name: "Themes",
        url: "/themes",
      },
      {
        icon: Package,
        name: "Products",
        subCategories: [
          {
            name: "Category",
            url: "/products/category",
            icon: CornerDownRight,
          },
          {
            name: "Subcategory",
            url: "/products/sub-category",
            icon: CornerDownRight,
          },
          {
            name: "Brands",
            url: "/products/brands",
            icon: CornerDownRight,
          },
          {
            name: "Inventory",
            url: "/products/inventory",
            icon: CornerDownRight,
          },
        ],
      },
    ],
  },

  // sales
  {
    groupName: "sales",
    links: [
      {
        icon: ShoppingCart,
        name: "Orders",
        url: "/orders",
      },

      {
        icon: Users,
        name: "Customers",
        url: "/customers",
      },
    ],
  },

  {
    groupName: "marketing",
    links: [
      {
        icon: Search,
        name: "SEO & Meta",
        url: "/seo-meta",
      },

      {
        icon: Newspaper,
        name: "Blogs",
        subCategories: [
          {
            name: "Add Blog",
            url: "/blogs/add",
            icon: CornerDownRight,
          },
          {
            name: "Manage Blog",
            url: "/blogs/manage",
            icon: CornerDownRight,
          },
        ],
      },
    ],
  },
];

export const adminSettingsNavGroups = [
  {
    groupName: "Store",
    links: [
      {
        icon: Globe,
        name: "Domain",
        subCategories: [
          {
            name: "Domain",
            url: "/settings/domain",
            icon: CornerDownRight,
          },
          {
            name: "Subdomain",
            url: "/settings/subdomain",
            icon: CornerDownRight,
          },
        ],
      },
      {
        icon: CreditCard,
        name: "Payments",
        subCategories: [
          {
            name: "Stripe",
            url: "/settings/payments/stripe",
            icon: CornerDownRight,
          },
          {
            name: "Bank",
            url: "/settings/payments/manage-bank",
            icon: CornerDownRight,
          },
        ],
      },
      {
        icon: Truck,
        name: "Shipping",
        url: "/settings/shipping-zones",
      },
    ],
  },
  {
    groupName: "Content",
    links: [
      {
        icon: Scale,
        name: "Legal",
        subCategories: [
          {
            name: "Privacy Policy",
            url: "/settings/legal/privacy-policy",
            icon: CornerDownRight,
          },
          {
            name: "Legal & Terms",
            url: "/settings/legal/terms-and-conditions",
            icon: CornerDownRight,
          },
          {
            name: "Return Policy",
            url: "/settings/legal/return-policy",
            icon: CornerDownRight,
          },
        ],
      },
      {
        icon: LifeBuoy,
        name: "Support",
        subCategories: [
          {
            name: "Customer Support",
            url: "/settings/support/customer-support",
            icon: CornerDownRight,
          },
          {
            name: "FAQ",
            url: "/settings/support/faq",
            icon: CornerDownRight,
          },
          {
            name: "Shopping Guide",
            url: "/settings/support/shopping-guide",
            icon: CornerDownRight,
          },
        ],
      },
      {
        icon: Building2,
        name: "Company",
        subCategories: [
          {
            name: "About",
            url: "/settings/company/about",
            icon: CornerDownRight,
          },
        ],
      },
    ],
  },
];
