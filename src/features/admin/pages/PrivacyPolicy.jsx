import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, Shield } from "lucide-react";
import SunEditor from "suneditor-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import InfoBanner from "@/features/admin/components/sections/support/InfoBanner";
import PageHeader from "@/components/shared/PageHeader";
import QuickTips from "@/features/admin/components/sections/support/QuickTips";
import { Spinner } from "@/components/ui/spinner";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function PrivacyPolicy() {
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/general/privacyPolicy/${activeStore?.id}`,
    enabled: true,
    isTokenRequired: true,
    queryKey: ["privacyPolicy", activeStore?.id],
  });

  const isEditMode = !!data?.data?.id;
  const [content, setContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const isEmptyHtml = (html) => {
      if (!html) return true;
      const text = html.replace(/<[^>]+>/g, "").trim();
      return text.length === 0;
    };

    if (isEditMode) {
      const description = data.data?.description ?? "";
      setContent(isEmptyHtml(description) ? "" : description);
    } else {
      setContent("");
    }

    setHasUnsavedChanges(false);
  }, [isEditMode, data?.data]);

  const handleContentChange = (content) => {
    setContent(content);
    setHasUnsavedChanges(content !== data?.data?.description);
  };

  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/general/privacyPolicy",
    isTokenRequired: true,
  });

  const { mutate: update, isPending: isUpdating } = usePatchMutation({
    endpoint: `/api/v1/general/privacyPolicy/${activeStore?.id}/${data?.data?.id}`,
    isTokenRequired: true,
  });

  const onSubmit = () => {
    if (!content?.trim()) {
      return toast.error("Privacy Policy content can't be empty!");
    }

    const payload = { description: content, store_id: activeStore?.id };

    const onSuccess = (data) => {
      if (!data?.success) {
        return toast.error(data?.message);
      }

      setHasUnsavedChanges(false);
      toast.success(data?.message);
    };

    const onError = (error) => {
      console.log(error);
    };

    if (!isEditMode) {
      mutate(payload, {
        onSuccess,
        onError,
      });

      return;
    }

    update(payload, {
      onSuccess,
      onError,
    });
  };

  const isDisabled =
    data?.data?.description === content ||
    !hasUnsavedChanges ||
    !content.trim() ||
    isLoading ||
    isPending ||
    isUpdating;

  const btnLabel = isEditMode ? "Save Changes" : "Create Privacy Policy";
  const btnLoadingLabel = isEditMode ? "Saving..." : "Creating...";

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.privacyPolicy} />

      {/* Page Header */}
      <PageHeader
        icon={Shield}
        title="Privacy Policy"
        description="Manage the content displayed on your store's Privacy Policy page."
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        {isEditMode && <InfoBanner />}

        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Article Content</h2>

          <SunEditor
            name="content"
            height="400px"
            setContents={content}
            onChange={handleContentChange}
            setOptions={{
              buttonList: [
                [
                  "undo",
                  "redo",
                  "formatBlock",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                ],
                ["fontSize", "fontColor", "hiliteColor", "removeFormat"],
                ["align", "list", "outdent", "indent", "lineHeight"],
                [
                  "blockquote",
                  "horizontalRule",
                  "table",
                  "link",
                  "image",
                  "video",
                ],
                ["fullScreen", "showBlocks", "preview"],
              ],
              charCounter: true,
              charCounterLabel: "Characters:",

              formats: [
                "p",
                "div",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "blockquote",
              ],
              fontSize: [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36],
            }}
          />

          <QuickTips />
        </div>

        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link to="/">
              <ChevronLeft /> Back to Home
            </Link>
          </Button>

          <Button onClick={onSubmit} disabled={isDisabled} size="sm">
            {isPending || isUpdating ? (
              <>
                <Spinner /> {btnLoadingLabel}
              </>
            ) : (
              btnLabel
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
