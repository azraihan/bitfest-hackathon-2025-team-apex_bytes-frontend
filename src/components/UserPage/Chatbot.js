import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AiFillRobot } from "react-icons/ai";
import VoiceInputComponent from "../VoiceInputComponent/VoiceInputComponent";
import { API_ENDPOINT } from "../../env";
import "./Chatbot.css";
import { TITLE_THICK, TITLE, CONTENT } from "../../values/Fonts";

// Sample PDFs array (moved from ContentCreation)
const pdfs = [
  {
    name: "আমার ছোট বেলার স্মৃতিচারণ",
    filePath: "/stories/story_1.pdf",
    content:
      "আমার ছোট বেলা আমি ছোট বেলায় অনেক মজার মজার খেলা করতাম। সকালেই উঠে আমার বন্ধুদের সাথে গলিতে ক্রিকেট খেলতাম। আমাদের দলে সবাই অনেক উৎসাহিত থাকত, এবং যে কোনো ম্যাচে জিতবে এই বিষয়টা নিয়ে খুব আলোচনা করতাম। এমনও হতে পারত যে আমাদের মধ্যে অনেক তনাতনি হত, কিন্তু ম্যাচ শেষ হলে আবার সবাই বন্ধু হয়ে যেতাম। স্কুলে যাওয়ার সময় আমাকে আমাদের বাড়ি থেকে একটা লাল ব্যাগ দিয়ে পাঠানো হত। সেই ব্যাগের মধ্যে থাকত বই, খাতা, এবং একটা ছোট টিফিন বক্স। টিফিনে মা অনেক রকমের খাবার পাঠাতো। কখনো স্যান্ডউইচ, কখনো পরোটা এবং ভিজি ভূনা। টিফিনের সময় বন্ধুদের সাথে মিলে বসে খাবার খেতাম। (ছোট বেলায় ক্রিকেট খেলার উচ্ছ্বাস, স্কুলে যাওয়ার সময়ের লাল ব্যাগ এবং টিফিন খাবারের কথা মনে পড়ে নিজেকে স্মৃতিমগ্ন হয়ে পড়া।)",
  },
  {
    name: "ছোটবেলার অসাধারণ ক্ষণগুলি",
    filePath: "/stories/story_2.pdf",
    content:
      "আমি ছোট বেলায় অনেক দিন বন্ধুদের সাথে খেলা করতাম। স্কুলের পর শেষে, আমরা সবাই যাকে ছোট বাঁশি দিয়ে খেলতে বের হতাম। সকালে উঠে বেশ উত্তেজিত হয়ে স্কুল যেতে হত। (ছোট বেলায় বন্ধুদের সাথে খেলা এবং বাঁশি দিয়ে বের হওয়ার মিথ্যে আনন্দ এবং সকাল উঠে স্কুল যাওয়ার উত্তেজনা।)",
  },
  {
    name: "ছোটবেলার অসাধারণ ক্ষণগুলি",
    filePath: "/stories/story_3.pdf",
    content:
      "আপনার ছোটবেলার স্মৃতিগুলি খুবই সুন্দর এবং অনুভূতিপূর্ণ। এখানে আপনার পাঠ্যটি পরিষ্কারভাবে তুলে ধরা হলো: আমি ছোট বেলায় অনেক দিন বন্ধুদের সাথে খেলা করতাম। স্কুলের পর শেষে, আমরা সবাই যাকে ছোট বাঁশি দিয়ে খেলতে বের হতাম। সকালে উঠে বেশ উত্তেজিত হয়ে স্কুল যেতে হত। (ছোট বেলায় বন্ধুদের সাথে খেলা এবং বাঁশি দিয়ে বের হওয়ার মিথ্যে আনন্দ এবং সকাল উঠে স্কুল যাওয়ার উত্তেজনা।)",
  },
  {
    name: "প্রথম দিনের স্কুলের অভিজ্ঞতা",
    filePath: "/stories/story_4.pdf",
    content:
      "প্রথম দিন স্কুলে গিয়ে অনেক ভয় লাগছিল, কিন্তু বন্ধুরা সবাই খুব ভালো ছিল। তাদের সাথে নতুন বই নিয়ে খেলার মাঝে দিনটা ভালো কাটলো। (প্রথম দিন স্কুলে গিয়ে ভয় পেলেও বন্ধুদের সান্নিধ্য ও নতুন বই নিয়ে খেলার অভিজ্ঞতা দিনটাকে অর্থবহ করে তুলেছে।)",
  },
  {
    name: "গরম দিনের মজার কাহিনী",
    filePath: "/stories/story_5.pdf",
    content:
      "গরম দিনে আমাদের বাড়িতে অনেক মিষ্টি হয়। নদীতে ডুব ভরসা, মাঝে মাঝে বন্ধুদের সাথে বাইক চালাই, এবং কিছু কিছু খেতে যাই। (গরম দিনে নদীতে ডুব ও বন্ধুদের সাথে বাইক চালানোর মতো মজাদার কাজগুলোর বর্ণনা।)",
  },
  {
    name: "প্রাণী প্রেমের অভিজ্ঞতা: আমার পেট ডগ",
    filePath: "/stories/story_6.pdf",
    content:
      "আমি আমার পেট ডগের সাথে দিন কাটাতে অনেক ভালোবাসি। সে আমার সাথে খেলতে অনেক ভালোবাসে, ও আমার বন্ধু হয়ে আছে। (প্রাণী প্রেমিক একজন যেমন তার পেট ডগের সাথে দিন কাটায়, তেমনি সে ডগটিকে তার বন্ধু হিসেবে গণ্য করে। তাদের মধ্যে প্রেম ও আনন্দের সম্পর্ক তৈরি হয়েছে।)",
  },
  {
    name: "বৃষ্টির রাতে বাড়ির শান্তি",
    filePath: "/stories/story_7.pdf",
    content:
      "বৃষ্টির রাতে, আমাদের বাড়িতে বেশ অনেক শান্তি ছিল। বাড়ির চাঁদ তা বৃষ্টির সবুজ পানির মধ্যে খেলতে থাকত। (বৃষ্টির এক রাতে বাড়ির অত্যন্ত শান্তিময় পরিবেশ, যেখানে চাঁদ বৃষ্টির সবুজ পানির মধ্যে খেলছে।)",
  },
  {
    name: "উদ্দীপনাপূর্ণ রাত্ডে উদযাপন",
    filePath: "/stories/story_8.pdf",
    content:
      "আমি আমার বার্থডে-তে অনেক উত্তেজিত ছিলাম। টিফিন-এ চকোলেট কেক, আইসক্রিম, এবং বন্ধুরা আমার সাথে অনেক মজা করেছিল। (বার্থডে-তে চকোলেট কেক এবং আইসক্রিম নিয়ে বন্ধুদের সাথে মজার সময় কাটানো।)",
  },
  {
    name: "মরিচিকা রাতে সমুদ্র সৈকের মনোরম অভিজ্ঞতা",
    filePath: "/stories/story_9.pdf",
    content:
      "মরিচিকা রাতে, আমরা সুন্দর সমুদ্রিক ছুটি কাটলাম। আমাদের সামনে সাদা পদ্ম, সবুজ পানির গলি এবং নীল আকাশ ছিল। (সুন্দর সমুদ্র সৈকতের অভিজ্ঞতা যেখানে সাদা পদ্ম, সবুজ পানির গলি এবং নীল আকাশের মাঝে মরিচিকা রাত কাটানো।)",
  },
  {
    name: "পার্কে খেলার আনন্দ",
    filePath: "/stories/story_10.pdf",
    content:
      "মরিচিকা রাতে, আমরা সুন্দর সমুদ্রিক ছুটি কাটলাম। আমাদের সামনে সাদা পদ্ম, সবুজ পানির গলি এবং নীল আকাশ ছিল। (সুন্দর সমুদ্র সৈকতের অভিজ্ঞতা যেখানে সাদা পদ্ম, সবুজ পানির গলি এবং নীল আকাশের মাঝে মরিচিকা রাত কাটানো।)",
  },
  {
    name: "দাবার মধ্যে অপরিসীম আনন্দ",
    filePath: "/stories/story_11.pdf",
    content:
      "আমি প্রতিদিন অনেক সময় দাবা খেলতে ভালোবাসি। আমার বন্ধুরা ও দাবা খেলার মধ্যে আমি অনেক আনন্দ করি।(লেখক প্রতিদিন দাবা খেলতে ভালোবাসে এবং তার বন্ধুদের সঙ্গে এই খেলার মধ্যে অনেক আনন্দ উপভোগ করে।)",
  },
];

const chat = async (
  userID,
  query,
  setResponse,
  setIsGeneratingResponse,
  setSelectedPdfContent
) => {
  try {
    console.log(query);
    setIsGeneratingResponse(true);
    setResponse((prev) => [...prev, { sender: "bot", text: "typing..." }]);

    const res = await fetch(
      `${API_ENDPOINT}/chat?user_id=${userID}&query=${query}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const parseRes = await res.json();
    if (res.ok) {
      const response = parseRes.response;
      setResponse((prev) => [
        ...prev.slice(0, prev.length - 1),
        { sender: "bot", text: response },
      ]);
    }
  } catch (err) {
    console.error("Error fetching chat response:", err.message);
  } finally {
    setIsGeneratingResponse(false);
    setSelectedPdfContent("");
  }
};

const Chatbot = () => {
  const { userID } = useParams();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "হ্যালো! আমি আপনাকে আজ কীভাবে সাহায্য করতে পারি?" },
  ]);
  const [input, setInput] = useState("");
  const [generatingResponse, setIsGeneratingResponse] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPdfContent, setSelectedPdfContent] = useState("");
  const [selectedPdfName, setSelectedPdfName] = useState(""); // New state to store the selected PDF name

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    chat(
      userID,
      selectedPdfContent + "\n" + input,
      setMessages,
      setIsGeneratingResponse,
      setSelectedPdfContent
    );
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    alert("Voice input activated! (To be implemented)");
  };

  const handleAttachment = () => {
    setOpenModal(true);
  };

  const handlePdfSelect = (pdfName, pdfContent) => {
    setSelectedPdfName(pdfName); // Store the PDF name
    setSelectedPdfContent(pdfContent); // Store the PDF content
    setOpenModal(false); // Close the modal
  };

  const handleDeselectPdf = () => {
    setSelectedPdfName(""); // Reset the selected PDF name
    setSelectedPdfContent(""); // Reset the selected PDF content
  };

  useEffect(() => {
    console.log(selectedPdfContent,selectedPdfName);
  }, [selectedPdfContent, selectedPdfName]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h5"
        sx={{ fontSize: 40, fontWeight: "bold", textAlign: "center", mt: 3 }}
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
          <Box
            sx={{ padding: "16px", backgroundColor: "#1c1c1c", color: "#fff" }}
          >
            <Typography variant="h6">Chatbot</Typography>
          </Box>

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
                  <Typography variant="body1">
                    {msg.sender === "bot" && msg.text === "typing..." ? (
                      <div className="typing">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </Typography>
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
          {/* Display the selected PDF name box */}
          {selectedPdfName && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderBottom: "1px solid #333",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#000",
                  fontSize: "16px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  //marginLeft:5,
                }}
              >
                <AttachFileIcon />
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#000",
                  fontSize: "16px",
                  //overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginLeft: 5,
                }}
              >
                {selectedPdfName}
              </Typography>
              <Box>
                <IconButton
                  color="primary"
                  onClick={handleDeselectPdf}
                  sx={{
                    backgroundColor: "#ff4d4d",
                    color: "#fff",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#ff1a1a",
                    },
                  }}
                >
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    ×
                  </span>
                </IconButton>
              </Box>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #444",
              backgroundColor: "#222",
            }}
          >
            <IconButton
              color="primary"
              onClick={handleAttachment}
              sx={{
                marginRight: "8px",
                backgroundColor: "#1976d2",
                color: "#fff",
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#c26976",
                border: "2px solid black",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#000",
                },
              }}
            >
              <AttachFileIcon />
            </IconButton>

            <VoiceInputComponent setTranslatedText={setInput} />

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
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              sx={{
                backgroundColor: "#76d2ff",
                color: "#fff",
                width: 60,
                height: 60,
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "#1c6bc3",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Modal for PDF selection */}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          style={{ borderRadius: "20px" }}
        >
          <DialogTitle fontFamily={CONTENT} fontWeight="bold" fontSize={30}>
            Select a PDF
          </DialogTitle>
          <DialogContent>
            <List>
              {pdfs.map((pdf, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handlePdfSelect(pdf.name,pdf.content)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#334B71",
                      color: "white",
                    },
                  }}
                >
                  <ListItemText primary={pdf.name} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenModal(false)}
              sx={{
                backgroundColor: "#c0c0c0",
                color: "black",
                borderRadius: "30px",
                padding: 2,
                "&:hover": {
                  color: "white",
                  backgroundColor: "#334B71",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Chatbot;
