export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-card flex items-center gap-3 rounded-xl border p-4">
      <div className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-md">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-muted-foreground truncate text-xs">{label}</p>
        <p className="text-sm font-semibold tabular-nums">{value}</p>
      </div>
    </div>
  );
}
