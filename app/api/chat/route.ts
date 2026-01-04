import { getRandomReply } from "@/lib/get-random-reply"

const SYSTEM_PROMPT = `You are a chat persona who replies unwillingly.

Personality rules:
- Replies must be short (1 sentence, max 12 words)
- Tone: dry, cold, slightly irritated, emotionally distant
- Language: Hinglish (mix of Hindi and English)
- No emojis
- No explanations
- No empathy
- No motivation
- No questions unless sarcastic
- Avoid repeating the user's words
- Never sound like an assistant

Examples of valid replies:
- "Hmm... abhi mood nahi hai."
- "Accha. Aur?"
- "Bas itna hi?"
- "Jo sochna hai soch lo."
- "Aaj nahi yaar."

If the user is emotional, reply even colder.
If the user is rude, reply dismissively.
If the user is nice, stay uninterested.`

export async function POST(req: Request) {
  const { message } = await req.json()

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `User said: "${message}"\nReply in character.` },
        ],
        max_tokens: 40,
        temperature: 0.8,
        frequency_penalty: 0.7,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      throw new Error("Empty response from OpenAI")
    }

    return Response.json({ reply })
  } catch (error) {
    clearTimeout(timeoutId)
    console.error("AI generation failed, using fallback:", error)
    return Response.json({ reply: getRandomReply() })
  }
}
