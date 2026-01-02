import React from "react";
import { Box, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";

const ChatMessages = ({ messages, loading }) => {
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      {messages.map((msg, index) => {
        const isUser = msg.role === "user";

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: isUser ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                px: 2,
                py: 1.5,
                borderRadius: 4,
                background: isUser
                  ? "linear-gradient(135deg, #4facfe, #00f2fe)"
                  : "rgba(255,255,255,0.1)",
                color: isUser ? "#0f2027" : "#ffffff",
                backdropFilter: "blur(10px)",
                boxShadow: isUser
                  ? "0 10px 25px rgba(0,242,254,0.35)"
                  : "0 8px 20px rgba(0,0,0,0.35)",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              {/* FILE MESSAGE */}
              {msg.type === "file" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {msg.fileType?.startsWith("image/") ? (
                    <ImageIcon fontSize="small" />
                  ) : (
                    <DescriptionIcon fontSize="small" />
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      wordBreak: "break-word",
                      fontWeight: 500,
                    }}
                  >
                    {msg.fileName}
                  </Typography>
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    lineHeight: 1.5,
                  }}
                >
                  {msg.text}
                </Typography>
              )}

              {/* TIMESTAMP */}
              {msg.timestamp && msg.type !== "file" && (
                <Typography
                  variant="caption"
                  sx={{
                    alignSelf: "flex-end",
                    opacity: 0.6,
                    fontSize: "0.7rem",
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}

      {/* TYPING INDICATOR */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Box
            sx={{
              px: 2,
              py: 1,
              borderRadius: 4,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              AI is typing…
            </Typography>
          </Box>
        </Box>
      )}

      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatMessages;
