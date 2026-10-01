import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import {
  Cpu,
  Gauge,
  Laptop,
  Smartphone,
  Tablet,
  Watch,
  Wifi,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/devices")({ component: DevicesPage });

const devices = [
  {
    icon: Smartphone,
    nameAr: "هاتف ORBIT One",
    nameEn: "ORBIT One Phone",
    typeAr: "هاتف ذكي",
    typeEn: "Smartphone",
    price: "2,499 ر.س",
    health: 94,
    statusAr: "متصل",
    statusEn: "Connected",
    color: "#8aa8ff",
  },
  {
    icon: Laptop,
    nameAr: "ORBIT NovaBook",
    nameEn: "ORBIT NovaBook",
    typeAr: "حاسوب محمول",
    typeEn: "Laptop",
    price: "4,799 ر.س",
    health: 88,
    statusAr: "قيد الفحص",
    statusEn: "Scanning",
    color: "#d6b7ff",
  },
  {
    icon: Tablet,
    nameAr: "ORBIT Tab Air",
    nameEn: "ORBIT Tab Air",
    typeAr: "جهاز لوحي",
    typeEn: "Tablet",
    price: "1,899 ر.س",
    health: 97,
    statusAr: "متصل",
    statusEn: "Connected",
    color: "#73e2ff",
  },
  {
    icon: Watch,
    nameAr: "ORBIT Pulse",
    nameEn: "ORBIT Pulse",
    typeAr: "ساعة ذكية",
    typeEn: "Smart Watch",
    price: "899 ر.س",
    health: 76,
    statusAr: "يحتاج صيانة",
    statusEn: "Needs repair",
    color: "#f2c56b",
  },
];

function DevicesPage() {
  const { lang, dir } = useApp();
  const ar = lang === "ar";
  return (
    <AppShell>
      <div className="p-5 md:p-10 max-w-7xl mx-auto space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-teal">ORBIT / DEVICE HUB</div>
            <h1 className="font-display text-4xl font-bold mt-2">
              {ar ? "مركز الأجهزة" : "Device hub"}
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              {ar
                ? "أضف أجهزتك، راقب صحتها، واتخذ قرار الإصلاح قبل أن تتوقف."
                : "Add devices, monitor their health, and act before failure."}
            </p>
          </div>
          <Link
            to="/camera"
            className="bg-gradient-teal text-primary-foreground px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {ar ? "حلّل جهازاً بالذكاء الاصطناعي" : "Analyze with AI"}
          </Link>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {devices.map(
            ({
              icon: Icon,
              nameAr,
              nameEn,
              typeAr,
              typeEn,
              price,
              health,
              statusAr,
              statusEn,
              color,
            }) => (
              <GlassCard key={nameEn} className="relative overflow-hidden group">
                <div
                  className="absolute -top-10 -end-10 w-28 h-28 rounded-full blur-3xl opacity-30"
                  style={{ background: color }}
                />
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: `${color}22`, color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-teal/10 text-teal">
                    {ar ? statusAr : statusEn}
                  </span>
                </div>
                <h3 className="font-display font-semibold mt-5">{ar ? nameAr : nameEn}</h3>
                <p className="text-xs text-muted-foreground mt-1">{ar ? typeAr : typeEn}</p>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground">
                      {ar ? "القيمة التقديرية" : "Estimated value"}
                    </p>
                    <p className="font-semibold">{price}</p>
                  </div>
                  <div className="text-end">
                    <p className="text-[10px] text-muted-foreground">{ar ? "الصحة" : "Health"}</p>
                    <p className="font-semibold text-teal">{health}%</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-muted/40 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-teal"
                    style={{ width: `${health}%` }}
                  />
                </div>
              </GlassCard>
            ),
          )}
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          <GlassCard strong className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold">
                  {ar ? "مصفوفة صحة الأجهزة" : "Device health matrix"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {ar
                    ? "مؤشرات حية من أجهزة افتراضية للتجربة والعرض"
                    : "Live indicators from virtual demo devices"}
                </p>
              </div>
              <Wifi className="w-5 h-5 text-teal" />
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { l: ar ? "اتصال" : "Connectivity", v: "98%" },
                { l: ar ? "أداء" : "Performance", v: "91%" },
                { l: ar ? "بطارية" : "Battery", v: "84%" },
                { l: ar ? "حماية" : "Protection", v: "99%" },
              ].map((m) => (
                <div key={m.l} className="rounded-xl border border-border/60 p-4">
                  <p className="text-xs text-muted-foreground">{m.l}</p>
                  <p className="font-display text-2xl font-bold mt-2">{m.v}</p>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <Cpu className="w-6 h-6 text-teal" />
            <h2 className="font-display text-xl font-semibold mt-4">
              {ar ? "صيانة استباقية" : "Predictive repair"}
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              {ar
                ? "يعطي ORBIT أولوية الإصلاح والتكلفة المتوقعة قبل تعطل الجهاز."
                : "ORBIT prioritizes repairs and predicts cost before failure."}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Gauge className="w-5 h-5 text-amber-300" />
              <span className="text-sm">
                {ar ? "3 أجهزة تحتاج متابعة" : "3 devices need attention"}
              </span>
            </div>
            <Link
              to="/report"
              className="mt-5 inline-flex items-center gap-2 text-sm text-teal hover:underline"
            >
              {ar ? "عرض التقرير" : "View report"}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
