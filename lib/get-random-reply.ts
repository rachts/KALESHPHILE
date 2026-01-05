const KALESH_REPLIES = [
  "Hmm.",
  "Bas?",
  "Aur kuch?",
  "Over mat socho.",
  "Abhi mood nahi.",
  "Jo hai wahi hai.",
  "Drama kam karo.",
  "Itna serious kyun ho?",
  "Ignore kar rahi hoon.",
  "Mujhe farak nahi padta.",
  "Thik hai.",
  "Haan haan.",
  "Whatever.",
  "Bol liya?",
  "Patience nahi hai.",
  "Aaj nahi.",
  "Mujhe force mat karo.",
  "Overreact mat karo.",
  "Samajh jao khud.",
  "Argue karne ka mann nahi.",
]

export function getRandomReply(): string {
  const index = Math.floor(Math.random() * KALESH_REPLIES.length)
  return KALESH_REPLIES[index]
}
