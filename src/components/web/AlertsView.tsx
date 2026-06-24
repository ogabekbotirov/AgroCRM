"use client";

import { TrendingDown, Calendar, TrendingUp, Wheat, Bell, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const ALERTS_DATA = [
  {
    icon: TrendingDown,
    titleKey: "alert_milk_drop",
    descKey:  "alert_milk_drop_desc",
    time: "2h",
    timeKey: "time_hours_ago",
    severity: "high",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
    badgeKey: "task_priority_high",
    badgeColor: "bg-red-100 text-red-600",
  },
  {
    icon: Calendar,
    titleKey: "alert_vax",
    descKey:  "alert_vax_desc",
    time: "Jun 25",
    timeKey: "",
    severity: "medium",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    badgeKey: "task_priority_medium",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    icon: TrendingUp,
    titleKey: "alert_profit",
    descKey:  "alert_profit_desc",
    time: "Jun 20",
    timeKey: "",
    severity: "positive",
    color: "text-[#1B5E20]",
    bg: "bg-[#E8F5E9]",
    border: "border-[#c8e6c9]",
    badgeKey: "task_priority_low",
    badgeColor: "bg-[#E8F5E9] text-[#1B5E20]",
  },
  {
    icon: Wheat,
    titleKey: "alert_feed",
    descKey:  "alert_feed_desc",
    time: "Jun 20",
    timeKey: "",
    severity: "medium",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
    badgeKey: "task_priority_medium",
    badgeColor: "bg-orange-100 text-orange-600",
  },
];

export default function AlertsView() {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  const visible = ALERTS_DATA.filter((_, i) => !dismissed.has(i));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#16201A]">{t("web_alerts_title")}</h1>
          <p className="text-sm text-[#6B7B6E]">{t("web_alerts_active", { n: String(visible.length) })}</p>
        </div>
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-[#6B7B6E]"/>
          <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
            {visible.filter((a) => a.severity === "high" || a.severity === "medium").length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ALERTS_DATA.map((alert, i) => {
          if (dismissed.has(i)) return null;
          const Icon = alert.icon;
          return (
            <div key={i} className={`bg-white border ${alert.border} rounded-2xl p-5 flex flex-col gap-3`}>
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 ${alert.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={22} className={alert.color}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-bold text-[#16201A] leading-snug">{t(alert.titleKey)}</p>
                    <span className="text-[10px] text-[#6B7B6E] shrink-0">
                      {alert.timeKey ? t(alert.timeKey, { n: alert.time }) : alert.time}
                    </span>
                  </div>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-lg ${alert.badgeColor}`}>
                    {t(alert.badgeKey)}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#6B7B6E] leading-relaxed">{t(alert.descKey)}</p>

              <div className="flex items-center gap-2 pt-1">
                <button className="flex-1 py-2 rounded-xl bg-[#1B5E20] text-white text-xs font-bold hover:bg-[#2E7D32] transition-colors">
                  {t("web_take_action")}
                </button>
                <button
                  onClick={() => setDismissed((prev) => new Set([...prev, i]))}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl border border-[#E4EAE5] text-xs font-semibold text-[#6B7B6E] hover:bg-[#F1F8F2] transition-colors"
                >
                  <CheckCircle2 size={13}/>
                  {t("web_dismiss")}
                </button>
              </div>
            </div>
          );
        })}

        {visible.length === 0 && (
          <div className="md:col-span-2 flex flex-col items-center justify-center py-20 text-center">
            <CheckCircle2 size={40} className="text-[#1B5E20] mb-3"/>
            <p className="text-base font-bold text-[#16201A]">{t("web_all_clear")}</p>
            <p className="text-sm text-[#6B7B6E]">{t("web_no_alerts")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
