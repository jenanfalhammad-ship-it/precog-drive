import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { LineChart } from "lucide-react";

export const Route = createFileRoute("/comparison")({ component: Comparison });
const MODELS = [
  {
    name: "Random Forest — YawDD",
    dataset: "YawDD · yawning",
    split: "Driver-level",
    acc: 94.12,
    bal: 94.43,
    f1: 90.91,
    roc: 93.92,
    best: true,
  },
  {
    name: "HOG + Linear SVM — MRL",
    dataset: "MRL Eye · eye closure",
    split: "Subject-level",
    acc: 86.01,
    bal: 85.44,
    f1: 83.59,
    roc: null,
  },
  {
    name: "HistGradientBoosting — DD",
    dataset: "DD · physiology",
    split: "LOSO",
    acc: 80.79,
    bal: 76.64,
    f1: 68.51,
    roc: 83.64,
  },
  {
    name: "Random Forest — DD",
    dataset: "DD · physiology",
    split: "LOSO",
    acc: 80.74,
    bal: 75.02,
    f1: 66.32,
    roc: 82.47,
  },
  {
    name: "ExtraTrees — DriverSVT",
    dataset: "DriverSVT · telemetry",
    split: "Driver-level + balanced training",
    acc: 87.91,
    bal: 64.82,
    f1: 40.55,
    roc: 87.26,
  },
  {
    name: "ExtraTrees All-State — DriverSVT",
    dataset: "DriverSVT · telemetry",
    split: "Driver-level + balanced training",
    acc: 89.23,
    bal: 63.02,
    f1: 38.83,
    roc: 89.56,
  },
];
const MATRIX = {
  dd: [
    [2202, 293],
    [413, 768],
  ],
  svt: [
    [13615, 353],
    [1355, 542],
  ],
};
function Comparison() {
  const { lang } = useApp();
  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            JDRI Research Benchmark
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 flex items-center gap-3">
            <LineChart className="w-8 h-8" style={{ color: "var(--teal)" }} />
            {lang === "ar" ? "نتائج المكونات المقاسة" : "Measured component results"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "ar"
              ? "كل نتيجة مرتبطة بمهمة وقاعدة بيانات وطريقة تقسيم محددة؛ لا تُجمع في دقة واحدة."
              : "Every result is tied to a task, dataset and split; component scores are not a single system accuracy."}
          </p>
        </header>
        <GlassCard strong>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border/40">
                  <th className="text-start py-3">
                    {lang === "ar" ? "النموذج / المهمة" : "Model / task"}
                  </th>
                  <th className="text-start">Dataset</th>
                  <th className="text-start">Split</th>
                  <th className="text-end">Accuracy</th>
                  <th className="text-end">Balanced Acc.</th>
                  <th className="text-end">F1</th>
                  <th className="text-end">AUROC</th>
                </tr>
              </thead>
              <tbody>
                {MODELS.map((m) => (
                  <tr
                    key={m.name}
                    className={`border-b border-border/20 ${m.best ? "bg-gradient-to-r from-transparent via-teal/10 to-transparent" : ""}`}
                  >
                    <td className="py-3 font-semibold">
                      {m.name}
                      {m.best && (
                        <span
                          className="ms-2 text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            background: "color-mix(in oklab, var(--risk-low) 25%, transparent)",
                            color: "var(--risk-low)",
                          }}
                        >
                          TOP COMPONENT
                        </span>
                      )}
                    </td>
                    <td className="text-xs text-muted-foreground">{m.dataset}</td>
                    <td className="text-xs text-muted-foreground">{m.split}</td>
                    {[m.acc, m.bal, m.f1, m.roc].map((v, i) => (
                      <td
                        key={i}
                        className="text-end tabular-nums py-3"
                        style={m.best ? { color: "var(--teal)", fontWeight: 700 } : undefined}
                      >
                        {v === null ? "—" : `${v.toFixed(2)}%`}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
        <div className="grid md:grid-cols-2 gap-5">
          <Matrix
            title={
              lang === "ar"
                ? "DD — HistGradientBoosting (LOSO)"
                : "DD — HistGradientBoosting (LOSO)"
            }
            matrix={MATRIX.dd}
          />
          <Matrix
            title={lang === "ar" ? "DriverSVT — ExtraTrees" : "DriverSVT — ExtraTrees"}
            matrix={MATRIX.svt}
          />
        </div>
        <GlassCard>
          <h3 className="font-display font-semibold">
            {lang === "ar" ? "كيف نقرأ هذه الأرقام؟" : "How to read these results"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-7">
            {lang === "ar"
              ? "نتيجة DriverSVT تبدو مرتفعة في Accuracy بسبب عدم توازن الفئات؛ لذلك تعرض JDRI Balanced Accuracy وF1 وAUROC إلى جانب Accuracy. الدمج النهائي سيُقاس لاحقًا على بيانات متزامنة مستقلة على مستوى السائق."
              : "DriverSVT accuracy is affected by class imbalance, so JDRI shows Balanced Accuracy, F1 and AUROC alongside accuracy. Final fusion will be measured on synchronized, driver-independent data."}
          </p>
        </GlassCard>
      </div>
    </AppShell>
  );
}
function Matrix({ title, matrix }: { title: string; matrix: number[][] }) {
  return (
    <GlassCard>
      <h3 className="font-display font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div></div>
        <div className="text-muted-foreground">Pred. 0</div>
        <div className="text-muted-foreground">Pred. 1</div>
        <div className="text-muted-foreground">Actual 0</div>
        <div className="glass rounded-lg p-3">
          <b className="text-2xl" style={{ color: "var(--risk-low)" }}>
            {matrix[0][0].toLocaleString()}
          </b>
          <div>TN</div>
        </div>
        <div className="glass rounded-lg p-3">
          <b className="text-2xl" style={{ color: "var(--risk-mid)" }}>
            {matrix[0][1].toLocaleString()}
          </b>
          <div>FP</div>
        </div>
        <div className="text-muted-foreground">Actual 1</div>
        <div className="glass rounded-lg p-3">
          <b className="text-2xl" style={{ color: "var(--risk-mid)" }}>
            {matrix[1][0].toLocaleString()}
          </b>
          <div>FN</div>
        </div>
        <div className="glass rounded-lg p-3">
          <b className="text-2xl" style={{ color: "var(--risk-low)" }}>
            {matrix[1][1].toLocaleString()}
          </b>
          <div>TP</div>
        </div>
      </div>
    </GlassCard>
  );
}
