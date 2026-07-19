import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { RiskGauge } from "@/components/RiskGauge";
import { useApp } from "@/lib/i18n";
import { computeRisk } from "@/lib/risk-engine";
import { useState } from "react";
import { Radar } from "lucide-react";

export const Route = createFileRoute("/live")({ component: LivePrediction });

function LivePrediction() {
  const { t, lang, dir } = useApp();
  const [inputs, setInputs] = useState({
    rpm: 2500, maf: 18, ambientTemp: 34, throttle: 15,
    coolantTemp: 92, ear: 0.28, mar: 0.4, blinkRate: 17, headYaw: 8,
    hoursDriving: 3, isNight: false, hazardousCargo: false,
  });
  const [result, setResult] = useState<ReturnType<typeof computeRisk> | null>(null);

  const set = (k: keyof typeof inputs, v: any) => setInputs((s) => ({ ...s, [k]: v }));

  const predict = () => {
    const r = computeRisk(
      { ear: inputs.ear, mar: inputs.mar, blinkRate: inputs.blinkRate, headYaw: inputs.headYaw, faceDetected: true },
      { rpm: inputs.rpm, maf: inputs.maf, ambientTemp: inputs.ambientTemp, throttle: inputs.throttle, coolantTemp: inputs.coolantTemp },
      { hoursDriving: inputs.hoursDriving, isNight: inputs.isNight, hazardousCargo: inputs.hazardousCargo },
    );
    setResult(r);
  };

  const Field = ({ k, label, unit, step, min, max }: any) => (
    <label className="glass rounded-xl p-3 block">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground flex justify-between">
        <span>{label}</span>
        {unit && <span>{unit}</span>}
      </div>
      <input
        type="number"
        step={step ?? 1}
        min={min}
        max={max}
        value={(inputs as any)[k]}
        onChange={(e) => set(k, parseFloat(e.target.value))}
        className={`mt-1 w-full bg-transparent font-display text-lg font-bold tabular-nums outline-none ${
          dir === "rtl" ? "text-right" : "text-left"
        }`}
        style={{ color: "var(--teal)" }}
      />
    </label>
  );

  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {lang === "ar" ? "توقع مباشر" : "Live Prediction"}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 flex items-center gap-3">
            <Radar className="w-8 h-8" style={{ color: "var(--teal)" }} />
            {lang === "ar" ? "أدخل القيم واحصل على تنبؤ فوري" : "Enter values, get an instant prediction"}
          </h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-5">
          <GlassCard strong className="lg:col-span-2 space-y-4">
            <h2 className="font-display font-semibold">OBD-II Inputs</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Field k="rpm" label="RPM" unit="rpm" />
              <Field k="maf" label="MAF" unit="g/s" step={0.1} />
              <Field k="ambientTemp" label="Ambient" unit="°C" step={0.1} />
              <Field k="throttle" label="Throttle" unit="%" />
              <Field k="coolantTemp" label="Coolant" unit="°C" />
            </div>

            <h2 className="font-display font-semibold pt-2">
              {lang === "ar" ? "قراءات الرؤية" : "Vision Inputs"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Field k="ear" label="EAR" step={0.01} />
              <Field k="mar" label="MAR" step={0.01} />
              <Field k="blinkRate" label={lang === "ar" ? "الرمش/دقيقة" : "Blinks/min"} />
              <Field k="headYaw" label="Head Yaw" unit="°" />
            </div>

            <h2 className="font-display font-semibold pt-2">
              {lang === "ar" ? "السياق" : "Context"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field k="hoursDriving" label={lang === "ar" ? "ساعات القيادة" : "Driving Hours"} step={0.5} />
              <label className="glass rounded-xl p-3 flex items-center gap-3">
                <input type="checkbox" checked={inputs.isNight} onChange={(e) => set("isNight", e.target.checked)} />
                <span className="text-sm">{lang === "ar" ? "قيادة ليلية" : "Night driving"}</span>
              </label>
              <label className="glass rounded-xl p-3 flex items-center gap-3">
                <input type="checkbox" checked={inputs.hazardousCargo} onChange={(e) => set("hazardousCargo", e.target.checked)} />
                <span className="text-sm">{lang === "ar" ? "حمولة خطرة" : "Hazardous cargo"}</span>
              </label>
            </div>

            <button
              onClick={predict}
              className="mt-2 w-full bg-gradient-teal text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-glow"
            >
              {t("predict")}
            </button>
          </GlassCard>

          <GlassCard strong className="flex flex-col items-center">
            {result ? (
              <>
                <RiskGauge score={result.score} band={result.band} label={t("current_risk")} />
                <p className="mt-4 text-xs text-center text-muted-foreground">
                  {lang === "ar" ? result.reasonAr : result.reason}
                </p>
                <div className="mt-4 w-full space-y-1.5">
                  {result.contributions.slice(0, 5).map((c) => (
                    <div key={c.feature}>
                      <div className="flex justify-between text-[11px]">
                        <span>{lang === "ar" ? c.ar : c.feature}</span>
                        <span className="tabular-nums text-muted-foreground">+{c.contribution.toFixed(1)}</span>
                      </div>
                      <div className="h-1 rounded-full bg-muted/40 overflow-hidden">
                        <div className="h-full bg-gradient-teal" style={{ width: `${Math.min(100, c.contribution * 2)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-10 text-muted-foreground text-sm">
                {lang === "ar" ? "أدخل القيم ثم اضغط توقع" : "Fill values then press Predict"}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
