import { Outlet } from "react-router";
import ThemeEditorSidebar from "@/features/admin/theme-editor/components/layout/ThemeEditorSidebar";
import Canvas from "@/features/admin/theme-editor/components/Canvas";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import SectionEditor from "@/features/admin/theme-editor/components/layout/SectionEditor";
import PreviewModeBar from "../components/layout/PreviewModeBar";
import ThemeEditorHeader from "../components/layout/ThemeEditorHeader";
import useThemeEditor from "../hooks/useThemeEditor";
import ThemeEditorSidebarSkeleton from "../components/skeletons/ThemeEditorSidebarSkeleton";
import CanvasSkeleton from "../components/skeletons/CanvasSkeleton";
import CountrySelectModal from "@/components/storefront/modals/CountrySelectModal";

export default function ThemeEditorLayout() {
  const { isPreviewMode, isLoading } = useThemeEditor();

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
          <Header />
          <Outlet />
          <Footer />
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
