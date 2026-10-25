import OrbitIllustration from "./OrbitIllustration";

export default function OrbitLoader({ label = "Loading your workspace…" }) {
  return (
    <div className="animate-in fade-in fill-mode-backwards flex min-h-[calc(100dvh-95px)] flex-col items-center justify-center gap-5 duration-300">
      <OrbitIllustration animated />
      <p className="text-muted-foreground text-xs">{label}</p>
    </div>
  );
}
