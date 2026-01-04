"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { Send, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { FormEvent } from "react"

interface ChatInputProps {
  input: string
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading }: ChatInputProps) {
  const [localValue, setLocalValue] = useState(input || "")

  useEffect(() => {
    setLocalValue(input || "")
  }, [input])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    if (handleInputChange) {
      handleInputChange(e)
    }
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (localValue.trim() && !isLoading && handleSubmit) {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={onFormSubmit} className="p-4 border-t border-border bg-card">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary/80 hover:bg-primary/10"
        >
          <Heart className="w-5 h-5" />
          <span className="sr-only">Send love</span>
        </Button>
        <Input
          value={localValue}
          onChange={onChangeHandler}
          placeholder="Type something... if you dare"
          className="flex-1 bg-secondary border-0 focus-visible:ring-primary"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !localValue.trim()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Send className="w-4 h-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Warning: She will overthink your message</p>
    </form>
  )
}
