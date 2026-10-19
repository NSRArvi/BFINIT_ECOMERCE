import { Link } from "react-router";
import toast from "react-hot-toast";
import { Banknote, CreditCard, Landmark } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import useSelectedStore from "@/hooks/useSelectedStore";

const METHOD_UI = {
  stripe: {
    icon: CreditCard,
    title: "Stripe",
    description: "Cards, wallets and other online payments",
    setupLabel: "Connect Stripe",
    incompleteLabel: "Not connected",
    href: "/settings/payments/stripe",
    getPatchEndpoint: ({ storeId }) =>
      `/api/v1/stores/${storeId}/connect/activateinactive`,
  },
  bank: {
    icon: Landmark,
    title: "Bank transfer",
    description: "Customers transfer funds directly to your bank account",
    setupLabel: "Add account",
    incompleteLabel: "No accounts",
    href: "/settings/payments/manage-bank",
    getPatchEndpoint: ({ storeId, id }) =>
      `/api/v1/bankPayment/toggle-active-inactive/${storeId}/${id}`,
  },
  cod: {
    icon: Banknote,
    title: "Cash on delivery",
    description: "Customers pay when the order is delivered",
    setupLabel: "Settings",
    incompleteLabel: "",
    href: null,
    getPatchEndpoint: ({ storeId }) => `/api/v1/cod/status/${storeId}`,
  },
};

export default function PaymentItem({ item }) {
  const queryClient = useQueryClient();
  const { activeStore } = useSelectedStore();

  const method = METHOD_UI?.[item?.key];

  const status = !item.isConfigured
    ? { label: method.incompleteLabel, variant: "warning" }
    : item.isEnabled
      ? { label: "Active", variant: "success" }
      : { label: "Inactive", variant: "secondary" };

  const needsPick = item.key === "bank" && item.isConfigured && !item.isEnabled;

  const { mutate: patch, isPending } = usePatchMutation({
    endpoint: method.getPatchEndpoint({
      storeId: activeStore?.id,
      id: item?.id,
    }),
    isTokenRequired: true,
  });

  const handleToggle = () => {
    patch(null, {
      onSuccess: (data) => {
        if (!data?.success) return toast.error(data?.message);
        toast.success(data?.message);
        queryClient.invalidateQueries(["payment-methods", activeStore?.id]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <method.icon />
      </ItemMedia>

      <ItemContent>
        <ItemTitle>
          {method.title}
          <Badge variant={status.variant} className="text-[10px]">
            {status.label}
          </Badge>
        </ItemTitle>
        <ItemDescription>{method.description}</ItemDescription>
      </ItemContent>

      <ItemActions>
        {!item.isConfigured || needsPick ? (
          <Button asChild size="sm" variant={needsPick ? "outline" : "default"}>
            <Link to={method.href}>
              {needsPick ? "Choose account" : method.setupLabel}
            </Link>
          </Button>
        ) : (
          <Switch
            checked={item.isEnabled}
            onCheckedChange={handleToggle}
            disabled={isPending}
          />
        )}
      </ItemActions>
    </Item>
  );
}
