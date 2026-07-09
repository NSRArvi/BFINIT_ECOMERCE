import SectionRenderer from "./core/SectionRenderer";
import useThemeEditor from "@/features/admin/theme-editor/hooks/useThemeEditor";

export default function Footer() {
  const { sections, activeSection } = useThemeEditor();

  return (
    <SectionRenderer
      sections={sections?.footer}
      activeSection={activeSection}
      isEditorMode={true}
    />
  );
}
