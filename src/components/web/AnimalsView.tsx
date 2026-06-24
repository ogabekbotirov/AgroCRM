"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type AnimalType = "All" | "Cattle" | "Sheep" | "Poultry";

const ANIMALS = [
  { id:"A001", name:"Burenka",   type:"Cattle",  emoji:"🐄", gender:"♀", age:"4y", milk:"18 L/day",    weight:"520 kg", statusKey:"animal_healthy",  pregnant:true  },
  { id:"A002", name:"Zorka",     type:"Cattle",  emoji:"🐄", gender:"♀", age:"3y", milk:"22 L/day",    weight:"480 kg", statusKey:"animal_healthy",  pregnant:false },
  { id:"A003", name:"Marta",     type:"Cattle",  emoji:"🐄", gender:"♀", age:"5y", milk:"15 L/day",    weight:"560 kg", statusKey:"animal_pregnant", pregnant:true  },
  { id:"A004", name:"Jasur",     type:"Cattle",  emoji:"🐂", gender:"♂", age:"2y", milk:"—",           weight:"620 kg", statusKey:"animal_healthy",  pregnant:false },
  { id:"A005", name:"Oqqo'y",    type:"Cattle",  emoji:"🐄", gender:"♀", age:"6y", milk:"12 L/day",    weight:"510 kg", statusKey:"animal_sick",     pregnant:false },
  { id:"A006", name:"Sariq",     type:"Cattle",  emoji:"🐄", gender:"♀", age:"3y", milk:"20 L/day",    weight:"495 kg", statusKey:"animal_healthy",  pregnant:false },
  { id:"B001", name:"Oq Qo'zi",  type:"Sheep",   emoji:"🐑", gender:"♀", age:"2y", milk:"—",           weight:"65 kg",  statusKey:"animal_healthy",  pregnant:false },
  { id:"B002", name:"Qora Qo'y", type:"Sheep",   emoji:"🐑", gender:"♀", age:"3y", milk:"—",           weight:"72 kg",  statusKey:"animal_pregnant", pregnant:true  },
  { id:"B003", name:"Tosh",      type:"Sheep",   emoji:"🐏", gender:"♂", age:"4y", milk:"—",           weight:"88 kg",  statusKey:"animal_healthy",  pregnant:false },
  { id:"C001", name:"Group A",   type:"Poultry", emoji:"🐔", gender:"♀", age:"1y", milk:"36 eggs/day", weight:"2.1 kg", statusKey:"animal_healthy",  pregnant:false },
  { id:"C002", name:"Group B",   type:"Poultry", emoji:"🐔", gender:"♀", age:"2y", milk:"28 eggs/day", weight:"2.3 kg", statusKey:"animal_healthy",  pregnant:false },
];

const STATUS_STYLE: Record<string, string> = {
  animal_healthy:  "bg-[#E8F5E9] text-[#1B5E20]",
  animal_pregnant: "bg-blue-50 text-blue-700",
  animal_sick:     "bg-red-50 text-red-600",
};

type TabItem = { key: AnimalType; count: number };
const TABS: TabItem[] = [
  { key: "All",     count: 24 },
  { key: "Cattle",  count: 12 },
  { key: "Sheep",   count: 8  },
  { key: "Poultry", count: 4  },
];

export default function AnimalsView() {
  const { t } = useLanguage();
  const [tab, setTab]       = useState<AnimalType>("All");
  const [search, setSearch] = useState("");

  const filtered = ANIMALS.filter((a) => {
    const matchTab = tab === "All" || a.type === tab;
    const matchQ   = a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchQ;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#16201A]">{t("web_animals_title")}</h1>
          <p className="text-sm text-[#6B7B6E]">{t("web_animals_sub")}</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1B5E20] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#2E7D32] transition-colors shrink-0">
          <Plus size={16} />
          {t("web_add_animal")}
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white border border-[#E4EAE5] rounded-xl px-3 py-2.5 max-w-sm">
        <Search size={15} className="text-[#6B7B6E] shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("web_search_animal")}
          className="flex-1 text-sm bg-transparent text-[#16201A] placeholder:text-[#6B7B6E] focus:outline-none"
        />
      </div>

      <div className="flex gap-1 bg-white border border-[#E4EAE5] rounded-xl p-1 w-fit">
        {TABS.map(({ key, count }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === key ? "bg-[#1B5E20] text-white" : "text-[#6B7B6E] hover:bg-[#F1F8F2]"
            }`}
          >
            {key} <span className={`text-xs ml-0.5 ${tab === key ? "text-white/70" : "text-[#6B7B6E]"}`}>{count}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((animal) => (
          <div key={animal.id} className="bg-white border border-[#E4EAE5] rounded-2xl p-4 hover:border-[#1B5E20] transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-2xl">
                {animal.emoji}
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${STATUS_STYLE[animal.statusKey] ?? "bg-gray-100 text-gray-600"}`}>
                {t(animal.statusKey)}
              </span>
            </div>
            <p className="text-base font-bold text-[#16201A]">{animal.name}</p>
            <p className="text-xs text-[#6B7B6E] mb-3">{animal.id} · {animal.gender} · {animal.age}</p>
            <div className="border-t border-[#E4EAE5] pt-3 grid grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] text-[#6B7B6E] uppercase tracking-wide mb-0.5">
                  {animal.type === "Poultry" ? t("dash_eggs") : t("dash_milk")}
                </p>
                <p className="text-sm font-bold text-[#16201A] tabular-nums">{animal.milk}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#6B7B6E] uppercase tracking-wide mb-0.5">{t("web_col_weight")}</p>
                <p className="text-sm font-bold text-[#16201A] tabular-nums">{animal.weight}</p>
              </div>
            </div>
          </div>
        ))}

        <button className="bg-white border-2 border-dashed border-[#E4EAE5] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-[#1B5E20] hover:bg-[#F1F8F2] transition-all min-h-[160px]">
          <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
            <Plus size={20} className="text-[#1B5E20]" />
          </div>
          <span className="text-sm font-semibold text-[#1B5E20]">{t("web_add_animal")}</span>
        </button>
      </div>
    </div>
  );
}
