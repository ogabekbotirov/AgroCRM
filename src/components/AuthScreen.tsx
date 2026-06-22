"use client";

import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AuthScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState<"create" | "signin">("create");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 flex flex-col px-5 pt-6 pb-6 overflow-y-auto">
        <button onClick={onBack} className="w-fit mb-6">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {tab === "create" ? t("auth_create_account") : t("auth_welcome_back")}
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          {tab === "create" ? t("auth_sign_up_to_start") : t("auth_sign_in_to")}
        </p>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
          <button
            onClick={() => setTab("create")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors ${
              tab === "create" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            {t("auth_create")}
          </button>
          <button
            onClick={() => setTab("signin")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors ${
              tab === "signin" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            {t("auth_sign_in")}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1.5 block">{t("auth_full_name")}</label>
            <input
              type="text"
              placeholder="John Deere"
              className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1.5 block">{t("auth_phone_number")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-900">
                +998
              </span>
              <input
                type="tel"
                placeholder="99 123 45 67"
                className="w-full bg-gray-50 rounded-xl pl-14 pr-4 py-3.5 text-sm font-bold text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1.5 block">{t("auth_password")}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 placeholder:text-gray-400 pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {tab === "signin" && (
            <button className="text-sm font-bold text-green-800 text-right w-full">
              {t("auth_forgot_password")}
            </button>
          )}
        </div>

        <div className="mt-auto pt-8 space-y-3">
          <button
            onClick={onComplete}
            className="w-full bg-green-800 text-white font-bold text-base py-4 rounded-xl active:bg-green-900 transition-colors"
          >
            {tab === "create" ? t("auth_create_btn") : t("auth_sign_in_btn")}
          </button>
          <p className="text-center text-xs text-gray-400">
            {t("auth_by_continuing")}{" "}
            <span className="text-green-800 font-bold">{t("auth_terms")}</span> {t("auth_and")}{" "}
            <span className="text-green-800 font-bold">{t("auth_privacy")}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
