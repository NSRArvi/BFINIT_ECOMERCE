import { Pencil } from "lucide-react";
import { componentMap } from "@/components/theme-renderer/componentMap";
import useThemeEditor from "@/features/admin/theme-editor/hooks/useThemeEditor";

export default function SectionRenderer({ sections = [] }) {
  const { activeSection, setActiveSection, isPreviewMode, isEditing } =
    useThemeEditor();

  const renderSection = (section, index) => {
    if (!section.visible) return null;

    const Component = componentMap[section.templateId];

    if (!Component) {
      console.warn(`Component not found for templateId: ${section.templateId}`);
      return (
        <div key={section.id} className="border-b bg-gray-50 p-8 text-center">
          <p className="text-gray-500">
            Preview not available for: {section.name}
          </p>
        </div>
      );
    }

    const isActive = activeSection === section.id;

    return (
      <div
        key={section?.id || `section-${index}`}
        onClick={() => setActiveSection(section.id)}
        className="group/section relative"
      >
        {/* section hover effect */}
        {isEditing && !isPreviewMode && !isActive && (
          <>
            <div className="border-muted-foreground/40 pointer-events-none absolute inset-0 z-100 border border-dashed opacity-0 transition-opacity group-hover/section:opacity-100" />

            <div className="bg-muted text-muted-foreground pointer-events-none absolute -top-3 left-3 z-100 rounded px-1.5 py-0.5 text-xs font-medium opacity-0 transition-opacity group-hover/section:opacity-100">
              {section.name}
            </div>
          </>
        )}

        {/* section editing active style */}
        {isEditing && !isPreviewMode && isActive && (
          <>
            <div className="border-primary pointer-events-none absolute inset-0 z-100 border border-dashed" />

            <div className="bg-primary text-primary-foreground absolute -top-3 left-3 z-100 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium">
              <Pencil className="size-3.5" /> Editing
            </div>
          </>
        )}

        <Component content={section.content} isEditing />
      </div>
    );
  };

  return <>{sections?.map(renderSection)}</>;
}
