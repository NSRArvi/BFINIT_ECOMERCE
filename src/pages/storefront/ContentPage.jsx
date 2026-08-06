import { useParams } from "react-router";
import Hero from "@/components/storefront/sections/content/Hero";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { ContentPageSkeleton } from "@/components/storefront/loader/ContentPageSkeleton";
import { EmptyContent } from "@/components/storefront/sections/content/EmptyContent";

export default function ContentPage({ title, apiEndpoint }) {
  const { storeId } = useParams();

  const endpointUrl =
    apiEndpoint && storeId ? `${apiEndpoint}/${storeId}` : null;

  const { data, isLoading } = useGetQuery({
    endpoint: endpointUrl,
    queryKey: [endpointUrl],
    enabled: !!endpointUrl,
  });

  if (isLoading) {
    return <ContentPageSkeleton title={title} />;
  }

  if (!data?.data) {
    return <EmptyContent title={title} />;
  }

  // TODO: content api description property name will be just description
  const content =
    data?.data?.aboutDescription ||
    data?.data?.description ||
    data?.data?.description ||
    data?.data;

  return (
    <div>
      <Hero title={title} />

      <div
        id="content-display"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <article dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
