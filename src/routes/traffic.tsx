import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { TrafficCone, AlertTriangle, MapPin } from "lucide-react";

export const Route = createFileRoute("/traffic")({ component: Traffic });

function Traffic() {
  const { lang } = useApp();
  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Traffic Authority · Eastern Region</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 flex items-center gap-3">
            <TrafficCone className="w-8 h-8" style={{ color: "var(--teal)" }} />
            {lang === "ar" ? "لوحة إدارة المرور" : "Traffic authority dashboard"}
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">
            {lang === "ar"
              ? "البيانات محاكاة توضيحية لأغراض العرض العلمي."
              : "Displayed data is a demonstrative simulation."}
          </p>
        </header>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: lang === "ar" ? "تنبيهات اليوم" : "Alerts today", val: 148, color: "var(--teal)" },
            { label: lang === "ar" ? "سائقون مرتفعو الخطورة" : "High-risk drivers", val: 27, color: "var(--risk-high)" },
            { label: lang === "ar" ? "شركات مخالفة" : "Non-compliant companies", val: 6, color: "var(--risk-mid)" },
            { label: lang === "ar" ? "منع حوادث محتملة" : "Prevented incidents", val: 34, color: "var(--risk-low)" },
          ].map((s) => (
            <GlassCard key={s.label}>
              <div className="text-xs uppercase text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-4xl font-bold tabular-nums" style={{ color: s.color }}>
                {s.val}
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard strong>
          <h2 className="font-display font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" style={{ color: "var(--teal)" }} />
            {lang === "ar" ? "خريطة حرارية — طريق الجبيل - الدمام" : "Heatmap — Jubail-Dammam corridor"}
          </h2>
          <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-navy-deep/60 to-navy/20 border border-border/40">
            <svg viewBox="0 0 800 300" className="w-full h-full">
              <defs>
                <radialGradient id="hot" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="var(--risk-high)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="var(--risk-high)" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="warm" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="var(--risk-mid)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--risk-mid)" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* highway line */}
              <path d="M50 220 Q200 180 400 200 T760 140" fill="none" stroke="var(--silver)" strokeWidth="3" opacity="0.5" />
              <path d="M50 220 Q200 180 400 200 T760 140" fill="none" stroke="var(--teal)" strokeWidth="1" strokeDasharray="6 6" />
              {/* hotspots */}
              <circle cx="180" cy="200" r="60" fill="url(#warm)" />
              <circle cx="380" cy="205" r="80" fill="url(#hot)" />
              <circle cx="560" cy="180" r="55" fill="url(#warm)" />
              <circle cx="680" cy="150" r="45" fill="url(#hot)" />
              {/* labels */}
              <text x="50" y="240" fill="var(--foreground)" fontSize="12">Jubail</text>
              <text x="720" y="130" fill="var(--foreground)" fontSize="12">Dammam</text>
              <text x="365" y="195" fill="#fff" fontSize="10" fontWeight="700">HIGH</text>
            </svg>
          </div>
        </GlassCard>

        <GlassCard strong>
          <h2 className="font-display font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" style={{ color: "var(--risk-mid)" }} />
            {lang === "ar" ? "شركات أعلى تنبيهات" : "Top-alerting fleets"}
          </h2>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground border-b border-border/40">
              <tr>
                <th className="text-start py-2">{lang === "ar" ? "الشركة" : "Fleet"}</th>
                <th className="text-end">{lang === "ar" ? "تنبيهات" : "Alerts"}</th>
                <th className="text-end">{lang === "ar" ? "متوسط الخطر" : "Avg risk"}</th>
                <th className="text-end">{lang === "ar" ? "الحالة" : "Status"}</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Fleet A", 42, 68, "high"],
                ["Fleet B", 28, 51, "mid"],
                ["Fleet C", 19, 34, "low"],
                ["Fleet D", 14, 28, "low"],
              ].map(([n, a, r, s]: any) => (
                <tr key={n} className="border-b border-border/20">
                  <td className="py-2.5 font-semibold">{n}</td>
                  <td className="text-end tabular-nums">{a}</td>
                  <td className="text-end tabular-nums">{r}%</td>
                  <td className="text-end">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full uppercase"
                      style={{
                        background: `color-mix(in oklab, var(--risk-${s}) 20%, transparent)`,
                        color: `var(--risk-${s})`,
                      }}
                    >
                      {s}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </AppShell>
  );
}
