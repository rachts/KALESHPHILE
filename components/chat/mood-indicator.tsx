"use client"

import type { Mood } from "../kaleshphile-chat"
import { cn } from "@/lib/utils"

const moodConfig: Record<Mood, { label: string; emoji: string; color: string }> = {
  annoyed: { label: "Thoda Annoyed", emoji: "😒", color: "bg-orange-500" },
  dramatic: { label: "Full Drama Mode", emoji: "🎭", color: "bg-primary" },
  "passive-aggressive": { label: "Passive Aggressive", emoji: "🙄", color: "bg-yellow-500" },
  sweet: { label: "Suddenly Sweet", emoji: "🥰", color: "bg-pink-400" },
  normal: { label: "Chill (For Now)", emoji: "😌", color: "bg-green-500" },
}

export function MoodIndicator({ mood }: { mood: Mood }) {
  const config = moodConfig[mood]

  return (
    <div className="flex items-center justify-center gap-2 py-2 px-4 bg-secondary/50">
      <span className="text-xs text-muted-foreground">Current Mood:</span>
      <div className="flex items-center gap-1.5">
        <span className={cn("w-2 h-2 rounded-full animate-pulse", config.color)} />
        <span className="text-xs font-medium text-foreground">
          {config.emoji} {config.label}
        </span>
      </div>
    </div>
  )
}
