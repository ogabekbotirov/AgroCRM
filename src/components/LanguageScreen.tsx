"use client";

import { useState } from "react";
import { CheckCircle2, Sprout } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const languages = [
  { code: "uz", label: "O'zbekcha", flag: "🇺🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export default function LanguageScreen({ onComplete }: { onComplete: (lang: string) => void }) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState("uz");

  return (
    <div className="flex flex-col flex-1 relative">
      <div className="flex-1 flex flex-col px-5 pt-6 pb-32 overflow-y-auto">
        <Sprout size={40} className="text-green-800 mb-6" strokeWidth={2} />
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          {t("lang_title")}
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          {t("lang_subtitle")}
        </p>

        <div className="w-full space-y-3">
          {languages.map((lang) => {
            const isActive = selected === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={`w-full flex items-center gap-4 rounded-2xl p-4 text-left transition-all active:scale-[0.98] ${
                  isActive
                    ? "bg-green-50 border-2 border-green-800"
                    : "bg-white border border-gray-100"
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span
                  className={`flex-1 text-lg font-bold ${
                    isActive ? "text-green-900" : "text-gray-900"
                  }`}
                >
                  {lang.label}
                </span>
                {isActive && (
                  <CheckCircle2 size={24} className="text-green-800 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 w-full px-5 pb-6 pt-6">
        <button
          onClick={() => onComplete(selected)}
          className="w-full bg-green-800 text-white font-bold text-base py-4 rounded-xl active:bg-green-900 transition-colors active:scale-[0.98]"
        >
          {t("lang_continue")}
        </button>
      </div>
    </div>
  );
}
