import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { RiskGauge } from "@/components/RiskGauge";
import { MetricTile } from "@/components/MetricTile";
import { useApp } from "@/lib/i18n";
import { computeRisk } from "@/lib/risk-engine";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Zap } from "lucide-react";

export const Route = createFileRoute("/simulation")({ component: Simulation });

/**
 * Timeline-driven scenario: 0-20s normal, 20-45s driver starts to nod, 45-70s engine anomaly,
 * 70-90s combined critical event. Values change every 300ms.
 */
function Simulation() {
  const { t, lang } = useApp();
  const [running, setRunning] = useState(false);
  const [tSec, setTSec] = useState(0);
  const [triggered, setTriggered] = useState<string[]>([]);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTSec((x) => x + 0.3), 300);
    return () => clearInterval(id);
  }, [running]);

  // Derive state from timeline
  const phase =
    tSec < 20 ? "normal" : tSec < 45 ? "fatigue" : tSec < 70 ? "engine" : "critical";

  const state = deriveState(tSec, phase);
  const risk = computeRisk(
    { ear: state.ear, mar: state.mar, blinkRate: state.blinkRate, headYaw: state.headYaw, faceDetected: true },
    { rpm: state.rpm, maf: state.maf, ambientTemp: state.ambientTemp, throttle: state.throttle, coolantTemp: state.coolantTemp },
    { hoursDriving: 4, isNight: tSec > 60, hazardousCargo: tSec > 70 },
  );

  // Alerts
  useEffect(() => {
    if (risk.driverFatigue > 60 && !triggered.includes("fatigue")) {
      setTriggered((x) => [...x, "fatigue"]);
      beep(660);
      if (navigator.vibrate) navigator.vibrate([200, 80, 200]);
    }
    if (risk.engineAnomaly > 55 && !triggered.includes("engine")) {
      setTriggered((x) => [...x, "engine"]);
      beep(440);
      if (navigator.vibrate) navigator.vibrate([300, 100, 300]);
    }
    if (risk.score > 85 && !triggered.includes("critical")) {
      setTriggered((x) => [...x, "critical"]);
      beep(880, 0.5);
      if (navigator.vibrate) navigator.vibrate([500, 100, 500, 100, 500]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [risk.score, risk.driverFatigue, risk.engineAnomaly]);

  function beep(freq: number, dur = 0.25) {
    try {
      audioRef.current ??= new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioRef.current!;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = freq;
      o.type = "sine";
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      o.start();
      o.stop(ctx.currentTime + dur);
    } catch {}
  }

  const reset = () => {
    setRunning(false);
    setTSec(0);
    setTriggered([]);
  };

  const critical = risk.band === "CRITICAL";

  return (
    <AppShell>
      <div
        className={`p-4 md:p-8 min-h-screen transition-colors ${critical ? "animate-shake" : ""}`}
        style={critical ? { backgroundColor: "color-mix(in oklab, var(--risk-high) 12%, transparent)" } : undefined}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {lang === "ar" ? "المحاكاة" : "Simulation"}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
                {lang === "ar" ? "سيناريو قيادة مباشر" : "Live Driving Scenario"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRunning((r) => !r)}
                className="inline-flex items-center gap-2 bg-gradient-teal text-primary-foreground px-5 py-2.5 rounded-xl shadow-glow font-medium"
              >
                {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {running ? (lang === "ar" ? "إيقاف" : "Pause") : lang === "ar" ? "تشغيل" : "Play"}
              </button>
              <button onClick={reset} className="glass px-4 py-2.5 rounded-xl inline-flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                {lang === "ar" ? "إعادة" : "Reset"}
              </button>
            </div>
          </header>

          {/* Timeline */}
          <GlassCard>
            <div className="flex justify-between text-xs mb-2 text-muted-foreground">
              <span>t = {tSec.toFixed(1)}s</span>
              <span>Phase: <b style={{ color: "var(--teal)" }}>{phase.toUpperCase()}</b></span>
            </div>
            <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
              <div
                className="h-full bg-gradient-teal transition-[width] duration-300"
                style={{ width: `${Math.min(100, (tSec / 90) * 100)}%` }}
              />
            </div>
          </GlassCard>

          <div className="grid lg:grid-cols-3 gap-5">
            <GlassCard strong className="lg:col-span-2 space-y-4">
              <h2 className="font-display font-semibold">Live Telemetry</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MetricTile label="EAR" value={state.ear.toFixed(2)} danger={state.ear < 0.25} />
                <MetricTile label="MAR" value={state.mar.toFixed(2)} danger={state.mar > 0.6} />
                <MetricTile label="Head Yaw" value={`${Math.round(state.headYaw)}°`} danger={state.headYaw > 18} />
                <MetricTile label="Blinks/min" value={Math.round(state.blinkRate)} />
                <MetricTile label="RPM" value={Math.round(state.rpm)} danger={state.rpm > 3200} />
                <MetricTile label="MAF" value={state.maf.toFixed(1)} unit="g/s" />
                <MetricTile label="Temp" value={`${state.ambientTemp.toFixed(0)}°C`} danger={state.ambientTemp > 42} />
                <MetricTile label="Throttle" value={`${Math.round(state.throttle)}%`} />
              </div>

              <div className="space-y-2 pt-2">
                {triggered.includes("fatigue") && (
                  <AlertBar text={t("fatigue_alert")} color="var(--risk-mid)" />
                )}
                {triggered.includes("engine") && (
                  <AlertBar text={t("engine_alert")} color="var(--risk-mid)" />
                )}
                {triggered.includes("critical") && (
                  <AlertBar
                    text={
                      lang === "ar"
                        ? "⛔ خطر حرج · تخفيض السرعة تلقائياً"
                        : "⛔ CRITICAL · Auto speed-reduction engaged"
                    }
                    color="var(--risk-high)"
                    pulse
                  />
                )}
              </div>
            </GlassCard>

            <GlassCard strong className="flex flex-col items-center justify-center">
              <RiskGauge score={risk.score} band={risk.band} label={t("overall_risk")} />
              <div className="mt-3 text-center">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  {lang === "ar" ? "إجهاد" : "Fatigue"} · {lang === "ar" ? "محرك" : "Engine"}
                </div>
                <div className="mt-1 flex items-center gap-3 justify-center">
                  <b style={{ color: "var(--teal)" }}>{Math.round(risk.driverFatigue)}%</b>
                  <span className="text-muted-foreground">/</span>
                  <b style={{ color: "var(--teal)" }}>{Math.round(risk.engineAnomaly)}%</b>
                </div>
              </div>
              <p className="mt-3 text-xs text-center text-muted-foreground">
                {lang === "ar" ? risk.reasonAr : risk.reason}
              </p>
            </GlassCard>
          </div>

          <GlassCard>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" style={{ color: "var(--teal)" }} />
              <span className="text-muted-foreground">
                {lang === "ar"
                  ? "السيناريو مبرمج: بعد 20 ثانية يبدأ السائق بالنعاس، ثم يظهر خلل بالمحرك، ثم حالة حرجة مجمعة."
                  : "Scripted scenario: driver drowsiness → engine anomaly → combined critical event."}
              </span>
            </div>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}

function AlertBar({ text, color, pulse }: { text: string; color: string; pulse?: boolean }) {
  return (
    <div
      className={`glass rounded-xl px-4 py-3 text-sm font-semibold ${pulse ? "animate-pulse-glow" : ""}`}
      style={{ borderColor: color, color }}
    >
      {text}
    </div>
  );
}

function deriveState(t: number, phase: string) {
  const noise = (amp: number) => (Math.random() - 0.5) * amp;
  if (phase === "normal") {
    return {
      ear: 0.30 + noise(0.02), mar: 0.32 + noise(0.03), blinkRate: 18 + noise(2),
      headYaw: 5 + noise(2), rpm: 1800 + noise(200), maf: 12 + noise(1),
      ambientTemp: 33 + noise(0.5), throttle: 25 + noise(5), coolantTemp: 88 + noise(1),
    };
  }
  if (phase === "fatigue") {
    const p = (t - 20) / 25;
    return {
      ear: 0.30 - 0.10 * p + noise(0.02),
      mar: 0.35 + 0.35 * p + noise(0.04),
      blinkRate: 18 - 12 * p + noise(1),
      headYaw: 5 + 18 * p + noise(3),
      rpm: 1900 + noise(200), maf: 12 + noise(1),
      ambientTemp: 34 + noise(0.5), throttle: 25 + noise(5), coolantTemp: 89 + noise(1),
    };
  }
  if (phase === "engine") {
    const p = (t - 45) / 25;
    return {
      ear: 0.19 + noise(0.02), mar: 0.65 + noise(0.04),
      blinkRate: 7 + noise(1), headYaw: 22 + noise(2),
      rpm: 1900 + 1800 * p + noise(150),
      maf: 12 + 12 * p + noise(1),
      ambientTemp: 35 + 8 * p + noise(0.5),
      throttle: 30 + 55 * p + noise(3),
      coolantTemp: 90 + 18 * p + noise(1),
    };
  }
  // critical combined
  return {
    ear: 0.16 + noise(0.01), mar: 0.72 + noise(0.03),
    blinkRate: 5 + noise(1), headYaw: 24 + noise(2),
    rpm: 3800 + noise(200), maf: 26 + noise(1),
    ambientTemp: 44 + noise(0.4), throttle: 92 + noise(2),
    coolantTemp: 108 + noise(1),
  };
}
