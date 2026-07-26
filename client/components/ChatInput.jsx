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
    <div>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question about the PDF"
        rows={3}
      />

      <div>
        <p>Enter sends, Shift+Enter adds a new line.</p>

        <button onClick={askQuestion} disabled={loading || !question.trim()}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
