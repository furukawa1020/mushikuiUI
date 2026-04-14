"use client";

import { SectionState } from "@/mock/profile";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ConnectionStage = "initial" | "shared" | "reaction" | "mutual" | "full";

interface StateSwitcherProps {
  currentStage: ConnectionStage;
  setStage: (stage: ConnectionStage) => void;
}

const STAGES: { id: ConnectionStage; label: string; desc: string }[] = [
  { id: "initial", label: "0", desc: "初回接触" },
  { id: "shared", label: "1", desc: "共通点あり" },
  { id: "reaction", label: "2", desc: "挨拶した" },
  { id: "mutual", label: "3", desc: "相互リアクション" },
  { id: "full", label: "4", desc: "全公開" },
];

export default function StateSwitcher({ currentStage, setStage }: StateSwitcherProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-card-paper/80 backdrop-blur-md border border-border-light shadow-lg rounded-full px-2 py-2 flex gap-1">
        {STAGES.map((stage) => (
          <button
            key={stage.id}
            onClick={() => setStage(stage.id)}
            className={cn(
              "px-4 py-2 rounded-full text-[10px] font-bold transition-all duration-300",
              currentStage === stage.id
                ? "bg-accent-gold text-white shadow-md shadow-accent-gold/20"
                : "text-text-sub hover:bg-bg-warm"
            )}
          >
            <span className="block text-xs mb-0.5">{stage.label}</span>
            <span className="opacity-70 font-medium">{stage.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
