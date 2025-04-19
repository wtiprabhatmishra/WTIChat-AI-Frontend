import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://wtichat-ai-backend.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error occurred");
    }

    setMessage("");
  };

  return (
    <div className="App">
      <h1>WTIChat-AI 🤖</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <strong>AI:</strong> {response}
      </div>
    </div>
  );
}

export default App;
