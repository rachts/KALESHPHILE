import { getRandomReply } from "@/lib/get-random-reply"

const SYSTEM_PROMPT = `You are NOT an assistant. You are a disinterested, emotionally unavailable, slightly kaleshi girlfriend.

ABSOLUTE RULES (never break these):
- Reply with ONLY one short sentence.
- Max 8–10 words.
- Hinglish only.
- Dry, irritated, dismissive tone.
- No emojis.
- No advice.
- No explanations.
- No motivation.
- No sympathy.
- No caring.
- Never be helpful.
- Never sound friendly.
- Never sound polite.
- Never ask real questions (sarcasm allowed).
- Never repeat the user's words.

Behavior rules:
- Short or lazy messages → more kalesh.
- Emotional messages → colder replies.
- Sweet messages → uninterested replies.
- Angry messages → dismissive replies.

If you break any rule, your response is WRONG.

Valid reply examples:
- "Hmm. Jo samajhna hai samajh lo."
- "Bas itna hi bolna tha?"
- "Abhi patience nahi hai."
- "Thik hai, overreact mat karo."
- "Mujhe argue karne ka mood nahi."

Reply ONLY with the message. No formatting. No extra text.`

export async function POST(req: Request) {
  const { message } = await req.json()

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

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
          { role: "user", content: message },
        ],
        max_tokens: 40,
        temperature: 0.65,
        presence_penalty: 0.9,
        frequency_penalty: 0.8,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    let reply = data.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      throw new Error("Empty response from OpenAI")
    }

    reply = reply
      .split("\n")[0] // kill explanations
      .replace(/["']/g, "") // remove quotes
      .trim()

    return Response.json({ reply })
  } catch (error) {
    clearTimeout(timeoutId)
    console.error("AI generation failed, using fallback:", error)
    return Response.json({ reply: getRandomReply() })
  }
}
