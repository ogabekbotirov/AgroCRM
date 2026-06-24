"use client";

import { useState } from "react";
import { X, ChevronDown, Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TABS = ["Milk", "Eggs", "Weight", "Meat"] as const;
type Tab = typeof TABS[number];

const TAB_KEYS: Record<Tab, string> = {
  Milk:   "rec_tab_milk",
  Eggs:   "rec_tab_eggs",
  Weight: "rec_tab_weight",
  Meat:   "rec_tab_meat",
};

const DEFAULTS: Record<Tab, number> = { Milk: 18, Eggs: 12, Weight: 350, Meat: 0 };
const UNITS:    Record<Tab, string>  = { Milk: "L",   Eggs: "pcs", Weight: "kg", Meat: "kg" };

const ANIMALS = [
  "Cow #01 — Burenka",
  "Cow #02 — Zorka",
  "Cow #03 — Marta",
  "Chicken Group A",
  "All animals",
];

export default function AddRecordScreen({
  onBack,
  initialTab = "Milk",
}: {
  onBack: () => void;
  initialTab?: string;
}) {
  const { t } = useLanguage();
  const [tab, setTab]           = useState<Tab>((TABS.includes(initialTab as Tab) ? initialTab : "Milk") as Tab);
  const [value, setValue]       = useState(DEFAULTS[tab]);
  const [animal, setAnimal]     = useState(ANIMALS[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate]         = useState("2026-06-23");
  const [time, setTime]         = useState("08:00");
  const [note, setNote]         = useState("");

  const switchTab = (t: Tab) => {
    setTab(t);
    setValue(DEFAULTS[t]);
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4 shrink-0">
        <h1 className="text-xl font-bold text-gray-900">{t("rec_title")}</h1>
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <X size={18} className="text-gray-700" />
        </button>
      </div>

      {/* Tab bar */}
      <div className="px-5 mb-5 shrink-0">
        <div className="flex bg-gray-100 rounded-2xl p-1 gap-1">
          {TABS.map((item) => (
            <button
              key={item}
              onClick={() => switchTab(item)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                tab === item
                  ? "bg-white text-green-800 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              {t(TAB_KEYS[item])}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-5">
        {/* Big number */}
        <div className="bg-white rounded-3xl p-6 flex flex-col items-center">
          <span className="text-[10px] font-bold text-gray-400 mb-5 uppercase tracking-widest">
            {t(TAB_KEYS[tab])}
          </span>
          <div className="flex items-center gap-8">
            <button
              onClick={() => setValue((v) => Math.max(0, v - 1))}
              className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
            >
              <Minus size={20} className="text-gray-700" />
            </button>

            <div className="text-center" style={{ minWidth: 140 }}>
              <span className="text-[68px] font-bold text-gray-900 leading-none">
                {value}
              </span>
              <span className="text-xl font-bold text-green-800 ml-1">
                {UNITS[tab]}
              </span>
            </div>

            <button
              onClick={() => setValue((v) => v + 1)}
              className="w-12 h-12 rounded-2xl bg-green-800 flex items-center justify-center active:scale-95 transition-transform"
            >
              <Plus size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Animal selector */}
        <div>
          <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-widest">
            {t("rec_animal")}
          </label>
          <div className="relative">
            <button
              onClick={() => setShowPicker(!showPicker)}
              className="w-full flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-4 py-3.5"
            >
              <span className="text-sm font-bold text-gray-900">{animal}</span>
              <ChevronDown size={18} className="text-gray-400" />
            </button>
            {showPicker && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowPicker(false)}
                />
                <div className="absolute top-full mt-1 w-full z-20 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  {ANIMALS.map((a) => (
                    <button
                      key={a}
                      onClick={() => {
                        setAnimal(a);
                        setShowPicker(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        a === animal
                          ? "bg-green-50 text-green-800 font-bold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
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
          <div>
            <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-widest">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-widest">
            {t("rec_note")}
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("common_optional_note")}
            rows={3}
            className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 resize-none focus:outline-none"
          />
        </div>

        {/* Save */}
        <button
          onClick={onBack}
          className="w-full bg-green-800 text-white rounded-2xl py-4 text-sm font-bold active:opacity-90 transition-opacity"
        >
          {t("rec_save")}
        </button>
      </div>
    </div>
  );
}
