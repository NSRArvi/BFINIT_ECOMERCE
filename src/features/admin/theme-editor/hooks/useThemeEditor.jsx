import { useContext } from "react";
import { ThemeEditorContext } from "../context/ThemeEditorContext";

export default function useThemeEditor() {
  return useContext(ThemeEditorContext);
}
