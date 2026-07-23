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

  {
    groupName: "settings",
    links: [
      {
        icon: Globe,
        name: "Domain",
        url: "/domains",
      },
      {
        icon: CreditCard,
        name: "Payments",
        subCategories: [
          {
            name: "Stripe",
            url: "/payments/stripe",
            icon: CornerDownRight,
          },
          {
            name: "Add Bank",
            url: "/payments/bank",
            icon: CornerDownRight,
          },
          {
            name: "Manage Bank",
            url: "/payments/manage-bank",
            icon: CornerDownRight,
          },
        ],
      },
      {
        icon: Truck,
        name: "Shipping",
        url: "/shipping-zones",
      },
      {
        icon: Scale,
        name: "Legal",
        subCategories: [
          {
            name: "Privacy Policy",
            url: "/legal/privacy-policy",
            icon: CornerDownRight,
          },
          {
            name: "Legal & Terms",
            url: "/legal/terms-and-conditions",
            icon: CornerDownRight,
          },
          {
            name: "Return Policy",
            url: "/legal/return-policy",
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
            url: "/support/customer-support",
            icon: CornerDownRight,
          },
          {
            name: "FAQ",
            url: "/support/faq",
            icon: CornerDownRight,
          },
          {
            name: "Shopping Guide",
            url: "/support/shopping-guide",
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
            url: "/company/about",
            icon: CornerDownRight,
          },
        ],
      },
    ],
  },
];
