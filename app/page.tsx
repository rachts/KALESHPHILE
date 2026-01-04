import { KaleshphileChat } from "@/components/kaleshphile-chat"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f2f5] flex flex-col">
      <KaleshphileChat />
      <footer className="py-3 text-center text-xs text-gray-500">built by Rachit</footer>
    </main>
  )
}
