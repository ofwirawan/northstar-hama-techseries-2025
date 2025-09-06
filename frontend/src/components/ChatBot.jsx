import React, { useEffect, useMemo, useRef, useState } from "react";
import { Send } from "lucide-react";
import { translations } from "../assets/Translations.jsx";
import styles from "./ChatBot.module.css";

export const ChatBot = () => {
  // Build a safe API root; fallback to localhost
    const BACKEND_URL = useMemo(() => {
    const raw =
        process.env.BACKEND_URL ||
        process.env.API_BASE ||
        process.env.LOCAL_JS_URL ||
        "http://127.0.0.1:8000";
    return raw; // trim trailing slashes
    }, []);

  const currentLanguage = useMemo(
    () => localStorage.getItem("currentLanguage") || "en",
    []
  );
  const t = translations?.[currentLanguage] || translations?.en || {};

  // Try resuming an existing session
  const storedId = useMemo(() => localStorage.getItem("chat_session") || null, []);
  const [sessionId, setSessionId] = useState(storedId);

  const [messages, setMessages] = useState([]); // [{role:'user'|'bot', text, isError?}]
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages / loading
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const to = setTimeout(() => (el.scrollTop = el.scrollHeight), 30);
    return () => clearTimeout(to);
  }, [messages, loading]);

  // Initialize / resume chatbot session
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/init`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lang: currentLanguage || "en",
            newSessionId: sessionId,     // optional hint to server
            oldSessionId: storedId || "",// resume if possible
          }),
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (data.session_id && data.session_id !== sessionId) {
          setSessionId(data.session_id);
          localStorage.setItem("chat_session", data.session_id);
        }

        setMessages((m) => [
          ...m,
          {
            role: "bot",
            text: data.msg || t.addBotMessage || "Hello! How can I help you today?",
          },
        ]);
      } catch (e) {
        if (e.name === "AbortError") return;
        setMessages((m) => [
          ...m,
          {
            role: "bot",
            text:
              t.errorBotMessageTwo ||
              "Sorry, I'm having trouble starting up. Please refresh and try again.",
            isError: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [API_BASE, currentLanguage, storedId, sessionId, t.addBotMessage, t.errorBotMessageTwo]);

  async function handleSend() {
    const message = input.trim();
    if (!message || loading) return;

    setMessages((m) => [...m, { role: "user", text: message }]);
    setInput("");
    setLoading(true);

    try {
        this.showLoading();

        // Send message to backend
        const res = await fetch(`${BACKEND_URL}/chatbot/msg/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                lang: currentLanguage || "en",
                last_message: this.last_message || "",
                sessionId: localStorage.getItem("sessionId")
            })
        });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages((m) => [...m, { role: "bot", text: data.message ?? "" }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text:
            t.errorBotMessageOne ||
            "Sorry, I'm having trouble processing your request. Please try again.",
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h2>AI Chatbot Assistant</h2>
      </div>

      <div className={styles.chatMessages} ref={listRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={[
              styles.message,
              m.role === "user" ? styles.userMessage : styles.botMessage,
              m.isError ? styles.errorMessage : "",
            ].join(" ")}
          >
            {m.text}
          </div>
        ))}
      </div>

      {loading && (
        <div className={styles.loading}>
          <div className={styles.typingIndicator}>
            <div className={styles.typingDot} />
            <div className={styles.typingDot} />
            <div className={styles.typingDot} />
          </div>
        </div>
      )}

      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.messageInput}
          placeholder={t.chatPlaceholder || "Type your message here..."}
          maxLength={1000}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={loading}
          ref={inputRef}
        />
        <button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label={t.sendLabel || "Send"}
        >
          <Send />
        </button>
      </div>
    </div>
  );
};
