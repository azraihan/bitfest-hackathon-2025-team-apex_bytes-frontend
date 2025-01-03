import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Box, Typography } from "@mui/material";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";

// MUI icons. This is the menu icon
import MenuIcon from "@mui/icons-material/Menu";

// components
import LogoutModal from "./LogoutModal";

// menu item constants
// import { menuItem } from "./menuItemConstants";

function Sidebar({
  menuItem,
  sideBarBackgroundColor = "white",
  sideBarItemColor = "black",
  sideBarItemBackgroundColor = "white",
  sideBarItemColorOnHover = "white",
  sideBarItemBackgroundColorOnHover = "black",
  sideBarIconColor = "black",
  sideBarIconBackGroundColor = "white",
  sideBarIconColorOnHover = "white",
  sideBarIconBackGroundColorOnhover = "black",
  width = "240px",
  height = "100vh",
  setAuth,
  setUserType
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  ////// Logout
  const handleLogoutModalClick = () => {
    setIsOpen(false); // Close the sidebar
    setIsModalOpen(true); // Open the modal
  };

  ////// Closing Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer(true)}
        sx={{
          margin: 1,
          padding: "15px",
          backgroundColor: sideBarIconBackGroundColor,
          color: sideBarIconColor,
          "&:hover": {
            backgroundColor: sideBarIconBackGroundColorOnhover,
            color: sideBarIconColorOnHover,
          },
          "& .MuiListItemIcon-root, & .MuiListItemText-root": {
            fontSize: "1.2rem",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: width,
            backgroundColor: sideBarBackgroundColor,
            height: height,
            overflowY: "hidden",
          },
        }}
      >
        {/* Non-clickable icon at the top */}
        <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <ListItem sx={{ justifyContent: "center", pointerEvents: "none" }}>
            <MenuIcon sx={{ fontSize: "2.5rem" }} />
          </ListItem>
        </div>

        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{
            maxHeight: "calc(100vh - 150px)", // 100vh minus any top bar height, adjust 64px as needed
            overflowY: "auto", // Enables vertical scrolling within the list container
          }}
        >
          <List>
            {/* Menu Items */}
            {menuItem.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  if (item.action === "logout") {
                    handleLogoutModalClick();
                  } else {
                    setIsOpen(false);
                  }
                }}
                component={item.path ? NavLink : "div"}
                to={item.path || ""}
                sx={{
                  padding: "10px",
                  backgroundColor: sideBarItemBackgroundColor,
                  color: sideBarItemColor,
                  "&:hover": {
                    backgroundColor: sideBarItemBackgroundColorOnHover,
                    color: sideBarItemColorOnHover,
                  },
                  "& .MuiListItemIcon-root, & .MuiListItemText-root": {
                    fontSize: "1.2rem",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    fontSize: "1.4rem",
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      marginRight: 2,
                      fontSize: "1.5em",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "medium",
                      fontSize: "inherit",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <LogoutModal
        open={isModalOpen}
        onClose={handleCloseModal}
        setAuth={setAuth}
        setUserType={setUserType}
      />
    </div>
  );
}

export default Sidebar;
