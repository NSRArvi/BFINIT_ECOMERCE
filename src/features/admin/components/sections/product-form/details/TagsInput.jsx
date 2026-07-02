import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function TagsInput({ id, value = [], onChange }) {
  const [currentTag, setCurrentTag] = useState("");

  const addTag = (currentTag) => {
    const tag = currentTag.trim();

    if (!tag) return;
    if (value.length >= 10) return;
    if (value.some((t) => t.toLowerCase() === tag.toLowerCase())) return;

    onChange([...value, tag]);
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(currentTag);
      setCurrentTag("");
    }

    if (e.key === "Backspace" && currentTag === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleBlur = () => {
    addTag(currentTag);
    setCurrentTag("");
  };

  const isLimitReached = value.length >= 10;

  return (
    <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex h-9 w-full items-center gap-1.5 rounded-md border px-3 text-sm focus-within:ring-1">
      <div className="custom-scrollbar-hide flex items-center gap-1.5 overflow-x-auto">
        {value.map((tag) => (
          <span
            key={tag}
            className="bg-secondary inline-flex shrink-0 gap-1.5 rounded px-2 py-1 text-xs"
          >
            {tag}

            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => removeTag(tag)}
              type="button"
              className="text-destructive hover:bg-destructive/10 rounded-full p-0.5"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
      </div>

      <Input
        disabled={isLimitReached}
        id={id}
        value={currentTag}
        placeholder={
          isLimitReached ? "Tag Limit Reached" : "Type a tag and press Enter"
        }
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="h-full min-w-1/4 flex-1 shrink-0 border-0 px-0 focus-visible:ring-0"
      />
    </div>
  );
}
