"use client"

import type React from "react"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { getRandomReply } from "@/lib/get-random-reply"

// Types
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

type Mood = "annoyed" | "dramatic" | "passive-aggressive" | "sweet" | "normal"

// Mood detection helper
function detectMood(content: string): Mood {
  const lower = content.toLowerCase()
  if (lower.includes("theek hai") || lower.includes("chalo") || lower.includes("pyaar") || lower.includes("👍")) {
    return "sweet"
  } else if (lower.includes("hmm") || lower.includes("achha") || lower.includes("wah") || lower.includes("whatever")) {
    return "passive-aggressive"
  } else if (lower.includes("!") || lower.includes("dimag") || lower.includes("force")) {
    return "dramatic"
  } else if (lower.includes("?") || lower.includes("mood nahi") || lower.includes("argue")) {
    return "annoyed"
  }
  return "normal"
}

export function KaleshphileChat() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [mood, setMood] = useState<Mood>("normal")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedInput = input.trim()
    if (!trimmedInput || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmedInput,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("") // Clear input immediately
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 600))

    const reply = getRandomReply()

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: reply,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setMood(detectMood(reply))
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-[480px] mx-auto bg-[#f0f2f5]">
      {/* Header */}
      <header className="flex items-center gap-3 p-4 bg-card shadow-sm">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
            K
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
        </div>
        <div className="flex-1">
          <h1 className="font-semibold text-foreground">KALESHPHILE</h1>
          <p className="text-xs text-muted-foreground">{isLoading ? "typing..." : getMoodText(mood)}</p>
        </div>
      </header>

      {/* Messages - WhatsApp style */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p className="text-sm">Start a conversation...</p>
            <p className="text-xs mt-1">But be prepared for some dry replies</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed shadow-sm",
                message.role === "user"
                  ? "bg-[#dcf8c6] text-gray-900 rounded-br-sm"
                  : "bg-white text-gray-900 rounded-bl-sm",
              )}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar - fixed at bottom */}
      <form onSubmit={handleSubmit} className="p-3 bg-card shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 rounded-full border-gray-300 focus:border-[#25d366] focus:ring-[#25d366]"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="rounded-full w-10 h-10 bg-[#25d366] hover:bg-[#20ba5a] text-white shadow-md"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}

// Helper for mood text
function getMoodText(mood: Mood): string {
  switch (mood) {
    case "sweet":
      return "feeling okay"
    case "annoyed":
      return "thoda irritated"
    case "dramatic":
      return "full drama mode"
    case "passive-aggressive":
      return "hmm... whatever"
    default:
      return "online"
  }
}
