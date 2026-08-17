import { ClipboardList, Crown, Landmark, Globe, Network } from "lucide-react";

export const superAdminNavGroups = [
  {
    groupName: "Main",
    links: [
      {
        icon: Crown,
        name: "Packages",
        url: "/super-admin/packages",
      },
      {
        icon: ClipboardList,
        name: "Orders",
        url: "/super-admin/orders",
      },
      {
        icon: Landmark,
        name: "Bank Accounts",
        url: "/super-admin/bank-accounts",
      },
    ],
  },
  {
    groupName: "Stores",
    links: [
      {
        icon: Globe,
        name: "Domains",
        url: "/super-admin/domains",
      },
      {
        icon: Network,
        name: "Subdomains",
        url: "/super-admin/subdomains",
      },
    ],
  },
];
