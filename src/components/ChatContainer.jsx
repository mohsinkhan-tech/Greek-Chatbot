import { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { sendMessageToAI } from "../services/aiService";

const MODEL_ENDPOINT = "MiniMaxAI/MiniMax-M2.1";

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ---------------- SEND MESSAGE ----------------
  const handleSend = async (message = input) => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: message, timestamp: Date.now() },
    ]);

    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessageToAI(MODEL_ENDPOINT, message);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: reply, timestamp: Date.now() },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ AI service is currently unavailable.",
          timestamp: Date.now(),
        },
      ]);
    }

    setLoading(false);
  };

  // ---------------- FILE UPLOAD ----------------
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: `📎 Uploaded file: ${file.name}` },
    ]);

    // Send file content to AI (simplified)
    const text = await file.text();
    handleSend(text);
  };

  // ---------------- AUTO SCROLL ----------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ---------------- UI ----------------
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 900,
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          overflow: "hidden",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            px: 4,
            py: 2,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" fontWeight={700} color="#fff">
            AI Chat Assistant
          </Typography>
        </Box>

        {/* MESSAGES */}
        <Box
          sx={{
            flex: 1,
            px: 4,
            py: 3,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {messages.map((m, i) => (
            <Box
              key={i}
              sx={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                bgcolor:
                  m.role === "user"
                    ? "rgba(99,102,241,0.8)"
                    : "rgba(255,255,255,0.1)",
                color: m.role === "user" ? "#fff" : "#e0e0e0",
                px: 3,
                py: 1.5,
                borderRadius: 3,
                maxWidth: "75%",
                wordBreak: "break-word",
                boxShadow:
                  m.role === "user"
                    ? "0 4px 10px rgba(99,102,241,0.3)"
                    : "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              <Typography variant="body1">{m.text}</Typography>
            </Box>
          ))}

          {loading && (
            <Box sx={{ alignSelf: "flex-start" }}>
              <CircularProgress size={24} color="inherit" />
            </Box>
          )}

          <div ref={messagesEndRef} />
        </Box>

        {/* INPUT */}
        <Box
          sx={{
            px: 3,
            py: 2,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 8,
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <label htmlFor="file-upload">
            <input
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <IconButton sx={{ color: "#fff" }}>
              <UploadFileIcon />
            </IconButton>
          </label>

          <IconButton
            onClick={() => handleSend()}
            sx={{
              color: "#fff",
              bgcolor: "#6366f1",
              "&:hover": { bgcolor: "#4f46e5" },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatContainer;
