import { useState } from "react";

import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";
import UploadBox from "../components/UploadBox";

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_28%),linear-gradient(to_bottom,rgba(15,23,42,0.72),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,rgba(148,163,184,0.06),transparent)] blur-3xl" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:h-screen lg:overflow-hidden lg:px-8 lg:py-8">
        <header className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-300 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl">
            Chat with your PDF
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ask questions about any document
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Upload one PDF and get clear answers in a polished, conversational
            workspace.
          </p>
        </header>

        <section className="grid flex-1 min-h-0 gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="lg:self-start lg:sticky lg:top-8">
            <UploadBox />
          </aside>

          <div className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-white/8 bg-slate-900/70 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl lg:h-full">
            <div className="border-b border-white/8 px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/80">
                    Conversation
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-white sm:text-xl">
                    Ask about your PDF
                  </h2>
                </div>
                <div className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 sm:inline-flex">
                  Ready for questions
                </div>
              </div>
            </div>

            <ChatBox messages={messages} loading={loading} />
            <ChatInput
              setMessages={setMessages}
              setLoading={setLoading}
              loading={loading}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
