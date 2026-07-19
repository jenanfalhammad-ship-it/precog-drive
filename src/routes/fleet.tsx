import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { Truck } from "lucide-react";

export const Route = createFileRoute("/fleet")({ component: Fleet });

const DRIVERS = [
  { name: "Ahmad K.", score: 88, alerts: 2, hours: 142, risk: "low" },
  { name: "Salem M.", score: 62, alerts: 9, hours: 168, risk: "mid" },
  { name: "Yousef R.", score: 41, alerts: 17, hours: 191, risk: "high" },
  { name: "Khalid A.", score: 79, alerts: 4, hours: 155, risk: "low" },
  { name: "Nasser B.", score: 55, alerts: 11, hours: 174, risk: "mid" },
];

function Fleet() {
  const { lang } = useApp();
  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Fleet Overview</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 flex items-center gap-3">
            <Truck className="w-8 h-8" style={{ color: "var(--teal)" }} />
            {lang === "ar" ? "لوحة الشركة" : "Company dashboard"}
          </h1>
        </header>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { l: lang === "ar" ? "السائقون النشطون" : "Active drivers", v: 42 },
            { l: lang === "ar" ? "متوسط درجة القيادة" : "Avg driving score", v: "73%" },
            { l: lang === "ar" ? "تنبيهات هذا الشهر" : "Alerts this month", v: 128 },
            { l: lang === "ar" ? "صيانة متوقعة" : "Predicted maintenance", v: 7 },
          ].map((s) => (
            <GlassCard key={s.l}>
              <div className="text-xs uppercase text-muted-foreground">{s.l}</div>
              <div className="mt-1 font-display text-3xl font-bold text-gradient">{s.v}</div>
            </GlassCard>
          ))}
        </div>

        <GlassCard strong>
          <h2 className="font-display font-semibold mb-3">
            {lang === "ar" ? "ترتيب السائقين" : "Driver ranking"}
          </h2>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground border-b border-border/40">
              <tr>
                <th className="text-start py-2">{lang === "ar" ? "السائق" : "Driver"}</th>
                <th className="text-end">{lang === "ar" ? "الدرجة" : "Score"}</th>
                <th className="text-end">{lang === "ar" ? "تنبيهات" : "Alerts"}</th>
                <th className="text-end">{lang === "ar" ? "ساعات" : "Hours"}</th>
                <th className="text-end">{lang === "ar" ? "الخطر" : "Risk"}</th>
              </tr>
            </thead>
            <tbody>
              {DRIVERS.map((d) => (
                <tr key={d.name} className="border-b border-border/20">
                  <td className="py-2.5 font-semibold">{d.name}</td>
                  <td className="text-end tabular-nums" style={{ color: "var(--teal)" }}>{d.score}</td>
                  <td className="text-end tabular-nums">{d.alerts}</td>
                  <td className="text-end tabular-nums">{d.hours}</td>
                  <td className="text-end">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full uppercase"
                      style={{
                        background: `color-mix(in oklab, var(--risk-${d.risk}) 20%, transparent)`,
                        color: `var(--risk-${d.risk})`,
                      }}
                    >
                      {d.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>

        <div className="grid md:grid-cols-2 gap-5">
          <GlassCard>
            <h3 className="font-display font-semibold mb-3">
              {lang === "ar" ? "اتجاه الخطر — 30 يوم" : "Risk trend — 30 days"}
            </h3>
            <svg viewBox="0 0 300 100" className="w-full">
              <polyline
                points="0,70 30,60 60,72 90,55 120,50 150,58 180,45 210,52 240,40 270,48 300,35"
                fill="none" stroke="var(--teal)" strokeWidth="2.5"
                style={{ filter: "drop-shadow(0 0 6px var(--teal))" }}
              />
            </svg>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display font-semibold mb-3">
              {lang === "ar" ? "تنبؤ الصيانة" : "Maintenance prediction"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between glass rounded-lg px-3 py-2"><span>Truck #A-142</span><span style={{color:"var(--risk-high)"}}>3 days</span></li>
              <li className="flex justify-between glass rounded-lg px-3 py-2"><span>Truck #B-208</span><span style={{color:"var(--risk-mid)"}}>9 days</span></li>
              <li className="flex justify-between glass rounded-lg px-3 py-2"><span>Truck #C-311</span><span style={{color:"var(--risk-low)"}}>21 days</span></li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
