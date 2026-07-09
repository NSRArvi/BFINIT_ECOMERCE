import { useNavigate, useParams } from "react-router";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import useThemeEditor from "../../hooks/useThemeEditor";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";

export default function ThemeEditorHeader() {
  const { storeId, themeId } = useParams();
  const navigate = useNavigate();

  const { sections, isLoading, handleTogglePreview } = useThemeEditor();

  const handleExit = () => {
    navigate("/themes");
  };

  const { mutate, isPending } = usePatchMutation({
    endpoint: `/api/v1/themes/storeTheme/update/${storeId}/${themeId}`,
    isTokenRequired: true,
  });

  const handleSave = () => {
    const payload = {
      theme_configuration: sections,
    };

    mutate(payload, {
      onSuccess: (data) => {
        if (!data?.success) {
          return toast.error(data?.message);
        }
        toast.success(data?.message);
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <nav className="bg-background flex items-center justify-between border-b px-6 py-2.5">
      {/* Store Identity */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold">My Store</h1>
        <div className="bg-border h-5 w-px" />
        <span className="text-muted-foreground text-xs">Theme Editor</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          onClick={handleTogglePreview}
          disabled={isPending || isLoading}
          size="sm"
          variant="outline"
        >
          Preview
        </Button>

        <Button
          onClick={handleSave}
          disabled={isPending || isLoading}
          size="sm"
        >
          Save
        </Button>

        <div className="bg-border mx-1 h-5 w-px" />

        <Button
          onClick={handleExit}
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-destructive h-8 w-8 transition-colors"
          title="Exit editor"
        >
          <LogOut />
        </Button>
      </div>
    </nav>
  );
}
