import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import SpeedIcon from "@mui/icons-material/Speed";
import DrawerAppBar from "../components/Navbar/AppBar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/RagBot.png"; // you can replace later

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Wise Conversations",
      desc: "Ask anything and receive thoughtful, intelligent answers.",
      icon: <PsychologyIcon fontSize="large" />,
    },
    {
      title: "Knowledge From Files",
      desc: "Upload documents and extract meaningful insights.",
      icon: <AutoStoriesIcon fontSize="large" />,
    },
    {
      title: "Visual Understanding",
      desc: "Analyze images and uncover hidden information.",
      icon: <ImageSearchIcon fontSize="large" />,
    },
    {
      title: "Fast Like Hermes",
      desc: "Lightning-fast responses with smooth performance.",
      icon: <SpeedIcon fontSize="large" />,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f1ec", color: "#1c1c1c" }}>
      <DrawerAppBar />

      {/* HERO SECTION */}
      <Box
        sx={{
          bgcolor: "#0e1a2b",
          color: "#fff",
          py: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img src={logo} alt="Greek Chatbot" width={55} />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      letterSpacing: 2,
                      color: "#d4af37",
                    }}
                  >
                    GREEK CHATBOT
                  </Typography>
                </Box>

                <Typography
                  variant="h2"
                  sx={{ fontWeight: 800, lineHeight: 1.2 }}
                >
                  Wisdom of AI,  
                  <br /> Inspired by Greece
                </Typography>

                <Typography sx={{ color: "#c9c9c9", maxWidth: 500 }}>
                  Greek Chatbot is your intelligent assistant — designed to
                  answer questions, analyze documents, and understand images
                  with clarity and speed.
                </Typography>

                <Button
                  size="large"
                  sx={{
                    width: "fit-content",
                    px: 5,
                    py: 1.5,
                    bgcolor: "#d4af37",
                    color: "#000",
                    fontWeight: 700,
                    ":hover": { bgcolor: "#bfa233" },
                  }}
                  onClick={() => navigate("/chat")}
                >
                  Enter the Agora
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: 320,
                  borderRadius: 4,
                  bgcolor: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontStyle: "italic",
                  color: "#d4af37",
                }}
              >
                “Knowledge is power.”
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FEATURES SECTION */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          sx={{ mb: 6 }}
        >
          What Makes Greek Chatbot Powerful
        </Typography>

        <Grid container spacing={4}>
          {features.map((f) => (
            <Grid item xs={12} md={3} key={f.title}>
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent>
                  <Box sx={{ color: "#d4af37", mb: 2 }}>{f.icon}</Box>
                  <Typography fontWeight={700} sx={{ mb: 1 }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {f.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA SECTION */}
      <Box sx={{ bgcolor: "#0e1a2b", py: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700} color="#fff" mb={2}>
          Begin Your Journey of Knowledge
        </Typography>
        <Typography sx={{ color: "#cfcfcf", mb: 4 }}>
          Experience the intelligence of Greek Chatbot today.
        </Typography>
        <Button
          size="large"
          sx={{
            px: 6,
            py: 1.5,
            bgcolor: "#d4af37",
            color: "#000",
            fontWeight: 700,
            ":hover": { bgcolor: "#bfa233" },
          }}
          onClick={() => navigate("/chat")}
        >
          Start Chat
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
