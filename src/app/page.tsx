"use client";

import { useState } from "react";
import LanguageScreen from "@/components/LanguageScreen";
import WelcomeScreen from "@/components/WelcomeScreen";
import AuthScreen from "@/components/AuthScreen";
import OnboardingScreen from "@/components/OnboardingScreen";
import Dashboard from "@/components/Dashboard";
import BottomNav from "@/components/BottomNav";
import AiLogScreen from "@/components/AiLogScreen";
import AnimalManagement from "@/components/AnimalManagement";
import ProductionProcessing from "@/components/ProductionProcessing";
import Inventory from "@/components/Inventory";
import FinancialLedger from "@/components/FinancialLedger";
import TaskManagement from "@/components/TaskManagement";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const [screen, setScreen] = useState("language");
  const { changeLanguage } = useLanguage();

  const renderScreen = () => {
    switch (screen) {
      case "language":
        return <LanguageScreen onComplete={(lang) => { changeLanguage(lang as "uz" | "ru" | "en"); setScreen("welcome"); }} />;
      case "welcome":
        return <WelcomeScreen onContinue={() => setScreen("auth")} />;
      case "auth":
        return <AuthScreen onBack={() => setScreen("welcome")} onComplete={() => setScreen("onboarding")} />;
      case "onboarding":
        return <OnboardingScreen onBack={() => setScreen("auth")} onComplete={() => setScreen("dashboard")} />;
      case "dashboard":
        return <Dashboard onNavigate={setScreen} />;
      case "ai-log":
        return <AiLogScreen onBack={() => setScreen("dashboard")} />;
      case "animals":
        return <AnimalManagement onBack={() => setScreen("dashboard")} />;
      case "production":
        return <ProductionProcessing onBack={() => setScreen("dashboard")} />;
      case "inventory":
        return <Inventory onBack={() => setScreen("dashboard")} />;
      case "financial":
        return <FinancialLedger onBack={() => setScreen("dashboard")} />;
      case "tasks":
        return <TaskManagement onBack={() => setScreen("dashboard")} />;
      default:
        return <Dashboard onNavigate={setScreen} />;
    }
  };

  const isMainScreen = ["dashboard", "ai-log", "animals", "production", "inventory", "financial", "tasks"].includes(screen);

  return (
    <div className="max-w-md mx-auto h-dvh bg-gray-50 shadow-2xl relative overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderScreen()}
      </div>
      {isMainScreen && (
        <BottomNav
          activeTab={screen}
          onTabChange={(tab) => setScreen(tab)}
        />
      )}
    </div>
  );
}
