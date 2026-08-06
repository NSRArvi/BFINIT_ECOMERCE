import { useParams } from "react-router";
import { Checkbox } from "@/components/ui/checkbox";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useFilterParams from "@/features/storefront/hooks/useFilterParams";

export default function BrandFilter() {
  const { storeId } = useParams();
  const { getList, toggleListValue } = useFilterParams();

  const { data } = useGetQuery({
    endpoint: `/api/v1/stores/brand/${storeId}`,
    enabled: !!storeId,
    queryKey: ["brands", storeId],
  });

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Brand
      </p>
      <div className="space-y-2">
        {data?.data?.length > 0 &&
          data?.data?.map(({ id, name, slug }) => (
            <label
              key={id}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={getList("brand_slug")?.includes(slug)}
                onCheckedChange={() => toggleListValue("brand_slug", slug)}
                className="rounded-none"
              />
              <span className="text-muted-foreground">{name}</span>
            </label>
          ))}
      </div>
    </div>
  );
}
