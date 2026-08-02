export default function AboutOverview({ content }) {
  const {
    eyebrow,
    title,
    description,
    statement1Label,
    statement1,
    statement2Label,
    statement2,
  } = content || {};

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
      <div className="space-y-5">
        {eyebrow?.trim() && (
          <div className="border-border inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-medium tracking-wide uppercase">
            <span className="bg-primary size-1.5 rounded-full" />
            {eyebrow}
          </div>
        )}

        {title && (
          <h2 className="text-3xl leading-tight font-medium tracking-tight text-balance uppercase md:text-4xl lg:text-5xl">
            {title}
          </h2>
        )}
      </div>

      <div className="space-y-10">
        {description && (
          <p className="text-muted-foreground text-sm text-balance md:text-base">
            {description}
          </p>
        )}

        <div className="space-y-3">
          {statement1Label && (
            <h3 className="text-base font-semibold tracking-tight uppercase md:text-lg">
              {statement1Label}
            </h3>
          )}
          {statement1 && (
            <p className="text-muted-foreground text-sm text-balance md:text-base">
              {statement1}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {statement2Label && (
            <h3 className="text-base font-semibold tracking-tight uppercase md:text-lg">
              {statement2Label}
            </h3>
          )}
          {statement2 && (
            <p className="text-muted-foreground text-sm text-balance md:text-base">
              {statement2}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
