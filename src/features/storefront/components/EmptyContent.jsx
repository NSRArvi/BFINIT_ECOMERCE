export default function EmptyContent({ title, description }) {
  return (
    <div className="flex items-center justify-center px-4 py-20">
      <div className="border-border bg-card w-full max-w-xl rounded-md border px-10 py-12 text-center">
        <h2 className="text-foreground text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
