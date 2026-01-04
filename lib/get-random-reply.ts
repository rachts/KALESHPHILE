// Canned "Dry / Kalesh" Response Bank
const dryReplies = [
  "Hmm... abhi mood nahi hai baat karne ka.",
  "Accha.",
  "Jo sochna hai soch lo.",
  "Haan haan, bol liya?",
  "Theek hai, maan liya.",
  "Bas?",
  "Aur kuch?",
  "Samajh gaya, relax.",
  "Thoda shaant ho jao.",
  "Aaj nahi yaar.",
  "Mujhe argue karne ka mann nahi hai.",
  "Tum hamesha aise hi bolte ho.",
  "Okay 👍",
  "Hmm.",
  "Whatever.",
  "Jaise tum bolo.",
  "Ispe react karna zaroori hai?",
  "Abhi dimag kharab hai.",
  "Later baat karte hain.",
  "Mujhe force mat karo.",
]

export function getRandomReply(): string {
  const index = Math.floor(Math.random() * dryReplies.length)
  return dryReplies[index]
}
