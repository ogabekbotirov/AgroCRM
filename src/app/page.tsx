"use client";

import { useState } from "react";
import LanguageScreen from "@/components/LanguageScreen";
import WelcomeScreen from "@/components/WelcomeScreen";
import AuthScreen from "@/components/AuthScreen";
import OnboardingScreen from "@/components/OnboardingScreen";
import WebDashboard from "@/components/web/WebDashboard";
import { useLanguage } from "@/context/LanguageContext";

type Flow = "language" | "welcome" | "auth" | "onboarding" | "app";

export default function Home() {
  const [flow, setFlow] = useState<Flow>("language");
  const { changeLanguage } = useLanguage();

  if (flow === "app") {
    return <WebDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#F1F8F2] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="h-[680px] flex flex-col overflow-hidden relative">
          {flow === "language" && (
            <LanguageScreen
              onComplete={(lang) => {
                changeLanguage(lang as "uz" | "ru" | "en");
                setFlow("welcome");
              }}
            />
          )}
          {flow === "welcome" && (
            <WelcomeScreen onContinue={() => setFlow("auth")} />
          )}
          {flow === "auth" && (
            <AuthScreen
              onBack={() => setFlow("welcome")}
              onComplete={() => setFlow("onboarding")}
            />
          )}
          {flow === "onboarding" && (
            <OnboardingScreen
              onBack={() => setFlow("auth")}
              onComplete={() => setFlow("app")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
