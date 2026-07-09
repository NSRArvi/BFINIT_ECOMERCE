import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { sectionTemplates } from "@/features/admin/theme-editor/config/sectionTemplates";

export default function AddSectionModal({ isOpen, onClose, onAddSection }) {
  const [selectedTab, setSelectedTab] = useState("header");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  if (!isOpen) return null;

  const tabs = [
    { id: "header", label: "Header" },
    { id: "hero", label: "Hero" },
    { id: "products", label: "Products" },
    { id: "content", label: "Content" },
    { id: "footer", label: "Footer" },
  ];

  const templates = sectionTemplates[selectedTab] || [];

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
      <DialogContent className="w-full max-w-4xl!">
        <DialogHeader>
          <DialogTitle>Add Section</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Choose a section template to add to your page
          </p>
        </DialogHeader>

        {/* modal content */}
        <div className="space-y-4">
          {/* Tabs */}
          <div className="border-b">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedTab(tab.id);
                    setSelectedTemplate(null);
                  }}
                  className={`cursor-pointer px-4 py-3 text-sm font-medium transition-colors ${
                    selectedTab === tab.id
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-muted-foreground hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="max-h-[450px] overflow-y-auto">
            {templates.length === 0 ? (
              <div className="text-muted-foreground py-12 text-center">
                No templates available for this category
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`flex cursor-pointer flex-col items-start rounded-lg border p-4 text-left transition-all hover:border-blue-300 hover:shadow ${
                      selectedTemplate?.id === template.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-muted"
                    }`}
                  >
                    <div className="mb-3 flex h-24 w-full items-center justify-center rounded-lg bg-gray-100 text-5xl">
                      {template.thumbnail}
                    </div>
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {template.description}
                    </p>
                    {template.singleInstance && (
                      <span className="mt-2 inline-flex rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                        Replaces existing
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t px-6 py-4">
            <Button
              onClick={handleClose}
              variant="outline"
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddSection}
              disabled={!selectedTemplate}
              className="cursor-pointer"
            >
              Add Section
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
