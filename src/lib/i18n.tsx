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
  brand: { ar: "JDRI", en: "JDRI" },
  tagline: {
    ar: "ذكاء تنبؤي لسلامة سائقي الشاحنات والطرق",
    en: "Predictive Driver Risk Intelligence for Safer Trucking",
  },
  subtitle: {
    ar: "من الرصد اللحظي إلى القرار الاستباقي في سلامة الشاحنات",
    en: "From live signals to proactive truck-safety decisions",
  },
  nav_home: { ar: "الرئيسية", en: "Home" },
  nav_dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
  nav_simulation: { ar: "المحاكاة", en: "Simulation" },
  nav_camera: { ar: "الكاميرا", en: "Camera" },
  nav_live: { ar: "توقع مباشر", en: "Live Prediction" },
  nav_explain: { ar: "تفسير الذكاء", en: "AI Explainability" },
  nav_compare: { ar: "مقارنة النماذج", en: "Model Comparison" },
  nav_data: { ar: "البيانات", en: "Dataset" },
  nav_research: { ar: "البحث العلمي", en: "Research" },
  nav_traffic: { ar: "المرور", en: "Traffic Authority" },
  nav_company: { ar: "الشركات", en: "Fleet" },
  nav_driver: { ar: "السائق", en: "Driver Profile" },
  nav_report: { ar: "التقرير", en: "Report" },
  nav_about: { ar: "حول النظام", en: "About AI" },

  cta_start: { ar: "ابدأ المحاكاة", en: "Start Simulation" },
  cta_dashboard: { ar: "افتح لوحة التحكم", en: "Open Dashboard" },

  driver_status: { ar: "حالة السائق", en: "Driver Status" },
  vehicle_health: { ar: "صحة المركبة", en: "Vehicle Health" },
  risk_score: { ar: "درجة الخطر", en: "AI Risk Score" },
  attention: { ar: "مستوى الانتباه", en: "Attention Level" },
  engine_cond: { ar: "حالة المحرك", en: "Engine Condition" },
  fatigue_prob: { ar: "احتمال الإجهاد", en: "Fatigue Probability" },
  eye_closure: { ar: "إغماض العين", en: "Eye Closure" },
  drowsiness: { ar: "النعاس", en: "Drowsiness" },
  yawning: { ar: "التثاؤب", en: "Yawning" },
  blink_rate: { ar: "معدل الرمش", en: "Blink Rate" },
  head_pos: { ar: "وضع الرأس", en: "Head Position" },
  face_det: { ar: "كشف الوجه", en: "Face Detection" },

  current_risk: { ar: "الخطر الحالي", en: "Current Risk" },
  low: { ar: "منخفض", en: "LOW" },
  moderate: { ar: "متوسط", en: "MODERATE" },
  high: { ar: "مرتفع", en: "HIGH" },
  critical: { ar: "حرج", en: "CRITICAL" },
  predict: { ar: "توقع", en: "Predict" },
  generate_report: { ar: "أنشئ تقرير الذكاء الاصطناعي", en: "Generate AI Report" },

  fatigue_alert: { ar: "⚠ تم كشف إجهاد السائق", en: "⚠ DRIVER FATIGUE DETECTED" },
  engine_alert: { ar: "⚠ تم كشف خلل في المحرك", en: "⚠ ENGINE ANOMALY DETECTED" },
  overall_risk: { ar: "الخطر الإجمالي", en: "Overall Risk" },
  why: { ar: "لماذا؟", en: "Why?" },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ar";
    return (localStorage.getItem("jdri:lang") as Lang) || "ar";
  });
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("jdri:theme") as Theme) || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    root.setAttribute("lang", lang);
    localStorage.setItem("jdri:lang", lang);
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("jdri:theme", theme);
  }, [theme]);

  const t = (key: string) => dict[key]?.[lang] ?? key;

  return (
    <Ctx.Provider
      value={{
        lang,
        setLang: setLangState,
        theme,
        setTheme: setThemeState,
        t,
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
