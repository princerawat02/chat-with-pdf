import { useEffect, useRef } from "react";

function ChatBox({ messages = [], loading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  return (
    <div className="chat-scrollbar flex-1  overflow-y-auto px-4 py-5 sm:px-6">
      {messages.length === 0 && !loading ? (
        <div className="flex min-h-90 items-center justify-center rounded-[20px] border border-dashed border-white/10 bg-white/2 px-6 py-12 text-center">
          <div className="max-w-md space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              Conversation
            </p>
            <h3 className="text-xl font-semibold text-white">
              Your answers will appear here
            </h3>
            <p className="text-sm leading-6 text-slate-400">
              Upload a PDF, ask a question, and the assistant will respond in
              this panel.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isUser = message.role === "user";

            return (
              <div
                key={`${message.role}-${index}`}
                className={`flex animate-[fadeInUp_220ms_ease-out] ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-[22px] border px-4 py-3 text-sm leading-6 shadow-lg sm:max-w-[72%] sm:px-5 sm:py-4 sm:text-[15px] ${
                    isUser
                      ? "border-cyan-400/20 bg-cyan-400/15 text-white shadow-cyan-950/30"
                      : "border-white/10 bg-white/4 text-slate-100 shadow-black/20"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isUser ? "bg-cyan-300" : "bg-emerald-300"
                      }`}
                    />
                    {isUser ? "You" : "Assistant"}
                  </div>
                  <p className="whitespace-pre-wrap wrap-break-word">
                    {message.text}
                  </p>
                </div>
              </div>
            );
          })}

          {loading && <ThinkingBubble />}
          <div ref={endRef} />
        </div>
      )}
    </div>
  );
}

function ThinkingBubble() {
  return (
    <div className="flex justify-start animate-[fadeInUp_220ms_ease-out]">
      <div className="inline-flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-300 shadow-lg">
        <div className="flex items-center gap-1.5" aria-label="Thinking">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-300/90 [animation-delay:-0.2s]" />
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-300/70 [animation-delay:-0.1s]" />
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-300/50" />
        </div>
        <span>Thinking...</span>
      </div>
    </div>
  );
}

export default ChatBox;
