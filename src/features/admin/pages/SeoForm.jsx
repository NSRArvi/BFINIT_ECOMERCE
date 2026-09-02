import { Search } from "lucide-react";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/shared/PageHeader";
import TitleDescriptionForm from "../components/sections/seo-form/TitleDescriptionForm";
import useSelectedStore from "@/hooks/useSelectedStore";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function SeoForm() {
  const { activeStore } = useSelectedStore();

  if (!activeStore) {
    return (
      <EmptyState
        title="Store Required"
        description="Create a store first to optimize your storefront for search engines."
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.seo} />

      {/* Page Header */}
      <PageHeader
        icon={Search}
        title="SEO & Meta"
        description="Manage SEO settings and meta tags for"
      />

      {/* Form with preview */}
      <TitleDescriptionForm />
    </section>
  );
}
