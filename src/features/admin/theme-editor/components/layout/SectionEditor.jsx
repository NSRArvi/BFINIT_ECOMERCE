import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyEditorState from "../editor/EmptyEditorState";
import DynamicFormField from "../editor/DynamicFormField";
import useThemeEditor from "../../hooks/useThemeEditor";

export default function SectionEditor() {
  const {
    activeSection,
    sections,
    isUploading,
    handleApplyChanges,
    handleCancel,
  } = useThemeEditor();

  const [formData, setFormData] = useState({});

  // Find the active section
  const section = [
    ...sections.header,
    ...sections.body,
    ...sections.footer,
  ].find((s) => s.id === activeSection);

  // Initialize form data when section changes
  useEffect(() => {
    if (section) {
      setFormData(section.content);
    }
  }, [section]);

  const handleCancelClick = () => {
    setFormData(section.content);
    handleCancel();
  };

  // If no section is selected on SectionSidebar show nothing
  if (!activeSection || !section) {
    return null;
  }

  // Get the field schema for this section
  const fieldSchema = section.fieldSchema;

  if (!fieldSchema || !fieldSchema.length) {
    return (
      <EmptyEditorState
        section={section}
        handleCancelClick={handleCancelClick}
      />
    );
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = () => {
    handleApplyChanges(section.id, formData);
  };

  return (
    <aside className="flex h-[calc(100vh-63px)] w-full max-w-80 flex-col border-l bg-white">
      {/* Header - Matches SectionSidebar styling exactly */}
      <div className="bg-card flex items-start justify-between gap-3 border-b px-4 py-2.5">
        <div>
          <h2 className="text-xs font-semibold">{section.name}</h2>
          <p className="text-muted-foreground mt-0.5 text-[11px]">
            Edit section content
          </p>
        </div>
        <button
          onClick={handleCancelClick}
          className="hover:bg-accent shrink-0 rounded-md p-1 transition-colors"
          aria-label="Close"
        >
          <X className="text-muted-foreground h-3.5 w-3.5" />
        </button>
      </div>

      {/* Scrollable Form Content */}
      <div className="custom-scrollbar-hide flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-5">
          {section.fieldSchema.map((field) => (
            <DynamicFormField
              key={field.key}
              field={field}
              value={formData[field.key]}
              onChange={(value) => handleInputChange(field.key, value)}
            />
          ))}
        </div>
      </div>

      {/* Footer Actions - Refined button hierarchy */}
      <div className="bg-card border-t px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleCancelClick}
            variant="outline"
            size="sm"
            className="h-8 flex-1 text-xs font-medium"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            size="sm"
            disabled={isUploading}
            className="h-8 flex-1 text-xs font-medium"
          >
            {isUploading ? "Uploading..." : "Apply Changes"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
