import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { MetricTile } from "@/components/MetricTile";
import { RiskGauge } from "@/components/RiskGauge";
import { useApp } from "@/lib/i18n";
import { computeRisk } from "@/lib/risk-engine";
import { useEffect, useState } from "react";
import { Eye, Wind, Thermometer, Gauge, Fuel, Activity } from "lucide-react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const { t, lang } = useApp();
  const [state, setState] = useState({
    ear: 0.29, mar: 0.35, blinkRate: 18, headYaw: 6, faceDetected: true,
    rpm: 1850, maf: 12.4, ambientTemp: 32, throttle: 22,
    coolantTemp: 88, intakePressure: 32,
  });

  useEffect(() => {
    const i = setInterval(() => {
      setState((s) => ({
        ...s,
        ear: clamp(s.ear + rand(-0.02, 0.02), 0.15, 0.35),
        mar: clamp(s.mar + rand(-0.03, 0.04), 0.2, 0.75),
        blinkRate: clamp(s.blinkRate + rand(-1.5, 1.5), 6, 32),
        headYaw: clamp(Math.abs(s.headYaw + rand(-2, 2)), 0, 25),
        rpm: clamp(s.rpm + rand(-120, 150), 800, 4200),
        maf: clamp(s.maf + rand(-0.8, 1), 4, 26),
        ambientTemp: clamp(s.ambientTemp + rand(-0.4, 0.5), 28, 46),
        throttle: clamp(s.throttle + rand(-4, 5), 5, 90),
        coolantTemp: clamp((s.coolantTemp ?? 88) + rand(-1, 1.2), 80, 110),
      }));
    }, 1200);
    return () => clearInterval(i);
  }, []);

  const risk = computeRisk(
    { ear: state.ear, mar: state.mar, blinkRate: state.blinkRate, headYaw: state.headYaw, faceDetected: state.faceDetected },
    { rpm: state.rpm, maf: state.maf, ambientTemp: state.ambientTemp, throttle: state.throttle, coolantTemp: state.coolantTemp },
    { hoursDriving: 3, isNight: false, hazardousCargo: false },
  );

  return (
    <AppShell>
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {lang === "ar" ? "لوحة التحكم" : "Dashboard"}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
            {lang === "ar" ? "المراقبة الذكية اللحظية" : "Real-time Intelligent Monitoring"}
          </h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Vision panel */}
          <GlassCard strong className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold flex items-center gap-2">
                <Eye className="w-5 h-5" style={{ color: "var(--teal)" }} />
                AI Driver Status
              </h2>
              <span className="text-xs px-2 py-1 rounded-full glass">
                {state.faceDetected ? "FACE DETECTED" : "NO FACE"}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <MetricTile label={`👁 ${t("eye_closure")}`} value={state.ear.toFixed(2)} hint="EAR" danger={state.ear < 0.25} />
              <MetricTile label={`😴 ${t("drowsiness")}`} value={`${Math.round(risk.driverFatigue)}%`} danger={risk.driverFatigue > 60} />
              <MetricTile label={`🥱 ${t("yawning")}`} value={state.mar.toFixed(2)} hint="MAR" danger={state.mar > 0.6} />
              <MetricTile label={`👀 ${t("blink_rate")}`} value={Math.round(state.blinkRate)} unit="/min" />
              <MetricTile label={`↕ ${t("head_pos")}`} value={`${Math.round(state.headYaw)}°`} danger={state.headYaw > 18} />
              <MetricTile label={`🙂 ${t("face_det")}`} value={state.faceDetected ? "OK" : "—"} />
            </div>
          </GlassCard>

          {/* Risk gauge */}
          <GlassCard strong className="flex flex-col items-center justify-center">
            <RiskGauge score={risk.score} band={risk.band} label={t("current_risk")} />
            <p className="mt-4 text-xs text-muted-foreground text-center max-w-[240px]">
              {lang === "ar" ? risk.reasonAr : risk.reason}
            </p>
          </GlassCard>
        </div>

        {/* OBD */}
        <GlassCard strong>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold flex items-center gap-2">
              <Gauge className="w-5 h-5" style={{ color: "var(--teal)" }} />
              OBD AI · {lang === "ar" ? "قراءات المحرك" : "Engine Telemetry"}
            </h2>
            <span className="text-xs text-muted-foreground">
              {lang === "ar" ? "خلل المحرك:" : "Engine anomaly:"}{" "}
              <b style={{ color: risk.engineAnomaly > 50 ? "var(--risk-high)" : "var(--teal)" }}>
                {Math.round(risk.engineAnomaly)}%
              </b>
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <MetricTile label="Engine RPM" value={Math.round(state.rpm)} unit="rpm" icon={<Activity className="w-3.5 h-3.5" />} danger={state.rpm > 3200} />
            <MetricTile label="MAF" value={state.maf.toFixed(1)} unit="g/s" icon={<Wind className="w-3.5 h-3.5" />} />
            <MetricTile label="Ambient Temp" value={state.ambientTemp.toFixed(1)} unit="°C" icon={<Thermometer className="w-3.5 h-3.5" />} danger={state.ambientTemp > 42} />
            <MetricTile label="Throttle" value={`${Math.round(state.throttle)}`} unit="%" icon={<Fuel className="w-3.5 h-3.5" />} />
            <MetricTile label="Coolant" value={Math.round(state.coolantTemp ?? 0)} unit="°C" icon={<Thermometer className="w-3.5 h-3.5" />} danger={(state.coolantTemp ?? 0) > 105} />
          </div>
        </GlassCard>

        {/* Top contributions preview */}
        <GlassCard strong>
          <h2 className="font-display font-semibold mb-3">
            {lang === "ar" ? "أهم العوامل المؤثرة" : "Top contributing factors"}
          </h2>
          <div className="space-y-2">
            {risk.contributions.slice(0, 6).map((c) => (
              <div key={c.feature}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{lang === "ar" ? c.ar : c.feature}</span>
                  <span className="tabular-nums text-muted-foreground">+{c.contribution.toFixed(1)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                  <div
                    className="h-full bg-gradient-teal"
                    style={{ width: `${Math.min(100, c.contribution * 2)}%` }}
                  />
                </div>
              </div>
            ))}
            {risk.contributions.length === 0 && (
              <p className="text-xs text-muted-foreground">
                {lang === "ar" ? "لا توجد عوامل خطر مرصودة." : "No risk factors detected."}
              </p>
            )}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
