import SectionRenderer from "./core/SectionRenderer";
import useThemeEditor from "@/features/admin/theme-editor/hooks/useThemeEditor";

export default function Header() {
  const { sections } = useThemeEditor();

  return (
    <header className="sticky top-0 z-50">
      <SectionRenderer sections={sections?.header} />
    </header>
  );
}
