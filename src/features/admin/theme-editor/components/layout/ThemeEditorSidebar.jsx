import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SectionItem from "../sidebar/SectionItem";
import AddSectionModal from "../modals/AddSectionModal";
import ThemeSwitcher from "../sidebar/ThemeSwitcher";
import useThemeEditor from "../../hooks/useThemeEditor";

export default function ThemeEditorSidebar() {
  const {
    handleReorderSections,
    handleAddSection: onAddSection,
    sections,
  } = useThemeEditor();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleAddSection = (template) => {
    onAddSection(template);
    setIsModalOpen(false);
  };

  const handleDragEnd = (event, category) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    handleReorderSections(category, active.id, over.id);
  };

  const renderSectionGroup = (category, title) => {
    const categorySections = sections[category] || [];

    return (
      <div className="space-y-2">
        <h3 className="text-muted-foreground px-0.5 text-[11px] font-semibold tracking-wider uppercase">
          {title}
        </h3>
        <div className="space-y-1.5">
          {categorySections.length === 0 ? (
            <div className="bg-muted/30 rounded-lg border border-dashed px-4 py-5">
              <p className="text-muted-foreground text-center text-[11px]">
                No {category} {category === "body" ? "sections" : "section"}
              </p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, category)}
            >
              <SortableContext
                items={categorySections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {categorySections.map((section) => (
                  <SectionItem key={section.id} section={section} />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <aside className="flex h-[calc(100vh-63px)] w-full max-w-64 flex-col border-r bg-white">
        {/* Header */}
        <div className="bg-card border-b px-4 py-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold">Sections</h2>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs"
            >
              <Plus size={14} /> Add
            </Button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="custom-scrollbar-hide flex-1 overflow-y-auto px-4 py-3">
          <div className="space-y-6">
            {renderSectionGroup("header", "Header")}
            {renderSectionGroup("body", "Body")}
            {renderSectionGroup("footer", "Footer")}

            {/* <ThemeSwitcher /> */}
          </div>
        </div>
      </aside>

      {/* Add Section Modal */}
      <AddSectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSection={handleAddSection}
      />
    </>
  );
}
