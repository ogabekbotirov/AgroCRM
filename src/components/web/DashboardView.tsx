"use client";

import { useState } from "react";
import {
  Droplets, Egg, TrendingUp, PawPrint,
  ChevronRight, TrendingDown, Calendar,
  Wheat, Milk, DollarSign, Clock,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { NavView } from "./Sidebar";

const MILK_30 = [22,25,23,27,28,26,30,29,31,28,27,32,30,28,26,29,33,31,28,27,30,32,29,26,28,31,30,28,32,34];

function MilkChart() {
  const W = 600; const H = 120; const PX = 4; const PY = 10;
  const min = Math.min(...MILK_30);
  const max = Math.max(...MILK_30);
  const range = max - min;
  const pts = MILK_30.map((v, i) => ({
    x: PX + (i / (MILK_30.length - 1)) * (W - PX * 2),
    y: PY + (1 - (v - min) / range) * (H - PY * 2),
  }));
  let path = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i-1].x + pts[i].x) / 2;
    path += ` C ${cx},${pts[i-1].y} ${cx},${pts[i].y} ${pts[i].x},${pts[i].y}`;
  }
  const area = path + ` L ${pts[pts.length-1].x},${H} L ${pts[0].x},${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 120 }}>
      <defs>
        <linearGradient id="milkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1B5E20" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1B5E20" stopOpacity="0"    />
        </linearGradient>
      </defs>
      {[0.25,0.5,0.75].map((r) => (
        <line key={r} x1={PX} y1={PY + r*(H-PY*2)} x2={W-PX} y2={PY + r*(H-PY*2)} stroke="#E4EAE5" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#milkFill)" />
      <path d={path}  fill="none" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="5" fill="#1B5E20" />
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="9" fill="#1B5E20" fillOpacity="0.15" />
    </svg>
  );
}

export default function DashboardView({ onNavigate }: { onNavigate: (v: NavView) => void }) {
  const { t } = useLanguage();
  const [quickInput, setQuickInput] = useState<string | null>(null);
  const [toast, setToast]           = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const STATS = [
    { labelKey: "web_dash_milk_today",  value: "127 L",  sub: "+8 L vs yesterday",    icon: Droplets,   dark: true  },
    { labelKey: "web_dash_eggs_today",  value: "84 pcs", sub: "+4 vs yesterday",       icon: Egg,        dark: false },
    { labelKey: "web_dash_net_profit",  value: "2.84M",  sub: "UZS this month",        icon: TrendingUp, dark: false },
    { labelKey: "web_dash_animals",     value: "24",     sub: "12 cattle · 8 sheep",   icon: PawPrint,   dark: false },
  ];

  const QUICK_LOG = [
    { icon: Droplets,   labelKey: "dash_milk",    color: "text-[#1B5E20]", bg: "bg-[#E8F5E9]" },
    { icon: Egg,        labelKey: "dash_eggs",    color: "text-amber-600",  bg: "bg-amber-50"  },
    { icon: Wheat,      labelKey: "dash_feed",    color: "text-yellow-700", bg: "bg-yellow-50" },
    { icon: DollarSign, labelKey: "dash_expense", color: "text-red-500",    bg: "bg-red-50"    },
  ];

  const ALERTS = [
    { icon: TrendingDown, textKey: "alert_milk_drop", color: "text-red-500",    bg: "bg-red-50"    },
    { icon: Calendar,     textKey: "alert_vax",       color: "text-amber-600",  bg: "bg-amber-50"  },
    { icon: Wheat,        textKey: "alert_feed",      color: "text-orange-500", bg: "bg-orange-50" },
  ];

  const ACTIVITY = [
    { icon: Milk,       labelKey: "web_act_morning_milking", source: "Cow #01 – Burenka", timeKey: "time_hours_ago", timeN: "2",  amount: "+18 L",     pos: true  },
    { icon: Egg,        labelKey: "web_act_egg_collection",  source: "Chicken Group A",   timeKey: "time_hours_ago", timeN: "3",  amount: "+36 pcs",   pos: true  },
    { icon: Wheat,      labelKey: "web_act_feed_dist",       source: "Warehouse",         timeKey: "time_hours_ago", timeN: "5",  amount: "—",         pos: null  },
    { icon: DollarSign, labelKey: "web_act_vet_visit",       source: "Dr. Mirzayev",      timeKey: "time_yesterday", timeN: "",   amount: "-120 000",  pos: false },
    { icon: Milk,       labelKey: "web_act_eve_milking",     source: "Cow #02 – Zorka",   timeKey: "time_yesterday", timeN: "",   amount: "+22 L",     pos: true  },
  ];

  return (
    <div className="space-y-5">

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.labelKey} className={`rounded-2xl p-5 ${s.dark ? "bg-[#0F3D1A] text-white" : "bg-white border border-[#E4EAE5]"}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.dark ? "bg-white/10" : "bg-[#E8F5E9]"}`}>
                  <Icon size={20} className={s.dark ? "text-white" : "text-[#1B5E20]"} />
                </div>
              </div>
              <p className={`text-2xl font-bold tabular-nums ${s.dark ? "text-white" : "text-[#16201A]"}`}>{s.value}</p>
              <p className={`text-xs mt-0.5 ${s.dark ? "text-white/60" : "text-[#6B7B6E]"}`}>{s.sub}</p>
              <p className={`text-xs font-semibold mt-2 ${s.dark ? "text-white/80" : "text-[#6B7B6E]"}`}>{t(s.labelKey)}</p>
            </div>
          );
        })}
      </div>

      {/* Chart + side panels */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        <div className="xl:col-span-2 bg-white rounded-2xl border border-[#E4EAE5] p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-base font-bold text-[#16201A]">{t("web_dash_milk_chart")}</h2>
              <p className="text-xs text-[#6B7B6E]">{t("web_dash_last_30")}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold tabular-nums text-[#1B5E20]">29 L</p>
              <p className="text-xs text-[#6B7B6E]">{t("web_dash_avg_day")}</p>
            </div>
          </div>
          <MilkChart />
          <div className="flex justify-between mt-1">
            {["1","6","12","18","24","30"].map((d) => (
              <span key={d} className="text-[10px] text-[#6B7B6E]">{d}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">

          {/* Quick Log */}
          <div className="bg-white rounded-2xl border border-[#E4EAE5] p-4">
            <h3 className="text-sm font-bold text-[#16201A] mb-3">{t("web_dash_quick_log") || t("web_quick_log")}</h3>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_LOG.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.labelKey}
                    onClick={() => setQuickInput(quickInput === item.labelKey ? null : item.labelKey)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all text-sm font-semibold ${
                      quickInput === item.labelKey
                        ? "border-[#1B5E20] bg-[#E8F5E9] text-[#1B5E20]"
                        : "border-[#E4EAE5] text-[#6B7B6E] hover:bg-[#F1F8F2]"
                    }`}
                  >
                    <div className={`w-7 h-7 ${item.bg} rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon size={14} className={item.color} />
                    </div>
                    {t(item.labelKey)}
                  </button>
                );
              })}
            </div>
            {quickInput && (
              <div className="mt-3 space-y-2">
                <input
                  type="number"
                  autoFocus
                  placeholder={`${t(quickInput)}...`}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E4EAE5] text-sm text-[#16201A] focus:outline-none focus:border-[#1B5E20] bg-[#F1F8F2]"
                />
                <button
                  onClick={() => { showToast(`✅ ${t(quickInput)} ${t("web_dash_save").toLowerCase()}d`); setQuickInput(null); }}
                  className="w-full py-2.5 rounded-xl bg-[#1B5E20] text-white text-sm font-semibold hover:bg-[#2E7D32] transition-colors"
                >
                  {t("web_dash_save")}
                </button>
              </div>
            )}
          </div>

          {/* Today's Alerts */}
          <div className="bg-white rounded-2xl border border-[#E4EAE5] p-4 flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#16201A]">{t("web_dash_today_alerts")}</h3>
              <button onClick={() => onNavigate("alerts")} className="text-xs font-semibold text-[#1B5E20] flex items-center gap-0.5">
                {t("web_dash_see_all")} <ChevronRight size={12} />
              </button>
            </div>
            <div className="space-y-2">
              {ALERTS.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 ${a.bg} rounded-lg flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon size={13} className={a.color} />
                    </div>
                    <p className="text-xs text-[#16201A] leading-snug">{t(a.textKey)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity table */}
      <div className="bg-white rounded-2xl border border-[#E4EAE5] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4EAE5]">
          <h2 className="text-base font-bold text-[#16201A]">{t("web_dash_recent")}</h2>
          <button className="text-xs font-semibold text-[#1B5E20] flex items-center gap-0.5">
            {t("web_dash_view_all")} <ChevronRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E4EAE5]">
                {["web_col_operation","web_col_source","web_col_time","web_col_amount"].map((k) => (
                  <th key={k} className="text-left px-5 py-3 text-xs font-bold text-[#6B7B6E] uppercase tracking-wide">
                    {t(k)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACTIVITY.map((row, i) => {
                const Icon = row.icon;
                return (
                  <tr key={i} className="border-b border-[#E4EAE5] last:border-0 hover:bg-[#F1F8F2] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center shrink-0">
                          <Icon size={15} className="text-[#1B5E20]" />
                        </div>
                        <span className="font-semibold text-[#16201A] whitespace-nowrap">{t(row.labelKey)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#6B7B6E] whitespace-nowrap">{row.source}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 text-[#6B7B6E] whitespace-nowrap">
                        <Clock size={12} />
                        {row.timeN ? t(row.timeKey, { n: row.timeN }) : t(row.timeKey)}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`font-bold tabular-nums ${
                        row.pos === true ? "text-[#1B5E20]" : row.pos === false ? "text-red-500" : "text-[#6B7B6E]"
                      }`}>{row.amount}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B5E20] text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
