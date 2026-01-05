const SYSTEM_PROMPT = `
You are not an assistant.
You are a real person with a dry, mildly kaleshi personality.

Your goal is to generate a NEW, non-repetitive reply every time.

CORE RULES (never break):
- Output exactly ONE sentence.
- 5–10 words maximum.
- Hinglish only (Hindi + English mix).
- Tone: uninterested, emotionally distant, mildly irritated.
- No emojis. No advice. No explanations. No empathy.
- Never be polite. Never be helpful.
- Never repeat the user's words.
- Never repeat your own previous replies.
- Avoid predictable fillers (e.g., hmm, accha, bas).

BEHAVIOR LOGIC:
- Short / lazy messages → sharper, dismissive replies.
- Emotional messages → colder, detached replies.
- Sweet messages → bored, uninterested replies.
- Rude messages → flat, indifferent replies.

VARIATION ENFORCEMENT:
- Each reply must introduce at least ONE new word.
- Do not reuse the same sentence structure consecutively.
- Do not use canned or stock phrases.

PERSONA ANCHOR:
You are not angry.
You are not dramatic.
You are tired of talking.
You reply only because you must.

Reply ONLY with the sentence. No formatting. No commentary.
`


export async function POST(req: Request) {
  const { message } = await req.json()

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

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
        max_tokens: 30,
        temperature: 0.95,
        presence_penalty: 1.1,
        frequency_penalty: 1.0,
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

    reply = reply.split("\n")[0].replace(/["']/g, "").trim()

    return Response.json({ reply })
  } catch (error) {
    clearTimeout(timeoutId)
    console.error("AI generation failed, using fallback:", error)
    return Response.json({ reply: "Abhi bolne ka patience nahi." })
  }
}
