interface Props {
  label: string;
  value: number | string;
  unit?: string;
  hint?: string;
  danger?: boolean;
  icon?: React.ReactNode;
}

export function MetricTile({ label, value, unit, hint, danger, icon }: Props) {
  return (
    <div
      className="glass rounded-xl p-4 relative overflow-hidden"
      style={danger ? { borderColor: "var(--risk-high)" } : undefined}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
        <span className="flex items-center gap-1.5">
          {icon}
          {label}
        </span>
        {hint && <span className="opacity-70">{hint}</span>}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span
          className="font-display text-2xl font-bold tabular-nums"
          style={{ color: danger ? "var(--risk-high)" : "var(--teal)" }}
        >
          {value}
        </span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}
