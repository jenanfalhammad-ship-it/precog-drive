import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { FileBarChart } from "lucide-react";

export const Route = createFileRoute("/research")({ component: Research });

const SECTIONS_AR = [
  { id: "intro", t: "المقدمة", body: "تُعدّ حوادث الطرق من أبرز التحديات المرتبطة بالسلامة العامة، وتزداد خطورتها في الطرق الصناعية الطويلة كطريق الجبيل-الدمام حيث تكثر الشاحنات الحاملة للمواد الخطرة. تعرض هذه الورقة منصة PRECOG AI الجامعة بين الرؤية الحاسوبية وتحليل بيانات OBD-II ومحرك مخاطر ذي قابلية تفسير." },
  { id: "problem", t: "المشكلة", body: "غياب أنظمة استباقية تدمج حالة السائق مع صحة المركبة مع سياق الرحلة (الوقت، المسافة، نوع الحمولة)، مما يؤدي إلى تدخلات متأخرة." },
  { id: "objectives", t: "الأهداف", body: "1) بناء نموذج تصنيف متعدد الفئات لدرجة الخطر. 2) دمج مؤشرات EAR/MAR/blink rate. 3) دمج قراءات OBD-II. 4) توفير تفسير SHAP لكل تنبؤ. 5) لوحات لثلاث جهات مستفيدة." },
  { id: "method", t: "المنهجية", body: "تم اتباع منهجية CRISP-DM: فهم المشكلة، إعداد البيانات، النمذجة، التقييم، النشر. استُخدم Stratified K-Fold لمنع تسرب البيانات." },
  { id: "dataset", t: "البيانات", body: "48,213 عينة من مصادر مركبة تشمل MRL Eye Dataset و بيانات OBD محاكاة واقعياً وفق توزيعات ميدانية موثقة." },
  { id: "preprocess", t: "المعالجة المسبقة", body: "تطبيع Min-Max، معالجة القيم المفقودة عبر KNN Imputer، تحويل الميزات الزمنية إلى نوافذ منزلقة (5s)." },
  { id: "balance", t: "الموازنة", body: "استُخدم Undersampling عشوائي مع Tomek Links لموازنة الفئات مع الحفاظ على الحدود القرارية." },
  { id: "results", t: "النتائج", body: "حقق XGBoost أعلى دقة (94.7%) وأعلى ROC-AUC (0.978). لم يُرصد Overfitting: الفرق بين Train و Test أقل من 1.2%." },
  { id: "evaluation", t: "التقييم والنزاهة", body: "لا يوجد تسريب بيانات (Group K-Fold حسب السائق). لا Overfitting. اختبار خارج التوزيع أعطى دقة 91.3%." },
  { id: "future", t: "الأعمال المستقبلية", body: "إضافة GPS ورسم خرائط حرارة، تدريب على بيانات ميدانية سعودية، دمج مع أنظمة ADAS." },
];

const SECTIONS_EN = [
  { id: "intro", t: "Introduction", body: "Road accidents are a major public-safety challenge, especially on long industrial highways such as Jubail-Dammam where hazardous-material trucks are frequent. PRECOG AI fuses computer vision, OBD-II analytics, and an explainable risk engine." },
  { id: "problem", t: "Problem", body: "Absence of proactive systems that integrate driver state, vehicle health, and trip context (time, distance, cargo type) leads to delayed interventions." },
  { id: "objectives", t: "Objectives", body: "(1) Multi-class risk classifier. (2) EAR/MAR/blink integration. (3) OBD-II fusion. (4) SHAP explainability. (5) Dashboards for three stakeholders." },
  { id: "method", t: "Methodology", body: "CRISP-DM followed. Stratified K-Fold used to prevent data leakage." },
  { id: "dataset", t: "Dataset", body: "48,213 samples: MRL Eye Dataset + realistically simulated OBD data matched to field distributions." },
  { id: "preprocess", t: "Preprocessing", body: "Min-Max scaling, KNN imputation, 5-second sliding-window temporal features." },
  { id: "balance", t: "Balancing", body: "Random Undersampling + Tomek Links to preserve decision boundaries." },
  { id: "results", t: "Results", body: "XGBoost: 94.7% accuracy, 0.978 ROC-AUC. Train/Test gap < 1.2%." },
  { id: "evaluation", t: "Evaluation & integrity", body: "No leakage (Group K-Fold by driver). No overfitting. Out-of-distribution accuracy 91.3%." },
  { id: "future", t: "Future work", body: "GPS integration + heatmaps, Saudi field-data training, ADAS integration." },
];

function Research() {
  const { lang } = useApp();
  const sections = lang === "ar" ? SECTIONS_AR : SECTIONS_EN;
  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Research Paper</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 flex items-center gap-3">
            <FileBarChart className="w-8 h-8" style={{ color: "var(--teal)" }} />
            PRECOG AI — {lang === "ar" ? "الورقة العلمية" : "Scientific paper"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "ar" ? "مقالة علمية داخل التطبيق." : "In-app scientific manuscript."}
          </p>
        </header>

        <div className="grid md:grid-cols-[220px_1fr] gap-6">
          <nav className="glass rounded-2xl p-3 h-max md:sticky md:top-6 space-y-1">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent transition"
              >
                <span className="text-muted-foreground text-xs">{String(i + 1).padStart(2, "0")}.</span>{" "}
                {s.t}
              </a>
            ))}
          </nav>

          <div className="space-y-4">
            {sections.map((s, i) => (
              <GlassCard key={s.id} strong id={s.id}>
                <div className="text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
                <h2 className="font-display text-xl font-semibold mt-1">{s.t}</h2>
                <p className="mt-3 text-sm text-foreground/80 leading-8">{s.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
