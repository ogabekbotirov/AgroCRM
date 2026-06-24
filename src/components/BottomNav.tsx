"use client";

import { Home, PawPrint, Mic, Wallet, Bell } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BottomNav({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const { t } = useLanguage();

  const tabs = [
    { key: "dashboard", icon: Home, labelKey: "nav_home" },
    { key: "animals", icon: PawPrint, labelKey: "nav_animals" },
    { key: "ai-log", icon: Mic, labelKey: "nav_ai_log", elevated: true },
    { key: "financial", icon: Wallet, labelKey: "nav_finance" },
    { key: "alerts", icon: Bell, labelKey: "nav_alerts" },
  ];

  return (
    <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-4 pb-4 pt-2">
      <div className="flex items-center justify-between relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          if (tab.elevated) {
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className="relative -top-5"
              >
                <div className="w-14 h-14 rounded-full bg-green-800 flex items-center justify-center shadow-lg">
                  <Icon size={24} className="text-white" />
                </div>
              </button>
            );
          }

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className="flex flex-col items-center gap-0.5 min-w-0"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={isActive ? "text-green-800" : "text-gray-400"}
                />
                {tab.key === "alerts" && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-white text-[8px] font-bold flex items-center justify-center leading-none">
                    2
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-bold ${
                  isActive ? "text-green-800" : "text-gray-400"
                }`}
              >
                {t(tab.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
