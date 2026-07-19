import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { RiskGauge } from "@/components/RiskGauge";
import { useApp } from "@/lib/i18n";
import { computeRisk } from "@/lib/risk-engine";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/explainability")({ component: Explainability });

function Explainability() {
  const { lang } = useApp();
  // Sample high-risk scenario
  const risk = computeRisk(
    { ear: 0.18, mar: 0.68, blinkRate: 6, headYaw: 22, faceDetected: true },
    { rpm: 3500, maf: 24, ambientTemp: 44, throttle: 82, coolantTemp: 107 },
    { hoursDriving: 6, isNight: true, hazardousCargo: true },
  );

  const total = risk.contributions.reduce((s, c) => s + c.contribution, 0) || 1;

  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            AI Explainability
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 flex items-center gap-3">
            <Sparkles className="w-8 h-8" style={{ color: "var(--teal)" }} />
            {lang === "ar" ? "لماذا يعطي النظام هذه النتيجة؟" : "Why did the model predict this?"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "ar"
              ? "قيم SHAP توضح مساهمة كل ميزة في التنبؤ النهائي — الشفافية أساس الثقة."
              : "SHAP-style contributions expose each feature's push toward the final prediction — transparency by design."}
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-5">
          <GlassCard strong className="flex flex-col items-center justify-center">
            <RiskGauge score={risk.score} band={risk.band} label={lang === "ar" ? "توقع النموذج" : "Model output"} />
            <p className="mt-4 text-center text-xs text-muted-foreground max-w-[240px]">
              {lang === "ar" ? risk.reasonAr : risk.reason}
            </p>
          </GlassCard>

          <GlassCard strong className="lg:col-span-2">
            <h2 className="font-display font-semibold mb-3">SHAP-style feature contributions</h2>
            <div className="space-y-2.5">
              {risk.contributions.map((c) => {
                const pct = (c.contribution / total) * 100;
                return (
                  <div key={c.feature}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>
                        <b>{lang === "ar" ? c.ar : c.feature}</b>
                        <span className="ms-2 text-muted-foreground">= {typeof c.value === "number" ? c.value.toFixed(2) : c.value}</span>
                      </span>
                      <span className="tabular-nums" style={{ color: "var(--teal)" }}>
                        +{pct.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
                      <div
                        className="h-full bg-gradient-teal transition-[width] duration-500"
                        style={{ width: `${Math.min(100, pct * 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        <GlassCard>
          <h3 className="font-display font-semibold mb-2">
            {lang === "ar" ? "التفسير النصي" : "Natural-language explanation"}
          </h3>
          <p className="text-sm text-muted-foreground leading-7">
            {lang === "ar"
              ? `توقع النموذج مستوى خطر ${risk.band} بنسبة ${Math.round(risk.score)}%. أهم الأسباب: ${risk.contributions
                  .slice(0, 3)
                  .map((c) => c.ar)
                  .join("، ")}. يوصى بإيقاف السائق فوراً للراحة، وفحص المحرك.`
              : `Model predicted ${risk.band} risk at ${Math.round(risk.score)}%. Primary drivers: ${risk.contributions
                  .slice(0, 3)
                  .map((c) => c.feature)
                  .join(", ")}. Recommendation: enforced rest break, engine diagnostic scan.`}
          </p>
        </GlassCard>
      </div>
    </AppShell>
  );
}
