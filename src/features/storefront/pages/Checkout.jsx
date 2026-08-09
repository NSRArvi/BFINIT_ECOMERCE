import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCart from "@/hooks/useCart";
import useCountry from "@/hooks/useCountry";
import useCustomerAuth from "../hooks/useCustomerAuth";
import useCustomerPostMutation from "../hooks/useCustomerPostMutation";
import toast from "react-hot-toast";
import useBasePath from "@/hooks/useBasePath";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import ShippingDetails from "../components/checkout/ShippingDetails";
import { useQuery } from "@tanstack/react-query";
import { postApi } from "@/services-v2/api/postApi";
import useDebounce from "@/hooks/useDebounce";
import { checkoutSchema } from "@/features/admin/schemas/checkoutSchema";
import { buildCheckoutPayload } from "../utils/checkoutHelper";

export default function Checkout() {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const basePath = useBasePath();
  const { selectedCountry } = useCountry();
  const { customer } = useCustomerAuth();
  const { cartItems, subTotalAmount, clearCart } = useCart();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      phone: "",
      state: "",
      city: "",
      postal_code: "",
      shipping_address: "",
      delivery_zone_id: "",
      delivery_zone_rate_id: "",
      note: "",
      payment_method: "cod",
      transaction_id: "",
      transaction_proof: undefined,
    },
  });

  const state = useWatch({ control, name: "state" });
  const city = useWatch({ control, name: "city" });
  const postal_code = useWatch({ control, name: "postal_code" });
  const selectedRateId = useWatch({ control, name: "delivery_zone_rate_id" });

  const debouncedState = useDebounce(state);
  const debouncedCity = useDebounce(city);
  const debouncedPostal = useDebounce(postal_code);

  const { data, isLoading } = useQuery({
    queryKey: [
      "delivery-resolve",
      storeId,
      selectedCountry?.id,
      debouncedState,
      debouncedCity,
      debouncedPostal,
      subTotalAmount,
    ],
    queryFn: () =>
      postApi({
        endpoint: "/api/v1/delivery-zone/resolve",
        payload: {
          store_id: parseInt(storeId),
          country_id: selectedCountry?.id,
          state: debouncedState,
          city: debouncedCity,
          postal_code: debouncedPostal,
          order_subtotal: subTotalAmount,
        },
      }),
    enabled: !!selectedCountry?.id,
  });

  useEffect(() => {
    if (data?.data?.options?.length > 0) {
      setValue("delivery_zone_id", data?.data?.zone_id);
      setValue("delivery_zone_rate_id", data?.data?.options?.[0].rate_id);
    }
  }, [data]);

  const selectedDeliveryCharge = data?.data?.options?.find(
    (opt) => opt.rate_id === selectedRateId,
  );

  const hasDeliveryRate = !!selectedDeliveryCharge;
  const deliveryFee = Number(selectedDeliveryCharge?.fee ?? 0);

  const { mutate, isPending: isPlacingOrder } = useCustomerPostMutation({
    endpoint: "/api/v1/order",
    isTokenRequired: true,
  });

  const onSubmit = (data) => {
    const payload = buildCheckoutPayload({
      data,
      storeId: parseInt(storeId),
      countryId: selectedCountry?.id,
      currency: selectedCountry?.currency_code,
      userId: customer?.user?.id,
      cartItems,
      subTotalAmount,
      deliveryFee,
      selectedDeliveryCharge,
    });

    mutate(payload, {
      onSuccess: (data) => {
        if (!data?.success) {
          return toast.error(data?.message);
        }

        if (payload?.payment_method === "stripe") {
          window.location.href = data?.checkout_url;
          return;
        }

        clearCart();
        toast.success(data?.message);
        navigate(`${basePath}/orders/${data.data.id}`);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="bg-background text-foreground font-inter min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-border flex items-end justify-between gap-4 border-b py-6">
          <div>
            <p className="font-geist text-muted-foreground mb-2 text-[11px] tracking-[0.15em] uppercase">
              Home / Cart / Checkout
            </p>
            <h1 className="font-geist text-2xl font-semibold tracking-tight">
              Checkout
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-[1fr_380px]"
        >
          {/* left: shipping + payment */}
          <ShippingDetails
            control={control}
            errors={errors}
            isLoading={isLoading}
            deliveryOptions={data?.data?.options}
          />

          {/* right: order summary */}
          <CheckoutSummary
            isPlacingOrder={isPlacingOrder}
            deliveryFee={deliveryFee}
            isLoading={isLoading}
            hasDeliveryRate={hasDeliveryRate}
          />
        </form>
      </div>
    </div>
  );
}
