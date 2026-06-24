"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Wheat,
  Syringe,
  AlertTriangle,
  Plus,
  Minus,
  Calendar,
  Pill,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const feedItems = [
  { name: "Barley", stock: 1200, unit: "kg", max: 2000, status: "good" },
  { name: "Corn", stock: 450, unit: "kg", max: 2000, status: "warning" },
  { name: "Hay", stock: 80, unit: "bales", max: 100, status: "good" },
  { name: "Protein Mix", stock: 0, unit: "kg", max: 500, status: "critical" },
];

const medicineItems = [
  { name: "Ivermectin", stock: 24, unit: "doses", expiry: "2026-12-01", status: "good" },
  { name: "Tetracycline", stock: 48, unit: "doses", expiry: "2026-08-15", status: "good" },
  { name: "Vitamin B12", stock: 10, unit: "doses", expiry: "2026-06-01", status: "warning" },
  { name: "Penicillin", stock: 0, unit: "bottles", expiry: "2026-05-01", status: "critical" },
];

export default function Inventory({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"feed" | "medicine">("feed");
  const [showForm, setShowForm] = useState<"in" | "out" | null>(null);

  const statusBadge = (status: string, type: "feed" | "medicine") => {
    if (type === "feed") {
      return status === "good" ? t("inv_in_stock") : status === "warning" ? t("inv_low") : t("inv_empty");
    }
    return status === "good" ? t("inv_in_stock") : status === "warning" ? t("inv_expiring") : t("inv_expired");
  };

  if (showForm) {
    return (
      <div className="flex flex-col flex-1 pb-24">
        <div className="flex-1 flex flex-col px-5 pt-6 pb-6 overflow-y-auto">
          <button onClick={() => setShowForm(null)} className="w-fit mb-6">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {showForm === "in" ? t("inv_kirim") : t("inv_chiqim")}
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            {showForm === "in" ? t("inv_add_inventory") : t("inv_remove_inventory")}
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">{t("inv_item")}</label>
              <select className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900">
                <option>Barley</option>
                <option>Corn</option>
                <option>Hay</option>
                <option>Protein Mix</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">{t("inv_quantity")}</label>
              <input
                type="number"
                placeholder={t("common_e_g", { n: 0 })}
                className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">{t("inv_note")}</label>
              <input
                type="text"
                placeholder={t("common_optional_note")}
                className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">{t("inv_date")}</label>
              <input
                type="date"
                className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900"
              />
            </div>
          </div>
          <div className="mt-auto pt-8">
            <button className="w-full bg-green-800 text-white font-bold text-base py-4 rounded-xl active:bg-green-900 transition-colors">
              {showForm === "in" ? t("inv_add_inventory") : t("inv_remove_inventory")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 pb-24">
      <div className="flex-1 flex flex-col px-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-6 shrink-0">
          <button onClick={onBack} className="w-fit">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1 shrink-0">{t("inv_title")}</h1>
        <p className="text-sm text-gray-500 mb-4 shrink-0">{t("inv_subtitle")}</p>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-5 shrink-0">
          <button
            onClick={() => setActiveTab("feed")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === "feed" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            <Wheat size={14} />
            {t("inv_feed")}
          </button>
          <button
            onClick={() => setActiveTab("medicine")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === "medicine" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            <Syringe size={14} />
            {t("inv_medical")}
          </button>
        </div>

        {activeTab === "feed" ? (
          <div className="space-y-3 flex-1 overflow-y-auto min-h-0">
            {feedItems.map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2 min-w-0">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Wheat size={16} className="text-yellow-600 shrink-0" />
                    <span className="text-sm font-bold text-gray-900 truncate">{item.name}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    item.status === "good" ? "bg-green-50 text-green-700" :
                    item.status === "warning" ? "bg-yellow-50 text-yellow-600" :
                    "bg-red-50 text-red-500"
                  }`}>
                    {statusBadge(item.status, "feed")}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-gray-900">{item.stock.toLocaleString()} <span className="text-sm font-bold text-gray-400">{item.unit}</span></span>
                  <span className="text-xs text-gray-400">{t("inv_max")}: {item.max}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      item.status === "good" ? "bg-green-600" :
                      item.status === "warning" ? "bg-yellow-500" :
                      "bg-red-500"
                    }`}
                    style={{ width: `${(item.stock / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowForm("in")} className="flex-1 bg-green-800 text-white font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-1.5 active:bg-green-900 transition-colors">
                <Plus size={16} /> {t("inv_kirim")}
              </button>
              <button onClick={() => setShowForm("out")} className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-1.5 active:bg-gray-50 transition-colors">
                <Minus size={16} /> {t("inv_chiqim")}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 flex-1 overflow-y-auto min-h-0">
            {medicineItems.map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Pill size={16} className="text-blue-500" />
                    <span className="text-sm font-bold text-gray-900">{item.name}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    item.status === "good" ? "bg-green-50 text-green-700" :
                    item.status === "warning" ? "bg-yellow-50 text-yellow-600" :
                    "bg-red-50 text-red-500"
                  }`}>
                    {statusBadge(item.status, "medicine")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">{item.stock} <span className="text-sm font-bold text-gray-400">{item.unit}</span></span>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-gray-400" />
                    <span className={`text-xs font-bold ${item.status === "warning" ? "text-yellow-600" : "text-gray-400"}`}>
                      {t("inv_exp")}: {new Date(item.expiry).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>
                {(item.status === "warning" || item.status === "critical") && (
                  <div className="flex items-center gap-1.5 mt-2 bg-red-50 rounded-lg px-3 py-1.5">
                    <AlertTriangle size={12} className="text-red-500" />
                    <span className="text-xs font-bold text-red-500">
                      {item.status === "critical" ? t("inv_expired_warning") : t("inv_expiring_warning")}
                    </span>
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowForm("in")} className="flex-1 bg-green-800 text-white font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-1.5 active:bg-green-900 transition-colors">
                <Plus size={16} /> {t("inv_kirim")}
              </button>
              <button onClick={() => setShowForm("out")} className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-1.5 active:bg-gray-50 transition-colors">
                <Minus size={16} /> {t("inv_chiqim")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
