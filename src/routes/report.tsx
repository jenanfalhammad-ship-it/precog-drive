import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { FileBarChart, Download } from "lucide-react";

export const Route = createFileRoute("/report")({ component: Report });

function Report() {
  const { lang } = useApp();

  const generate = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"/><title>PRECOG AI Report</title>
      <style>body{font-family:Inter,system-ui;max-width:780px;margin:40px auto;padding:20px;color:#0d1b3d}
      h1{color:#1e3a5f}.card{border:1px solid #d8e0ea;border-radius:12px;padding:16px;margin:12px 0}
      .bar{height:8px;background:#e8edf3;border-radius:4px;overflow:hidden}.bar>i{display:block;height:100%;background:linear-gradient(90deg,#1e3a5f,#2dd4a8)}
      table{width:100%;border-collapse:collapse}th,td{padding:8px;text-align:left;border-bottom:1px solid #e8edf3}</style></head>
      <body><h1>PRECOG AI — Predictive Risk Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <div class="card"><h2>Overall Risk</h2><h1 style="color:#c44">82% HIGH</h1>
      <p>Elevated Engine RPM combined with abnormal airflow and reduced EAR indicate combined driver-fatigue and engine anomaly risk.</p></div>
      <div class="card"><h2>SHAP Contributions</h2>
      ${["Engine RPM 42","Ambient Temp 31","EAR 24","MAR 19","Throttle 12"].map(x=>{const [n,v]=x.split(" ").reduce<[string,string]>((a,c,i,arr)=>i===arr.length-1?[a[0],c]:[a[0]+(a[0]?" ":"")+c,a[1]],["",""]);return `<div><b>${n}</b> +${v}%<div class="bar"><i style="width:${Math.min(100,+v*2)}%"></i></div></div>`}).join("")}</div>
      <div class="card"><h2>Confusion Matrix (XGBoost)</h2>
      <table><tr><th></th><th>Pred Low</th><th>Pred High</th></tr>
      <tr><td>Actual Low</td><td>4821</td><td>112</td></tr>
      <tr><td>Actual High</td><td>96</td><td>1437</td></tr></table></div>
      <div class="card"><h2>Recommendations</h2><ul>
      <li>Enforce immediate driver rest break.</li>
      <li>Engine diagnostic scan within 24h.</li>
      <li>Reduce night shifts for this driver.</li></ul></div>
      </body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "precog-ai-report.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">AI Report</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 flex items-center gap-3">
            <FileBarChart className="w-8 h-8" style={{ color: "var(--teal)" }} />
            {lang === "ar" ? "تقرير الذكاء الاصطناعي" : "AI Report"}
          </h1>
        </header>

        <GlassCard strong className="text-center py-12">
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            {lang === "ar"
              ? "ينشئ النظام تقريراً كاملاً يشمل التوقعات، مصفوفة الالتباس، تحليل SHAP، أهمية الميزات، والتوصيات."
              : "Generates a full report with predictions, confusion matrix, SHAP, feature importance, and recommendations."}
          </p>
          <button
            onClick={generate}
            className="mt-6 bg-gradient-teal text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-glow inline-flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            {lang === "ar" ? "أنشئ تقرير الذكاء الاصطناعي" : "Generate AI Report"}
          </button>
        </GlassCard>

        <div className="grid md:grid-cols-2 gap-5">
          <GlassCard>
            <h3 className="font-display font-semibold mb-2">
              {lang === "ar" ? "محتويات التقرير" : "Report contents"}
            </h3>
            <ul className="text-sm space-y-1.5 text-muted-foreground">
              <li>✓ {lang === "ar" ? "ملخص تنفيذي" : "Executive summary"}</li>
              <li>✓ {lang === "ar" ? "توقعات النموذج" : "Model predictions"}</li>
              <li>✓ {lang === "ar" ? "قيم SHAP" : "SHAP values"}</li>
              <li>✓ {lang === "ar" ? "مصفوفة الالتباس" : "Confusion matrix"}</li>
              <li>✓ {lang === "ar" ? "أهمية الميزات" : "Feature importance"}</li>
              <li>✓ {lang === "ar" ? "توصيات قابلة للتنفيذ" : "Actionable recommendations"}</li>
            </ul>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display font-semibold mb-2">
              {lang === "ar" ? "الصيغة" : "Format"}
            </h3>
            <p className="text-sm text-muted-foreground">
              HTML → PDF (via browser print). {lang === "ar" ? "متوافق مع الطباعة ومختوم بشعار المنصة." : "Print-ready, PRECOG-branded."}
            </p>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
