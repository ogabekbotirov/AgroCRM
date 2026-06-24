"use client";

import {
  LayoutDashboard,
  PawPrint,
  Wallet,
  Bell,
  Sparkles,
  ChevronDown,
  ChevronUp,
  LogOut,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export type NavView = "dashboard" | "animals" | "finance" | "alerts" | "ai-log";

const NAV_KEYS: { key: NavView; icon: React.ElementType; labelKey: string; badge?: number }[] = [
  { key: "dashboard", icon: LayoutDashboard, labelKey: "web_nav_dashboard" },
  { key: "animals",   icon: PawPrint,        labelKey: "web_nav_animals"   },
  { key: "finance",   icon: Wallet,          labelKey: "web_nav_finance"   },
  { key: "alerts",    icon: Bell,            labelKey: "web_nav_alerts", badge: 2 },
  { key: "ai-log",    icon: Sparkles,        labelKey: "web_nav_ailog"     },
];

const LANGS = [
  { code: "uz" as const, label: "O'zbekcha", flag: "🇺🇿" },
  { code: "ru" as const, label: "Русский",   flag: "🇷🇺" },
  { code: "en" as const, label: "English",   flag: "🇬🇧" },
];

export default function Sidebar({
  activeView,
  onNavigate,
}: {
  activeView: NavView;
  onNavigate: (v: NavView) => void;
}) {
  const { t, language, changeLanguage } = useLanguage();
  const [showLang, setShowLang]         = useState(false);
  const [showProfile, setShowProfile]   = useState(false);

  const currentLang = LANGS.find((l) => l.code === language) ?? LANGS[0];

  return (
    <aside className="w-[264px] h-full bg-white border-r border-[#E4EAE5] flex flex-col shrink-0">

      {/* ── Logo ── */}
      <div className="px-6 py-5 border-b border-[#E4EAE5]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1B5E20] flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-[#1B5E20] tracking-tight">AgroSmart</span>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-bold text-[#6B7B6E] uppercase tracking-widest px-3 mb-2">
          {t("web_nav_section")}
        </p>
        {NAV_KEYS.map(({ key, icon: Icon, labelKey, badge }) => {
          const active = activeView === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? "bg-[#E8F5E9] text-[#1B5E20]"
                  : "text-[#6B7B6E] hover:bg-[#F1F8F2] hover:text-[#16201A]"
              }`}
            >
              <Icon size={18} className={active ? "text-[#1B5E20]" : "text-[#6B7B6E]"} />
              <span className="flex-1 text-left">{t(labelKey)}</span>
              {badge && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none shrink-0">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Bottom ── */}
      <div className="border-t border-[#E4EAE5] px-3 py-3 space-y-1.5">

        {/* Language button → dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowLang((o) => !o); setShowProfile(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#F1F8F2] transition-colors"
          >
            <Globe size={15} className="text-[#6B7B6E] shrink-0" />
            <span className="text-base leading-none">{currentLang.flag}</span>
            <span className="flex-1 text-left text-sm font-semibold text-[#16201A]">
              {currentLang.label}
            </span>
            {showLang
              ? <ChevronUp size={14} className="text-[#6B7B6E] shrink-0" />
              : <ChevronDown size={14} className="text-[#6B7B6E] shrink-0" />
            }
          </button>

          {showLang && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowLang(false)} />
              <div className="absolute bottom-full mb-1 left-0 right-0 z-50 bg-white rounded-2xl shadow-xl border border-[#E4EAE5] overflow-hidden">
                <p className="text-[10px] font-bold text-[#6B7B6E] uppercase tracking-widest px-4 pt-3 pb-1">
                  {t("web_interface_lang")}
                </p>
                {LANGS.map((l) => {
                  const active = language === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => { changeLanguage(l.code); setShowLang(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                        active
                          ? "bg-[#E8F5E9] text-[#1B5E20] font-bold"
                          : "text-[#16201A] hover:bg-[#F1F8F2]"
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span className="flex-1 text-left">{l.label}</span>
                      {active && (
                        <span className="w-2 h-2 rounded-full bg-[#1B5E20] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* User card → profile dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile((o) => !o); setShowLang(false); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#F1F8F2] hover:bg-[#E8F5E9] transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1B5E20] flex items-center justify-center shrink-0 relative">
              <span className="text-white text-xs font-bold">BA</span>
              <span className="absolute -bottom-1 -right-1 text-[11px] leading-none select-none">
                {currentLang.flag}
              </span>
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-sm font-bold text-[#16201A] truncate">Botir Abdullayev</p>
              <p className="text-xs text-[#6B7B6E] truncate">Abdullayev Farm</p>
            </div>
            {showProfile
              ? <ChevronUp size={14} className="text-[#6B7B6E] shrink-0" />
              : <ChevronDown size={14} className="text-[#6B7B6E] shrink-0" />
            }
          </button>

          {showProfile && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
              <div className="absolute bottom-full mb-2 left-0 right-0 z-50 bg-white rounded-2xl shadow-xl border border-[#E4EAE5] overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 bg-[#F1F8F2] border-b border-[#E4EAE5]">
                  <p className="text-sm font-bold text-[#16201A]">Botir Abdullayev</p>
                  <p className="text-xs text-[#6B7B6E]">botir@abdullayevfarm.uz</p>
                </div>
                {/* Sign out */}
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 font-semibold hover:bg-red-50 transition-colors">
                  <LogOut size={15} />
                  {t("web_signout")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
