import React from "react";

// MUI
import { Avatar } from "@mui/material";

// components
function Icon({ imageName }) {
  //considering that the image is in the public folder in a particular directory
  return (
    <Avatar
      alt={imageName}
      //////////////////////////////////////////////
      // Change this accordingly (by the image name)
      src={`${window.location.origin}/sidebar_icons/${imageName}.svg`}
      //////////////////////////////////////////////
      sx={{ width: 70, height: 70, bgcolor: "white" }} // Set the size of the icon
    />
  );
}

export const menuItem = [
  {
    path: "./translation",
    name: "Translation",
    icon: <Icon imageName="translate" />,
  },
  {
    path: "./contentCreation",
    name: "Content Creation",
    icon: <Icon imageName="content" />,
  },
  {
    path: "./search",
    name: "Search",
    icon: <Icon imageName="seo" />,
  },
  {
    path: "./chatbot",
    name: "Chatbot",
    icon: <Icon imageName="robot" />,
  },
  {
    path: "./analytics",
    name: "Analytics",
    icon: <Icon imageName="analytics" />,
  },
  {
    name: "Logout", // No path needed for logout
    icon: <Icon imageName="arrow" />,
    action: "logout", // Additional field to identify logout action
  },
];

//for the navbar
export const paths = ["/translation", "/contentCreation", "/search", "./chatbot", "./analytics", "/logOut"]; //always write the paths in camelcase

export const appBarLogoSrc = "/logo/banglamate_logo_transparent.png";

export const defaultPathName = "Home";

//for footer
export const quickLinks = ["Translation", "Content Creation", "Seacrh", "Analytics", "Chatbot"];
