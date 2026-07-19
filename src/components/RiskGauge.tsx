import { bandColor, type RiskBreakdown } from "@/lib/risk-engine";

interface Props {
  score: number;
  band: RiskBreakdown["band"];
  label: string;
  size?: number;
}

export function RiskGauge({ score, band, label, size = 220 }: Props) {
  const radius = (size - 24) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - score / 100);
  const color = bandColor(band);
  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--muted)"
          strokeWidth={12}
          fill="none"
          opacity={0.35}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={12}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{
            filter: `drop-shadow(0 0 8px ${color})`,
            transition: "stroke-dashoffset 0.6s ease, stroke 0.4s ease",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="font-display text-5xl font-bold tabular-nums"
          style={{ color }}
        >
          {Math.round(score)}%
        </div>
        <div
          className="mt-1 text-xs font-semibold uppercase tracking-widest"
          style={{ color }}
        >
          {band}
        </div>
        <div className="mt-2 text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
