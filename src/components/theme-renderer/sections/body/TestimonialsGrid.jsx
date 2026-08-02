import { getImgUrl } from "@/utils/getImgUrl";

export default function TestimonialsGrid({ content }) {
  const { eyebrow, title, description, testimonials } = content || {};

  const validTestimonials = (testimonials || []).filter((t) => t.quote?.trim());

  if (validTestimonials.length === 0) return null;

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
        {validTestimonials.map((t, index) => (
          <div
            key={index}
            className="border-border flex flex-col gap-4 rounded-none border p-6"
          >
            <p className="text-foreground text-sm text-balance md:text-base">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="mt-auto flex items-center gap-3 pt-2">
              {t.image?.url && (
                <img
                  src={getImgUrl(t.image.url)}
                  alt={t.name || ""}
                  className="size-10 rounded-full object-cover"
                />
              )}
              <div>
                {t.name?.trim() && (
                  <p className="text-sm font-medium">{t.name}</p>
                )}
                {t.role?.trim() && (
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
