import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { Database, Eye, Activity, Truck, Users } from "lucide-react";
export const Route = createFileRoute("/data")({ component: Data });
const DATASETS = [
  ["MRL Eye", "84,898 images · 37 subjects", "Eye open/closed", Eye],
  ["YawDD", "320 videos · 47 drivers", "Yawning", Eye],
  ["DD Database", "3,676 windows · 10 subjects", "EEG / EOG / ECG physiology", Activity],
  ["DriverSVT", "76,701 rows · 436 drivers", "Vehicle telemetry · partial", Truck],
  ["PSBD / JDRI", "Subject-level sources", "Vehicle + physiology research", Users],
] as const;
function Data() {
  const { lang } = useApp();
  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            JDRI Data Lab
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 flex items-center gap-3">
            <Database className="w-8 h-8" style={{ color: "var(--teal)" }} />
            {lang === "ar" ? "قواعد البيانات والإشارات" : "Datasets & signals"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "ar"
              ? "كل نموذج مدرّب ومقاس على مهمته وقاعدة بياناته؛ لا نخلط النتائج في رقم واحد."
              : "Each model is trained and measured for its own task and dataset; results are not collapsed into one score."}
          </p>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATASETS.map(([name, size, task, Icon]) => (
            <GlassCard key={name} strong>
              <Icon className="w-6 h-6 mb-3" style={{ color: "var(--teal)" }} />
              <h3 className="font-display font-semibold">{name}</h3>
              <p className="mt-1 text-sm text-foreground/80">{task}</p>
              <p className="mt-2 text-xs text-muted-foreground">{size}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard>
          <h3 className="font-display font-semibold mb-3">
            {lang === "ar" ? "إشارات JDRI" : "JDRI signal stack"}
          </h3>
          <div className="grid md:grid-cols-4 gap-3">
            {(lang === "ar"
              ? [
                  "الرؤية: إغلاق العين والتثاؤب والرمش ووضع الرأس",
                  "الفسيولوجيا: EEG / EOG / ECG وHRV",
                  "المركبة: السرعة والتسارع وTelemetry وOBD-II عند توفره",
                  "السياق: خط الأساس الشخصي والوقت والرحلة والحمولة",
                ]
              : [
                  "Vision: eye closure, yawning, blink and head pose",
                  "Physiology: EEG / EOG / ECG and HRV",
                  "Vehicle: speed, acceleration, telemetry and OBD-II when available",
                  "Context: personal baseline, time, trip and cargo",
                ]
            ).map((x) => (
              <div key={x} className="glass rounded-xl p-3 text-sm text-muted-foreground leading-6">
                {x}
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <h3 className="font-display font-semibold">
            {lang === "ar" ? "التوأم الرقمي" : "Digital twin state"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-7">
            {lang === "ar"
              ? "يبني النظام خط أساس ديناميكيًا لكل سائق ويحدثه مع النوافذ الزمنية، ليقارن الحالة الحالية بالسلوك الطبيعي لذلك السائق بدل عتبة عامة ثابتة."
              : "JDRI maintains a dynamic per-driver baseline updated by time windows, comparing current state with that driver’s normal pattern rather than a single global threshold."}
          </p>
        </GlassCard>
      </div>
    </AppShell>
  );
}
