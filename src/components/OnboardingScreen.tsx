"use client";

import { useState } from "react";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const farmItems = [
  { emoji: "🐄", key: "onb_cattle" },
  { emoji: "🐑", key: "onb_sheep" },
  { emoji: "🐔", key: "onb_chickens" },
  { emoji: "🐎", key: "onb_horses" },
  { emoji: "🌾", key: "onb_crops" },
  { emoji: "🍎", key: "onb_orchard" },
];

export default function OnboardingScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string[]>(["onb_cattle", "onb_chickens"]);
  const [step, setStep] = useState(1);

  const toggleItem = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 flex flex-col px-5 pt-6 pb-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="w-fit">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <span className="bg-green-800 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {step} / 3
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {t("onb_about_your_farm")}
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          {t("onb_what_do_you_have")}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {farmItems.map((item) => {
            const isActive = selected.includes(item.key);
            return (
              <button
                key={item.key}
                onClick={() => toggleItem(item.key)}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                  isActive
                    ? "border-green-800 bg-green-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <span
                  className={`text-sm font-bold ${
                    isActive ? "text-green-800" : "text-gray-700"
                  }`}
                >
                  {t(item.key)}
                </span>
                {isActive && (
                  <div className="w-5 h-5 rounded-full bg-green-800 flex items-center justify-center">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-green-800" />
              <div className="w-2 h-2 rounded-full bg-green-800" />
              <div className="w-2 h-2 rounded-full bg-gray-300" />
            </div>
            <button
              onClick={() => setStep(step + 1)}
              className="text-sm font-bold text-gray-500"
            >
              {t("onb_skip")}
            </button>
          </div>
          <button
            onClick={onComplete}
            className="w-full bg-green-800 text-white font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 active:bg-green-900 transition-colors"
          >
            {t("onb_continue")}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
