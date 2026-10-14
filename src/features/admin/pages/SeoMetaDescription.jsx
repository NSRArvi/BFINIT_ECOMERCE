import { Search } from "lucide-react";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import SeoForm from "../components/sections/seo-metadescription/SeoForm";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function SeoMetaDescription() {
  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.seo} />
      <PageHeader
        icon={Search}
        title="SEO & Meta"
        description="Optimize how your store shows up in search results"
      />
      <SeoForm />
    </section>
  );
}
