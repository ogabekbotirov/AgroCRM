"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Plus,
  QrCode,
  ChevronRight,
  Heart,
  Syringe,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const animals = [
  { id: "AG-001", name: "Bessie", type: "🐄", status: "Healthy", breed: "Holstein", milk: "28L/day" },
  { id: "AG-002", name: "Daisy", type: "🐄", status: "Pregnant", breed: "Jersey", due: "Oct 15" },
  { id: "AG-003", name: "Clover", type: "🐄", status: "Sick", breed: "Ayrshire", milk: "12L/day" },
];

const batchGroups = [
  { name: "Broilers B1", count: 150, type: "🐔", status: "Healthy", age: "35 days" },
  { name: "Layers L1", count: 80, type: "🐔", status: "Active", age: "20 weeks" },
  { name: "Sheep S1", count: 45, type: "🐑", status: "Healthy", age: "—" },
];

export default function AnimalManagement({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"individual" | "batch">("individual");
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [showBulkAdd, setShowBulkAdd] = useState(false);

  const statusLabel = (status: string) => {
    if (status === "Healthy") return t("animal_healthy");
    if (status === "Pregnant") return t("animal_pregnant");
    if (status === "Sick") return t("animal_sick");
    if (status === "Active") return t("animal_active");
    return status;
  };

  if (showBulkAdd) {
    return (
      <div className="flex flex-col flex-1 pb-24">
        <div className="flex-1 flex flex-col px-5 pt-6 pb-6 overflow-y-auto">
          <button onClick={() => setShowBulkAdd(false)} className="w-fit mb-6">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{t("animal_bulk_add")}</h1>
          <p className="text-sm text-gray-500 mb-8">{t("animal_bulk_add")}</p>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">{t("animal_type")}</label>
              <select className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900">
                <option>{t("onb_chickens")}</option>
                <option>{t("onb_cattle")}</option>
                <option>{t("onb_sheep")}</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">{t("animal_quantity")}</label>
              <input
                type="number"
                placeholder={t("common_e_g", { n: 100 })}
                className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">{t("animal_breed")}</label>
              <input
                type="text"
                placeholder={t("common_placeholder_breed")}
                className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">{t("animal_date_acquired")}</label>
              <input
                type="date"
                className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900"
              />
            </div>
          </div>
          <div className="mt-auto pt-8">
            <button className="w-full bg-green-800 text-white font-bold text-base py-4 rounded-xl active:bg-green-900 transition-colors">
              {t("animal_add_btn")} 100 {t("onb_chickens")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedAnimal) {
    const animal = animals.find((a) => a.id === selectedAnimal)!;
    return (
      <div className="flex flex-col flex-1 pb-24">
        <div className="flex-1 flex flex-col px-5 pt-6 pb-6 overflow-y-auto">
          <button onClick={() => setSelectedAnimal(null)} className="w-fit mb-4">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <div className="bg-green-800 rounded-3xl p-6 text-white text-center mb-6">
            <span className="text-6xl block mb-3">{animal.type}</span>
            <h2 className="text-xl font-bold">{animal.name}</h2>
            <p className="text-sm opacity-80">{animal.id}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
              animal.status === "Healthy" ? "bg-green-500 text-white" :
              animal.status === "Pregnant" ? "bg-blue-500 text-white" :
              "bg-red-500 text-white"
            }`}>
              {statusLabel(animal.status)}
            </span>
          </div>
          <button className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3.5 mb-4">
            <div className="flex items-center gap-3">
              <QrCode size={18} className="text-gray-700" />
              <span className="text-sm font-bold text-gray-900">{t("animal_show_qr")}</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{t("animal_insemination")}</h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-2 flex-1">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Calendar size={14} className="text-green-700" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{t("animal_inseminated")}</p>
                  <p className="text-[10px] text-gray-400">Jul 12, 2026</p>
                </div>
              </div>
              <div className="h-px flex-1 bg-gray-200 border-dashed" />
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <Calendar size={14} className="text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">{t("animal_expected_calving")}</p>
                <p className="text-[10px] text-gray-400">Oct 15, 2026</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-green-700 h-1.5 rounded-full" style={{ width: "65%" }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <Heart size={18} className="text-red-400 mb-2" />
              <p className="text-xs text-gray-400">{t("animal_health_score")}</p>
              <p className="text-lg font-bold text-gray-900">92%</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <Syringe size={18} className="text-blue-500 mb-2" />
              <p className="text-xs text-gray-400">{t("animal_vaccinations")}</p>
              <p className="text-lg font-bold text-gray-900">4 / 6</p>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{t("animal_recent_activity")}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-600" />
                  <span className="text-sm text-gray-700">{t("dash_morning_milking")}</span>
                </div>
                <span className="text-xs font-bold text-gray-900">+28L</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-600" />
                  <span className="text-sm text-gray-700">{t("animal_vaccinated")}</span>
                </div>
                <span className="text-xs font-bold text-gray-900">Done</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 pb-24">
      <div className="flex-1 flex flex-col px-5 pt-6 pb-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="w-fit">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <button onClick={() => setShowBulkAdd(true)} className="bg-green-800 text-white p-2.5 rounded-xl">
            <Plus size={20} />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t("animal_title")}</h1>
        <p className="text-sm text-gray-500 mb-4">{t("animal_subtitle")}</p>

        <div className="relative mb-5">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t("animal_search")}
            className="w-full bg-gray-50 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400"
          />
        </div>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
          <button
            onClick={() => setActiveTab("individual")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors ${
              activeTab === "individual" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            {t("animal_individual")}
          </button>
          <button
            onClick={() => setActiveTab("batch")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors ${
              activeTab === "batch" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            {t("animal_batch")}
          </button>
        </div>

        {activeTab === "individual" ? (
          <div className="space-y-3 flex-1 overflow-y-auto">
            {animals.map((animal) => (
              <button
                key={animal.id}
                onClick={() => setSelectedAnimal(animal.id)}
                className="w-full flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 text-left"
              >
                <span className="text-3xl">{animal.type}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-900 truncate">{animal.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      animal.status === "Healthy" ? "bg-green-50 text-green-700" :
                      animal.status === "Pregnant" ? "bg-blue-50 text-blue-600" :
                      "bg-red-50 text-red-500"
                    }`}>
                      {statusLabel(animal.status)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{animal.id} · {animal.breed}</p>
                </div>
                <ChevronRight size={18} className="text-gray-300 shrink-0" />
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3 flex-1 overflow-y-auto">
            {batchGroups.map((group, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl px-4 py-4"
              >
                <div className="flex items-center justify-between mb-2 min-w-0">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-2xl shrink-0">{group.type}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{group.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{group.age}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-gray-900 shrink-0">{group.count}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  group.status === "Healthy" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-600"
                }`}>
                  {statusLabel(group.status)}
                </span>
              </div>
            ))}
            <button
              onClick={() => setShowBulkAdd(true)}
              className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-6 flex items-center justify-center gap-2"
            >
              <Plus size={18} className="text-gray-400" />
              <span className="text-sm font-bold text-gray-400">{t("animal_add_batch")}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
