import { useRef } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ChevronLeft, PenSquare, Upload, X } from "lucide-react";
import SunEditor from "suneditor-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "@/components/shared/PageHeader";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import useSelectedStore from "@/hooks/useSelectedStore";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { getImgUrl } from "@/utils/getImgUrl";
import { breadcrubms } from "@/features/admin/utils/constants/breadcrumbs";
import { sunEditorOptions } from "@/config/sunEditorOptions";

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeStore } = useSelectedStore();

  const isEditMode = !!id;

  const { data, isLoading: isBlogDetailsLoading } = useGetQuery({
    endpoint: `/api/v1/general/blog/${activeStore?.id}/${id}`,
    enabled: !!activeStore?.id && !!id,
    isTokenRequired: true,
    queryKey: ["blog", activeStore?.id, id],
  });

  const blogDetails = data?.data;

  const imgRef = useRef();
  const sunEditorRef = useRef();

  const form = useForm({
    values: {
      blogImages: blogDetails?.image
        ? { preview: getImgUrl(blogDetails.image), isExisting: true }
        : null,
      title: blogDetails?.title ?? "",
      short_description: blogDetails?.short_description ?? "",
      description: blogDetails?.description ?? "",
    },
  });

  const { handleSubmit } = form;

  const handleFileInput = (e, onChange) => {
    const files = e.target.files;

    const file = files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return;
    }

    // Validate file size
    const maxFileSize = 2000 * 1024;
    if (file.size > maxFileSize) {
      toast.error("File size must be less than 2MB");
      return;
    }

    const imageData = {
      id: crypto.randomUUID(),
      file: file,
      preview: URL.createObjectURL(file),
      name: file.name,
    };

    onChange(imageData);
  };

  const removeImage = (onChange, currentImage) => {
    if (currentImage && currentImage.preview && !currentImage.isExisting) {
      URL.revokeObjectURL(currentImage.preview);
    }
    if (imgRef.current) {
      imgRef.current.value = "";
    }
    onChange(null);
  };

  const handleDescriptionChange = (content) => {
    form.setValue("description", content);
  };

  const { mutate: createMutate, isPending: isCreatePending } = usePostMutation({
    endpoint: "/api/v1/general/blog",
    isTokenRequired: true,
  });

  const { mutate: updateMutate, isPending: isUpdatePending } = usePatchMutation(
    {
      endpoint: `/api/v1/general/blog/${activeStore?.id}/${blogDetails?.id}`,
      isTokenRequired: true,
    },
  );

  const onSubmit = ({ title, short_description, description, blogImages }) => {
    const payload = new FormData();
    payload.append("store_id", activeStore?.id);
    payload.append("title", title);
    payload.append("description", description);
    payload.append("short_description", short_description);

    if (blogDetails?.id) {
      if (blogImages?.file) {
        payload.append("image", blogImages.file);
        payload.append("deleteImageUrl", JSON.stringify([blogDetails.image]));
      }

      updateMutate(payload, {
        onSuccess: () => {
          toast.success("Blog updated successfully!");
          navigate("/blogs");
        },
        onError: () => {
          toast.error("Failed to update blog. Please try again.");
        },
      });
    } else {
      if (!blogImages?.file) {
        toast.error("Please add a blog image");
        return;
      }

      payload.append("image", blogImages.file);

      createMutate(payload, {
        onSuccess: () => {
          toast.success("Blog published successfully!");
          navigate("/blogs");
        },
        onError: () => {
          toast.error("Failed to publish blog. Please try again.");
        },
      });
    }
  };

  const isLoading = isBlogDetailsLoading || isCreatePending || isUpdatePending;
  const btnLabel = isEditMode ? "Update Blog" : "Publish Blog";
  const btnLoadingLabel = isEditMode ? "Updating..." : "Publishing...";

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.addBlog} />

      <PageHeader
        icon={PenSquare}
        title="Add Blog"
        description="Create and publish blog content for"
      />

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card space-y-6 space-x-4 rounded-lg border p-5 md:space-y-6 md:space-x-6"
        >
          <FormField
            control={form.control}
            name="blogImages"
            rules={{
              required: blogDetails?.id ? false : "Please add a blog image",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  Featured Image <span className="text-destructive">*</span>
                </FormLabel>

                <FormControl>
                  <div className="h-80 w-full">
                    {field.value ? (
                      <div className="group relative h-full">
                        <div className="bg-muted relative h-full w-full overflow-hidden rounded-md border">
                          <img
                            src={field.value.preview}
                            alt={field.value?.name || "Blog image"}
                            className="h-full w-full object-cover"
                          />
                          <button
                            onClick={() =>
                              removeImage(field.onChange, field.value)
                            }
                            type="button"
                            className="bg-destructive text-destructive-foreground absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-md shadow-sm transition-opacity hover:cursor-pointer hover:opacity-90 md:opacity-0 md:group-hover:opacity-100"
                            aria-label="Remove"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => imgRef.current?.click()}
                        className="bg-muted/25 hover:bg-muted/50 flex h-full flex-col items-center justify-center gap-3 rounded-md border border-dashed p-8 hover:cursor-pointer"
                      >
                        <div className="bg-muted rounded-full p-2.5">
                          <Upload className="size-3.5" />
                        </div>
                        <div className="flex flex-col items-center gap-1.5">
                          <h6 className="text-xs font-medium">Upload Image</h6>
                          <p className="text-muted-foreground text-xs">
                            Drag & drop your image here or{" "}
                            <span className="text-foreground font-medium">
                              browse
                            </span>
                          </p>
                        </div>
                        <div className="mt-1 flex flex-col items-center gap-1">
                          <p className="text-muted-foreground text-xs">
                            Maximum 2 MB • Recommended: 1200px × 675px (16:9)
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Supported formats: JPG, PNG & WebP
                          </p>
                        </div>
                      </div>
                    )}

                    <input
                      ref={imgRef}
                      onChange={(e) => handleFileInput(e, field.onChange)}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      className="hidden"
                    />
                  </div>
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div>
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Please enter a blog title",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    Title <span className="text-destructive">*</span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="e.g., 10 Ways to Style Your Summer Wardrobe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="mt-6">
              <FormField
                control={form.control}
                name="short_description"
                rules={{
                  required: "Please enter a short description",
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
          </div>

          <FormField
            control={form.control}
            name="description"
            rules={{
              required: "Please enter blog content",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  Content <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <SunEditor
                    ref={sunEditorRef}
                    onChange={handleDescriptionChange}
                    name="description"
                    setContents={field.value || ""}
                    setOptions={sunEditorOptions}
                    height="220px"
                    placeholder="Write your blog content here..."
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link to="/">
                <ChevronLeft /> Back to Home
              </Link>
            </Button>

            <Button
              disabled={isLoading}
              type="submit"
              size="sm"
              className="min-w-28 text-xs"
            >
              {isCreatePending || isUpdatePending ? (
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
