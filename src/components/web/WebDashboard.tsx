"use client";

import { useState, useEffect } from "react";
import Sidebar, { type NavView } from "./Sidebar";
import TopBar from "./TopBar";
import DashboardView from "./DashboardView";
import AnimalsView from "./AnimalsView";
import FinanceView from "./FinanceView";
import AlertsView from "./AlertsView";
import AiLogView from "./AiLogView";
import {
  LayoutDashboard,
  PawPrint,
  Wallet,
  Bell,
  Sparkles,
} from "lucide-react";

export default function WebDashboard() {
  const [view, setView]           = useState<NavView>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (v: NavView) => {
    setView(v);
    setMobileOpen(false);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  /* Close mobile sidebar on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 820) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#F1F8F2] overflow-hidden">

      {/* ── Desktop sidebar ── */}
      <div className="hidden md:flex flex-col w-[264px] shrink-0 h-full">
        <Sidebar activeView={view} onNavigate={navigate} />
      </div>

      {/* ── Mobile sidebar overlay ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-40 w-[264px] flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar activeView={view} onNavigate={navigate} />
      </div>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar
          view={view}
          onMenuToggle={() => setMobileOpen((o) => !o)}
          onQuickLog={() => navigate("ai-log")}
        />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-5 pb-24 md:pb-6">
          {view === "dashboard" && <DashboardView onNavigate={navigate} />}
          {view === "animals"   && <AnimalsView />}
          {view === "finance"   && <FinanceView />}
          {view === "alerts"    && <AlertsView />}
          {view === "ai-log"    && <AiLogView />}
        </main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-[#E4EAE5] flex">
        {([
          { key: "dashboard", icon: LayoutDashboard, label: "Home"    },
          { key: "animals",   icon: PawPrint,        label: "Animals" },
          { key: "ai-log",    icon: Sparkles,        label: "AI Log"  },
          { key: "finance",   icon: Wallet,          label: "Finance" },
          { key: "alerts",    icon: Bell,            label: "Alerts", badge: 2 },
        ] as { key: NavView; icon: React.ElementType; label: string; badge?: number }[]).map(
          ({ key, icon: Icon, label, badge }) => {
            const active = view === key;
            return (
              <button
                key={key}
                onClick={() => navigate(key)}
                className="flex-1 flex flex-col items-center gap-0.5 py-2.5 relative"
              >
                <div className="relative">
                  <Icon
                    size={21}
                    className={active ? "text-[#1B5E20]" : "text-[#6B7B6E]"}
                  />
                  {badge && (
                    <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-white text-[8px] font-bold flex items-center justify-center leading-none">
                      {badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[9px] font-bold ${
                    active ? "text-[#1B5E20]" : "text-[#6B7B6E]"
                  }`}
                >
                  {label}
                </span>
                {active && (
                  <span className="absolute top-0 inset-x-0 h-0.5 bg-[#1B5E20] rounded-b-full" />
                )}
              </button>
            );
          }
        )}
      </nav>
    </div>
  );
}
