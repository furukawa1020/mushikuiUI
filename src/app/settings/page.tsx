"use client";

import { useState } from "react";
import { MY_PROFILE } from "@/mock/profile";
import SectionCard from "@/components/SectionCard";
import { ArrowLeft, Settings2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SettingsPreview() {
  return (
    <main className="min-h-screen pb-32 pt-8 px-4 flex flex-col items-center bg-bg-warm">
      <div className="w-full max-w-md space-y-8">
        
        {/* Navigation */}
        <header className="flex items-center justify-between pb-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-white/50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-text-main" />
          </Link>
          <h2 className="text-sm font-bold text-text-main tracking-tight uppercase">開示設定 プレビュー</h2>
          <div className="w-9" />
        </header>

        {/* Status Card */}
        <div className="bg-white border border-border-light rounded-radius-soft p-6 shadow-soft flex items-start gap-4">
          <div className="p-3 bg-accent-gold/10 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-accent-gold" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-text-main">
              相手へどう見えるか
            </h3>
            <p className="text-[11px] text-text-sub/60 leading-relaxed">
              あなたは現在、相手に「趣味」以外の情報を非公開に設定しています。これらは相互リアクション後に少しずつ開示されます。
            </p>
          </div>
        </div>

        {/* Setting list */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-[10px] font-bold text-text-main/40 uppercase tracking-widest">
              Sections Profile
            </h4>
            <Settings2 className="w-3 h-3 text-text-main/30" />
          </div>

          <div className="space-y-4 opacity-70">
            {/* We reuse the SectionCard but show how it looks to others */}
            <SectionCard 
              section={{
                ...MY_PROFILE.sections[0],
                state: "teaser"
              }} 
            />
            <div className="relative group">
              <div className="absolute inset-0 bg-bg-warm/10 backdrop-blur-[1px] rounded-radius-soft z-10 pointer-events-none" />
              <SectionCard 
                section={{
                  id: "care-me",
                  category: "配慮してほしいこと",
                  title: "自分の心地よさ",
                  text: "返事がゆっくりなことを許容してほしい",
                  tags: ["マイペース"],
                  state: "hidden",
                  nextUnlockHint: "相互リアクション後に開示"
                }} 
              />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-accent-gold/5 border border-accent-gold/10 rounded-2xl p-4">
          <p className="text-[10px] text-accent-gold/70 leading-relaxed text-center italic">
            「自分がどこまで見せるか」を、完全にコントロールできます。
          </p>
        </div>
      </div>
    </main>
  );
}
