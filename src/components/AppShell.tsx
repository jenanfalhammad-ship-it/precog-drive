import { Link, useRouterState } from "@tanstack/react-router";
import { useApp } from "@/lib/i18n";
import {
  Activity,
  Camera,
  Cpu,
  Database,
  FileBarChart,
  Gauge,
  Home,
  LineChart,
  Moon,
  Radar,
  Sun,
  TrafficCone,
  Truck,
  User,
  Languages,
  Boxes,
  CalendarDays,
} from "lucide-react";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", icon: Home, key: "nav_home" },
  { to: "/devices", icon: Boxes, key: "nav_devices" },
  { to: "/events", icon: CalendarDays, key: "nav_events" },
  { to: "/dashboard", icon: Gauge, key: "nav_dashboard" },
  { to: "/simulation", icon: Activity, key: "nav_simulation" },
  { to: "/camera", icon: Camera, key: "nav_camera" },
  { to: "/live", icon: Radar, key: "nav_live" },
  { to: "/explainability", icon: LineChart, key: "nav_explain" },
  { to: "/data", icon: Database, key: "nav_data" },
  { to: "/research", icon: FileBarChart, key: "nav_research" },
  { to: "/traffic", icon: TrafficCone, key: "nav_traffic" },
  { to: "/fleet", icon: Truck, key: "nav_company" },
  { to: "/driver", icon: User, key: "nav_driver" },
  { to: "/report", icon: FileBarChart, key: "nav_report" },
  { to: "/about", icon: Cpu, key: "nav_about" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { t, lang, setLang, theme, setTheme, dir } = useApp();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen flex w-full" dir={dir}>
      <aside className="w-72 shrink-0 border-e border-border/50 glass-strong sticky top-0 h-screen overflow-y-auto hidden md:flex flex-col">
        <div className="p-5 border-b border-border/40">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/orbit-logo.jpg"
              alt="ORBIT"
              className="w-11 h-11 rounded-xl object-cover ring-1 ring-white/20"
            />
            <div>
              <div className="font-display font-bold text-lg tracking-[0.22em] text-gradient">
                ORBIT
              </div>
              <div className="text-[10px] text-muted-foreground leading-tight">
                {lang === "ar" ? "ربط الأجهزة بعالم أفضل" : "Connecting devices to a better world"}
              </div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ to, icon: Icon, key }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${active ? "bg-gradient-teal text-primary-foreground shadow-glow" : "hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground"}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{t(key)}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-4 pb-3 text-[10px] text-muted-foreground leading-relaxed">
          {lang === "ar"
            ? "عمل الطالبتان: جنان آل حماد وزينب العقيلي"
            : "By students: Jenan Al-Hammad & Zainab Al-Oqaili"}
          <br />
          {lang === "ar" ? "الثانوية السادسة بالقطيف" : "Sixth Secondary School, Qatif"}
        </div>
        <div className="p-3 border-t border-border/40 flex gap-2">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="flex-1 glass rounded-lg py-2 text-xs flex items-center justify-center gap-1.5 hover:shadow-glow transition-all"
          >
            <Languages className="w-3.5 h-3.5" />
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex-1 glass rounded-lg py-2 text-xs flex items-center justify-center gap-1.5 hover:shadow-glow transition-all"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {theme === "dark"
              ? lang === "ar"
                ? "فاتح"
                : "Light"
              : lang === "ar"
                ? "داكن"
                : "Dark"}
          </button>
        </div>
      </aside>
      <div className="md:hidden fixed top-0 inset-x-0 z-40 glass-strong px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/orbit-logo.jpg" alt="ORBIT" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-display font-bold text-sm tracking-[0.18em] text-gradient">
            ORBIT
          </span>
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="glass rounded-lg px-2.5 py-1 text-xs"
          >
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="glass rounded-lg p-1.5"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <main className="flex-1 min-w-0 pt-16 md:pt-0">
        {children}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass-strong border-t border-border/40 overflow-x-auto">
          <div className="flex gap-1 px-2 py-2 min-w-max">
            {NAV.slice(0, 6).map(({ to, icon: Icon, key }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] whitespace-nowrap ${active ? "bg-gradient-teal text-primary-foreground" : "text-muted-foreground"}`}
                >
                  <Icon className="w-4 h-4" />
                  {t(key)}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="md:hidden h-20" />
      </main>
    </div>
  );
}
