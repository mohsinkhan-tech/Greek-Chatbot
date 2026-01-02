import { Typography, Box } from "@mui/material";
import image1 from "../assets/RagBot.png"; // you can rename later if you want

const ChatHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 3,
        py: 2,
        background:
          "linear-gradient(90deg, rgba(79,172,254,0.18), rgba(0,242,254,0.18))",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <Box
        component="img"
        src={image1}
        alt="RagBot Logo"
        sx={{
          width: 52,
          height: 52,
          objectFit: "contain",
          filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.4))",
        }}
      />

      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.2,
          }}
        >
          RagBot
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.7)",
            letterSpacing: 0.5,
          }}
        >
          Retrieval-Augmented Chatbot
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatHeader;
