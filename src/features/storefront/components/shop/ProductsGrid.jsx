import ProductCard from "@/components/storefront/cards/products/ProductCard";
import { cn } from "@/lib/utils";

export default function ProductsGrid({ products, isPlaceholderData }) {
  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-10 transition-opacity sm:grid-cols-2 xl:grid-cols-3",
        isPlaceholderData && "pointer-events-none opacity-50",
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
