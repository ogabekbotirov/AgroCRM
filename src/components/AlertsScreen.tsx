"use client";

import { ArrowLeft, TrendingDown, Calendar, TrendingUp, Wheat } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AlertsScreen({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();

  const alerts = [
    {
      icon: TrendingDown,
      title: t("alert_milk_drop"),
      desc: t("alert_milk_drop_desc"),
      time: t("time_hours_ago", { n: "2" }),
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100",
    },
    {
      icon: Calendar,
      title: t("alert_vax"),
      desc: t("alert_vax_desc"),
      time: "Jun 25",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      icon: TrendingUp,
      title: t("alert_profit"),
      desc: t("alert_profit_desc"),
      time: "Jun 20",
      color: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      icon: Wheat,
      title: t("alert_feed"),
      desc: t("alert_feed_desc"),
      time: "Jun 20",
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
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
          <h1 className="text-xl font-bold text-gray-900">{t("nav_alerts")}</h1>
          <p className="text-xs text-gray-400">{t("alerts_urgent")}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3">
        {alerts.map((alert, i) => {
          const Icon = alert.icon;
          return (
            <div
              key={i}
              className={`flex gap-4 bg-white border ${alert.border} rounded-3xl px-4 py-4`}
            >
              <div
                className={`w-11 h-11 ${alert.bg} rounded-2xl flex items-center justify-center shrink-0 mt-0.5`}
              >
                <Icon size={20} className={alert.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <p className="text-sm font-bold text-gray-900 leading-snug">{alert.title}</p>
                  <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">{alert.time}</span>
                </div>
                <p className="text-xs text-gray-500">{alert.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
