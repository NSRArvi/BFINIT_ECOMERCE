import { Check } from "lucide-react";
import { getImgUrl } from "@/utils/getImgUrl";

export default function ServicesGrid({ content }) {
  const { eyebrow, title, description, showCta, ctaText, services } =
    content || {};

  const validServices = (services || []).filter((s) => s.title?.trim());

  if (validServices.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 px-4 py-16 sm:px-6 md:space-y-10 md:py-24 lg:px-8">
      <div className="md:text-center">
        {eyebrow?.trim() && (
          <div className="border-border inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-medium tracking-wide uppercase">
            <span className="bg-primary size-1.5 rounded-full" />
            {eyebrow}
          </div>
        )}

        {title?.trim() && (
          <h2 className="my-4 text-3xl leading-tight font-medium tracking-tight text-balance uppercase md:mb-5 md:text-4xl lg:text-5xl">
            {title}
          </h2>
        )}

        {description?.trim() && (
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm text-balance md:text-base">
            {description}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {validServices.map((service, index) => {
          const tagList = (service.tags || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

          const featureList = (service.features || "")
            .split("\n")
            .map((f) => f.trim())
            .filter(Boolean);

          return (
            <div
              key={index}
              className="border-border relative flex flex-col gap-4 rounded-none border p-6"
            >
              {service.badge?.trim() && (
                <span className="bg-primary text-primary-foreground absolute top-0 right-0 px-3 py-1 text-xs font-medium uppercase">
                  {service.badge}
                </span>
              )}

              {service.image?.url && (
                <div className="bg-muted aspect-video w-full overflow-hidden">
                  <img
                    src={getImgUrl(service.image.url)}
                    alt={service.title || ""}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <h3 className="text-lg font-semibold tracking-tight uppercase">
                {service.title}
              </h3>

              {service.description?.trim() && (
                <p className="text-muted-foreground text-sm text-balance">
                  {service.description}
                </p>
              )}

              {featureList.length > 0 && (
                <ul className="space-y-2">
                  {featureList.map((feature, i) => (
                    <li
                      key={i}
                      className="text-foreground flex items-start gap-2 text-sm"
                    >
                      <Check className="text-primary mt-0.5 size-4 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {service.priceLabel?.trim() && (
                <p className="text-sm font-semibold">{service.priceLabel}</p>
              )}

              {tagList.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tagList.map((tag, i) => (
                    <span
                      key={i}
                      className="border-border text-muted-foreground border px-2 py-0.5 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {showCta && ctaText?.trim() && (
                <a
                  href="/contact"
                  className="border-border mt-auto inline-block w-fit border px-4 py-2 text-xs font-medium uppercase"
                >
                  {ctaText}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
