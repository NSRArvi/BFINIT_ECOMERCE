import { CreditCard, Globe, Package, Store } from "lucide-react";

export const getSetupSteps = (progress = {}) => [
  {
    id: "store",
    icon: Store,
    title: "Create your store",
    description:
      "Choose your store name, country, and currency. You can change these later.",
    cta: { label: "Create store", to: "/stores/create" },
    time: "~1 min",
    done: !!progress.hasStore,
  },
  {
    id: "product",
    icon: Package,
    title: "Add your first product",
    description:
      "Add photos, write a description, and set a price for your product.",
    cta: { label: "Add product", to: "/products/inventory/add" },
    time: "~5 min",
    done: !!progress.hasProduct,
    optional: true,
  },
  {
    id: "payment",
    icon: CreditCard,
    title: "Set up payments",
    description:
      "Choose how customers can pay, including Stripe or bank transfer.",
    cta: { label: "Configure payments", to: "/settings/payments/methods" },
    time: "~2 min",
    done: !!progress.hasPayment,
    optional: true,
  },
  {
    id: "domain",
    icon: Globe,
    title: "Set up your domain",
    description:
      "Give your store a clean, memorable link with a custom domain or subdomain.",
    cta: { label: "Set up domain", to: "/settings/domain" },
    time: "~5 min",
    done: !!progress.hasDomain,
    optional: true,
  },
];
