"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Period = "Today" | "Week" | "Month" | "Last";

const INC    = [3.2, 4.1, 3.8, 5.0, 4.5, 6.2];
const EXP    = [1.8, 2.1, 1.9, 2.4, 2.2, 2.7];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun"];

const PERIOD_DATA: Record<Period, { income: number; expenses: number }> = {
  Today: { income:  1_560_000, expenses:   200_000 },
  Week:  { income:  8_200_000, expenses: 1_100_000 },
  Month: { income: 24_800_000, expenses: 5_960_000 },
  Last:  { income: 21_300_000, expenses: 6_200_000 },
};

const PERIOD_KEYS: Record<Period, string> = {
  Today: "web_period_today",
  Week:  "web_period_week",
  Month: "web_period_month",
  Last:  "web_period_last",
};

function DualChart() {
  const W = 400; const H = 100; const PX = 4; const PY = 8;
  const all = [...INC,...EXP];
  const min = Math.min(...all); const max = Math.max(...all); const r = max-min||1;
  const line = (data: number[]) => {
    const pts = data.map((v,i) => ({
      x: PX + (i/(data.length-1))*(W-PX*2),
      y: PY + (1-(v-min)/r)*(H-PY*2),
    }));
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i=1;i<pts.length;i++){const cx=(pts[i-1].x+pts[i].x)/2;d+=` C ${cx},${pts[i-1].y} ${cx},${pts[i].y} ${pts[i].x},${pts[i].y}`;}
    return { d, last: pts[pts.length-1] };
  };
  const inc=line(INC); const exp=line(EXP);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{height:100}}>
      {[0.33,0.67].map(r=>(<line key={r} x1={PX} y1={PY+r*(H-PY*2)} x2={W-PX} y2={PY+r*(H-PY*2)} stroke="#E4EAE5" strokeWidth="1"/>))}
      <path d={inc.d} fill="none" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={exp.d} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3"/>
      <circle cx={inc.last.x} cy={inc.last.y} r="4" fill="#1B5E20"/>
      <circle cx={exp.last.x} cy={exp.last.y} r="4" fill="#ef4444"/>
    </svg>
  );
}

export default function FinanceView() {
  const { t } = useLanguage();
  const [period, setPeriod] = useState<Period>("Month");

  const { income, expenses } = PERIOD_DATA[period];
  const profit = income - expenses;

  const CATEGORIES = [
    { labelKey: "fin_milk_sales",    amount: 1_240_000, type: "income"  },
    { labelKey: "fin_meat_sales",    amount: 2_100_000, type: "income"  },
    { labelKey: "fin_egg_sales",     amount:   320_000, type: "income"  },
    { labelKey: "fin_feed_purchase", amount:   450_000, type: "expense" },
    { labelKey: "fin_vet_services",  amount:   120_000, type: "expense" },
  ];
  const maxCat = Math.max(...CATEGORIES.map((c) => c.amount));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#16201A]">{t("web_fin_title")}</h1>
          <p className="text-sm text-[#6B7B6E]">{t("web_fin_sub")}</p>
        </div>
        <button className="flex items-center gap-2 border border-[#E4EAE5] bg-white text-sm font-semibold text-[#16201A] px-4 py-2.5 rounded-xl hover:bg-[#F1F8F2] transition-colors shrink-0">
          <Download size={15} />
          {t("web_fin_export")}
        </button>
      </div>

      <div className="flex flex-wrap gap-1 bg-white border border-[#E4EAE5] rounded-xl p-1 w-fit">
        {(["Today","Week","Month","Last"] as Period[]).map((p) => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${period===p?"bg-[#1B5E20] text-white":"text-[#6B7B6E] hover:bg-[#F1F8F2]"}`}>
            {t(PERIOD_KEYS[p])}
          </button>
        ))}
      </div>

      <div className="bg-[#0F3D1A] rounded-2xl p-6 text-white">
        <p className="text-sm text-white/70 mb-1">{t("web_fin_net_profit")} · {t(PERIOD_KEYS[period])}</p>
        <p className="text-4xl font-bold tabular-nums mb-4">
          {(profit/1_000_000).toFixed(2)}M <span className="text-xl text-white/60">UZS</span>
        </p>
        <div className="flex flex-wrap gap-8 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-green-300"/>
            <div>
              <p className="text-xs text-white/60">{t("web_fin_income")}</p>
              <p className="text-lg font-bold tabular-nums">{(income/1_000_000).toFixed(2)}M</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown size={16} className="text-red-300"/>
            <div>
              <p className="text-xs text-white/60">{t("web_fin_expenses")}</p>
              <p className="text-lg font-bold tabular-nums">{(expenses/1_000_000).toFixed(2)}M</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-[#E4EAE5] p-5">
          <h3 className="text-base font-bold text-[#16201A] mb-4">{t("web_fin_by_cat")}</h3>
          <div className="space-y-3">
            {CATEGORIES.map((c) => (
              <div key={c.labelKey}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#16201A]">{t(c.labelKey)}</span>
                  <span className={`font-bold tabular-nums ${c.type==="income"?"text-[#1B5E20]":"text-red-500"}`}>
                    {c.type==="income"?"+":"-"}{(c.amount/1000).toFixed(0)}K
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#E8F5E9] overflow-hidden">
                  <div className={`h-full rounded-full ${c.type==="income"?"bg-[#1B5E20]":"bg-red-400"}`}
                    style={{width:`${(c.amount/maxCat)*100}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4EAE5] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#16201A]">{t("web_fin_inc_vs_exp")}</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#1B5E20] inline-block rounded"/> {t("web_fin_income")}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-red-400 inline-block rounded"/> {t("web_fin_expenses")}</span>
            </div>
          </div>
          <DualChart/>
          <div className="flex justify-between mt-2">
            {MONTHS.map((m)=>(<span key={m} className="text-[10px] text-[#6B7B6E]">{m}</span>))}
          </div>
          <p className="text-xs text-[#6B7B6E] mt-1 text-right">{t("web_fin_in_million")}</p>
        </div>
      </div>
    </div>
  );
}
