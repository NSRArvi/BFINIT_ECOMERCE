import { Palette } from "lucide-react";
import ThemeOverview from "../components/sections/themes/ThemeOverview";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/shared/PageHeader";
import ThemeLibrary from "../components/sections/themes/ThemeLibrary";
import useSelectedStore from "@/hooks/useSelectedStore";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function Themes() {
  const { activeStore } = useSelectedStore();

  if (!activeStore) {
    return (
      <EmptyState
        icon={Palette}
        title="Store Required"
        description="Create a store first to choose and customize your storefront theme."
      />
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.themes} />

      <PageHeader
        icon={Palette}
        title="Themes"
        description="Manage your store's theme and customize its appearance"
      />

      <ThemeOverview />
      {/* <ThemeLibrary /> */}
    </section>
  );
}
