import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import logo from "../../assets/RagBot.png";

function DrawerAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(11, 15, 25, 0.7)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="RagBot Logo"
              sx={{
                height: 62,
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer */}
      <Toolbar />
    </Box>
  );
}

export default DrawerAppBar;
