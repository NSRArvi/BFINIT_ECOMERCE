import { getImgUrl } from "@/utils/getImgUrl";

export default function TeamGrid({ content }) {
  const { eyebrow, title, description, members } = content || {};

  const validMembers = (members || []).filter((m) => m.name?.trim());

  if (validMembers.length === 0) return null;

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
        {validMembers.map((member, index) => (
          <div key={index} className="space-y-4">
            <div className="bg-muted aspect-square w-full overflow-hidden">
              {member.image?.url && (
                <img
                  src={getImgUrl(member.image.url)}
                  alt={member.name || ""}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold tracking-tight uppercase">
                {member.name}
              </p>
              {member.role?.trim() && (
                <p className="text-muted-foreground text-sm">{member.role}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
