import React, { useEffect, useMemo, useRef, useState } from "react";
import { Send } from 'lucide-react';
import {translations} from "../assets/Translations.jsx";
import styles from "./ChatBot.module.css"

export const ChatBot = () => {
  const LOCAL_JS_URL = process.env.LOCAL_JS_URL;

  const currentLanguage = useMemo(
    () => localStorage.getItem("currentLanguage") || "en",
    []
  );

  const [messages, setMessages] = useState([]); // {role:'user'|'bot', text:string, isError?:boolean}
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages / loading
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const t = setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 30);
    return () => clearTimeout(t);
  }, [messages, loading]);

  // Initialize chatbot session
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${LOCAL_JS_URL}/init/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lang: currentLanguage }), 
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        if (data.session_id) setSessionId(data.session_id);
        setMessages((m) => [
          ...m,
          { role: "bot", text: data.msg || translations[currentLanguage].addBotMessage || "Hello! How can I help you today?" },
        ]);
      } catch (e) {
        setMessages((m) => [
          ...m,
          {
            role: "bot",
            text:
              translations[currentLanguage].errorBotMessageTwo,
            isError: true,
          },
        ]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [LOCAL_JS_URL, currentLanguage]);

  async function handleSend() {
    const message = input.trim();
    if (!message || loading) return;

    setMessages((m) => [...m, { role: "user", text: message }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${LOCAL_JS_URL}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "bot", text: data.message ?? "" },
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text:
            translations[currentLanguage].errorBotMesssageOne,
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
            m.isError ? styles.errorMessage : ""
            ].join(" ")}
        >
            {m.text}
        </div>
        ))}
    </div>

    {loading && (
        <div className={styles.loading}>
        <div className={styles.typingIndicator}>
            <div className={styles.typingDot}></div>
            <div className={styles.typingDot}></div>
            <div className={styles.typingDot}></div>
        </div>
        </div>
    )}

    <div className={styles.inputContainer}>
        <input
        type="text"
        className={styles.messageInput}
        placeholder={translations[currentLanguage].chatPlaceholder}
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
        >
        <Send />
        </button>
    </div>
    </div>
  );
};
