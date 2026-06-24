"use client";

import { Bell, Search, Menu, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const VIEW_TITLE_KEYS: Record<string, string> = {
  dashboard: "web_nav_dashboard",
  animals:   "web_nav_animals",
  finance:   "web_nav_finance",
  alerts:    "web_nav_alerts",
  "ai-log":  "web_nav_ailog",
};

export default function TopBar({
  view,
  onMenuToggle,
  onQuickLog,
}: {
  view: string;
  onMenuToggle: () => void;
  onQuickLog: () => void;
}) {
  const { t } = useLanguage();

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-[#E4EAE5] px-6 py-3 flex items-center gap-4 shrink-0">
      {/* Hamburger (mobile) */}
      <button
        onClick={onMenuToggle}
        className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[#F1F8F2] transition-colors shrink-0"
      >
        <Menu size={20} className="text-[#6B7B6E]" />
      </button>

      {/* Greeting (desktop) */}
      <div className="hidden md:block shrink-0">
        <p className="text-base font-bold text-[#16201A] leading-tight">
          {t("web_greeting")}
        </p>
        <p className="text-xs text-[#6B7B6E]">{dateStr}</p>
      </div>

      {/* Page title (mobile) */}
      <p className="md:hidden text-base font-bold text-[#16201A] flex-1 truncate">
        {t(VIEW_TITLE_KEYS[view] ?? "web_nav_dashboard")}
      </p>

      {/* Search */}
      <div className="flex-1 max-w-sm hidden sm:flex items-center gap-2 bg-[#F1F8F2] border border-[#E4EAE5] rounded-xl px-3 py-2">
        <Search size={15} className="text-[#6B7B6E] shrink-0" />
        <input
          type="text"
          placeholder={t("web_search_ph")}
          className="flex-1 text-sm bg-transparent text-[#16201A] placeholder:text-[#6B7B6E] focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 shrink-0">
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[#F1F8F2] transition-colors">
          <Bell size={18} className="text-[#6B7B6E]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>

        <button
          onClick={onQuickLog}
          className="flex items-center gap-1.5 bg-[#1B5E20] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#2E7D32] transition-colors"
        >
          <Sparkles size={14} />
          <span className="hidden sm:inline">{t("web_quick_log")}</span>
        </button>
      </div>
    </header>
  );
}
