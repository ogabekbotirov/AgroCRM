"use client";

import { useState } from "react";
import {
  Bell,
  ChevronRight,
  Droplets,
  Egg,
  DollarSign,
  Wheat,
  Milk,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const langOptions = [
  { code: "uz" as const, label: "O'zbekcha", flag: "🇺🇿" },
  { code: "ru" as const, label: "Русский", flag: "🇷🇺" },
  { code: "en" as const, label: "English", flag: "🇬🇧" },
];

export default function Dashboard({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const { t, language, changeLanguage } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const quickLogs = [
    { icon: Droplets, labelKey: "dash_milk", color: "text-green-700", bg: "bg-green-50" },
    { icon: Egg, labelKey: "dash_eggs", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: DollarSign, labelKey: "dash_expense", color: "text-red-500", bg: "bg-red-50" },
    { icon: Wheat, labelKey: "dash_feed", color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  const activities = [
    { icon: Milk, labelKey: "dash_morning_milking", timeKey: "time_hours_ago", timeVal: "2", value: "+18 liters", color: "text-green-700", bg: "bg-green-50" },
    { icon: Egg, labelKey: "dash_egg_collection", timeKey: "time_hours_ago", timeVal: "3", value: "+36 pcs", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: Wheat, labelKey: "dash_feed_distributed", timeKey: "time_hours_ago", timeVal: "5", value: "—", color: "text-yellow-600", bg: "bg-yellow-50" },
    { icon: DollarSign, labelKey: "dash_vet_visit", timeKey: "time_yesterday", timeVal: undefined, value: "-120K", color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="flex flex-col flex-1 pb-24">
      <div className="flex-1 flex flex-col px-5 pt-6 pb-6 overflow-y-auto space-y-5">
        <div className="flex items-center justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-gray-900 truncate">
              {t("dash_good_morning")}
            </h1>
            <p className="text-xs text-gray-500 truncate">{t("dash_lets_track")}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[11px] font-bold text-gray-700"
                title={t("common_change_language")}
              >
                {language.toUpperCase()}
              </button>
              {showLangMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)} />
                  <div className="absolute right-0 top-full mt-1 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 w-44 overflow-hidden">
                    {langOptions.map((opt) => {
                      const isActive = language === opt.code;
                      return (
                        <button
                          key={opt.code}
                          onClick={() => { changeLanguage(opt.code); setShowLangMenu(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            isActive ? "bg-green-50" : "hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-lg">{opt.flag}</span>
                          <span className={`flex-1 text-sm font-bold ${isActive ? "text-green-800" : "text-gray-700"}`}>
                            {opt.label}
                          </span>
                          {isActive && (
                            <CheckCircle2 size={16} className="text-green-800 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            <div className="relative">
              <Bell size={22} className="text-gray-500" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-800 border-2 border-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-bold">BA</span>
            </div>
          </div>
        </div>

        <div className="bg-green-800 rounded-3xl p-5 text-white">
          <div className="flex items-center justify-between mb-4 min-w-0">
            <span className="text-sm font-bold opacity-90 truncate">{t("dash_farm_performing")}</span>
            <span className="text-xs opacity-70 shrink-0">{t("dash_this_week")}</span>
          </div>
          <div className="h-12 mb-4 flex items-end gap-1">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-white/20"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between pt-3 border-t border-white/20">
            <div className="text-center min-w-0 flex-1">
              <span className="text-2xl font-bold block truncate">127<span className="text-sm font-bold">L</span></span>
              <span className="text-xs opacity-80 truncate block">{t("dash_milk")}</span>
            </div>
            <div className="text-center min-w-0 flex-1">
              <span className="text-2xl font-bold block truncate">84<span className="text-sm font-bold">pcs</span></span>
              <span className="text-xs opacity-80 truncate block">{t("dash_eggs")}</span>
            </div>
            <div className="text-center min-w-0 flex-1">
              <span className="text-2xl font-bold block truncate">340K</span>
              <span className="text-xs opacity-80 truncate block">UZS</span>
            </div>
          </div>
        </div>

        <button className="w-full flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3.5 min-w-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
              <Bell size={16} className="text-red-500" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <span className="text-sm font-bold text-gray-900 truncate block">2 {t("dash_alerts")}</span>
              <p className="text-xs text-gray-400 truncate">{t("dash_feed_running_low")}</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-400 shrink-0" />
        </button>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900">{t("dash_quick_log")}</h2>
            <button className="text-xs font-bold text-green-800 shrink-0">{t("dash_see_all")}</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {quickLogs.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.labelKey}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-gray-100 min-w-0"
                >
                  <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={20} className={item.color} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 truncate w-full text-center">{t(item.labelKey)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900">{t("dash_recent_activity")}</h2>
            <button className="text-xs font-bold text-green-800 shrink-0">{t("dash_view_all")}</button>
          </div>
          <div className="space-y-2">
            {activities.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 min-w-0"
                >
                  <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={item.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{t(item.labelKey)}</p>
                    <div className="flex items-center gap-1">
                      <Clock size={10} className="text-gray-400 shrink-0" />
                      <span className="text-xs text-gray-400 truncate">{item.timeVal ? t(item.timeKey, { n: item.timeVal }) : t(item.timeKey)}</span>
                    </div>
                  </div>
                  <span className={`text-sm font-bold shrink-0 ${item.value.startsWith("-") ? "text-red-500" : item.value === "—" ? "text-gray-400" : "text-green-700"}`}>
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
