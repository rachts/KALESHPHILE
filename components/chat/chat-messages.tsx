"use client"

import type React from "react"

import type { Message } from "@ai-sdk/react"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

export function ChatMessages({ messages, isLoading, messagesEndRef }: ChatMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Welcome to KALESHPHILE 💕</h2>
        <p className="text-muted-foreground max-w-sm">
          Say something... but be prepared for some dramatic reactions! 🎭
        </p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {["Hi", "Busy hoon", "Ok", "Good night"].map((suggestion) => (
            <span
              key={suggestion}
              className="px-3 py-1.5 bg-secondary rounded-full text-sm text-secondary-foreground cursor-default"
            >
              Try: "{suggestion}"
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
          <div
            className={cn(
              "max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm",
              message.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-card border border-border text-card-foreground rounded-bl-md",
            )}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            <span
              className={cn(
                "text-[10px] mt-1 block",
                message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground",
              )}
            >
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}
