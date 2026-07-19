import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Car3D } from "@/components/Car3D";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { useEffect, useState } from "react";
import {
  Activity, ArrowRight, Brain, Camera, Cpu, Eye, Gauge, ShieldCheck, Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  const { t, lang, dir } = useApp();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((x) => x + 1), 1500);
    return () => clearInterval(i);
  }, []);

  const metrics = [
    { key: "driver_status", val: 92 + (tick % 4), unit: "%", icon: <Eye className="w-3.5 h-3.5" /> },
    { key: "vehicle_health", val: 87 + ((tick + 1) % 5), unit: "%", icon: <Cpu className="w-3.5 h-3.5" /> },
    { key: "risk_score", val: 14 + ((tick * 3) % 9), unit: "%", icon: <Zap className="w-3.5 h-3.5" /> },
    { key: "attention", val: 96 - (tick % 6), unit: "%", icon: <Brain className="w-3.5 h-3.5" /> },
    { key: "engine_cond", val: 91 - (tick % 4), unit: "%", icon: <Gauge className="w-3.5 h-3.5" /> },
    { key: "fatigue_prob", val: 8 + ((tick * 2) % 7), unit: "%", icon: <Activity className="w-3.5 h-3.5" /> },
  ];

  return (
    <AppShell>
      <div className="relative overflow-hidden">
        {/* animated backdrop */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 -end-40 w-96 h-96 rounded-full bg-teal opacity-20 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-10 -start-40 w-96 h-96 rounded-full bg-primary opacity-30 blur-3xl" />
        </div>

        <section className="px-6 md:px-12 pt-10 md:pt-20 pb-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div className={dir === "rtl" ? "text-right" : "text-left"}>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-glow" />
                {lang === "ar" ? "منصة ذكاء اصطناعي متكاملة" : "Integrated AI Platform"}
              </div>
              <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold leading-[1.05]">
                <span className="text-gradient">PRECOG</span>
                <span className="text-foreground"> AI</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl">
                {t("subtitle")}
              </p>
              <p className="mt-3 text-sm text-muted-foreground/80 max-w-xl">{t("tagline")}</p>

              <div className={`mt-8 flex flex-wrap gap-3 ${dir === "rtl" ? "justify-end" : ""}`}>
                <Link
                  to="/simulation"
                  className="inline-flex items-center gap-2 bg-gradient-teal text-primary-foreground px-6 py-3 rounded-xl font-medium shadow-glow hover:scale-[1.03] transition-transform"
                >
                  {t("cta_start")}
                  <ArrowRight className={`w-4 h-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all"
                >
                  {t("cta_dashboard")}
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                {[
                  { icon: Camera, label: lang === "ar" ? "الرؤية الحاسوبية" : "Computer Vision" },
                  { icon: Cpu, label: lang === "ar" ? "بيانات OBD-II" : "OBD-II Analytics" },
                  { icon: ShieldCheck, label: lang === "ar" ? "محرك المخاطر" : "Risk Engine" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="glass rounded-xl p-3 text-center">
                    <Icon className="w-5 h-5 mx-auto text-teal" style={{ color: "var(--teal)" }} />
                    <div className="mt-2 text-[11px] text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 3D car + live panel */}
            <div className="relative">
              <Car3D className="w-full" />
              <div
                className={`absolute ${dir === "rtl" ? "-left-4" : "-right-4"} top-6 md:top-10 w-64 md:w-72`}
              >
                <GlassCard strong className="p-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
                    <span>{lang === "ar" ? "لوحة مباشرة" : "Live Telemetry"}</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-glow" />
                      LIVE
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {metrics.map((m) => (
                      <div key={m.key} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                          {m.icon}
                          {t(m.key)}
                        </span>
                        <span
                          className="text-sm font-semibold tabular-nums"
                          style={{ color: "var(--teal)" }}
                        >
                          {m.val}
                          {m.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 h-1.5 bg-muted/40 rounded-full overflow-hidden relative">
                    <div className="absolute inset-y-0 w-1/3 bg-gradient-teal animate-scan" />
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="px-6 md:px-12 pb-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
              {lang === "ar" ? "منظومة متكاملة" : "A complete platform"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Eye,
                  title: lang === "ar" ? "الرؤية الحاسوبية" : "Vision AI",
                  desc: lang === "ar"
                    ? "كشف النعاس والتثاؤب وميل الرأس عبر MediaPipe"
                    : "Drowsiness, yawning & head-pose via MediaPipe.",
                },
                {
                  icon: Gauge,
                  title: "OBD-II Analytics",
                  desc: lang === "ar"
                    ? "قراءة RPM و MAF ودرجة الحرارة والخانق مباشرة"
                    : "RPM, MAF, ambient temp & throttle from the ECU.",
                },
                {
                  icon: Brain,
                  title: lang === "ar" ? "قابلية التفسير" : "Explainable AI",
                  desc: lang === "ar"
                    ? "قيم SHAP توضح سبب كل تنبؤ"
                    : "SHAP contributions justify every prediction.",
                },
                {
                  icon: ShieldCheck,
                  title: lang === "ar" ? "3 مستويات تنبيه" : "3-tier alerting",
                  desc: lang === "ar"
                    ? "السائق، الشركة، إدارة المرور"
                    : "Driver, fleet company, traffic authority.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <GlassCard key={title} className="hover:shadow-glow hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-gradient-teal flex items-center justify-center mb-3 shadow-glow">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
