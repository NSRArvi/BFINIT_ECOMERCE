import { CreditCard, Globe, Package, Store } from "lucide-react";

export const getSetupSteps = (progress = {}) => [
  {
    id: "store",
    icon: Store,
    title: "Create your store",
    description:
      "Name it and set your currency and country. You can change these later.",
    cta: { label: "Create store", to: "/stores/create" },
    time: "~1 min",
    done: !!progress.hasStore,
  },
  {
    id: "product",
    icon: Package,
    title: "Add your first product",
    description:
      "Write a description, add photos, and set pricing for what you plan to sell.",
    cta: { label: "Add product", to: "/products/inventory/add" },
    time: "~5 min",
    done: !!progress.hasProduct,
    optional: true,
  },
  {
    id: "payment",
    icon: CreditCard,
    title: "Set up payments",
    description: "Connect Stripe or a bank account so you can get paid.",
    cta: { label: "Connect payments", to: "/settings/payments" },
    time: "~2 min",
    done: !!progress.hasPayment,
    optional: true,
  },
  {
    id: "domain",
    icon: Globe,
    title: "Connect a custom domain",
    description: "Optional. You can launch on your free subdomain first.",
    cta: { label: "Connect domain", to: "/settings/domains" },
    time: "~5 min",
    done: !!progress.hasDomain,
    optional: true,
  },
];
