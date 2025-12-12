"use client";
import { useState } from "react";
import api from "../lib/api";

export default function ChatWindow({ onAnswer }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    setSources([]);

    try {
      const res = await api.ask({ question });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setAnswer(data.answer ?? "No answer returned.");
      setSources(data.sources ?? []);
      onAnswer && onAnswer(data.answer ?? "");
    } catch (err) {
      console.error(err);
      setAnswer("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-medium">Ask across uploaded PDFs</h2>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question..."
        className="w-full border rounded-md p-3 mt-3 min-h-[120px]"
      />

      <div className="flex items-center gap-3 mt-3">
        <button
          onClick={ask}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded-md disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
        <button
          onClick={() => { setQuestion(""); setAnswer(""); setSources([]); }}
          className="px-3 py-2 border rounded-md"
        >
          Clear
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Answer</h3>
        <div className="mt-2 p-4 bg-gray-50 rounded-md">
          {answer ? <div className="chat-bubble">{answer}</div> : <div className="text-sm text-gray-400">No answer yet.</div>}
        </div>
      </div>

      {sources && sources.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium">Sources</h4>
          <ul className="mt-2 space-y-2">
            {sources.map((s, i) => (
              <li key={i} className="text-sm text-gray-700 p-3 bg-white border rounded-md break-words">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
