import { Link } from "react-router";
import { Controller } from "react-hook-form";
import SunEditor from "suneditor-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TagsInput from "./details/TagsInput";
import { Textarea } from "@/components/ui/textarea";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { cn } from "@/lib/utils";
import { sunEditorOptions } from "@/config/sunEditorOptions";

export default function Details({ form }) {
  const { activeStore } = useSelectedStore();

  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetQuery({
    endpoint: `/api/v1/category/store/${activeStore?.id}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["categories", activeStore?.id],
  });

  const { data: brandsData, isLoading: isBrandsLoading } = useGetQuery({
    endpoint: `/api/v1/brand/store/${activeStore?.id}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["brands", activeStore?.id],
  });

  const { data: subcategoriesData, isLoading: isSubcategoriesLoading } =
    useGetQuery({
      endpoint: `/api/v1/subcategory/store/${activeStore?.id}`,
      enabled: !!activeStore?.id,
      isTokenRequired: true,
      queryKey: ["subcategories", activeStore?.id],
    });

  const categories = categoriesData?.data ?? [];
  const brands = brandsData?.data ?? [];
  const categoriesWithSubcategories = subcategoriesData?.data ?? [];

  const selectedCategoryId = form.watch("category_id");

  const availableSubcategories =
    categoriesWithSubcategories.find(
      (category) => category.category_id === selectedCategoryId,
    )?.subcategories ?? [];

  const getSubcategoryPlaceholder = () => {
    if (!selectedCategoryId) return "Select a category first";
    if (isSubcategoriesLoading) return "Loading subcategories...";
    if (availableSubcategories.length === 0)
      return "No subcategories have been added yet.";
    return "Select a subcategory";
  };

  return (
    <FieldSet>
      <div className="border-b px-5 py-4">
        <FieldLegend>Product Details</FieldLegend>
        <FieldDescription>
          Enter the basic information about your product including name,
          description and category
        </FieldDescription>
      </div>

      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Product Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. Classic Cotton T-Shirt"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="category_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Category <span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
                disabled={!isCategoriesLoading && categories.length === 0}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue
                    placeholder={
                      isCategoriesLoading
                        ? "Loading categories..."
                        : categories.length === 0
                          ? "No categories available"
                          : "Select a category"
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category?.id} value={String(category?.id)}>
                      {category?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {!fieldState.invalid &&
                !isCategoriesLoading &&
                categories.length === 0 && (
                  <FieldDescription>
                    No categories found.{" "}
                    <Button
                      asChild
                      size="sm"
                      variant="link"
                      className="h-auto p-0"
                    >
                      <Link to="/products/category">Create one first</Link>
                    </Button>
                  </FieldDescription>
                )}

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="sub_category_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Subcategory</FieldLabel>
              <Select
                name={field.name}
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
                disabled={
                  !selectedCategoryId ||
                  (!isSubcategoriesLoading &&
                    availableSubcategories.length === 0)
                }
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder={getSubcategoryPlaceholder()} />
                </SelectTrigger>

                <SelectContent>
                  {availableSubcategories?.map((subCategory) => (
                    <SelectItem
                      key={subCategory?.id}
                      value={String(subCategory?.id)}
                    >
                      {subCategory?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="brand_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Brand</FieldLabel>
              <Select
                name={field.name}
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
                disabled={!isBrandsLoading && brands.length === 0}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue
                    placeholder={
                      isBrandsLoading
                        ? "Loading brands..."
                        : brands.length === 0
                          ? "No brands have been added yet."
                          : "Select a brand"
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {brands?.map((brand) => (
                    <SelectItem key={brand?.id} value={String(brand?.id)}>
                      {brand?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="tags"
          control={form.control}
          render={({ field }) => (
            <Field className="col-span-full">
              <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
              <TagsInput
                id={field.name}
                value={field.value}
                onChange={field.onChange}
              />
              <div className="flex items-center justify-between">
                <FieldDescription>
                  Add up to 10 tags to help customers find this product.
                </FieldDescription>

                <span className="text-muted-foreground text-xs">
                  {field.value.length}/10
                </span>
              </div>
            </Field>
          )}
        />

        <Controller
          name="short_description"
          control={form.control}
          render={({ field }) => (
            <Field className="col-span-full">
              <FieldLabel htmlFor={field.name}>Short Description</FieldLabel>
              <Textarea
                {...field}
                rows={3}
                id={field.name}
                placeholder="e.g. Lightweight cotton T-shirt with a regular fit."
                className="resize-none"
              />
              <div className="flex items-center justify-between">
                <FieldDescription
                  className={cn(field.value.length > 150 && "text-warning")}
                >
                  {field.value.length > 150
                    ? "Longer descriptions may be cut off on cards and in search results."
                    : "Displayed on product cards and in search results."}
                </FieldDescription>
                <span
                  className={cn(
                    "text-xs",
                    field.value.length > 150
                      ? "text-warning"
                      : "text-muted-foreground",
                  )}
                >
                  {field.value.length}/150
                </span>
              </div>
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field }) => (
            <Field className="col-span-full">
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <SunEditor
                {...field}
                name={field.name}
                setContents={field.value}
                setOptions={sunEditorOptions}
                height="220px"
                placeholder="Describe the product, its features, specifications and benefits."
              />
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}
