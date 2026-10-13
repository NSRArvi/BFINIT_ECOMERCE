import { Bitcoin, Building2, CreditCard, Gift } from "lucide-react";

export const paymentMethodConfig = {
  stripe: { label: "Stripe", icon: CreditCard },
  bank_transfer: { label: "Bank Transfer", icon: Building2 },
  solana: { label: "Crypto", icon: Bitcoin },
  trial: { label: "Free Trial", icon: Gift },
};
