import React, { useRef } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  Stack,
  Chip,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import ChatIcon from "@mui/icons-material/Chat";
import DrawerAppBar from "../components/Navbar/AppBar";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";

const features = [
  {
    title: "Smart Conversations",
    desc: "Chat with powerful AI models that understand context deeply.",
    icon: <ChatIcon />,
  },
  {
    title: "Document Intelligence",
    desc: "Upload PDFs and files to extract insights instantly.",
    icon: <DescriptionIcon />,
  },
  {
    title: "Image Reasoning",
    desc: "Understand and analyze images with AI vision models.",
    icon: <ImageIcon />,
  },
  {
    title: "Ultra Fast",
    desc: "Optimized inference for real-time responses.",
    icon: <BoltIcon />,
  },
];

const Home = () => {
  const chatRef = useRef(null);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0b0f19", color: "#fff" }}>
      <DrawerAppBar />

      {/* HERO */}
      <Box
        sx={{
          pt: { xs: 12, md: 18 },
          pb: { xs: 10, md: 16 },
          background: "radial-gradient(circle at top, #1a237e 0%, #0b0f19 60%)",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Chip
              label="AI Powered Knowledge Assistant"
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                color: "#90caf9",
                fontWeight: 600,
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
                maxWidth: 900,
              }}
            >
              Greek AI.
              <br />
              Chat, Documents & Vision.
            </Typography>

            <Typography
              sx={{
                color: "#b0b7c3",
                maxWidth: 600,
                fontSize: 18,
              }}
            >
              A modern RAG-powered chatbot that understands text, files, and
              images — all in one place.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                size="large"
                variant="contained"
                sx={{
                  px: 6,
                  py: 1.5,
                  fontWeight: 700,
                  bgcolor: "#6366f1",
                  ":hover": { bgcolor: "#4f46e5" },
                }}
                onClick={() =>
                  chatRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Start Chatting
              </Button>

              <Button
                size="large"
                variant="outlined"
                sx={{
                  px: 6,
                  py: 1.5,
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.3)",
                }}
              >
                Learn More
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* FEATURES */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={4} justifyContent="center">
          {features.map((f) => (
            <Grid
              item
              key={f.title}
              xs={12}
              sm={6}
              md={3}
              sx={{
                display: "flex",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 3,
                  borderRadius: 4,
                  textAlign: "center",
                  bgcolor: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  ":hover": {
                    transform: "translateY(-6px)",
                    borderColor: "#6366f1",
                    boxShadow: "0 20px 40px rgba(99,102,241,0.15)",
                  },
                }}
              >
                {/* ICON */}
                <Box
                  sx={{
                    color: "#6366f1",
                    mb: 2,
                    fontSize: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {f.icon}
                </Box>

                {/* TITLE */}
                <Typography fontWeight={700} mb={1} sx={{ fontSize: 18 }}>
                  {f.title}
                </Typography>

                {/* DESCRIPTION */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#b0b7c3",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Box
        sx={{
          py: 10,
          textAlign: "center",
          bgcolor: "#0e1220",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={800} mb={2}>
            Ready to build with AI?
          </Typography>
          <Typography color="#b0b7c3" mb={4}>
            Start chatting with documents and images in seconds.
          </Typography>
        </Container>
      </Box>

      {/* Chat */}
      <Box ref={chatRef}>
        <ChatContainer />
      </Box>
    </Box>
  );
};

export default Home;
