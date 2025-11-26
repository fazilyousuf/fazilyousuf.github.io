import { useState } from "react";
import "@/styles/Chatbot.css";
import chatIcon from "@/assets/Chatbot_icon.png";


const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

const initialMessages = [
  {
    id: 1,
    sender: "bot",
    text: "Hi 👋, I'm your portfolio assistant. Ask me anything about Fazil, skills, or projects!",
  },
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        throw new Error("API error");
      }

      const data = await res.json();

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.answer || "I couldn't generate an answer this time.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text:
          "Sorry, something went wrong talking to the AI backend. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <>
      {/* Floating AskMe button */}
      <button className="chatbot-toggle" onClick={toggleChat}>
  <img src={chatIcon} alt="Chatbot Icon" className="chatbot-icon-img" />
</button>


      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div>
              <div className="chatbot-title">Ask Me</div>
              <div className="chatbot-subtitle">Chat with Fazil’s assistant</div>
            </div>
            <button className="chatbot-close" onClick={toggleChat}>
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chatbot-message ${
                  msg.sender === "user" ? "from-user" : "from-bot"
                }`}
              >
                <div className="chatbot-bubble">{msg.text}</div>
              </div>
            ))}
          </div>

          <form className="chatbot-input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask something about me or my work..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="chatbot-send">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;
