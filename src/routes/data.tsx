import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { Database } from "lucide-react";

export const Route = createFileRoute("/data")({ component: Data });

function Data() {
  const { lang } = useApp();
  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Dataset</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 flex items-center gap-3">
            <Database className="w-8 h-8" style={{ color: "var(--teal)" }} />
            {lang === "ar" ? "استكشاف البيانات" : "Dataset exploration"}
          </h1>
        </header>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: lang === "ar" ? "إجمالي العينات" : "Total samples", val: "48,213" },
            { label: lang === "ar" ? "الميزات" : "Features", val: "26" },
            { label: lang === "ar" ? "الفئات" : "Classes", val: "4" },
            { label: lang === "ar" ? "التوازن (بعد)" : "Balance (after)", val: "1:1:1:1" },
          ].map((s) => (
            <GlassCard key={s.label}>
              <div className="text-xs uppercase text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-3xl font-bold text-gradient">{s.val}</div>
            </GlassCard>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            { title: lang === "ar" ? "قبل Undersampling" : "Before Undersampling", data: [82, 8, 6, 4] },
            { title: lang === "ar" ? "بعد Undersampling" : "After Undersampling", data: [25, 25, 25, 25] },
          ].map((chart) => (
            <GlassCard key={chart.title} strong>
              <h3 className="font-display font-semibold mb-3">{chart.title}</h3>
              <div className="flex items-end gap-3 h-40">
                {chart.data.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-md bg-gradient-teal transition-all duration-500"
                      style={{ height: `${v * 1.4}%`, boxShadow: "0 0 20px color-mix(in oklab, var(--teal) 40%, transparent)" }}
                    />
                    <div className="text-[10px] text-muted-foreground">{["LOW", "MOD", "HIGH", "CRIT"][i]}</div>
                    <div className="text-xs font-semibold tabular-nums">{v}%</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard>
          <h3 className="font-display font-semibold mb-3">
            {lang === "ar" ? "أهم الميزات" : "Feature importance"}
          </h3>
          <div className="space-y-2">
            {[
              ["Engine RPM", 92], ["MAF", 84], ["EAR", 79], ["Ambient Temp", 71],
              ["Throttle", 64], ["MAR", 58], ["Head Yaw", 51], ["Blink Rate", 46], ["Coolant Temp", 40],
            ].map(([name, v]) => (
              <div key={name as string}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{name}</span>
                  <span className="text-muted-foreground">{v}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                  <div className="h-full bg-gradient-teal" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
