import React, { useState, useEffect } from "react";
import { IconButton, Typography, CircularProgress } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

const VoiceInputComponent = ({ setTranslatedText }) => {
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set up Speech Recognition API
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US"; // Default to English, can dynamically adjust

  // Start/stop listening
  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  // Capture speech input and send for translation
  recognition.onresult = (event) => {
    const lastResult = event.results[event.results.length - 1];
    const recognizedText = lastResult[0].transcript;

    console.log("Recognized Text:", recognizedText);
    setLoading(true);
    translateToBengali(recognizedText);
  };

  recognition.onstart = () => {
    console.log("Speech recognition started...");
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event);
    setError("Error recognizing speech. Please try again.");
    setLoading(false);
  };

  const translateToBengali = (text) => {
    const apiKey = ""; // Replace with your API key
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        target: "bn", // Bengali language code
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const translatedText = data.data.translations[0].translatedText;
        console.log("Translated Text:", translatedText);

        setTranslatedText(translatedText); // Pass translated text to parent component

        setLoading(false);
      })
      .catch((error) => {
        console.error("Translation error:", error);
        setError("Error translating text. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: "400px", textAlign: "center" }}>
      {/* <Typography variant="h5" gutterBottom>
        Voice Input to Bengali Text
      </Typography> */}

      <IconButton
        onClick={toggleListening}
        color={isListening ? "secondary" : "primary"}
        sx={{
          fontSize: "60px",
          width: '60px',
          height: '60px',
          marginRight: 2,
          //marginBottom: "20px",
          color: "black",
          border: '3px solid black',
          backgroundColor: "yellow",
          "&:hover": {
            color: "white",
            backgroundColor: "red",
          },
        }}
      >
        {isListening ? <MicOffIcon /> : <MicIcon />}
      </IconButton>

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" variant="body2" style={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default VoiceInputComponent;
