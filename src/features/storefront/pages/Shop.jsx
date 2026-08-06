import { useParams, useSearchParams } from "react-router";
import { keepPreviousData } from "@tanstack/react-query";
import FilterPanel from "../components/shop/FilterPanel";
import Header from "../components/shop/Header";
import ProductsGrid from "../components/shop/ProductsGrid";
import ProductPagination from "../components/shop/ProductPagination";
import useCountry from "@/hooks/useCountry";
import useGetQuery from "@/hooks-v2/api/useGetQuery";

export default function Shop() {
  const { storeId } = useParams();
  const [searchParams] = useSearchParams();
  const { selectedCountry } = useCountry();

  const queryString = searchParams.toString();

  const { data, isPlaceholderData } = useGetQuery({
    endpoint: `/api/v1/stores/products/${selectedCountry?.id}/${storeId}/filtered-products?limit=12${queryString ? `&${queryString}` : ""}`,
    enabled: !!storeId,
    queryKey: ["products", selectedCountry?.id, storeId, queryString],
    placeholderData: keepPreviousData,
  });

  const products = data?.data?.products || [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Header products={products} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterPanel maxPriceRange={data?.data?.maxPrice} />
          </div>
        </aside>

        {/* Product grid */}
        <div>
          {products?.length > 0 && (
            <>
              <ProductsGrid
                products={products}
                isPlaceholderData={isPlaceholderData}
              />
              <ProductPagination totalPages={data?.data?.totalPages} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
