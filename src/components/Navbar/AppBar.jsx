import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/RagBot.png";

const drawerWidth = 260;

const navItems = [
  { label: "Home", path: "/" },
  { label: "Chat", path: "/chat" },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        height: "100%",
        background:
          "linear-gradient(180deg, rgba(15,32,39,0.95), rgba(44,83,100,0.95))",
        color: "#ffffff",
        textAlign: "center",
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          py: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="RagBot Logo"
          sx={{
            width: 80,
            filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.5))",
          }}
        />
        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
          RagBot
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

      {/* Drawer Links */}
      <List>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  mx: 2,
                  my: 0.5,
                  borderRadius: 3,
                  textAlign: "center",
                  background: isActive
                    ? "linear-gradient(135deg, #4facfe, #00f2fe)"
                    : "transparent",
                  color: isActive ? "#0f2027" : "#ffffff",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #4facfe, #00f2fe)",
                    color: "#0f2027",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* APP BAR */}
      <AppBar
        component="nav"
        elevation={0}
        sx={{
          background:
            "linear-gradient(90deg, rgba(79,172,254,0.2), rgba(0,242,254,0.2))",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Toolbar>
          {/* Mobile Menu */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box
              component="img"
              src={logo}
              alt="RagBot Logo"
              sx={{
                width: 90,
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
              }}
            />
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: isActive ? "#0f2027" : "#ffffff",
                    background: isActive
                      ? "linear-gradient(135deg, #4facfe, #00f2fe)"
                      : "transparent",
                    borderRadius: 3,
                    px: 2,
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #4facfe, #00f2fe)",
                      color: "#0f2027",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              borderRight: "1px solid rgba(255,255,255,0.12)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
