export default function UsageBadge({ used, limit, label }) {
  const percentage = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  const isAtLimit = limit > 0 && used >= limit;
  const isNearLimit = !isAtLimit && percentage >= 90;

  return (
    <div className="flex flex-col gap-1">
      <span
        className={`text-xs lowercase ${
          isAtLimit
            ? "text-destructive"
            : isNearLimit
              ? "text-warning"
              : "text-muted-foreground"
        }`}
      >
        {used} / {limit} {label}
      </span>
      <div className="bg-muted h-1.5 w-24 rounded-full">
        <div
          className={`h-1.5 rounded-full transition-all ${
            isAtLimit
              ? "bg-destructive"
              : isNearLimit
                ? "bg-warning"
                : "bg-foreground"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
