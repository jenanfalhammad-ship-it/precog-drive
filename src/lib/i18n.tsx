import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
type Lang = "ar" | "en";
type Theme = "dark" | "light";
interface AppCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}
const Ctx = createContext<AppCtx | null>(null);
const dict: Record<string, { ar: string; en: string }> = {
  brand: { ar: "ORBIT", en: "ORBIT" },
  tagline: { ar: "ربط الأجهزة بعالم أفضل", en: "Connecting devices to a better world" },
  subtitle: {
    ar: "من جهازك إلى قرار أذكى: تحليل، إصلاح، وقيمة في مكان واحد",
    en: "From device to smarter decision: analyze, repair, and value in one place",
  },
  nav_home: { ar: "الرئيسية", en: "Home" },
  nav_devices: { ar: "الأجهزة", en: "Devices" },
  nav_events: { ar: "الفعاليات", en: "Events" },
  nav_dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
  nav_simulation: { ar: "المحاكاة", en: "Simulation" },
  nav_camera: { ar: "محلل AI", en: "AI Analyzer" },
  nav_live: { ar: "توقع مباشر", en: "Live Prediction" },
  nav_explain: { ar: "تفسير الذكاء", en: "AI Explainability" },
  nav_compare: { ar: "المقارنة", en: "Comparison" },
  nav_data: { ar: "البيانات", en: "Dataset" },
  nav_research: { ar: "البحث", en: "Research" },
  nav_traffic: { ar: "المرور", en: "Traffic" },
  nav_company: { ar: "الشركات", en: "Fleet" },
  nav_driver: { ar: "المستخدم", en: "Profile" },
  nav_report: { ar: "التقرير", en: "Report" },
  nav_about: { ar: "عن ORBIT", en: "About ORBIT" },
  cta_start: { ar: "حلّل جهازك الآن", en: "Analyze your device" },
  cta_dashboard: { ar: "استكشف المنصة", en: "Explore platform" },
  driver_status: { ar: "حالة المستخدم", en: "User Status" },
  vehicle_health: { ar: "صحة الجهاز", en: "Device Health" },
  risk_score: { ar: "درجة المخاطر", en: "Risk Score" },
  attention: { ar: "الانتباه", en: "Attention" },
  engine_cond: { ar: "حالة النظام", en: "System Condition" },
  fatigue_prob: { ar: "احتمال العطل", en: "Failure Probability" },
  current_risk: { ar: "الخطر الحالي", en: "Current Risk" },
  low: { ar: "منخفض", en: "LOW" },
  moderate: { ar: "متوسط", en: "MODERATE" },
  high: { ar: "مرتفع", en: "HIGH" },
  critical: { ar: "حرج", en: "CRITICAL" },
  predict: { ar: "توقع", en: "Predict" },
  generate_report: { ar: "أنشئ تقرير الذكاء الاصطناعي", en: "Generate AI Report" },
  fatigue_alert: { ar: "تم كشف إجهاد السائق", en: "Driver fatigue detected" },
  engine_alert: { ar: "تم كشف خلل في المحرك", en: "Engine anomaly detected" },
  overall_risk: { ar: "الخطر الإجمالي", en: "Overall Risk" },
  why: { ar: "لماذا؟", en: "Why?" },
};
export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    typeof window === "undefined" ? "ar" : (localStorage.getItem("orbit:lang") as Lang) || "ar",
  );
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === "undefined"
      ? "dark"
      : (localStorage.getItem("orbit:theme") as Theme) || "dark",
  );
  useEffect(() => {
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("orbit:lang", lang);
  }, [lang]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("orbit:theme", theme);
  }, [theme]);
  return (
    <Ctx.Provider
      value={{
        lang,
        setLang: setLangState,
        theme,
        setTheme: setThemeState,
        t: (key) => dict[key]?.[lang] ?? key,
        dir: lang === "ar" ? "rtl" : "ltr",
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp outside AppProvider");
  return c;
}
