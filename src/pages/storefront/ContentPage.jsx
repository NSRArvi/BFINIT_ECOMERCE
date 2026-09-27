import { useParams } from "react-router";
import ContentPageSkeleton from "@/components/storefront/loader/ContentPageSkeleton";
import EmptyContent from "@/features/storefront/components/EmptyContent";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { EMPTY_CONTENT_COPY } from "@/features/storefront/utils/constants/emptyContentCopy";

export default function ContentPage({ title, apiEndpoint }) {
  const { storeId } = useParams();

  const endpointUrl = `${apiEndpoint}/${storeId}`;

  const { data, isLoading } = useGetQuery({
    endpoint: endpointUrl,
    enabled: !!endpointUrl && !!storeId,
    queryKey: [endpointUrl, storeId],
  });

  let content = null;

  if (isLoading) {
    content = <ContentPageSkeleton />;
  } else if (!isLoading && data?.success && data?.data?.description) {
    content = (
      <div
        id="content-display"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <article
          dangerouslySetInnerHTML={{ __html: data?.data?.description }}
        />
      </div>
    );
  } else {
    content = (
      <EmptyContent
        title={EMPTY_CONTENT_COPY[title].title}
        description={EMPTY_CONTENT_COPY[title].description}
      />
    );
  }

  return (
    <section>
      <div className="bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{title}</h1>
        </div>
      </div>

      {content}
    </section>
  );
}
