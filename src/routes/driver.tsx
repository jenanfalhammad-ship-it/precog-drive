import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { User, Award } from "lucide-react";

export const Route = createFileRoute("/driver")({ component: Driver });

function Driver() {
  const { lang } = useApp();
  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
        <header className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-teal flex items-center justify-center shadow-glow">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {lang === "ar" ? "ملف السائق" : "Driver Profile"}
            </div>
            <h1 className="font-display text-3xl font-bold">Ahmad K. — ID #A-142</h1>
            <p className="text-sm text-muted-foreground">
              {lang === "ar" ? "شركة النقل الشرقية · 5 سنوات خبرة" : "Eastern Transport · 5 yrs experience"}
            </p>
          </div>
        </header>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { l: lang === "ar" ? "درجة القيادة" : "Driving Score", v: "88" },
            { l: lang === "ar" ? "ساعات هذا الشهر" : "Hours this month", v: "142" },
            { l: lang === "ar" ? "تنبيهات" : "Alerts", v: "2" },
            { l: lang === "ar" ? "متوسط الإجهاد" : "Avg fatigue", v: "18%" },
          ].map((s) => (
            <GlassCard key={s.l}>
              <div className="text-xs uppercase text-muted-foreground">{s.l}</div>
              <div className="mt-1 font-display text-3xl font-bold text-gradient">{s.v}</div>
            </GlassCard>
          ))}
        </div>

        <GlassCard strong>
          <h3 className="font-display font-semibold mb-3">
            {lang === "ar" ? "سجل الإجهاد — 14 يوم" : "Fatigue history — 14 days"}
          </h3>
          <div className="flex items-end gap-1.5 h-32">
            {[22, 18, 25, 30, 15, 12, 28, 35, 20, 18, 24, 32, 19, 15].map((v, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-teal" style={{ height: `${v * 2.5}%` }} />
            ))}
          </div>
        </GlassCard>

        <div className="grid md:grid-cols-2 gap-5">
          <GlassCard>
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" style={{ color: "var(--teal)" }} />
              {lang === "ar" ? "الإنجازات" : "Achievements"}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {["🏆", "⭐", "🎯", "🛡", "⚡", "🌙"].map((e, i) => (
                <div key={i} className="glass rounded-xl aspect-square flex items-center justify-center text-3xl">
                  {e}
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display font-semibold mb-3">
              {lang === "ar" ? "توصيات" : "Recommendations"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="glass rounded-lg px-3 py-2">
                {lang === "ar" ? "استراحة إجبارية بعد 3 ساعات ليلية" : "Mandatory break after 3 night-hours."}
              </li>
              <li className="glass rounded-lg px-3 py-2">
                {lang === "ar" ? "فحص أجهزة التبريد قبل الرحلات الطويلة" : "Coolant check before long trips."}
              </li>
              <li className="glass rounded-lg px-3 py-2">
                {lang === "ar" ? "تفعيل تذكير الرمش" : "Enable blink reminders."}
              </li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
