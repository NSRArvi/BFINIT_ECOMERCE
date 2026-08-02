import { useState } from "react";
import {
  PanelTop,
  Sparkles,
  ShoppingBag,
  FileText,
  PanelBottom,
  Lock,
  Info,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { sectionTemplates } from "@/features/admin/theme-editor/config/sectionTemplates";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TABS = [
  { id: "header", label: "Header", icon: PanelTop },
  { id: "hero", label: "Hero", icon: Sparkles },
  { id: "products", label: "Products", icon: ShoppingBag },
  { id: "content", label: "Content", icon: FileText },
  { id: "footer", label: "Footer", icon: PanelBottom },
];

export default function AddSectionModal({ isOpen, onClose, onAddSection }) {
  const [selectedTab, setSelectedTab] = useState("header");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = sectionTemplates[selectedTab] || [];

  const handleTabSelect = (id) => {
    setSelectedTab(id);
    setSelectedTemplate(null);
  };

  const handleAddSection = () => {
    if (selectedTemplate) {
      onAddSection(selectedTemplate);
      setSelectedTemplate(null);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedTab("header");
    setSelectedTemplate(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Choose a Section</DialogTitle>
          <DialogDescription>
            Select a section template for your homepage
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted flex w-fit gap-1 rounded-lg p-1">
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => handleTabSelect(tab.id)}
              size="sm"
              variant="ghost"
              className={cn(
                tab.id === selectedTab
                  ? "bg-background text-foreground hover:bg-background hover:cursor-default"
                  : "hover:bg-background/60",
              )}
            >
              <tab.icon />
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="custom-scrollbar-hide grid h-[50dvh] grid-cols-4 items-start gap-4 overflow-y-auto">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              onKeyDown={(e) =>
                e.key === "Enter" && setSelectedTemplate(template)
              }
              role="button"
              tabIndex={0}
              className={cn(
                "flex min-h-64 flex-col overflow-hidden rounded-lg border text-left",
                selectedTemplate.id === template.id && "border-primary",
              )}
            >
              <img
                src={
                  "https://cdn.dribbble.com/userupload/15111095/file/original-936cd4f19002c360ef4d5697eaa47e99.jpg?resize=1024x1024&vertical=center"
                }
                alt={template.name}
                className="h-32 w-full shrink-0 object-cover"
              />
              <div className="flex flex-1 flex-col p-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">{template.name}</h3>
                  <p className="text-muted-foreground text-xs">
                    {template.description}
                  </p>
                </div>
                {template.singleInstance && (
                  <div className="text-muted-foreground mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Lock className="size-3.5" />
                      <span className="text-xs">One per page</span>
                    </div>

                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="size-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        This section can only be added once to your homepage
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-4 border-t px-6 py-4">
          <div className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
            <Lightbulb className="text-info size-4 shrink-0" />
            <p>Single instance sections can only be added once per page</p>
          </div>

          <div className="space-x-3">
            <Button onClick={handleClose} variant="outline" size="sm">
              Cancel
            </Button>
            <Button
              disabled={!selectedTemplate}
              onClick={handleAddSection}
              size="sm"
            >
              Add Section
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
