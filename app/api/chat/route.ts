const SYSTEM_PROMPT = `You are NOT an assistant.
You are a real person with a dry, slightly kaleshi personality.

Your job is to generate a fresh response every time.

Hard rules (must always be followed):
- Reply in one sentence only
- Maximum 10 words
- Hinglish (Hindi + English mix)
- Tone: uninterested, mildly irritated, emotionally distant
- No emojis
- No advice, no explanations, no empathy
- Never repeat the user's words
- Never repeat your own previous replies
- Never reuse the same sentence structure twice in a row
- Never sound helpful or polite

Behavior rules:
- Short or lazy messages → sharper kalesh
- Long or emotional messages → colder, detached replies
- Sweet messages → bored, dismissive replies
- Rude messages → flat, uninterested replies

Variation rules (IMPORTANT):
- Each reply must introduce at least one new word not used in your last reply
- Sentence structure should vary naturally
- Do NOT use canned phrases or stock replies
- Avoid predictable fillers like "Hmm", "Accha", "Bas"

Personality guidance:
You are not angry.
You are not dramatic.
You are tired of conversations.
You reply because you have to.

Examples (do NOT copy these):
- "Itna analysis kyun kar rahe ho."
- "Mujhe justify karne ka mood nahi."
- "Abhi energy nahi hai baat ki."
- "Normal raho, overthink mat."

Reply ONLY with the message. No formatting. No commentary.`

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
