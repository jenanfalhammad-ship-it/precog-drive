import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { useApp } from "@/lib/i18n";
import { CalendarDays, MapPin, Users, ArrowLeft, Radio, Trophy } from "lucide-react";

export const Route = createFileRoute("/events")({ component: EventsPage });

const events = [
  {
    date: "12 OCT",
    titleAr: "مختبر الأجهزة الذكية",
    titleEn: "Smart Device Lab",
    placeAr: "الثانوية السادسة بالقطيف",
    placeEn: "Sixth Secondary School, Qatif",
    kindAr: "ورشة تفاعلية",
    kindEn: "Interactive workshop",
    color: "#73e2ff",
  },
  {
    date: "21 OCT",
    titleAr: "تحدي إصلاح المستقبل",
    titleEn: "Future Repair Challenge",
    placeAr: "معمل ORBIT الافتراضي",
    placeEn: "ORBIT virtual lab",
    kindAr: "تحدي ابتكار",
    kindEn: "Innovation challenge",
    color: "#d6b7ff",
  },
  {
    date: "03 NOV",
    titleAr: "يوم السلامة الرقمية",
    titleEn: "Digital Safety Day",
    placeAr: "عن بُعد",
    placeEn: "Online",
    kindAr: "جلسة مباشرة",
    kindEn: "Live session",
    color: "#f2c56b",
  },
];
function EventsPage() {
  const { lang } = useApp();
  const ar = lang === "ar";
  return (
    <AppShell>
      <div className="p-5 md:p-10 max-w-7xl mx-auto space-y-8">
        <header>
          <div className="text-xs uppercase tracking-[0.25em] text-teal">ORBIT / EVENTS</div>
          <h1 className="font-display text-4xl font-bold mt-2">
            {ar ? "فعاليات تربط الناس بالتقنية" : "Events that connect people to technology"}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {ar
              ? "تجارب تعليمية ومسابقات تجعل تحليل الأجهزة والإصلاح الذكي أقرب للجميع."
              : "Learning experiences and challenges that make smart diagnostics accessible."}
          </p>
        </header>
        <div className="grid lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <GlassCard key={event.date} className="group hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between">
                <div
                  className="rounded-2xl px-3 py-2 text-center"
                  style={{ background: `${event.color}1a`, color: event.color }}
                >
                  <div className="font-display text-xl font-bold">{event.date.split(" ")[0]}</div>
                  <div className="text-[10px]">{event.date.split(" ")[1]}</div>
                </div>
                <Radio className="w-5 h-5 text-muted-foreground group-hover:text-teal" />
              </div>
              <p className="mt-6 text-xs text-teal">{ar ? event.kindAr : event.kindEn}</p>
              <h2 className="font-display text-xl font-semibold mt-1">
                {ar ? event.titleAr : event.titleEn}
              </h2>
              <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal" />
                  {ar ? event.placeAr : event.placeEn}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal" />
                  {ar ? "مفتوح للطالبات والمهتمين" : "Open to students and curious minds"}
                </div>
              </div>
              <button className="mt-6 w-full glass rounded-xl py-2.5 text-sm hover:shadow-glow transition-all">
                {ar ? "سجّل اهتمامك" : "Register interest"}
                <ArrowLeft className="inline w-4 h-4 ms-2" />
              </button>
            </GlassCard>
          ))}
        </div>
        <GlassCard strong className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-teal flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">
                {ar ? "نقاط ORBIT" : "ORBIT points"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {ar
                  ? "شارك في الفعاليات واكسب نقاطاً تفتح لك تحليلات ومزايا جديدة."
                  : "Join events to unlock new analyses and perks."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CalendarDays className="w-4 h-4 text-teal" />
            {ar ? "الفصل الأول 2026" : "Season 01 · 2026"}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
