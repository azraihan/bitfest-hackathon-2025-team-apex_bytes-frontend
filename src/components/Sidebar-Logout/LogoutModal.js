import React from "react";

import { Modal, Box, Button, Typography } from "@mui/material";

const LogoutModal = ({
  open,
  onClose,
  setAuth,
  setUserType,
  backgroundColor = "white",
  title = "Logout Confirmation",
  prompt = "Are you sure you want to log out?",
  cancelButtonColor= 'black', 
  cancelButtonBackgroundColor= '#f0f0f0', 
  cancelButtonColorOnHover= 'white',
  cancelButtonBackgroundColorOnHover= '#a0a0a0', 
  cancelButtonBorderColor = 'black',
  cancelButtonBorderColorOnHover = '#a0a0a0',
  logoutButtonColor = 'black', 
  logoutButtonColorOnHover = 'white',
  logoutButtonBackgroundColor = '#f25262', 
  logoutButtonBackgroundColorOnHover = 'red',
  cancelButtonText = 'Cancel',
  logoutButtonText = 'Logout'
}) => {
  const handleLogoutClick = () => {
    try {
      localStorage.removeItem("token");
      setAuth(false);
      // window.location.reload();
      // console.log("Logging out...")
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: backgroundColor,
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="logout-modal-title" variant="h2" component="h2">
          {title}
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontFamily: "Tahoma, Arial, sans-serif",
            marginTop: "45px",
          }}
        >
          {prompt}
        </Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              mr: 1,
              color: cancelButtonColor,
              borderColor: cancelButtonBorderColor,
              backgroundColor: cancelButtonBackgroundColor,
              "&:hover": {
                backgroundColor: cancelButtonBackgroundColorOnHover,
                color: cancelButtonColorOnHover,
                borderColor: cancelButtonBorderColorOnHover,
              },
            }}
          >
            {cancelButtonText}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogoutClick}
            sx={{
              color: logoutButtonColor,
              backgroundColor: logoutButtonBackgroundColor, // Button background color
              "&:hover": {
                color: logoutButtonColorOnHover,
                backgroundColor: logoutButtonBackgroundColorOnHover, // Button hover background color
              },
            }}
          >
            <div style={{fontWeight: "bold" }}>{logoutButtonText}</div>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
