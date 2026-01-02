import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ImageIcon from "@mui/icons-material/Image";
import BoltIcon from "@mui/icons-material/Bolt";
import DrawerAppBar from "../components/Navbar/AppBar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/RagBot.png";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Instant Chat",
      desc: "Ask questions and get answers instantly.",
      icon: <ChatIcon fontSize="large" sx={{ color: "#00c6ff" }} />,
    },
    {
      title: "Upload Documents",
      desc: "Easily upload PDFs, Word files, or text for quick insights.",
      icon: <UploadFileIcon fontSize="large" sx={{ color: "#00c6ff" }} />,
    },
    {
      title: "Image Analysis",
      desc: "Get information from images with just one click.",
      icon: <ImageIcon fontSize="large" sx={{ color: "#00c6ff" }} />,
    },
    {
      title: "Fast & Smooth",
      desc: "Experience a lightning-fast, responsive interface.",
      icon: <BoltIcon fontSize="large" sx={{ color: "#00c6ff" }} />,
    },
  ];

  return (
    <Box sx={{ bgcolor: "#0a0f1a", color: "#fff", minHeight: "100vh" }}>
      <DrawerAppBar />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img src={logo} alt="RagBot" style={{ width: 60 }} />
                <Typography variant="h6" sx={{ color: "#00c6ff" }}>
                  An AI Bot
                </Typography>
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.1,
                  background: "linear-gradient(90deg,#00c6ff,#0072ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Your Smart Digital Assistant
              </Typography>

              <Typography sx={{ color: "#b0b8d1", fontSize: "1.1rem" }}>
                Ask questions, upload documents or images, and get instant,
                accurate responses in one place.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    px: 4,
                    py: 1.5,
                    bgcolor: "#00c6ff",
                    fontWeight: 600,
                    ":hover": { bgcolor: "#0072ff" },
                  }}
                  onClick={() => navigate("/chat")}
                >
                  Start Chat
                </Button>
              </Stack>
            </Stack>
          </Grid>

          {/* Hero Illustration / Visual */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: 4,
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: "#00c6ff" }}>
                Key Features
              </Typography>
              <Stack spacing={2}>
                {features.map((f) => (
                  <Box
                    key={f.title}
                    sx={{
                      display: "flex",
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "rgba(255,255,255,0.03)",
                      transition: "0.3s",
                      "&:hover": { transform: "translateX(5px)" },
                    }}
                  >
                    {f.icon}
                    <Box>
                      <Typography fontWeight={600}>{f.title}</Typography>
                      <Typography variant="body2" sx={{ color: "#b0b8d1" }}>
                        {f.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ py: 12, textAlign: "center", bgcolor: "#07101d" }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
          Ready to get started?
        </Typography>
        <Typography sx={{ color: "#b0b8d1", mb: 4 }}>
          Join now and experience RagBot's smart assistant features instantly.
        </Typography>
        <Button
          size="large"
          variant="contained"
          sx={{
            px: 6,
            py: 1.6,
            bgcolor: "#00c6ff",
            fontWeight: 600,
            ":hover": { bgcolor: "#0072ff" },
          }}
          onClick={() => navigate("/chat")}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
