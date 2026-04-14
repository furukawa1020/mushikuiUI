"use client";

import { ProfileSection } from "@/mock/profile";
import { getMaskedText } from "@/lib/masking";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, CheckCircle2, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionCardProps {
  section: ProfileSection;
  isFirst?: boolean;
}

export default function SectionCard({ section, isFirst }: SectionCardProps) {
  const { category, title, text, state, visibleRanges, matchedTags, nextUnlockHint } = section;

  const maskedText = getMaskedText(text, state, { visibleRanges, matchedTags });

  // Determine icon based on state
  const StateIcon = () => {
    switch (state) {
      case "hidden": return <Lock className="w-3 h-3 text-text-sub/40" />;
      case "teaser": return <Eye className="w-3 h-3 text-accent-gold/60" />;
      case "matched": return <CheckCircle2 className="w-3 h-3 text-accent-gold" />;
      case "revealed": return <Eye className="w-3 h-3 text-accent-gold" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative overflow-hidden rounded-radius-soft bg-card-paper p-6 shadow-soft border border-border-light/50 transition-all duration-500",
        state === "hidden" && "opacity-80"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-widest text-text-sub/60 font-medium">
          {category}
        </span>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bg-warm/50 border border-border-light/30">
          <StateIcon />
          <span className="text-[9px] font-bold text-text-sub/70 uppercase tracking-tighter">
            {state}
          </span>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-text-main mb-2">
        {title}
      </h3>

      <div className="relative min-h-[1.5rem] flex flex-wrap gap-x-1 gap-y-1 items-baseline">
        <AnimatePresence mode="wait">
          <motion.div
            key={state + maskedText}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={cn(
              "text-base leading-relaxed tracking-wide font-serif",
              state === "hidden" || state === "teaser" || state === "matched" ? "text-mask-black/90" : "text-text-main"
            )}
          >
            {/* Split text into chunks for better animation if needed, but for now just raw string */}
            {maskedText.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
                className={char === "█" ? "inline-block bg-mask-black/80 rounded-[2px] h-[1em] min-w-[0.8em] align-middle mx-[1px]" : ""}
              >
                {char === "█" ? "" : char}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {state === "hidden" && nextUnlockHint && (
        <div className="mt-4 pt-4 border-t border-border-light/40 flex items-center justify-between">
          <p className="text-[11px] text-text-sub/50 italic">
            {nextUnlockHint}
          </p>
          <ChevronRight className="w-3 h-3 text-text-sub/30" />
        </div>
      )}

      {/* Shared tag highlight for 'matched' state */}
      {state === "matched" && matchedTags && (
        <div className="mt-3 flex gap-2">
          {matchedTags.map(tag => (
            <span key={tag} className="text-[10px] bg-accent-gold/10 text-accent-gold px-2 py-0.5 rounded-full font-medium border border-accent-gold/20">
              #{tag} が共通
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
