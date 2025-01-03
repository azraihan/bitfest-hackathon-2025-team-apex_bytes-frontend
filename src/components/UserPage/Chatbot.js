import React, { useState } from "react";
import { Box, TextField, IconButton, Typography, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Avatar } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

import { TITLE_THICK, TITLE, CONTENT } from "../../values/Fonts";

import { AiFillRobot } from "react-icons/ai";

import VoiceInputComponent from "../VoiceInputComponent/VoiceInputComponent";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "হ্যালো! আমি আপনাকে আজ কীভাবে সাহায্য করতে পারি?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: `You said: "${userMessage.text}"`,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    // Functionality for voice input can be added here
    alert("Voice input activated! (To be implemented)");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h5"
        sx={{
          fontSize: 40,
          fontWeight: "bold",
          fontFamily: CONTENT,
          textAlign: "center",
          mt: 3,
        }}
      >
        AI Learning Assistant <AiFillRobot />
      </Typography>
      <div
        style={{
          padding: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "800px",
            height: "700px",
            border: "1px solid #444",
            borderRadius: "30px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            backgroundColor: "#333",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              padding: "16px",
              backgroundColor: "#1c1c1c",
              color: "#fff",
            }}
          >
            <Typography variant="h6">Chatbot</Typography>
          </Box>

          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              backgroundColor: "#444",
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                {msg.sender !== "user" && (
                  <Avatar
                    sx={{ width: 30, height: 30, marginRight: "8px" }}
                    src="/sidebar_icons/robot.svg"
                  />
                )}
                <Paper
                  sx={{
                    padding: "12px 18px",
                    backgroundColor:
                      msg.sender === "user" ? "#4CAF50" : "#1E1E1E",
                    color: msg.sender === "user" ? "#333" : "#fff",
                    maxWidth: "70%",
                    borderRadius: "18px",
                    wordBreak: "break-word",
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                </Paper>
                {msg.sender === "user" && (
                  <Avatar
                    sx={{ width: 30, height: 30, marginLeft: "8px" }}
                    src="/chatbot/user.svg"
                  />
                )}
              </Box>
            ))}
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #444",
              backgroundColor: "#222",
            }}
          >
            <div>
              {/* Voice Input Button */}
              <VoiceInputComponent setTranslatedText={setInput}/>
            </div>

            {/* Text Input Field */}
            <TextField
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              sx={{
                backgroundColor: "#555",
                borderRadius: "18px",
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "18px",
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2", // Change border color on focus
                  },
                },
              }}
            />

            {/* Send Button */}
            <IconButton
              color="primary"
              onClick={handleSend}
              sx={{
                marginLeft: "8px",
                backgroundColor: "#1976d2",
                color: "#fff",
                width: 60,
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Chatbot;
