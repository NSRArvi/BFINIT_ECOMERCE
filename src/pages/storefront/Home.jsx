import SectionRenderer from "@/components/storefront/core/SectionRenderer";
import useThemeEditor from "@/features/admin/theme-editor/hooks/useThemeEditor";

export default function Home() {
  const { sections, activeSection } = useThemeEditor();

  return (
    <SectionRenderer
      sections={sections?.body}
      activeSection={activeSection}
      isEditorMode={true}
    />
  );
}
