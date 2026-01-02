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
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import * as mammoth from "mammoth/mammoth.browser";
import Tesseract from "tesseract.js";

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

    setLoading(true);
    let extractedText = "";

    try {
      // TXT FILE
      if (file.type === "text/plain") {
        extractedText = await file.text();
      }
      // PDF FILE
      else if (file.type === "application/pdf") {
        const buffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          extractedText +=
            content.items.map((item) => item.str).join(" ") + "\n";
        }
      }
      // DOCX FILE
      else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        extractedText = result.value;
      }
      // IMAGE FILE
      else if (file.type.startsWith("image/")) {
        const imageDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        const { data } = await Tesseract.recognize(imageDataUrl, "eng", {
          logger: (m) => console.log(m),
        });
        extractedText = data.text;
      } else {
        alert("Unsupported file format.");
        setLoading(false);
        return;
      }

      if (!extractedText.trim()) {
        alert("No readable text found in the file.");
        setLoading(false);
        return;
      }

      await handleSend(extractedText);
    } catch (err) {
      console.error(err);
      alert("Failed to process the file.");
    }

    setLoading(false);
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

          {/* FILE UPLOAD */}
          <IconButton
            component="label"
            htmlFor="file-upload"
            sx={{ color: "#fff" }}
          >
            <UploadFileIcon />
            <input
              id="file-upload"
              type="file"
              hidden
              onChange={handleFileUpload}
            />
          </IconButton>

          {/* SEND BUTTON */}
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
