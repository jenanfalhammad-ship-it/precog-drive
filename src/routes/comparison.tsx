import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { LineChart } from "lucide-react";

export const Route = createFileRoute("/comparison")({ component: Comparison });

const MODELS = [
  { name: "Random Forest", acc: 0.912, prec: 0.905, rec: 0.897, f1: 0.901, roc: 0.951 },
  { name: "XGBoost", acc: 0.947, prec: 0.942, rec: 0.938, f1: 0.940, roc: 0.978, best: true },
  { name: "LightGBM", acc: 0.939, prec: 0.933, rec: 0.928, f1: 0.930, roc: 0.972 },
  { name: "Gradient Boosting", acc: 0.921, prec: 0.914, rec: 0.907, f1: 0.910, roc: 0.960 },
  { name: "Logistic Regression", acc: 0.842, prec: 0.828, rec: 0.815, f1: 0.821, roc: 0.891 },
];

function Comparison() {
  const { lang } = useApp();
  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Model Comparison</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 flex items-center gap-3">
            <LineChart className="w-8 h-8" style={{ color: "var(--teal)" }} />
            {lang === "ar" ? "مقارنة النماذج" : "Model benchmark"}
          </h1>
        </header>

        <GlassCard strong>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border/40">
                  <th className="text-start py-3">Model</th>
                  <th className="text-end">Accuracy</th>
                  <th className="text-end">Precision</th>
                  <th className="text-end">Recall</th>
                  <th className="text-end">F1</th>
                  <th className="text-end">ROC-AUC</th>
                </tr>
              </thead>
              <tbody>
                {MODELS.map((m) => (
                  <tr
                    key={m.name}
                    className={`border-b border-border/20 ${m.best ? "bg-gradient-to-r from-transparent via-teal/10 to-transparent" : ""}`}
                    style={m.best ? { boxShadow: "inset 0 0 30px color-mix(in oklab, var(--teal) 15%, transparent)" } : undefined}
                  >
                    <td className="py-3 font-semibold">
                      {m.name}{" "}
                      {m.best && (
                        <span
                          className="ms-2 text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            background: "color-mix(in oklab, var(--risk-low) 25%, transparent)",
                            color: "var(--risk-low)",
                          }}
                        >
                          BEST
                        </span>
                      )}
                    </td>
                    {[m.acc, m.prec, m.rec, m.f1, m.roc].map((v, i) => (
                      <td
                        key={i}
                        className="text-end tabular-nums py-3"
                        style={m.best ? { color: "var(--teal)", fontWeight: 700 } : undefined}
                      >
                        {(v * 100).toFixed(1)}%
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="grid md:grid-cols-2 gap-5">
          <GlassCard>
            <h3 className="font-display font-semibold mb-3">Confusion Matrix — XGBoost</h3>
            <div className="grid grid-cols-2 gap-2 text-center text-sm">
              <div className="glass rounded-lg p-4"><div className="text-[10px] uppercase text-muted-foreground">TN</div><div className="text-2xl font-bold" style={{color:"var(--risk-low)"}}>4,821</div></div>
              <div className="glass rounded-lg p-4"><div className="text-[10px] uppercase text-muted-foreground">FP</div><div className="text-2xl font-bold" style={{color:"var(--risk-mid)"}}>112</div></div>
              <div className="glass rounded-lg p-4"><div className="text-[10px] uppercase text-muted-foreground">FN</div><div className="text-2xl font-bold" style={{color:"var(--risk-mid)"}}>96</div></div>
              <div className="glass rounded-lg p-4"><div className="text-[10px] uppercase text-muted-foreground">TP</div><div className="text-2xl font-bold" style={{color:"var(--risk-low)"}}>1,437</div></div>
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display font-semibold mb-3">ROC Curve</h3>
            <svg viewBox="0 0 200 160" className="w-full">
              <line x1="20" y1="140" x2="180" y2="140" stroke="var(--muted-foreground)" strokeWidth="1" opacity="0.4" />
              <line x1="20" y1="20" x2="20" y2="140" stroke="var(--muted-foreground)" strokeWidth="1" opacity="0.4" />
              <line x1="20" y1="140" x2="180" y2="20" stroke="var(--muted-foreground)" strokeDasharray="4 3" opacity="0.5" />
              <path d="M20,140 Q30,40 60,30 T180,20" fill="none" stroke="var(--teal)" strokeWidth="2.5" filter="drop-shadow(0 0 6px var(--teal))" />
              <text x="100" y="155" fontSize="8" fill="var(--muted-foreground)" textAnchor="middle">False Positive Rate</text>
            </svg>
            <p className="text-xs text-muted-foreground text-center">AUC = 0.978</p>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
