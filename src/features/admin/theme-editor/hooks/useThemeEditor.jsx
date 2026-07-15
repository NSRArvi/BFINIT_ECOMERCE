import { useContext } from "react";
import { ThemeEditorContext } from "../context/ThemeEditorContext";

const defaultThemeEditorState = {
  activeSection: null,
  setActiveSection: () => {},
  sections: { header: [], body: [], footer: [] },
  storeThemeId: undefined,
  isPreviewMode: false,
  isUploading: false,
  isLoading: false,
  isEditing: false,
  setIsUploading: () => {},
  handleTogglePreview: () => {},
  handleToggleVisibility: () => {},
  handleApplyChanges: () => {},
  handleCancel: () => {},
  handleAddSection: () => {},
  handleReorderSections: () => {},
  handleDeleteSection: () => {},
};

export default function useThemeEditor() {
  const context = useContext(ThemeEditorContext);
  return context ?? defaultThemeEditorState;
}
