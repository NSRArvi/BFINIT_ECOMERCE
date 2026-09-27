import { useParams } from "react-router";
import Hero from "../components/contact/Hero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import useGetQuery from "@/hooks-v2/api/useGetQuery";

export default function Contact() {
  const { storeId } = useParams();

  const { data } = useGetQuery({
    endpoint: `/api/v1/stores/${storeId}/info`,
    enabled: !!storeId,
    queryKey: ["store", storeId],
  });

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Contact Information Sidebar */}
          <ContactInfo data={data?.data} />

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
