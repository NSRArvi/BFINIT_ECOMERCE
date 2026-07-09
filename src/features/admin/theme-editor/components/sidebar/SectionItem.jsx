import { Eye, EyeOff, GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useThemeEditor from "../../hooks/useThemeEditor";

export default function SectionItem({ section }) {
  const {
    activeSection,
    setActiveSection: onSelect,
    handleToggleVisibility: onToggleVisibility,
    handleDeleteSection: onDelete,
  } = useThemeEditor();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const isActive = activeSection === section.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onSelect(section.id)}
      className={`group relative flex w-full cursor-pointer items-center justify-between rounded-md border transition-all select-none ${
        isActive
          ? "border-[#6366F1]/30 bg-[#6366F1]/10"
          : "border-border bg-card hover:bg-accent/50"
      }`}
    >
      <div className="flex flex-1 items-center">
        <div
          {...attributes}
          {...listeners}
          className="text-muted-foreground hover: cursor-grab py-2 pr-2 pl-2.5 transition-colors active:cursor-grabbing"
        >
          <GripVertical className="size-3.5" />
        </div>
        <span
          className={`truncate pr-2 text-xs ${
            isActive ? "font-medium text-[#6366F1]" : "text-muted-foreground"
          }`}
        >
          {section.name}
        </span>
      </div>

      <div className="flex items-center gap-0.5">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility(section.id);
          }}
          size="icon"
          variant="ghost"
          className={`h-7 w-7 shrink-0 bg-transparent hover:bg-transparent ${
            isActive
              ? "text-[#6366F1] hover:text-[#6366f1]"
              : "text-muted-foreground"
          }`}
        >
          {section.visible ? <Eye size={14} /> : <EyeOff size={14} />}
        </Button>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(section.id);
          }}
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-destructive h-7 w-7 shrink-0 bg-transparent hover:bg-transparent"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
}
