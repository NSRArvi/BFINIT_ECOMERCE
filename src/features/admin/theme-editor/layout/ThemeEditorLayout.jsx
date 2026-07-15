import { Outlet } from "react-router";
import ThemeEditorSidebar from "@/features/admin/theme-editor/components/layout/ThemeEditorSidebar";
import Canvas from "@/features/admin/theme-editor/components/Canvas";
import SectionEditor from "@/features/admin/theme-editor/components/layout/SectionEditor";
import PreviewModeBar from "../components/layout/PreviewModeBar";
import ThemeEditorHeader from "../components/layout/ThemeEditorHeader";
import useThemeEditor from "../hooks/useThemeEditor";
import ThemeEditorSidebarSkeleton from "../components/skeletons/ThemeEditorSidebarSkeleton";
import CanvasSkeleton from "../components/skeletons/CanvasSkeleton";
import CountrySelectModal from "@/components/storefront/modals/CountrySelectModal";
import SectionRenderer from "@/components/theme-renderer/SectionRenderer";

export default function ThemeEditorLayout() {
  const {
    sections,
    activeSection,
    isLoading,
    isPreviewMode,
    isEditing,
    setActiveSection,
  } = useThemeEditor();

  let content = null;

  if (isLoading) {
    content = (
      <>
        <ThemeEditorSidebarSkeleton />
        <CanvasSkeleton />
      </>
    );
  }

  if (!isLoading) {
    content = (
      <>
        {!isPreviewMode && <ThemeEditorSidebar />}

        <Canvas>
          <CountrySelectModal isEditing />
          <header className="sticky top-0 z-50">
            <SectionRenderer
              sections={sections?.header}
              activeSection={activeSection}
              isEditing={isEditing}
              isPreviewMode={isPreviewMode}
              setActiveSection={setActiveSection}
            />
          </header>
          <Outlet />
          <footer>
            <SectionRenderer
              sections={sections?.footer}
              activeSection={activeSection}
              isEditing={isEditing}
              isPreviewMode={isPreviewMode}
              setActiveSection={setActiveSection}
            />
          </footer>
        </Canvas>

        {!isPreviewMode && <SectionEditor />}
      </>
    );
  }

  return (
    <main className="font-geist bg-muted">
      {isPreviewMode ? <PreviewModeBar /> : <ThemeEditorHeader />}

      <div className="flex justify-between">{content}</div>
    </main>
  );
}
