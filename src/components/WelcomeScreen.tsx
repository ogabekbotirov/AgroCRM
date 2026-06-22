"use client";

import { ArrowRight, Sprout } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 flex flex-col px-5 pt-6 pb-6 overflow-y-auto">
        <Sprout className="text-green-800" size={36} strokeWidth={2} />
        <div className="flex-1 flex flex-col items-center justify-center -mt-8">
          <div className="w-64 h-64 bg-green-50 rounded-full flex items-center justify-center mb-10">
            <div className="w-48 h-48 bg-green-100 rounded-full flex items-center justify-center">
              <Sprout className="text-green-800" size={80} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center leading-tight mb-3">
            {t("welcome_title")}
          </h1>
          <p className="text-gray-500 text-sm text-center max-w-xs">
            {t("welcome_subtitle")}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-2 rounded-full bg-green-800" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
        <button
          onClick={onContinue}
          className="w-full bg-green-800 text-white font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 active:bg-green-900 transition-colors"
        >
          {t("welcome_continue")}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
