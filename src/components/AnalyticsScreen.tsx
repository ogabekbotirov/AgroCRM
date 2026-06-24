"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DATA_MONTH = [22, 25, 23, 27, 28, 26, 30, 29, 31, 28, 27, 32, 30, 28, 26, 29, 33, 31, 28, 27, 30, 32, 29, 26, 28, 31, 30, 28, 32, 34];
const DATA_WEEK  = [29, 31, 28, 27, 30, 32, 34];

function LineChart({ data }: { data: number[] }) {
  const W = 300;
  const H = 80;
  const PX = 2;
  const PY = 6;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: PX + (i / (data.length - 1)) * (W - PX * 2),
    y: PY + (1 - (v - min) / range) * (H - PY * 2),
  }));

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1];
    const c = pts[i];
    const cx = (p.x + c.x) / 2;
    d += ` C ${cx} ${p.y}, ${cx} ${c.y}, ${c.x} ${c.y}`;
  }

  const fillD =
    d +
    ` L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 88 }}>
      <defs>
        <linearGradient id="milkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#166534" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#166534" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#milkGrad)" />
      <path
        d={d}
        fill="none"
        stroke="#166534"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={pts[pts.length - 1].x}
        cy={pts[pts.length - 1].y}
        r="4"
        fill="#166534"
      />
      <circle
        cx={pts[pts.length - 1].x}
        cy={pts[pts.length - 1].y}
        r="7"
        fill="#166534"
        fillOpacity="0.2"
      />
    </svg>
  );
}

export default function AnalyticsScreen({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const [period, setPeriod] = useState<"week" | "month">("month");

  const data = period === "month" ? DATA_MONTH : DATA_WEEK;
  const avg   = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
  const peak  = Math.max(...data);
  const lowest = Math.min(...data);
  const total = data.reduce((a, b) => a + b, 0);

  const xLabels =
    period === "month"
      ? ["1", "8", "16", "23", "30"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const stats = [
    { label: t("ana_total"),  value: `${total} L`, color: "text-green-800" },
    { label: t("ana_avg"),    value: `${avg} L`,   color: "text-blue-600"  },
    { label: t("ana_peak"),   value: `${peak} L`,  color: "text-green-700" },
    { label: t("ana_lowest"), value: `${lowest} L`, color: "text-gray-500" },
  ];

  return (
    <div className="flex flex-col flex-1 pb-24">
      <div className="flex items-center gap-3 px-5 pt-6 pb-5 shrink-0">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{t("ana_title")}</h1>
          <p className="text-xs text-gray-400">{t("ana_milk_dynamics")}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
        {/* Period selector */}
        <div className="flex bg-gray-100 rounded-2xl p-1 gap-1">
          {(["week", "month"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                period === p
                  ? "bg-white text-green-800 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              {p === "week" ? t("period_week") : t("period_month")}
            </button>
          ))}
        </div>

        {/* Chart card */}
        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-gray-900">
              {t("ana_milk_dynamics")}
            </h2>
            <span className="text-xs text-gray-400">{t("prod_liters")}</span>
          </div>
          <div className="mb-3">
            <span className="text-3xl font-bold text-gray-900">{avg}</span>
            <span className="text-sm font-bold text-green-800 ml-1.5">
              L {t("ana_avg").toLowerCase()}
            </span>
          </div>

          <LineChart data={data} />

          <div className="flex justify-between mt-2 pt-2 border-t border-gray-50">
            {xLabels.map((label) => (
              <span key={label} className="text-[10px] text-gray-400">
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4">
              <p className="text-[11px] text-gray-400 mb-1">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
