"use client";

import { useState, useMemo } from "react";
import { MOCK_PROFILE, SectionState, ProfileSection } from "@/mock/profile";
import PresenceOrb from "@/components/PresenceOrb";
import SectionCard from "@/components/SectionCard";
import StateSwitcher, { ConnectionStage } from "@/components/StateSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, Heart } from "lucide-react";

export default function ProfilePreview() {
  const [stage, setStage] = useState<ConnectionStage>("initial");

  // Map global stage to individual section states
  const sections = useMemo(() => {
    return MOCK_PROFILE.sections.map((section): ProfileSection => {
      let state: SectionState = section.state;

      switch (stage) {
        case "initial":
          // Keep original states (matched -> teaser, teaser -> hidden, hidden -> hidden)
          if (section.id === "hobby") state = "teaser";
          else state = "hidden";
          break;
        case "shared":
          if (section.id === "hobby") state = "matched";
          else if (section.id === "interest" || section.id === "together") state = "teaser";
          else state = "hidden";
          break;
        case "reaction":
          if (section.id === "hobby" || section.id === "interest") state = "revealed";
          else if (section.id === "together") state = "matched";
          else if (section.id === "communication") state = "teaser";
          else state = "hidden";
          break;
        case "mutual":
          if (section.id === "dislike" || section.id === "care") state = "teaser";
          else state = "revealed";
          break;
        case "full":
          state = "revealed";
          break;
      }

      return { ...section, state };
    });
  }, [stage]);

  return (
    <main className="min-h-screen pb-32 pt-12 px-4 flex flex-col items-center">
      {/* Container with mobile max-width */}
      <div className="w-full max-w-md space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col items-center text-center space-y-4 pt-4">
          <PresenceOrb size="lg" />
          <div className="space-y-1">
            <h1 className="text-2xl font-serif font-medium text-text-main tracking-tight">
              {MOCK_PROFILE.alias}
            </h1>
            <div className="flex gap-2 justify-center">
              {MOCK_PROFILE.sharedTags.map(tag => (
                <span key={tag} className="text-[11px] font-medium text-text-sub/40">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <p className="max-w-[280px] text-xs leading-relaxed text-text-sub/60 italic px-4">
            「朝霧のように、少しずつ。あなたのペースで、お互いの気配を感じる場所」
          </p>
        </header>

        {/* Section List */}
        <div className="space-y-4">
          {sections.map((section, idx) => (
            <SectionCard key={section.id} section={section} isFirst={idx === 0} />
          ))}
        </div>

        {/* Action Buttons (Mock) */}
        <div className="pt-4 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-white border border-border-light text-text-main text-sm font-medium hover:bg-bg-warm transition-colors shadow-soft">
            <MessageSquare className="w-4 h-4 text-text-sub/50" />
            話してみたい
          </button>
          <button className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-accent-gold text-white text-sm font-bold shadow-soft shadow-accent-gold/20 hover:opacity-90 transition-opacity">
            <Heart className="w-4 h-4" />
            リアクション
          </button>
        </div>

        {/* Footer Hint */}
        <footer className="text-center pb-8 pt-4">
          <p className="text-[10px] text-text-sub/30 uppercase tracking-[0.2em]">
            gradual disclosure protocol v1.0
          </p>
        </footer>
      </div>

      <StateSwitcher currentStage={stage} setStage={setStage} />
    </main>
  );
}
