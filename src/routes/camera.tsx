import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/GlassCard";
import { MetricTile } from "@/components/MetricTile";
import { useApp } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { Camera as CamIcon, Play, Square } from "lucide-react";

export const Route = createFileRoute("/camera")({ component: CameraPage });

// MediaPipe FaceMesh landmark indices for eye/mouth EAR + MAR
const LEFT_EYE = [33, 160, 158, 133, 153, 144];
const RIGHT_EYE = [362, 385, 387, 263, 373, 380];
const MOUTH = [78, 81, 13, 311, 308, 402, 14, 178];

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
function ear(lm: any[], idx: number[]) {
  const [p1, p2, p3, p4, p5, p6] = idx.map((i) => lm[i]);
  return (dist(p2, p6) + dist(p3, p5)) / (2 * dist(p1, p4));
}
function mar(lm: any[]) {
  const top = lm[13];
  const bottom = lm[14];
  const left = lm[78];
  const right = lm[308];
  return dist(top, bottom) / dist(left, right);
}

function CameraPage() {
  const { lang } = useApp();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const faceMeshRef = useRef<any>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    ear: 0, mar: 0, blinks: 0, blinkRate: 0, drowsyMs: 0, faceDetected: false,
  });
  const blinkStateRef = useRef({ closed: false, closedStart: 0, blinkTimes: [] as number[], drowsyStart: 0 });

  async function start() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      // Load MediaPipe FaceMesh from CDN
      if (!faceMeshRef.current) {
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js");
        const w = window as any;
        const fm = new w.FaceMesh({
          locateFile: (f: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`,
        });
        fm.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
        fm.onResults(onResults);
        faceMeshRef.current = fm;
      }
      setRunning(true);
      loop();
    } catch (e: any) {
      setError(e?.message || String(e));
    }
  }

  function stop() {
    setRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStats({ ear: 0, mar: 0, blinks: 0, blinkRate: 0, drowsyMs: 0, faceDetected: false });
  }

  useEffect(() => () => stop(), []);

  async function loop() {
    if (!running && !streamRef.current) return;
    const v = videoRef.current;
    const fm = faceMeshRef.current;
    if (v && fm && v.readyState >= 2) {
      await fm.send({ image: v });
    }
    rafRef.current = requestAnimationFrame(loop);
  }

  function onResults(results: any) {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const lms = results.multiFaceLandmarks?.[0];
    if (!lms) {
      setStats((s) => ({ ...s, faceDetected: false }));
      return;
    }
    const now = performance.now();
    const eL = ear(lms, LEFT_EYE);
    const eR = ear(lms, RIGHT_EYE);
    const e = (eL + eR) / 2;
    const m = mar(lms);
    const bs = blinkStateRef.current;

    // Blink detection
    if (e < 0.22 && !bs.closed) {
      bs.closed = true;
      bs.closedStart = now;
    } else if (e >= 0.24 && bs.closed) {
      const dur = now - bs.closedStart;
      bs.closed = false;
      if (dur > 60 && dur < 400) bs.blinkTimes.push(now);
    }
    bs.blinkTimes = bs.blinkTimes.filter((t) => now - t < 60000);
    const blinkRate = bs.blinkTimes.length;

    // Drowsy: eyes closed continuously > 1.5s
    if (bs.closed) {
      if (bs.drowsyStart === 0) bs.drowsyStart = now;
    } else bs.drowsyStart = 0;
    const drowsyMs = bs.drowsyStart ? now - bs.drowsyStart : 0;

    setStats({
      ear: e, mar: m, blinks: bs.blinkTimes.length, blinkRate, drowsyMs,
      faceDetected: true,
    });

    // Draw overlays
    const draw = (idx: number[], color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      idx.forEach((i, k) => {
        const p = lms[i];
        const x = p.x * canvas.width;
        const y = p.y * canvas.height;
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();
    };
    draw(LEFT_EYE, e < 0.22 ? "#ef4444" : "#5eead4");
    draw(RIGHT_EYE, e < 0.22 ? "#ef4444" : "#5eead4");
    draw(MOUTH, m > 0.6 ? "#ef4444" : "#5eead4");
  }

  const fatigueScore = Math.min(
    100,
    (stats.ear < 0.25 ? (0.25 - stats.ear) * 300 : 0) +
      (stats.mar > 0.55 ? (stats.mar - 0.55) * 120 : 0) +
      (stats.drowsyMs > 500 ? Math.min(40, stats.drowsyMs / 40) : 0),
  );

  return (
    <AppShell>
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        <header>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {lang === "ar" ? "الكاميرا الحية" : "Live Camera"}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 flex items-center gap-3">
            <CamIcon className="w-8 h-8" style={{ color: "var(--teal)" }} />
            {lang === "ar" ? "كشف النعاس بالرؤية الحاسوبية" : "Vision-based Drowsiness Detection"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "ar"
              ? "يستخدم MediaPipe FaceMesh لحساب EAR و MAR ومعدل الرمش لحظياً في المتصفح."
              : "Runs MediaPipe FaceMesh in-browser to compute EAR, MAR, and blink rate live."}
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-5">
          <GlassCard strong className="lg:col-span-2 relative overflow-hidden">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-navy-deep">
              <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover -scale-x-100" muted playsInline />
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -scale-x-100" />
              {!running && (
                <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                  <div>
                    <CamIcon className="w-12 h-12 mx-auto opacity-40" />
                    <p className="mt-3 text-sm text-muted-foreground">
                      {lang === "ar" ? "اضغط تشغيل لبدء الكاميرا" : "Click Start to enable camera"}
                    </p>
                    {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
                  </div>
                </div>
              )}
              {running && stats.drowsyMs > 1500 && (
                <div className="absolute inset-x-0 bottom-0 p-3 bg-destructive/80 text-destructive-foreground text-center font-bold text-sm animate-pulse-glow">
                  ⚠ {lang === "ar" ? "تنبيه نعاس! افتح عينيك" : "DROWSINESS ALERT — Open your eyes"}
                </div>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              {!running ? (
                <button
                  onClick={start}
                  className="bg-gradient-teal text-primary-foreground px-5 py-2.5 rounded-xl shadow-glow font-medium inline-flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> {lang === "ar" ? "تشغيل" : "Start"}
                </button>
              ) : (
                <button onClick={stop} className="glass px-5 py-2.5 rounded-xl inline-flex items-center gap-2">
                  <Square className="w-4 h-4" /> {lang === "ar" ? "إيقاف" : "Stop"}
                </button>
              )}
            </div>
          </GlassCard>

          <GlassCard strong>
            <h2 className="font-display font-semibold mb-3">
              {lang === "ar" ? "قراءات لحظية" : "Live Metrics"}
            </h2>
            <div className="space-y-3">
              <MetricTile label="EAR" value={stats.ear.toFixed(3)} danger={stats.ear > 0 && stats.ear < 0.22} hint="<0.22 closed" />
              <MetricTile label="MAR" value={stats.mar.toFixed(3)} danger={stats.mar > 0.6} hint=">0.6 yawn" />
              <MetricTile label={lang === "ar" ? "الرمش/دقيقة" : "Blinks/min"} value={stats.blinkRate} />
              <MetricTile label={lang === "ar" ? "نعاس (ms)" : "Drowsy (ms)"} value={Math.round(stats.drowsyMs)} danger={stats.drowsyMs > 1000} />
              <MetricTile label={lang === "ar" ? "درجة الإجهاد" : "Fatigue Score"} value={`${Math.round(fatigueScore)}%`} danger={fatigueScore > 60} />
            </div>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.crossOrigin = "anonymous";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}
