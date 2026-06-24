"use client";

import { useState } from "react";
import { Sparkles, Mic, Droplets, Egg, Wheat, DollarSign, Loader2, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CHIPS = [
  { labelKey: "ai_milk",    icon: Droplets,   color: "text-[#1B5E20]", bg: "bg-[#E8F5E9]", border: "border-[#c8e6c9]" },
  { labelKey: "ai_eggs",    icon: Egg,        color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200"  },
  { labelKey: "ai_feed",    icon: Wheat,      color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  { labelKey: "dash_expense", icon: DollarSign, color: "text-red-500",  bg: "bg-red-50",    border: "border-red-200"    },
];

const DETECTED_KEYS = [
  { labelKey: "ai_morning_milking",  detailKey: "web_act_morning_milking", value: "+18 L",    icon: Droplets,   color: "text-[#1B5E20]", bg: "bg-[#E8F5E9]" },
  { labelKey: "ai_egg_collection",   detailKey: "web_act_egg_collection",  value: "+36 pcs",  icon: Egg,        color: "text-amber-600",  bg: "bg-amber-50"  },
  { labelKey: "ai_feed_distributed", detailKey: "web_act_feed_dist",       value: "25 kg",    icon: Wheat,      color: "text-yellow-700", bg: "bg-yellow-50" },
];

type Phase = "idle" | "loading" | "result";

export default function AiLogView() {
  const { t } = useLanguage();
  const [text, setText]         = useState("");
  const [phase, setPhase]       = useState<Phase>("idle");
  const [active, setActive]     = useState<Set<number>>(new Set([0,1,2]));
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [toast, setToast]       = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setPhase("loading");
    setTimeout(() => setPhase("result"), 1400);
  };

  const toggleItem = (i: number) => {
    setActive((prev) => { const n=new Set(prev); n.has(i)?n.delete(i):n.add(i); return n; });
  };

  const toggleExpand = (i: number) => {
    setExpanded((prev) => { const n=new Set(prev); n.has(i)?n.delete(i):n.add(i); return n; });
  };

  const saveAll = () => {
    if (!active.size) return;
    showToast(`✅ ${t("web_ai_save_journal")}`);
    setText(""); setPhase("idle"); setActive(new Set([0,1,2]));
  };

  return (
    <div className="max-w-2xl space-y-5">

      <div className="bg-[#0F3D1A] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Sparkles size={20} className="text-white"/>
          </div>
          <div>
            <h1 className="text-lg font-bold">{t("web_ai_header")}</h1>
            <p className="text-xs text-white/60">{t("web_ai_sub")}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CHIPS.map(({ labelKey, icon: Icon, color, bg, border }) => (
          <button
            key={labelKey}
            onClick={() => setText((tx) => tx ? `${tx}, ${t(labelKey).toLowerCase()}` : t(labelKey).toLowerCase())}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${bg} ${border} ${color} hover:opacity-80 transition-opacity`}
          >
            <Icon size={13}/>
            {t(labelKey)}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#E4EAE5] rounded-2xl overflow-hidden">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("web_ai_placeholder")}
          rows={5}
          className="w-full px-5 py-4 text-sm text-[#16201A] placeholder:text-[#6B7B6E] focus:outline-none resize-none"
        />
        <div className="flex items-center justify-between px-5 py-3 border-t border-[#E4EAE5] bg-[#F1F8F2]">
          <div className="flex items-center gap-2 text-xs text-[#6B7B6E]">
            <Mic size={13}/>
            {t("web_ai_voice")}
          </div>
          <span className="text-xs text-[#6B7B6E]">{text.length} {t("web_ai_chars")}</span>
        </div>
      </div>

      {phase !== "result" && (
        <button
          onClick={handleAnalyze}
          disabled={!text.trim() || phase === "loading"}
          className={`w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            !text.trim()
              ? "bg-[#E8F5E9] text-[#6B7B6E] cursor-not-allowed"
              : "bg-[#1B5E20] text-white hover:bg-[#2E7D32]"
          }`}
        >
          {phase === "loading"
            ? <><Loader2 size={16} className="animate-spin"/>{t("web_ai_analyzing")}</>
            : <><Sparkles size={16}/>{t("web_ai_let_analyze")}</>
          }
        </button>
      )}

      {phase === "loading" && (
        <p className="text-center text-xs text-[#6B7B6E]">{t("web_ai_processing")}</p>
      )}

      {phase === "result" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-[#16201A]">
              {t("web_ai_found", { n: String(DETECTED_KEYS.length) })}
              <span className="ml-2 text-xs font-semibold text-[#1B5E20] bg-[#E8F5E9] px-2 py-0.5 rounded-lg">
                {t("web_ai_confidence", { n: "94" })}
              </span>
            </p>
            <button onClick={() => { setPhase("idle"); setText(""); }} className="text-xs text-[#6B7B6E] underline">
              {t("web_ai_edit_text")}
            </button>
          </div>

          <div className="space-y-2">
            {DETECTED_KEYS.map((item, i) => {
              const Icon = item.icon;
              const on   = active.has(i);
              const open = expanded.has(i);
              return (
                <div key={i} className={`bg-white border rounded-2xl transition-colors ${on?"border-[#1B5E20]":"border-[#E4EAE5] opacity-60"}`}>
                  <div className="flex items-center gap-3 px-4 py-3.5">
                    <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon size={17} className={item.color}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#16201A]">{t(item.labelKey)}</p>
                      <p className="text-xs text-[#6B7B6E]">{t(item.detailKey)}</p>
                    </div>
                    <span className={`text-sm font-bold tabular-nums mr-2 ${item.color}`}>{item.value}</span>
                    <button onClick={() => toggleExpand(i)} className="text-[#6B7B6E] hover:text-[#16201A] mr-1">
                      {open ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </button>
                    <button
                      onClick={() => toggleItem(i)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${on?"bg-[#1B5E20] border-[#1B5E20]":"border-[#E4EAE5] bg-white"}`}
                    >
                      {on && <Check size={12} className="text-white" strokeWidth={3}/>}
                    </button>
                  </div>
                  {open && (
                    <div className="px-4 pb-3 border-t border-[#E4EAE5] pt-3">
                      <p className="text-xs text-[#6B7B6E]">
                        {t("ai_found", { n: "1" })}: <span className="text-[#16201A] font-semibold">"{text.slice(0,60)}…"</span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={saveAll}
              disabled={active.size === 0}
              className={`flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all ${active.size>0?"bg-[#1B5E20] text-white hover:bg-[#2E7D32]":"bg-[#E8F5E9] text-[#6B7B6E] cursor-not-allowed"}`}
            >
              {t("web_ai_save_journal")} {active.size > 0 ? `(${active.size})` : ""}
            </button>
            <button
              onClick={() => { setPhase("idle"); setText(""); }}
              className="px-5 py-3.5 rounded-2xl border border-[#E4EAE5] text-sm font-semibold text-[#6B7B6E] hover:bg-[#F1F8F2] transition-colors"
            >
              {t("web_ai_cancel")}
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B5E20] text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
