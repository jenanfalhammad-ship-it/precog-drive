/**
 * PRECOG AI Risk Engine
 * Mirrors the logic used to train the ML model. Feeds:
 *  - Vision: EAR (eye aspect ratio), MAR (mouth aspect ratio), blink rate, head yaw
 *  - OBD: RPM, MAF, ambient temp, throttle, coolant temp, intake pressure
 *  - Context: hours driving without break, is_night, hazardous cargo
 */

export interface VisionInputs {
  ear: number; // Eye Aspect Ratio (typical 0.15-0.35). <0.25 = eyes closing
  mar: number; // Mouth Aspect Ratio (>0.6 = yawning)
  blinkRate: number; // blinks per minute
  headYaw: number; // absolute deg from center
  faceDetected: boolean;
}

export interface OBDInputs {
  rpm: number;
  maf: number; // g/s
  ambientTemp: number; // C
  throttle: number; // 0-100
  coolantTemp?: number;
  intakePressure?: number;
}

export interface ContextInputs {
  hoursDriving: number;
  isNight: boolean;
  hazardousCargo: boolean;
}

export interface RiskBreakdown {
  score: number; // 0-100
  band: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  contributions: { feature: string; ar: string; value: number; contribution: number }[];
  driverFatigue: number;
  engineAnomaly: number;
  reason: string;
  reasonAr: string;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function computeRisk(
  vision: VisionInputs,
  obd: OBDInputs,
  ctx: ContextInputs,
): RiskBreakdown {
  // --- Driver fatigue sub-model (SHAP-style contributions) ---
  const earScore = vision.ear < 0.25 ? clamp((0.25 - vision.ear) * 300, 0, 42) : 0;
  const marScore = vision.mar > 0.55 ? clamp((vision.mar - 0.55) * 120, 0, 25) : 0;
  const blinkScore = vision.blinkRate < 8 || vision.blinkRate > 35
    ? clamp(Math.abs(vision.blinkRate - 18) * 0.8, 0, 15)
    : 0;
  const headScore = clamp(vision.headYaw * 0.4, 0, 18);
  const faceMissing = vision.faceDetected ? 0 : 20;
  const driverFatigue = clamp(earScore + marScore + blinkScore + headScore + faceMissing, 0, 100);

  // --- Engine anomaly sub-model ---
  const rpmScore = obd.rpm > 3200
    ? clamp((obd.rpm - 3200) / 40, 0, 30)
    : obd.rpm < 500 && obd.rpm > 0
      ? 8
      : 0;
  const mafScore = obd.maf > 25 || obd.maf < 2 ? clamp(Math.abs(obd.maf - 12) * 1.2, 0, 22) : 0;
  const tempScore = obd.ambientTemp > 42 ? clamp((obd.ambientTemp - 42) * 2, 0, 18) : 0;
  const throttleScore = obd.throttle > 85 ? clamp((obd.throttle - 85) * 0.8, 0, 12) : 0;
  const coolantScore = obd.coolantTemp && obd.coolantTemp > 105
    ? clamp((obd.coolantTemp - 105) * 2, 0, 20)
    : 0;
  const engineAnomaly = clamp(rpmScore + mafScore + tempScore + throttleScore + coolantScore, 0, 100);

  // --- Context multipliers ---
  const hoursMultiplier = 1 + Math.min(ctx.hoursDriving * 0.04, 0.3);
  const nightMultiplier = ctx.isNight ? 1.18 : 1;
  const cargoMultiplier = ctx.hazardousCargo ? 1.25 : 1;

  const baseCombined = 0.6 * driverFatigue + 0.4 * engineAnomaly;
  const score = clamp(baseCombined * hoursMultiplier * nightMultiplier * cargoMultiplier, 0, 100);

  const contributions = [
    { feature: "Eye Closure (EAR)", ar: "إغماض العين", value: vision.ear, contribution: earScore },
    { feature: "Yawning (MAR)", ar: "التثاؤب", value: vision.mar, contribution: marScore },
    { feature: "Blink Rate", ar: "معدل الرمش", value: vision.blinkRate, contribution: blinkScore },
    { feature: "Head Yaw", ar: "ميل الرأس", value: vision.headYaw, contribution: headScore },
    { feature: "Engine RPM", ar: "دورات المحرك", value: obd.rpm, contribution: rpmScore },
    { feature: "MAF", ar: "تدفق الهواء", value: obd.maf, contribution: mafScore },
    { feature: "Ambient Temp", ar: "الحرارة المحيطة", value: obd.ambientTemp, contribution: tempScore },
    { feature: "Throttle", ar: "الخانق", value: obd.throttle, contribution: throttleScore },
    { feature: "Coolant Temp", ar: "حرارة التبريد", value: obd.coolantTemp ?? 0, contribution: coolantScore },
    { feature: "Driving Hours", ar: "ساعات القيادة", value: ctx.hoursDriving, contribution: (hoursMultiplier - 1) * 100 },
    { feature: "Night Driving", ar: "قيادة ليلية", value: ctx.isNight ? 1 : 0, contribution: ctx.isNight ? 18 : 0 },
    { feature: "Hazardous Cargo", ar: "حمولة خطرة", value: ctx.hazardousCargo ? 1 : 0, contribution: ctx.hazardousCargo ? 25 : 0 },
  ]
    .filter((c) => c.contribution > 0)
    .sort((a, b) => b.contribution - a.contribution);

  const band: RiskBreakdown["band"] =
    score < 30 ? "LOW" : score < 60 ? "MODERATE" : score < 80 ? "HIGH" : "CRITICAL";

  const top = contributions.slice(0, 2);
  const reason =
    top.length === 0
      ? "All monitored parameters within safe range."
      : `Elevated ${top.map((c) => c.feature).join(" and ")} suggest increased risk probability.`;
  const reasonAr =
    top.length === 0
      ? "جميع القيم المرصودة ضمن النطاق الآمن."
      : `ارتفاع ${top.map((c) => c.ar).join(" و ")} يشير إلى احتمال متزايد للخطر.`;

  return { score, band, contributions, driverFatigue, engineAnomaly, reason, reasonAr };
}

export function bandColor(band: RiskBreakdown["band"]) {
  return band === "LOW"
    ? "var(--risk-low)"
    : band === "MODERATE"
      ? "var(--risk-mid)"
      : "var(--risk-high)";
}
