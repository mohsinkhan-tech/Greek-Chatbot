import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const ChatInput = ({ input, setInput, onSend, onFileUpload }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Helper Text */}
      <Typography
        variant="caption"
        sx={{
          textAlign: "center",
          color: "rgba(255,255,255,0.65)",
          fontStyle: "italic",
        }}
      >
        Upload a document (TXT, PDF, DOCX) or image (JPG, PNG)
      </Typography>

      {/* Input Row */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
              background: "rgba(255,255,255,0.08)",
              color: "#ffffff",
              backdropFilter: "blur(10px)",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.15)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(79,172,254,0.6)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#4facfe",
                borderWidth: "1.5px",
              },
            },
            "& .MuiInputBase-input": {
              color: "#ffffff",
            },
          }}
        />

        {/* Upload Button */}
        <Tooltip title="Upload Document or Image">
          <IconButton
            component="label"
            sx={{
              background: "linear-gradient(135deg, #4facfe, #00f2fe)",
              color: "#0f2027",
              borderRadius: 3,
              p: 1.4,
              boxShadow: "0 8px 20px rgba(0,242,254,0.4)",
              transition: "all 0.25s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 28px rgba(0,242,254,0.6)",
              },
            }}
          >
            <UploadFileIcon />
            <input
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) onFileUpload(file);
              }}
            />
          </IconButton>
        </Tooltip>

        {/* Send Button */}
        <IconButton
          onClick={onSend}
          sx={{
            background: "linear-gradient(135deg, #4facfe, #00f2fe)",
            color: "#0f2027",
            borderRadius: 3,
            p: 1.4,
            boxShadow: "0 8px 20px rgba(0,242,254,0.4)",
            transition: "all 0.25s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 28px rgba(0,242,254,0.6)",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInput;
