import { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft, Crown, Plus, Trash2 } from "lucide-react";
import DynamicBreadcrumb from "../../admin/components/DynamicBreadcrumb";
import PageHeader from "../../admin/components/PageHeader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import usePostMutation from "@/hooks/api/usePostMutation";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import {
  emptyDefaults,
  emptyPeriod,
  transformPackageData,
} from "../../admin/utils/packagesHelper";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePatchMutaion from "@/hooks/api/usePatchMutaion";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortablePackageDescItem from "../../admin/components/list/SortablePackageDescItem";

export default function PackageForm() {
  const { id } = useParams();
  const isEditMode = !!id;

  const { data, isLoading: isDataLoading } = useGetQuery({
    endpoint: `/api/v1/package/get/${id}`,
    enabled: !!id,
    newBaseUrl: true,
    queryKey: ["package", id],
  });

  const form = useForm({
    values: isEditMode ? transformPackageData(data?.data) : emptyDefaults,
  });
  const { handleSubmit, watch, setValue } = form;
  const [descInput, setDescInput] = useState("");
  const sensors = useSensors(useSensor(PointerSensor));
  const periods = watch("subscription_periods");

  const handleDescReorder = (event, field) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = field.value.findIndex((_, i) => `desc-${i}` === active.id);
    const newIndex = field.value.findIndex((_, i) => `desc-${i}` === over.id);

    field.onChange(arrayMove(field.value, oldIndex, newIndex));
  };

  const handleDescKeyDown = (e, field) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = descInput.trim();
      if (!trimmed || field.value.includes(trimmed)) return;

      field.onChange([...(field.value || []), trimmed]);
      setDescInput("");
    }
  };

  const handleDescRemove = (index, field) => {
    field.onChange(field.value.filter((_, i) => i !== index));
  };

  const addPeriod = () => {
    setValue("subscription_periods", [...periods, { ...emptyPeriod }]);
  };

  const removePeriod = (index) => {
    setValue(
      "subscription_periods",
      periods.filter((_, i) => i !== index),
    );
  };

  const { mutate, isPending: isCreating } = usePostMutation({
    endpoint: "/api/v1/package/create",
    newBaseUrl: true,
  });

  const { mutate: update, isPending: isUpdating } = usePatchMutaion({
    endpoint: `/api/v1/package/update/${id}`,
    newBaseUrl: true,
  });

  const onSubmit = (data) => {
    const { product_limit, max_storage, subscription_periods, ...rest } = data;

    const payload = {
      ...rest,
      max_store: Number(data.max_store),
      precedence: Number(data.precedence),
      ...(product_limit !== "" && product_limit != null
        ? { product_limit: Number(product_limit) }
        : { product_limit: null }),
      ...(max_storage !== "" && max_storage != null
        ? { max_storage: Number(max_storage) }
        : { max_storage: null }),
      subscription_periods: subscription_periods.map((p) => ({
        ...(p.id !== undefined && { id: p.id }),
        ...(p.package_id !== undefined && { package_id: p.package_id }),
        price: Number(p.price),
        duration: Number(p.duration),
        offer_percentage:
          p.offer_percentage !== "" && p.offer_percentage != null
            ? Number(p.offer_percentage)
            : null,
      })),
    };

    if (!id) {
      mutate(payload, {
        onSuccess: (res) => {
          toast.success(res?.message);
          form.reset(emptyDefaults);
          setDescInput("");
        },
        onError: (err) => {
          toast.error(err?.message);
        },
      });

      return;
    }

    update(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        setDescInput("");
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };

  const isLoading = isCreating || isDataLoading || isUpdating;
  const btnLabel = isEditMode ? "Update" : "Save";
  const btnLoadingLabel = isEditMode ? "Updating..." : "Saving...";

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.addPackage} />

      <PageHeader
        icon={Crown}
        title="Add Package"
        description="Create a new subscription package for the e-Bfinit website"
        showStoreName={false}
      />

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card space-y-6 rounded-lg border p-5"
        >
          <fieldset disabled={isLoading} className="grid grid-cols-2 gap-6">
            {/* Package Name */}
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="package_name"
                rules={{ required: "Package name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Package Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Package Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Marketing Label */}
            <FormField
              control={form.control}
              name="package_type_label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Marketing Label</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. Upgrade, Entry, Professional, Enterprise"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* highlight badge */}
            <FormField
              control={form.control}
              name="badge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Highlight Badge</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. Most Popular, Best Value, Limited Offer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Short Description — full width */}
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="short_description"
                rules={{
                  required: "Short description is required",
                  maxLength: {
                    value: 150,
                    message: "Short description must be 150 characters or less",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Short Description{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={3}
                        maxLength={150}
                        placeholder="Write a short description (150 characters max)"
                        className="resize-none"
                      />
                    </FormControl>
                    <div className="mt-0.5 flex items-center justify-between gap-2">
                      <FormMessage className="flex-1 text-xs" />
                      <p className="text-muted-foreground shrink-0 text-xs tabular-nums">
                        {field.value ? field.value.length : 0}/150
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Description — full width */}
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="description"
                rules={{
                  required: "At least one description item is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Description <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          placeholder="Press Enter to add a description item (e.g., Unlimited visits monthly)"
                          value={descInput}
                          onChange={(e) => setDescInput(e.target.value)}
                          onKeyDown={(e) => handleDescKeyDown(e, field)}
                        />
                        {Array.isArray(field.value) &&
                          field.value.length > 0 && (
                            <DndContext
                              sensors={sensors}
                              collisionDetection={closestCenter}
                              onDragEnd={(event) =>
                                handleDescReorder(event, field)
                              }
                            >
                              <SortableContext
                                items={field.value.map((_, i) => `desc-${i}`)}
                                strategy={verticalListSortingStrategy}
                              >
                                <ul className="mt-2 space-y-1.5">
                                  {field.value.map((item, index) => (
                                    <SortablePackageDescItem
                                      key={`desc-${index}`}
                                      id={`desc-${index}`}
                                      item={item}
                                      index={index}
                                      onRemove={(i) =>
                                        handleDescRemove(i, field)
                                      }
                                    />
                                  ))}
                                </ul>
                              </SortableContext>
                            </DndContext>
                          )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Max Stores */}
            <FormField
              control={form.control}
              name="max_store"
              rules={{ required: "Max stores is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    Max Stores <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Max Stores" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Max Storage */}
            <FormField
              control={form.control}
              name="max_storage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Max Storage</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Max Storage" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Product Limit */}
            <FormField
              control={form.control}
              name="product_limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Product Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Product Limit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Precedence */}
            <FormField
              control={form.control}
              name="precedence"
              rules={{ required: "Precedence is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    Precedence <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Precedence" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* ── Subscription Periods — full width ───────────────────────── */}
            <div className="col-span-full space-y-3">
              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Subscription Periods</p>
                  <p className="text-muted-foreground text-xs">
                    Discount type is always percentage. Leave offer % empty for
                    no discount.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={addPeriod}
                >
                  <Plus className="mr-1 h-3.5 w-3.5" />
                  Add Period
                </Button>
              </div>

              <div className="space-y-3">
                {periods.map((_, index) => (
                  <div
                    key={index}
                    className="bg-muted/40 grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-3 rounded-lg border p-4"
                  >
                    {/* Price */}
                    <FormField
                      control={form.control}
                      name={`subscription_periods.${index}.price`}
                      rules={{ required: "Price is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">
                            Price <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="e.g. 29.99"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Duration (months) */}
                    <FormField
                      control={form.control}
                      name={`subscription_periods.${index}.duration`}
                      rules={{ required: "Duration is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">
                            Duration (months){" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g. 1, 6, 12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Offer Percentage */}
                    <FormField
                      control={form.control}
                      name={`subscription_periods.${index}.offer_percentage`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">
                            Offer % (optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="e.g. 10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Remove button — only show when more than one period */}
                    <div className="flex justify-end pb-0.5">
                      {periods.length > 1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive h-9 w-9"
                          onClick={() => removePeriod(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        // Keep the grid column balanced when remove isn't shown
                        <div className="h-9 w-9" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visibility / Is Active */}
            <div className="col-span-full space-y-3">
              <Separator />

              <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Visibility
              </div>

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="bg-muted/40 flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "mt-0.5 h-2 w-2 shrink-0 rounded-full",
                          field.value ? "bg-success" : "bg-muted-foreground",
                        )}
                      />
                      <div className="space-y-0.5">
                        <FormLabel className="cursor-pointer">
                          {field.value
                            ? "Active - visible to customers"
                            : "Inactive - hidden from customers"}
                        </FormLabel>
                        <p className="text-muted-foreground text-xs">
                          {field.value
                            ? "Package will appear on the pricing page immediately after saving"
                            : "Package will be saved as a draft and not shown publicly"}
                        </p>
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link to="/super-admin/packages">
                <ChevronLeft /> Back to Home
              </Link>
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              size="sm"
              className="min-w-[105px] text-xs"
            >
              {isUpdating || isCreating ? (
                <>
                  <Spinner /> {btnLoadingLabel}
                </>
              ) : (
                btnLabel
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
