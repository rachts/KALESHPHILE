"use client"

import { Heart, Sparkles } from "lucide-react"

export function ChatHeader() {
  return (
    <header className="flex items-center gap-4 p-4 border-b border-border bg-card">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Heart className="w-6 h-6 text-primary fill-primary" />
        </div>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          KALESHPHILE
          <Sparkles className="w-4 h-4 text-accent" />
        </h1>
        <p className="text-sm text-muted-foreground">Online • Probably overthinking</p>
      </div>
      <div className="text-2xl animate-pulse">💅</div>
    </header>
  )
}
