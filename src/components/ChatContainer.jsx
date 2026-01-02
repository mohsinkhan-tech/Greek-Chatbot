import { useState } from "react";
import { Box, Paper } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { sendMessageToAI } from "../services/aiService";
import * as pdfjsLib from "pdfjs-dist";
import * as mammoth from "mammoth";
import Tesseract from "tesseract.js";

const MODEL_ENDPOINT = "MiniMaxAI/MiniMax-M2.1";

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
  const handleFileUpload = async (file) => {
    setLoading(true);
    let extractedText = "";

    try {
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          type: "file",
          fileName: file.name,
          fileType: file.type,
          timestamp: Date.now(),
        },
      ]);

      // TEXT FILE
      if (file.type === "text/plain") {
        extractedText = await file.text();
      }

      // PDF FILE
      else if (file.type === "application/pdf") {
        const buffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(buffer).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          extractedText +=
            content.items.map((item) => item.str).join(" ") + "\n";
        }
      }

      // WORD FILE
      else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const buffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer: buffer });
        extractedText = result.value;
      }

      // IMAGE OCR
      else if (file.type.startsWith("image/")) {
        const imageDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const { data } = await Tesseract.recognize(imageDataUrl, "eng");
        extractedText = data.text;
      }

      // UNSUPPORTED
      else {
        alert("Unsupported file format.");
        setLoading(false);
        return;
      }

      if (!extractedText.trim()) {
        alert("No readable text found.");
        setLoading(false);
        return;
      }

      const reply = await sendMessageToAI(
        MODEL_ENDPOINT,
        extractedText
      );

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: reply, timestamp: Date.now() },
      ]);
    } catch (error) {
      console.error(error);
      alert("File processing failed.");
    }

    setLoading(false);
  };

  // ---------------- UI ----------------
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1200,
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          overflow: "hidden",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            px: 4,
            py: 2.5,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            background:
              "linear-gradient(90deg, rgba(79,172,254,0.15), rgba(0,242,254,0.15))",
          }}
        >
          <ChatHeader />
        </Box>

        {/* MESSAGES */}
        <Box
          sx={{
            flex: 1,
            px: 4,
            py: 3,
            overflowY: "auto",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: 6,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.25)",
              borderRadius: 3,
            },
          }}
        >
          <ChatMessages messages={messages} loading={loading} />
        </Box>

        {/* INPUT */}
        <Box
          sx={{
            px: 3,
            py: 2,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <ChatInput
            input={input}
            setInput={setInput}
            onSend={handleSend}
            onFileUpload={handleFileUpload}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatContainer;
