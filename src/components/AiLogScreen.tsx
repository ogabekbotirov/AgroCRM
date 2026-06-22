"use client";

import { useState } from "react";
import { ArrowLeft, Mic, Sparkles, CheckCircle, Loader2, Milk, Egg, Wheat, ClipboardList, DollarSign } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const quickTags = [
  { icon: Milk, labelKey: "ai_milk" },
  { icon: Egg, labelKey: "ai_eggs" },
  { icon: Wheat, labelKey: "ai_feed" },
  { icon: ClipboardList, labelKey: "ai_report" },
];

export default function AiLogScreen({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [state, setState] = useState<"input" | "loading" | "result">("input");

  const handleAnalyze = () => {
    setState("loading");
    setTimeout(() => setState("result"), 2500);
  };

  return (
    <div className="flex flex-col flex-1 pb-24">
      <div className="flex-1 flex flex-col px-5 pt-6 pb-6 overflow-y-auto">
        <button onClick={onBack} className="w-fit mb-6">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t("ai_understands")}</h1>
          <p className="text-sm text-gray-500">{t("ai_describe_today")}</p>
        </div>

        {state === "input" && (
          <>
            <div className="relative mb-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("common_placeholder_ai")}
                rows={6}
                className="w-full bg-gray-50 rounded-2xl px-5 py-4 text-sm text-gray-900 placeholder:text-gray-400 resize-none"
              />
              <button className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                <Mic size={16} className="text-green-700" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {quickTags.map((tag) => {
                const Icon = tag.icon;
                return (
                  <button
                    key={tag.labelKey}
                    onClick={() => setInput((prev) => prev + ` [${t(tag.labelKey)}] `)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-100 text-xs font-bold text-gray-700"
                  >
                    <Icon size={14} className="text-green-700" />
                    {t(tag.labelKey)}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!input.trim()}
              className="w-full bg-green-800 text-white font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 active:bg-green-900 transition-colors"
            >
              <Sparkles size={20} />
              {t("ai_let_analyze")}
            </button>
          </>
        )}

        {state === "loading" && (
          <div className="bg-green-50 rounded-3xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Loader2 size={32} className="text-green-700 animate-spin" />
            </div>
            <h3 className="text-lg font-bold text-green-800 mb-1">{t("ai_analyzing")}</h3>
            <p className="text-sm text-green-700/70">{t("ai_processing")}</p>
            <div className="flex justify-center gap-1.5 mt-4">
              <div className="w-2 h-2 rounded-full bg-green-700 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 rounded-full bg-green-700 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 rounded-full bg-green-700 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {state === "result" && (
          <div className="bg-green-50 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={28} className="text-green-700" />
              </div>
              <div>
                <h3 className="text-base font-bold text-green-800">{t("ai_found", { n: "4" })}</h3>
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  {t("ai_confidence", { n: "94" })}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-white rounded-xl px-4 py-3 flex items-center justify-between min-w-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Milk size={16} className="text-green-700 shrink-0" />
                  <span className="text-sm font-bold text-gray-900 truncate">{t("ai_morning_milking")}</span>
                </div>
                <span className="text-sm font-bold text-green-700 shrink-0">+25 L</span>
              </div>
              <div className="bg-white rounded-xl px-4 py-3 flex items-center justify-between min-w-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Egg size={16} className="text-amber-600 shrink-0" />
                  <span className="text-sm font-bold text-gray-900 truncate">{t("ai_egg_collection")}</span>
                </div>
                <span className="text-sm font-bold text-amber-600 shrink-0">+18 pcs</span>
              </div>
              <div className="bg-white rounded-xl px-4 py-3 flex items-center justify-between min-w-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Wheat size={16} className="text-yellow-600 shrink-0" />
                  <span className="text-sm font-bold text-gray-900 truncate">{t("ai_feed_distributed")}</span>
                </div>
                <span className="text-sm font-bold text-gray-400 shrink-0">50 kg</span>
              </div>
              <div className="bg-white rounded-xl px-4 py-3 flex items-center justify-between min-w-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <DollarSign size={16} className="text-red-500 shrink-0" />
                  <span className="text-sm font-bold text-gray-900 truncate">{t("ai_feed_purchase")}</span>
                </div>
                <span className="text-sm font-bold text-red-500 shrink-0">-240K UZS</span>
              </div>
            </div>
            <button
              onClick={() => { setState("input"); setInput(""); }}
              className="w-full bg-green-800 text-white font-bold text-sm py-3.5 rounded-xl mt-4 active:bg-green-900 transition-colors"
            >
              {t("ai_log_all")}
            </button>
            <button
              onClick={() => setState("input")}
              className="w-full text-green-800 font-bold text-sm py-3 mt-2"
            >
              {t("ai_edit_results")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
