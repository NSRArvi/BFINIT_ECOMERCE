import { Link } from "react-router";

export default function CTABanner({ content }) {
  const {
    eyebrow,
    title,
    description,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink,
  } = content || {};

  return (
    <section className="bg-muted px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
      {eyebrow?.trim() && (
        <span className="text-primary mb-5 inline-block text-xs font-medium tracking-widest uppercase">
          {eyebrow}
        </span>
      )}

      <h2 className="mb-4 text-3xl leading-tight font-medium tracking-tight text-balance uppercase md:text-4xl lg:text-5xl">
        {title}
      </h2>

      <div className="mx-auto max-w-2xl">
        {description?.trim() && (
          <p className="text-muted-foreground mb-8 text-base">{description}</p>
        )}
        <div className="flex items-center justify-center gap-4">
          {primaryCtaText?.trim() && (
            <Link
              to={primaryCtaLink}
              className="bg-primary text-primary-foreground rounded-none px-8 py-3 text-sm font-medium"
            >
              {primaryCtaText}
            </Link>
          )}
          {secondaryCtaText?.trim() && secondaryCtaLink && (
            <Link
              to={secondaryCtaLink}
              className="border-border rounded-none border px-8 py-3 text-sm font-medium"
            >
              {secondaryCtaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
