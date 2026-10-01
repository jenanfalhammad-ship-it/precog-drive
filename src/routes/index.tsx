import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Camera,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileSearch,
  Gauge,
  Layers3,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Upload,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

type Analysis = { kind: string; price: string; health: number; repair: string; score: number };
function analyze(name: string, mime: string): Analysis {
  const n = name.toLowerCase();
  if (n.includes("iphone") || n.includes("phone") || mime.includes("mobile"))
    return {
      kind: "هاتف ذكي",
      price: "1,800 – 3,900 ر.س",
      health: 91,
      repair: "تغيير البطارية وتنظيف منفذ الشحن",
      score: 92,
    };
  if (n.includes("laptop") || n.includes("mac") || n.includes("book"))
    return {
      kind: "حاسوب محمول",
      price: "2,400 – 6,800 ر.س",
      health: 86,
      repair: "فحص البطارية وترقية التخزين",
      score: 87,
    };
  if (n.includes("watch") || n.includes("band"))
    return {
      kind: "ساعة ذكية",
      price: "450 – 1,400 ر.س",
      health: 78,
      repair: "استبدال البطارية ومعايرة المستشعر",
      score: 79,
    };
  return {
    kind: "جهاز إلكتروني ذكي",
    price: "650 – 2,900 ر.س",
    health: 88,
    repair: "تنظيف المكونات وفحص الطاقة والاتصال",
    score: 86,
  };
}
function Landing() {
  const { t, lang, dir } = useApp();
  const ar = lang === "ar";
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [fileName, setFileName] = useState("");
  const [drag, setDrag] = useState(false);
  const handleFile = (file?: File) => {
    if (!file) return;
    setFileName(file.name);
    setAnalysis(analyze(file.name, file.type));
  };
  return (
    <AppShell>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 -end-40 w-[34rem] h-[34rem] rounded-full bg-[#849dff] opacity-20 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-10 -start-40 w-[32rem] h-[32rem] rounded-full bg-[#d6b7ff] opacity-15 blur-3xl" />
        </div>
        <section className="px-6 md:px-12 pt-10 md:pt-20 pb-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
            <div className={dir === "rtl" ? "text-right" : "text-left"}>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#73e2ff] animate-pulse" />
                {ar ? "منصة ذكاء اصطناعي للأجهزة اليومية" : "AI intelligence for everyday devices"}
              </div>
              <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight">
                <span className="text-gradient">ORBIT</span>
                <br />
                <span>{ar ? "كل جهاز له قصة." : "Every device has a story."}</span>
              </h1>
              <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-xl">
                {t("subtitle")}
              </p>
              <p className="mt-3 text-sm text-muted-foreground/80 max-w-xl">
                {ar
                  ? "ارفع صورة جهازك، وسيحلل ORBIT نوعه وقيمته وصحته وأفضل خطوة إصلاح — بوضوح وبسرعة."
                  : "Upload a device photo and ORBIT estimates its type, value, health, and next repair step."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/camera"
                  className="inline-flex items-center gap-2 bg-gradient-teal text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-glow hover:scale-[1.03] transition-transform"
                >
                  {t("cta_start")}
                  <ArrowRight className={`w-4 h-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                </Link>
                <Link
                  to="/devices"
                  className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all"
                >
                  {t("cta_dashboard")}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                {[
                  [ScanLine, ar ? "تحليل بصري" : "Visual analysis"],
                  [Wrench, ar ? "إصلاح استباقي" : "Predictive repair"],
                  [ShieldCheck, ar ? "درجة موثوقة" : "Trust score"],
                ].map(([Icon, label]) => (
                  <div key={label as string} className="glass rounded-xl p-3 text-center">
                    <Icon className="w-5 h-5 mx-auto text-teal" />
                    <div className="mt-2 text-[11px] text-muted-foreground">{label as string}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <GlassCard strong className="p-5 md:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-teal">
                      ORBIT AI SCANNER
                    </div>
                    <h2 className="font-display text-2xl font-semibold mt-2">
                      {ar ? "حلّل جهازك" : "Analyze a device"}
                    </h2>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-teal flex items-center justify-center shadow-glow">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDrag(true);
                  }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDrag(false);
                    handleFile(e.dataTransfer.files[0]);
                  }}
                  className={`mt-6 min-h-48 rounded-2xl border border-dashed flex flex-col items-center justify-center text-center p-5 cursor-pointer transition-all ${drag ? "border-teal bg-teal/10" : "border-border/70 hover:border-teal/70 hover:bg-white/[.03]"}`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />
                  <div className="w-14 h-14 rounded-2xl bg-[#8aa8ff]/15 flex items-center justify-center text-[#8aa8ff]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="mt-4 font-medium">
                    {fileName ||
                      (ar
                        ? "اسحب صورة الجهاز هنا أو اختر ملفاً"
                        : "Drop a device photo or choose a file")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {ar ? "PNG أو JPG · التحليل محلي وآمن" : "PNG or JPG · private local analysis"}
                  </p>
                </label>
                {analysis && (
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/[.04] p-3">
                      <p className="text-[10px] text-muted-foreground">
                        {ar ? "نوع الجهاز" : "Device type"}
                      </p>
                      <p className="font-semibold mt-1">{analysis.kind}</p>
                    </div>
                    <div className="rounded-xl bg-white/[.04] p-3">
                      <p className="text-[10px] text-muted-foreground">
                        {ar ? "القيمة المتوقعة" : "Estimated value"}
                      </p>
                      <p className="font-semibold mt-1">{analysis.price}</p>
                    </div>
                    <div className="rounded-xl bg-white/[.04] p-3">
                      <p className="text-[10px] text-muted-foreground">{ar ? "الصحة" : "Health"}</p>
                      <p className="font-semibold mt-1 text-teal">{analysis.health}%</p>
                    </div>
                    <div className="rounded-xl bg-white/[.04] p-3">
                      <p className="text-[10px] text-muted-foreground">
                        {ar ? "ORBIT Score" : "ORBIT Score"}
                      </p>
                      <p className="font-semibold mt-1 text-[#d6b7ff]">{analysis.score}/100</p>
                    </div>
                    <div className="col-span-2 rounded-xl border border-teal/20 bg-teal/5 p-3">
                      <p className="text-[10px] text-muted-foreground">
                        {ar ? "التوصية الذكية" : "Smart recommendation"}
                      </p>
                      <p className="text-sm mt-1">{analysis.repair}</p>
                    </div>
                  </div>
                )}
                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-teal" />
                  {ar
                    ? "مصمم للعرض التعليمي وقابل للربط مع نموذج AI حقيقي"
                    : "Demo-ready and prepared for a production AI model"}
                </div>
              </GlassCard>
              <div className="absolute -z-10 inset-8 rounded-[2rem] border border-[#8aa8ff]/20 rotate-3" />
            </div>
          </div>
        </section>
        <section className="px-6 md:px-12 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-teal">ORBIT ECOSYSTEM</div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mt-2">
                  {ar ? "منصة تتطور معك" : "A platform that evolves with you"}
                </h2>
              </div>
              <Link
                to="/events"
                className="text-sm text-teal hover:underline inline-flex items-center gap-1"
              >
                {ar ? "استكشف الفعاليات" : "Explore events"}
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                [
                  FileSearch,
                  ar ? "تقرير الجهاز" : "Device report",
                  ar
                    ? "ملخص واضح للنوع والقيمة والحالة."
                    : "A clear summary of type, value, and health.",
                ],
                [
                  Layers3,
                  ar ? "أجهزة افتراضية" : "Virtual devices",
                  ar
                    ? "جرّب السيناريوهات قبل شراء أو إصلاح الجهاز."
                    : "Test scenarios before buying or repairing.",
                ],
                [
                  Gauge,
                  ar ? "ORBIT Score" : "ORBIT Score",
                  ar ? "درجة واحدة تلخص موثوقية جهازك." : "One score that summarizes device trust.",
                ],
                [
                  Sparkles,
                  ar ? "فعاليات ملهمة" : "Inspiring events",
                  ar
                    ? "ورش وتحديات تربط التقنية بالمجتمع."
                    : "Workshops and challenges for the community.",
                ],
              ].map(([Icon, title, desc]) => (
                <GlassCard
                  key={title as string}
                  className="hover:shadow-glow hover:-translate-y-1 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-teal flex items-center justify-center mb-3 shadow-glow">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold">{title as string}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{desc as string}</p>
                </GlassCard>
              ))}
            </div>
            <div className="mt-12 glass rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">
                {ar ? "عمل الطالبتان" : "Created by"}{" "}
                <strong className="text-foreground">
                  {ar ? "جنان آل حماد وزينب العقيلي" : "Jenan Al-Hammad & Zainab Al-Oqaili"}
                </strong>{" "}
                · {ar ? "الثانوية السادسة بالقطيف" : "Sixth Secondary School, Qatif"}
              </span>
              <span className="text-teal">
                {ar
                  ? "ابتكار يربط الأجهزة بعالم أفضل"
                  : "Innovation that connects devices to a better world"}
              </span>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
