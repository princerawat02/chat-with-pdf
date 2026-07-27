import { useState } from "react";
import api from "../src/services/api";

function ChatInput({ setMessages, setLoading, loading }) {
  const [question, setQuestion] = useState("");

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const res = await api.post("/chat", { question });

      setMessages((prev) => [
        ...prev,
        { role: "user", text: question },
        { role: "assistant", text: res.data.answer },
      ]);

      setQuestion("");
    } catch (err) {
      alert(
        err.response?.data?.detail || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) {
        askQuestion();
      }
    }
  };

  return (
    <form
      className="border-t border-white/8 bg-slate-950/40 px-4 py-4 sm:px-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (!loading) {
          askQuestion();
        }
      }}
    >
      <div className="rounded-3xl border border-white/10 bg-white/3 p-3 shadow-[0_16px_40px_rgba(2,6,23,0.25)] transition duration-200 focus-within:border-cyan-300/35 focus-within:bg-white/5">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your PDF..."
            rows={3}
            disabled={loading}
            className="min-h-27 w-full resize-none rounded-[18px] border-0 bg-transparent px-1 py-1 pr-20 text-sm leading-6 text-white outline-none placeholder:text-slate-500 focus:ring-0 sm:text-[15px]"
          />

          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="absolute bottom-2.5 right-2.5 inline-flex h-11 items-center justify-center rounded-full bg-cyan-300 px-4 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(34,211,238,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-700 disabled:text-slate-400"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
          <p>Enter sends, Shift+Enter adds a new line.</p>
          <p className="hidden sm:block">
            Responses appear instantly in the conversation panel.
          </p>
        </div>
      </div>
    </form>
  );
}

export default ChatInput;
