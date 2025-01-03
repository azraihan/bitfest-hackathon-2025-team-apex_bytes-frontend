import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { styled } from "@mui/system";

// components
import CustomRoundedButton from "../misc/CustomRoundedButton";

// Styled TextField
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px', // Rounded edges
    backgroundColor: '#f5f5f5', // Background color of the text field
  },
  '& .MuiOutlinedInput-root:hover': {
    backgroundColor: '#e8e8e8', // Background color on hover
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ccc', // Default border color
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'red', // Border color when focused
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'red', // Label color when focused
  },
}));


// Styled Mic Button
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#e0f7fa", // Default background color of the mic button
  color: "#00796b", // Default icon color
  "&:hover": {
    backgroundColor: "red", // Background color on hover
    color: "#fff", // Icon color on hover
  },
}));

const TranslationComponent = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const characterLimit = 5000;

  // Voice input setup
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const handleInputChange = (event) => {
    const text = event.target.value;
    if (text.length <= characterLimit) {
      setInputText(text);
    }
  };

  const handleTranslate = () => {
    // Simulate translation. Replace this with your translation logic/API call.
    const translatedText = fakeTranslate(inputText);
    setOutputText(translatedText);
  };

  const handleVoiceInput = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    } else {
      SpeechRecognition.stopListening();
      setInputText(transcript);
    }
  };

  const fakeTranslate = (text) => {
    // Replace this with actual translation logic
    return `Translated Bengali text for: ${text}`;
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <Typography>Your browser does not support speech recognition.</Typography>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: "auto", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Translation Component
      </Typography>
      <Grid container spacing={2}>
        {/* Input Box */}
        <Grid item xs={12} sm={6}>
          <StyledTextField
            label="Input Text"
            multiline
            rows={10}
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your text here in Banglish or English..."
            fullWidth
            margin="normal"
            variant="outlined"
            helperText={`${inputText.length}/${characterLimit} characters`}
          />
        </Grid>

        {/* Output Box */}
        <Grid item xs={12} sm={6}>
          <StyledTextField
            label="Output Text"
            multiline
            rows={10}
            value={outputText}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled
          />
        </Grid>
      </Grid>

      {/* Microphone and Translate Buttons */}
      <Box sx={{ mt: 2 }}>
        <StyledIconButton onClick={handleVoiceInput}>
          <MicIcon />
        </StyledIconButton>
        <Typography variant="caption" display="block" gutterBottom>
          {listening ? "Listening..." : "Click the mic to start voice input"}
        </Typography>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleTranslate}
          sx={{ mt: 1 }}
        >
          Translate
        </Button> */}
        <div style={{ marginTop: 20 }}>
          <CustomRoundedButton
            handleClick={handleTranslate}
            label={"Translate"}
            backgroundColor="#334B71"
            textColor="white"
          />
        </div>
      </Box>
    </Box>
  );
};

export default TranslationComponent;
