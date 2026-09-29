import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { FileBarChart, Award, Truck, Brain, Sigma, Activity, Coins } from "lucide-react";
export const Route = createFileRoute("/research")({ component: Research });
const AR = [
  [
    "intro",
    "الملخص التنفيذي",
    "JDRI (Predictive Driver Risk Intelligence) إطار ذكاء اصطناعي متعدد الإشارات لسلامة سائقي الشاحنات على طريق الجبيل–الدمام. يقرأ حالة السائق، يقارنها بخطه الأساسي الشخصي، ويتتبع التغير عبر الزمن ليمنح نافذة قرار قبل اكتمال الخطر.",
  ],
  [
    "problem",
    "المشكلة والفرصة",
    "الشاحنات الثقيلة والرحلات الطويلة والقيادة الليلية تجعل هامش الخطأ صغيرًا. الأنظمة اللحظية تنتظر اكتمال الخطر؛ JDRI ينقل السلامة من الرصد إلى الوقاية عبر ربط العين والتثاؤب والفسيولوجيا وسلوك المركبة.",
  ],
  [
    "method",
    "المعادلة الزمنية",
    "Dₜ = F(Vₜ, Pₜ, Cₜ, Bₜ) تمثل الحالة اللحظية من الرؤية والفسيولوجيا والمركبة والسلوك. ثم Zₜ = [(Xₜ−μdriver)/(σdriver+ε), ΔXₜ] لتخصيص القراءة مقارنة بخط السائق الأساسي واتجاه التغير. وأخيرًا P(Yₜ₊ᴴ=1)=f(Dₜ, ΔDₜ, Zₜ, Cₜ, Contextₜ) لتوقع التدهور عند أفق زمني H وتحويله إلى تدخل متدرج.",
  ],
  [
    "originality",
    "الأصالة",
    "الأصالة ليست في استخدام كاميرا أو فسيولوجيا أو بيانات مركبة منفردة؛ بل في هندسة علاقتها داخل مسار زمني شخصي: قياس ← حالة ← مقارنة شخصية ← اتجاه ← توقع ← تدخل. هذا يحول النظام من Detector إلى Predictive Decision Framework.",
  ],
  [
    "digital-twin",
    "التوأم الرقمي",
    "التوأم الرقمي في JDRI هو تمثيل ديناميكي لحالة السائق وسياق قيادته يتحدث مع كل نافذة زمنية: خط أساس شخصي، تاريخ حالات، استجابة للتنبيهات، وأنماط الطريق والمركبة. يبدأ بسيطًا ثم يتوسع إلى سجل تنبؤي قابل للتشغيل.",
  ],
  [
    "award",
    "المواءمة مع الجائزة",
    "يتقاطع JDRI مباشرة مع محاور التقنيات الناشئة في التنقل الذكي، والبنية التحتية الذكية وتحليل الحوادث، والعوامل البشرية والتوجهات المستقبلية. يقدم ذكاء Edge متعدد الإشارات، لوحة للأسطول، ومؤشرات مجمعة قابلة للتوسع لإدارة المرور.",
  ],
  [
    "results",
    "النتائج المقاسة",
    "YawDD Random Forest: Accuracy 94.12% وAUROC 93.92%. MRL HOG+SVM: 86.01%. DD HistGradientBoosting مع LOSO: 80.79%. DriverSVT ExtraTrees: 87.91% مع AUROC 87.26%؛ وتُقرأ مع Balanced Accuracy بسبب عدم التوازن.",
  ],
  [
    "savings",
    "القيمة والوفورات المتوقعة",
    "الهدف الاقتصادي هو تقليل الخسائر الناتجة عن الحوادث والإصابات والتوقف، لا تسويق تكلفة النظام نفسه. تشير سيناريوهات الحساسية إلى أن خفض 1% من العبء المرجعي البالغ نحو 139.5 مليار ريال يساوي قرابة 1.39 مليار ريال، أي قيمة وقائية تفوق بكثير تكلفة تجربة محدودة على أسطول شاحنات.",
  ],
  [
    "platform",
    "منصة JDRI",
    "تجمع الواجهة بين السائق والشركة وإدارة المرور: تنبيه وتوصية استراحة للسائق، ترتيب مخاطر واتجاهات للأسطول، ومؤشرات مجمعة ومجهلة للطرق الصناعية. المنصة تدعم العربية والإنجليزية والوضع الداكن والفاتح.",
  ],
];
const EN = [
  [
    "intro",
    "Executive brief",
    "JDRI (Predictive Driver Risk Intelligence) is a multimodal AI framework for truck-driver safety on the Jubail–Dammam corridor. It reads driver state, compares it with a personal baseline, and tracks change over time to create a decision window before risk fully develops.",
  ],
  [
    "problem",
    "Problem and opportunity",
    "Heavy trucks, long routes and night driving leave little room for error. Momentary systems wait for risk to complete; JDRI moves from monitoring to prevention by connecting vision, physiology and vehicle behavior.",
  ],
  [
    "method",
    "Temporal equation",
    "Dₜ = F(Vₜ, Pₜ, Cₜ, Bₜ) models instantaneous state. Zₜ = [(Xₜ−μdriver)/(σdriver+ε), ΔXₜ] personalizes the reading against the driver baseline and trend. Finally, P(Yₜ₊ᴴ=1)=f(Dₜ, ΔDₜ, Zₜ, Cₜ, Contextₜ) forecasts deterioration at horizon H and maps it to graded intervention.",
  ],
  [
    "originality",
    "Originality",
    "The originality is not any single camera, physiology or vehicle signal; it is the temporal-personal decision architecture: measure → state → personal comparison → trend → forecast → intervention. This turns a detector into a Predictive Decision Framework.",
  ],
  [
    "digital-twin",
    "Digital twin",
    "JDRI’s digital twin is a dynamic representation of driver state and driving context updated at every time window: a personal baseline, state history, alert response and road/vehicle patterns. It starts lightweight and grows into an operational predictive record.",
  ],
  [
    "award",
    "Award fit",
    "JDRI maps directly to emerging technologies in smart mobility, smart infrastructure and incident analytics, and human factors/future mobility. It offers edge multimodal intelligence, fleet operations and aggregated signals that can scale to traffic management.",
  ],
  [
    "results",
    "Measured results",
    "YawDD Random Forest: 94.12% accuracy and 93.92% AUROC. MRL HOG+SVM: 86.01%. DD HistGradientBoosting with LOSO: 80.79%. DriverSVT ExtraTrees: 87.91% with 87.26% AUROC; interpret with Balanced Accuracy because of imbalance.",
  ],
  [
    "savings",
    "Value and avoided loss",
    "The economic goal is to reduce collision, injury and downtime losses—not to market the system’s own price. A 1% reduction in the reference burden of about SAR 139.5B represents roughly SAR 1.39B in avoided loss, far beyond the cost of a limited truck-fleet pilot.",
  ],
  [
    "platform",
    "JDRI platform",
    "The interface connects driver, fleet and traffic authority: rest guidance for drivers, risk ranking and trends for fleets, and aggregated anonymized indicators for industrial corridors. It supports Arabic/English and dark/light themes.",
  ],
];
const ICONS = [Brain, Activity, Sigma, Award, Truck, Award, Activity, Coins, Truck];
function Research() {
  const { lang } = useApp();
  const sections = lang === "ar" ? AR : EN;
  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            JDRI Research & Award
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 flex items-center gap-3">
            <FileBarChart className="w-8 h-8" style={{ color: "var(--teal)" }} />
            JDRI — {lang === "ar" ? "البحث والابتكار" : "Research & innovation"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "ar"
              ? "من عمل الباحثة جنان فتحي آل حماد للمشاركة في جائزة الابتكار في تطبيقات التنقل والسلامة على الطرق في المدن الذكية."
              : "Designed and developed by researcher Jenan Fathi Al-Hammad for the Innovation in Smart Mobility & Road Safety Award."}
          </p>
        </header>
        <div className="grid md:grid-cols-[220px_1fr] gap-6">
          <nav className="glass rounded-2xl p-3 h-max md:sticky md:top-6 space-y-1">
            {sections.map((s, i) => (
              <a
                key={s[0]}
                href={`#${s[0]}`}
                className="block px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent transition"
              >
                <span className="text-muted-foreground text-xs">
                  {String(i + 1).padStart(2, "0")}.
                </span>{" "}
                {s[1]}
              </a>
            ))}
          </nav>
          <div className="space-y-4">
            {sections.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <GlassCard key={s[0]} strong id={s[0]}>
                  <div className="flex gap-3">
                    <Icon className="w-5 h-5 shrink-0 mt-1" style={{ color: "var(--teal)" }} />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h2 className="font-display text-xl font-semibold mt-1">{s[1]}</h2>
                      <p className="mt-3 text-sm text-foreground/80 leading-8">{s[2]}</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
