import React, { useEffect, useState, useRef } from "react";
import { getDatabase, ref, onValue, push, update } from "firebase/database";
import { auth } from "../firebase";

const StudentMessages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const db = getDatabase();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    const messagesRef = ref(db, `messages/${userId}/chat`);

    // Listen for messages
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert from object to array and sort by timestamp
        const msgs = Object.entries(data).map(([id, msg]) => ({ id, ...msg }));
        msgs.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(msgs);
      } else {
        setMessages([]);
      }
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [userId, db]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const messagesRef = ref(db, `messages/${userId}/chat`);
    await push(messagesRef, {
      from: "student",
      text: newMessage.trim(),
      timestamp: Date.now(),
      read: false,
    });
    setNewMessage("");
    scrollToBottom();
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <header className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Messages with Admin</h1>
      </header>

      <div
        className="flex-1 overflow-y-auto border border-gray-300 rounded p-4 mb-4"
        style={{ maxHeight: "70vh" }}
      >
        {messages.length === 0 && (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs p-3 rounded-lg mb-2 ${
              msg.from === "student"
                ? "bg-green-500 text-white self-end"
                : "bg-gray-200 text-gray-900 self-start"
            }`}
            style={{ alignSelf: msg.from === "student" ? "flex-end" : "flex-start" }}
          >
            <p>{msg.text}</p>
            <small className="text-xs opacity-60 block mt-1">
              {new Date(msg.timestamp).toLocaleString()}
            </small>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex space-x-3"
      >
        <textarea
          rows={2}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded p-3 focus:outline-green-500 resize-none"
          required
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="bg-green-600 text-white rounded px-6 py-3 hover:bg-green-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default StudentMessages;
