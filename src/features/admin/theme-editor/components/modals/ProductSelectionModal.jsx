import { useState } from "react";
import { useParams } from "react-router";
import { Search, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import useGetQuery from "@/hooks/api/useGetQuery";

export default function ProductSelectionModal({
  isOpen,
  onClose,
  selectedProductIds = [],
  onConfirm,
}) {
  const { storeId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(selectedProductIds);

  // TODO: Implement infinite scroll with useInfiniteQuery and Intersection Observer for better UX with paginated products
  // TODO: need to fix product object structure as same as allProducts
  const { data: products, isLoading } = useGetQuery({
    endpoint: `/product/store?storeId=${storeId}`,
    queryKey: ["products-modal"],
    enabled: isOpen && !!storeId,
  });

  const toggleProduct = (productId) => {
    setSelected((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [productId, ...prev],
    );
  };

  const handleConfirm = () => {
    onConfirm(selected);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[80dvh] max-w-2xl flex-col p-0">
        {/* Fixed Header */}
        <DialogHeader className="shrink-0 border-b px-6 py-4">
          <DialogTitle className="text-base">Select Products</DialogTitle>
        </DialogHeader>

        {/* Fixed Search Bar */}
        <div className="shrink-0 border-b px-6 py-3">
          <div className="relative">
            <Search
              size={16}
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
            />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-9 text-sm"
            />
          </div>
        </div>

        {/* Scrollable Products Section */}
        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto px-6 py-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground flex flex-col items-center gap-2">
                <Package size={32} className="animate-pulse" />
                <p className="text-sm">Loading products...</p>
              </div>
            </div>
          ) : products?.data?.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground text-center">
                <Package size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No products found</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {products?.data?.map((product) => (
                <div
                  key={product._id}
                  onClick={() => toggleProduct(product._id)}
                  className={`hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                    selected.includes(product._id)
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <Checkbox
                    checked={selected.includes(product._id)}
                    onCheckedChange={() => toggleProduct(product._id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <img
                    src={`https://ecomback.bfinit.com${product.thumbnailImage}`}
                    alt={product.productName}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {product.productName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      ${product.productPrice?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fixed Footer */}
        <DialogFooter className="shrink-0 border-t px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <p className="text-muted-foreground text-sm">
              {selected.length} product{selected.length !== 1 ? "s" : ""}{" "}
              selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleConfirm}>
                Apply Selection
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
