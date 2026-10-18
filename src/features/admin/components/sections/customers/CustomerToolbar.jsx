import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export default function CustomerToolbar({
  isFetching,
  searchInput,
  setSearchInput,
}) {
  return (
    <div className="flex items-center justify-end gap-4">
      <div className="relative w-full max-w-72">
        {isFetching ? (
          <div className="text-muted-foreground absolute top-1/2 left-2.5 -translate-y-1/2">
            <Spinner className="size-3.5" />
          </div>
        ) : (
          <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
        )}
        <Input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          placeholder="Search by name, email or phone"
          className="pl-7 placeholder:text-xs md:text-xs"
        />
      </div>
    </div>
  );
}
