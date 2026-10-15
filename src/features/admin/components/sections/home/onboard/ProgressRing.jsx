export default function ProgressRing({ done, total }) {
  const r = 6;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 16 16" className="size-4 -rotate-90">
      <circle
        cx="8"
        cy="8"
        r={r}
        fill="none"
        strokeWidth="2"
        className="stroke-muted-foreground/20"
      />
      <circle
        cx="8"
        cy="8"
        r={r}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        className="stroke-success transition-all"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - done / total)}
      />
    </svg>
  );
}
