import { Check } from "lucide-react";
import useThemeEditor from "../../hooks/useThemeEditor";

const themes = [
  {
    id: "default",
    name: "Default",
    category: "General",
    colors: ["#3b82f6", "#8b5cf6", "#06b6d4"],
  },
  //   {
  //     id: "modern",
  //     name: "Modern Dark",
  //     category: "General",
  //     colors: ["#6366f1", "#1f2937", "#10b981"],
  //   },
  //   {
  //     id: "elegant",
  //     name: "Elegant",
  //     category: "Fashion",
  //     colors: ["#ec4899", "#000000", "#f59e0b"],
  //   },
  //   {
  //     id: "fresh",
  //     name: "Fresh",
  //     category: "Food & Nature",
  //     colors: ["#22c55e", "#84cc16", "#fb923c"],
  //   },
];

export default function ThemeSwitcher() {
  const { colorTheme, setColorTheme } = useThemeEditor();

  return (
    <div className="space-y-2">
      <h3 className="text-muted-foreground px-0.5 text-[11px] font-semibold tracking-wider uppercase">
        Themes
      </h3>

      <div className="space-y-1.5">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setColorTheme(theme.id)}
            className={`bg-accent flex w-full items-center gap-2.5 rounded-md border p-2 pl-2.5 text-xs font-medium transition-colors ${
              theme.id === colorTheme
                ? "bg-accent border-accent-foreground/20"
                : "border-border text-muted-foreground bg-card hover:bg-accent/50"
            }`}
          >
            <div className="inline-flex items-center gap-0.5">
              {theme.colors.map((color) => (
                <div
                  key={color}
                  className="size-3.5 rounded-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <p className="flex-1">{theme.name}</p>

            {theme.id === colorTheme && <Check className="size-3.5 shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
}
