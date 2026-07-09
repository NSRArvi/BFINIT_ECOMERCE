import { useParams } from "react-router";
import ProductCard from "../../cards/products/ProductCard";
import useThemeEditor from "@/features/admin/theme-editor/hooks/useThemeEditor";
import useCountry from "@/hooks/useCountry";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { cn } from "@/lib/utils";
import { dummyProducts } from "@/features/admin/theme-editor/utils/contstants";

const gridColsMap = {
  2: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6",
};

export default function ProductGrid({ content }) {
  const { storeId } = useParams();
  const { isEditorMode } = useThemeEditor();
  const { selectedCountry } = useCountry();

  const limit = content?.productsToShow || 8;

  const { data } = useGetQuery({
    endpoint: `/api/v1/stores/products/${selectedCountry?.id}/${storeId}?limit=${limit}`,
    enabled: !!selectedCountry?.id && !!storeId,
    queryKey: ["products", selectedCountry?.id, storeId, limit],
  });

  const products =
    data?.data?.products?.length > 0 ? data?.data?.products : dummyProducts;

  if (!isEditorMode && products?.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {content?.showTitle && (
          <h2 className="mb-10 text-center text-4xl font-bold">
            {content.title}
          </h2>
        )}
        <div
          className={cn(
            "mx-auto grid max-w-7xl gap-6",
            gridColsMap[content?.columns],
          )}
        >
          {products?.slice(0, parseInt(limit))?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
