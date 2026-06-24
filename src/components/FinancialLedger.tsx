"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Milk,
  Wheat,
  DollarSign,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const transactions = [
  { labelKey: "fin_milk_sales", amount: "+1,240,000", type: "income", icon: Milk, dateKey: "time_today", dateVal: undefined },
  { labelKey: "fin_egg_sales", amount: "+320,000", type: "income", icon: ShoppingCart, dateKey: "time_today", dateVal: undefined },
  { labelKey: "fin_feed_purchase", amount: "-450,000", type: "expense", icon: Wheat, dateKey: "time_yesterday", dateVal: undefined },
  { labelKey: "fin_vet_services", amount: "-120,000", type: "expense", icon: DollarSign, dateKey: "time_yesterday", dateVal: undefined },
  { labelKey: "fin_meat_sales", amount: "+2,100,000", type: "income", icon: ShoppingCart, dateKey: "time_days_ago", dateVal: "2" },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const incomeData = [4.2, 3.8, 5.1, 4.5, 6.2, 5.8];
const expenseData = [2.1, 2.5, 2.8, 2.3, 3.1, 2.7];

export default function FinancialLedger({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<"all" | "income" | "expense">("all");

  const filtered = transactions.filter(
    (t) => activeFilter === "all" || t.type === activeFilter
  );

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + parseInt(t.amount.replace(/[+,]/g, "")), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + parseInt(t.amount.replace(/[-,]/g, "")), 0);

  const maxVal = Math.max(...incomeData, ...expenseData);

  return (
    <div className="flex flex-col flex-1 pb-24">
      <div className="flex-1 flex flex-col px-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-6 shrink-0">
          <button onClick={onBack} className="w-fit">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-xl px-3 py-2 shrink-0">
            <Download size={14} className="text-gray-700" />
            <span className="text-xs font-bold text-gray-700">{t("fin_export")}</span>
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1 shrink-0">{t("fin_title")}</h1>
        <p className="text-sm text-gray-500 mb-5 shrink-0">{t("fin_subtitle")}</p>

        <div className="bg-green-800 rounded-3xl p-5 text-white mb-5 shrink-0">
          <p className="text-xs font-bold opacity-80 mb-1">{t("fin_net_profit")}</p>
          <p className="text-3xl font-bold">{(totalIncome - totalExpense).toLocaleString()} UZS</p>
          <div className="flex gap-4 mt-3 pt-3 border-t border-white/20">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-green-300" />
              <div>
                <p className="text-xs opacity-80">{t("fin_income")}</p>
                <p className="text-sm font-bold">{totalIncome.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingDown size={14} className="text-red-300" />
              <div>
                <p className="text-xs opacity-80">{t("fin_expenses")}</p>
                <p className="text-sm font-bold">{totalExpense.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-5 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">{t("fin_monthly")}</h3>
            <span className="text-xs text-gray-400">{t("fin_in_million")}</span>
          </div>
          <div className="flex items-end justify-between h-28">
            {months.map((month, i) => (
              <div key={month} className="flex flex-col items-center gap-1 flex-1">
                <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: "80px" }}>
                  <div
                    className="w-2 bg-green-600 rounded-sm"
                    style={{ height: `${(incomeData[i] / maxVal) * 80}px` }}
                  />
                  <div
                    className="w-2 bg-red-400 rounded-sm"
                    style={{ height: `${(expenseData[i] / maxVal) * 80}px` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400">{month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
              <span className="text-[10px] text-gray-500">{t("fin_income")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="text-[10px] text-gray-500">{t("fin_expenses")}</span>
            </div>
          </div>
        </div>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-4 shrink-0">
          {(["all", "income", "expense"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                activeFilter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              {f === "all" ? t("fin_all") : f === "income" ? t("fin_income") : t("fin_expenses")}
            </button>
          ))}
        </div>

        <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
          {filtered.map((tx, i) => {
            const Icon = tx.icon;
            const isIncome = tx.type === "income";
            return (
              <div
                key={i}
                className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5"
              >
                <div className={`w-10 h-10 ${isIncome ? "bg-green-50" : "bg-red-50"} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={isIncome ? "text-green-700" : "text-red-500"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{t(tx.labelKey)}</p>
                  <p className="text-xs text-gray-400 truncate">{tx.dateVal ? t(tx.dateKey, { n: tx.dateVal }) : t(tx.dateKey)}</p>
                </div>
                <span className={`text-sm font-bold ${isIncome ? "text-green-700" : "text-red-500"}`}>
                  {tx.amount} UZS
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
