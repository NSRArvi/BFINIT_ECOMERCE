import { useParams } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useFilterParams from "@/features/storefront/hooks/useFilterParams";
import { cn } from "@/lib/utils";

export default function CategoryFilter() {
  const { storeId } = useParams();
  const { getList, toggleListValue } = useFilterParams();

  const { data } = useGetQuery({
    endpoint: `/api/v1/stores/subcategory/${storeId}`,
    enabled: true,
    isTokenRequired: true,
    queryKey: ["subcategories", storeId],
  });

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Category
      </p>
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={data?.data?.map((c) => c?.category_name)}
      >
        {data?.data?.length > 0 &&
          data?.data?.map(
            ({ category_id, category_slug, category_name, subcategories }) => (
              <AccordionItem
                key={category_id}
                value={category_name}
                className="border-border"
              >
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    checked={getList("category_slug")?.includes(category_slug)}
                    onCheckedChange={() =>
                      toggleListValue("category_slug", category_slug)
                    }
                    className="rounded-none"
                  />
                  <AccordionTrigger
                    className={cn(
                      "py-0 font-normal hover:no-underline",
                      subcategories?.length === 0 && "[&>svg]:hidden",
                    )}
                  >
                    {category_name}
                  </AccordionTrigger>
                </div>
                <AccordionContent>
                  <div className="space-y-2 pl-6">
                    {subcategories?.length > 0 &&
                      subcategories.map(({ id, slug, name }) => (
                        <label
                          key={id}
                          className="flex cursor-pointer items-center gap-2 text-sm"
                        >
                          <Checkbox
                            checked={getList("sub_category_slug")?.includes(
                              slug,
                            )}
                            onCheckedChange={() =>
                              toggleListValue("sub_category_slug", slug)
                            }
                            className="rounded-none"
                          />
                          <span className="text-muted-foreground">{name}</span>
                        </label>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ),
          )}
      </Accordion>
    </div>
  );
}
