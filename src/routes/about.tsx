import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { Cpu, Camera, Gauge, Brain, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  const { lang } = useApp();
  const steps = [
    {
      icon: Camera,
      t: lang === "ar" ? "المستشعرات" : "Sensors",
      d: lang === "ar" ? "كاميرا IR + OBD-II + GPS + IMU" : "IR Camera + OBD-II + GPS + IMU",
    },
    {
      icon: Cpu,
      t: lang === "ar" ? "استخراج الميزات" : "Feature extraction",
      d: "EAR, MAR, RPM, MAF, yaw, context",
    },
    {
      icon: Brain,
      t: lang === "ar" ? "نموذج الذكاء الاصطناعي" : "AI Model",
      d: "Temporal fusion + explainable contributions",
    },
    {
      icon: ShieldCheck,
      t: lang === "ar" ? "محرك القرار" : "Decision engine",
      d: lang === "ar" ? "3 مستويات تنبيه" : "3-tier alerting",
    },
  ];
  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">About JDRI</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
            {lang === "ar" ? "كيف يعمل النظام" : "How the system works"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            {lang === "ar"
              ? "JDRI هو إطار ذكاء اصطناعي تنبؤي لسلامة سائقي الشاحنات، من عمل الباحثة جنان فتحي آل حماد للمشاركة في جائزة الابتكار في تطبيقات التنقل والسلامة على الطرق في المدن الذكية."
              : "JDRI combines vision, physiology, truck telemetry and personal baselines to turn live signals into proactive, explainable safety decisions."}
          </p>
        </header>

        <GlassCard strong>
          <div className="grid md:grid-cols-4 gap-3 items-stretch">
            {steps.map((s, i) => (
              <div key={s.t} className="relative">
                <div className="glass rounded-xl p-4 h-full">
                  <div className="w-10 h-10 rounded-lg bg-gradient-teal flex items-center justify-center shadow-glow">
                    <s.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold mt-3">{s.t}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{s.d}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight
                    className="hidden md:block absolute top-1/2 -end-3 -translate-y-1/2 w-5 h-5 text-teal"
                    style={{ color: "var(--teal)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="grid md:grid-cols-3 gap-5">
          <GlassCard>
            <Camera className="w-6 h-6 mb-2" style={{ color: "var(--teal)" }} />
            <h3 className="font-display font-semibold">Computer Vision</h3>
            <p className="text-sm text-muted-foreground mt-1">
              MediaPipe FaceMesh · 468 landmarks · EAR/MAR/head-pose @ 30fps.
            </p>
          </GlassCard>
          <GlassCard>
            <Gauge className="w-6 h-6 mb-2" style={{ color: "var(--teal)" }} />
            <h3 className="font-display font-semibold">Truck Telemetry / OBD-II</h3>
            <p className="text-sm text-muted-foreground mt-1">
              RPM, MAF, throttle, temp, coolant, intake pressure, sliding-window features.
            </p>
          </GlassCard>
          <GlassCard>
            <Brain className="w-6 h-6 mb-2" style={{ color: "var(--teal)" }} />
            <h3 className="font-display font-semibold">Explainable AI</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Personal baseline + temporal fusion · signal contributions · actionable rationale.
            </p>
          </GlassCard>
        </div>

        <GlassCard>
          <h3 className="font-display font-semibold mb-2">
            {lang === "ar" ? "ثلاث جهات مستفيدة" : "Three stakeholders"}
          </h3>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div className="glass rounded-lg p-3">
              <b>{lang === "ar" ? "السائق" : "Driver"}</b>
              <p className="text-muted-foreground text-xs mt-1">
                {lang === "ar"
                  ? "تنبيهات لحظية + اقتراح استراحات"
                  : "Live alerts + rest suggestions"}
              </p>
            </div>
            <div className="glass rounded-lg p-3">
              <b>{lang === "ar" ? "الشركة" : "Fleet company"}</b>
              <p className="text-muted-foreground text-xs mt-1">
                {lang === "ar"
                  ? "لوحة إدارية + تقارير + تنبؤ صيانة"
                  : "Ops dashboard + reports + maintenance"}
              </p>
            </div>
            <div className="glass rounded-lg p-3">
              <b>{lang === "ar" ? "إدارة المرور" : "Traffic authority"}</b>
              <p className="text-muted-foreground text-xs mt-1">
                {lang === "ar" ? "خرائط حرارية + إحصاءات مجمعة" : "Heatmaps + aggregate stats"}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
