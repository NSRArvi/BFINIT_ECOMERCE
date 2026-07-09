import { useState } from "react";
import { Info, Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductSelectionModal from "../modals/ProductSelectionModal";
import useGetQuery from "@/hooks/api/useGetQuery";
import { formatPrice } from "@/utils/formatPrice";
import FieldHeader from "./FieldHeader";

export default function ProductSourceField({ field, value, onChange }) {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const normalizedValue =
    value && typeof value === "object" && value.type
      ? value
      : { type: "all", value: null };

  const currentType = normalizedValue.type;
  const currentValue = normalizedValue.value;

  // Construct select value
  const selectValue =
    currentType === "badge"
      ? `badge:${currentValue}`
      : currentType === "auto"
        ? `auto:${currentValue}`
        : currentType;

  const handleSourceChange = (newValue) => {
    if (newValue === "all") {
      onChange({
        type: "all",
        value: null,
      });
    } else if (newValue === "manual") {
      onChange({
        type: "manual",
        value: [],
      });
    } else if (newValue === "collection") {
      onChange({
        type: "collection",
        value: null,
      });
    } else if (newValue.startsWith("badge:")) {
      onChange({
        type: "badge",
        value: newValue.split(":")[1],
      });
    } else if (newValue.startsWith("auto:")) {
      onChange({
        type: "auto",
        value: newValue.split(":")[1],
      });
    }
  };

  const handleProductsSelected = (productIds) => {
    onChange({
      type: "manual",
      value: productIds,
    });
    setIsProductModalOpen(false);
  };

  const removeProduct = (productId) => {
    const currentProducts = Array.isArray(currentValue) ? currentValue : [];
    onChange({
      type: "manual",
      value: currentProducts.filter((id) => id !== productId),
    });
  };

  const selectedProducts = Array.isArray(currentValue) ? currentValue : [];

  const idsQuery =
    selectedProducts?.length > 0 ? selectedProducts?.join(",") : [];

  const isManualTypeProducts = value?.type === "manual";
  const hasManualProductIds = value?.value?.length > 0;

  const { data: products, isLoading } = useGetQuery({
    endpoint: `/product/store/batches?ids=${idsQuery}`,
    queryKey: ["manual-products", idsQuery],
    enabled: !!idsQuery && !!isManualTypeProducts && !!hasManualProductIds,
  });

  return (
    <>
      <div className="space-y-3">
        <div className="space-y-2">
          <FieldHeader field={field} />

          <Select value={selectValue} onValueChange={handleSourceChange}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Select product source" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-sm"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Manual Selection UI */}
        {currentType === "manual" && (
          <div className="space-y-2">
            {!isLoading && products && products?.data?.length > 0 && (
              <div className="border-border bg-muted/20 space-y-1.5 rounded-lg border p-2">
                {products?.data?.map((product) => (
                  <SelectedProductChip
                    key={product?._id}
                    product={product}
                    onRemove={() => removeProduct(product?._id)}
                  />
                ))}
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsProductModalOpen(true)}
              className="h-8 w-full text-xs"
            >
              <Package size={14} className="mr-1.5" />
              {!isLoading && products && products?.data?.length > 0
                ? `Edit Products (${products?.data?.length})`
                : "Select Products"}
            </Button>
          </div>
        )}

        {/* Auto/Badge Selection Info */}
        {(currentType === "badge" || currentType === "auto") && (
          <div className="border-info/20 bg-info/10 flex gap-2 rounded-lg border p-2.5">
            <Info size={14} className="text-info mt-0.5 shrink-0" />
            <p className="text-info-foreground text-[11px] leading-relaxed">
              <span className="font-medium">Automatic selection:</span> Products
              will be dynamically loaded based on your chosen criteria.
            </p>
          </div>
        )}
      </div>

      <ProductSelectionModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        selectedProductIds={selectedProducts}
        onConfirm={handleProductsSelected}
      />
    </>
  );
}

function SelectedProductChip({ product, onRemove }) {
  const { productName, thumbnailImage, productPrice } = product;

  return (
    <div className="bg-background border-border group flex items-center gap-2 rounded-md border p-1.5 pr-2">
      <img
        src={`https://ecomback.bfinit.com${thumbnailImage}`}
        alt={productName}
        className="h-8 w-8 rounded object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium">{productName}</p>
        <p className="text-muted-foreground text-[10px]">
          {formatPrice(productPrice?.$numberDecimal)}
        </p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive opacity-0 transition-all group-hover:opacity-100"
      >
        <X size={14} />
      </button>
    </div>
  );
}
