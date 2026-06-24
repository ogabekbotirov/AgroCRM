"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TAB_KEYS = [
  "inc_tab_milk",
  "inc_tab_egg",
  "inc_tab_meat",
  "inc_tab_other",
] as const;

export default function AddIncomeScreen({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [amount, setAmount]       = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate]           = useState("2026-06-23");

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4 shrink-0">
        <h1 className="text-xl font-bold text-gray-900">{t("inc_title")}</h1>
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <X size={18} className="text-gray-700" />
        </button>
      </div>

      {/* Tab bar */}
      <div className="px-5 mb-5 shrink-0">
        <div className="flex bg-gray-100 rounded-2xl p-1 gap-0.5">
          {TAB_KEYS.map((key, i) => (
            <button
              key={key}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all ${
                activeTab === i
                  ? "bg-white text-green-800 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              {t(key)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-5">
        {/* Amount */}
        <div className="bg-white rounded-3xl p-6">
          <label className="text-[10px] font-bold text-gray-400 mb-4 block uppercase tracking-widest">
            {t("inc_amount")}
          </label>
          <div className="flex items-baseline gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="flex-1 text-[56px] font-bold text-gray-900 focus:outline-none placeholder:text-gray-200 bg-transparent leading-none w-0"
            />
            <span className="text-lg font-bold text-gray-400 shrink-0">UZS</span>
          </div>
          <div className="mt-3 h-px bg-gray-100" />
          <span className="text-xs text-gray-400 mt-2 block">
            {t(TAB_KEYS[activeTab])}
          </span>
        </div>

        {/* Description */}
        <div>
          <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-widest">
            {t("inc_description")}
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("common_e_g", { n: "Sold 50L milk to market" })}
            className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 focus:outline-none"
          />
        </div>

        {/* Date */}
        <div>
          <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-widest">
            {t("inc_date")}
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none"
          />
        </div>

        {/* Save */}
        <button
          onClick={onBack}
          className="w-full bg-green-800 text-white rounded-2xl py-4 text-sm font-bold active:opacity-90 transition-opacity"
        >
          {t("inc_save")}
        </button>
      </div>
    </div>
  );
}
