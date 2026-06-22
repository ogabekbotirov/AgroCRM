"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Droplets,
  Egg,
  ArrowDown,
  Calculator,
  Plus,
  Minus,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductionProcessing({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"entry" | "processing" | "cost">("entry");
  const [milkAmount, setMilkAmount] = useState(0);
  const [eggCount, setEggCount] = useState(0);

  const sessions = [t("prod_morning"), t("prod_afternoon"), t("prod_evening")];

  return (
    <div className="flex flex-col flex-1 pb-24">
      <div className="flex-1 flex flex-col px-5 pt-6 pb-6 overflow-y-auto">
        <button onClick={onBack} className="w-fit mb-4">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t("prod_title")}</h1>
        <p className="text-sm text-gray-500 mb-5">{t("prod_subtitle")}</p>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab("entry")}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === "entry" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            {t("prod_daily_entry")}
          </button>
          <button
            onClick={() => setActiveTab("processing")}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === "processing" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            {t("prod_processing")}
          </button>
          <button
            onClick={() => setActiveTab("cost")}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === "cost" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            {t("prod_cost_calc")}
          </button>
        </div>

        {activeTab === "entry" && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Droplets size={20} className="text-green-700" />
                <h3 className="text-sm font-bold text-gray-900">{t("prod_milk_log")}</h3>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={() => setMilkAmount(Math.max(0, milkAmount - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <Minus size={18} className="text-gray-600" />
                </button>
                <span className="text-4xl font-bold text-gray-900">{milkAmount}</span>
                <button
                  onClick={() => setMilkAmount(milkAmount + 1)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <Plus size={18} className="text-gray-600" />
                </button>
              </div>
              <p className="text-center text-sm text-gray-500 mb-4">{t("prod_liters")}</p>
              <div className="flex gap-2">
                {sessions.map((session) => (
                  <button
                    key={session}
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-gray-50 text-gray-700"
                  >
                    {session}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Egg size={20} className="text-amber-600" />
                <h3 className="text-sm font-bold text-gray-900">{t("prod_egg_collection")}</h3>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={() => setEggCount(Math.max(0, eggCount - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <Minus size={18} className="text-gray-600" />
                </button>
                <span className="text-4xl font-bold text-gray-900">{eggCount}</span>
                <button
                  onClick={() => setEggCount(eggCount + 1)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <Plus size={18} className="text-gray-600" />
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">{t("prod_pieces")}</p>
            </div>

            <button className="w-full bg-green-800 text-white font-bold text-base py-4 rounded-xl active:bg-green-900 transition-colors">
              {t("prod_save")}
            </button>
          </div>
        )}

        {activeTab === "processing" && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">{t("prod_convert_milk")}</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">{t("prod_input")}</label>
                  <input
                    type="number"
                    placeholder={t("common_e_g", { n: 50 })}
                    className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold text-gray-900"
                  />
                </div>
                <div className="flex justify-center">
                  <ArrowDown size={20} className="text-green-700" />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-green-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-green-800">10kg</p>
                    <p className="text-xs text-green-700">{t("prod_qatiq")}</p>
                  </div>
                  <div className="flex-1 bg-amber-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-amber-700">3kg</p>
                    <p className="text-xs text-amber-600">{t("prod_qaymoq")}</p>
                  </div>
                  <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-blue-700">2kg</p>
                    <p className="text-xs text-blue-600">{t("prod_sariyog")}</p>
                  </div>
                </div>
                <button className="w-full bg-green-800 text-white font-bold text-sm py-3 rounded-xl active:bg-green-900 transition-colors">
                  {t("prod_process")}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cost" && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calculator size={20} className="text-green-700" />
              <h3 className="text-sm font-bold text-gray-900">{t("prod_milk_cost")}</h3>
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t("prod_feed_cost")}</label>
                <input
                  type="number"
                  placeholder={t("common_e_g", { n: 50000 })}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold text-gray-900"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t("prod_labor_cost")}</label>
                <input
                  type="number"
                  placeholder={t("common_e_g", { n: 80000 })}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold text-gray-900"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t("prod_daily_yield")}</label>
                <input
                  type="number"
                  placeholder={t("common_e_g", { n: 127 })}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold text-gray-900"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t("prod_other_expenses")}</label>
                <input
                  type="number"
                  placeholder={t("common_e_g", { n: 20000 })}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold text-gray-900"
                />
              </div>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-green-700 font-bold">{t("prod_cost_per_liter")}</p>
              <p className="text-3xl font-bold text-green-800">1,181 UZS</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
