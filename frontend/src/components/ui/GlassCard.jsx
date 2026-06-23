import { cn } from "../../utils/cn";

export default function GlassCard({
  children,
  className = ""
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}