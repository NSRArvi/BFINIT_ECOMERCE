import { Search } from "lucide-react";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import TitleDescriptionForm from "../components/sections/seo-form/TitleDescriptionForm";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function SeoForm() {
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
