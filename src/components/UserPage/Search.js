import React, { useState } from "react";
import { TextField, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { FaBookOpen } from "react-icons/fa";

import { TITLE_THICK, TITLE, CONTENT } from "../../values/Fonts";

// Sample PDFs array (moved from ContentCreation)
const pdfs = [
  { name: "আমার ছোট বেলার স্মৃতিচারণ", filePath: "/stories/story_1.pdf" },
  { name: "ছোটবেলার অসাধারণ ক্ষণগুলি", filePath: "/stories/story_2.pdf" },
  { name: "ছোটবেলার অসাধারণ ক্ষণগুলি", filePath: "/stories/story_3.pdf" },
  { name: "প্রথম দিনের স্কুলের অভিজ্ঞতা", filePath: "/stories/story_4.pdf" },
  { name: "গরম দিনের মজার কাহিনী", filePath: "/stories/story_5.pdf" },
  { name: "প্রাণী প্রেমের অভিজ্ঞতা: আমার পেট ডগ", filePath: "/stories/story_6.pdf" },
  { name: "বৃষ্টির রাতে বাড়ির শান্তি", filePath: "/stories/story_7.pdf" },
  { name: "উদ্দীপনাপূর্ণ রাত্ডে উদযাপন", filePath: "/stories/story_8.pdf" },
  { name: "মরিচিকা রাতে সমুদ্র সৈকের মনোরম অভিজ্ঞতা", filePath: "/stories/story_9.pdf" },
  { name: "পার্কে খেলার আনন্দ", filePath: "/stories/story_10.pdf" },
  { name: "দাবার মধ্যে অপরিসীম আনন্দ", filePath: "/stories/story_11.pdf" },
];

const getRandomGradient = () => {
  const gradients = [
    "linear-gradient(45deg, #FF5733, #FFB74D)",
    "linear-gradient(45deg, #33FF57, #33A1FF)",
    "linear-gradient(45deg, #F2C0FB, #FF5733)",
    "linear-gradient(45deg, #FFB74D, #F2C0FB)",
    "linear-gradient(45deg, #FF69B4, #32CD32)",
    "linear-gradient(45deg, #FFD700, #FF6347)"
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const openModal = (pdf) => {
    setSelectedPdf(pdf);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdf(null);
  };

  return (
    <div>
      <TextField
        variant="outlined"
        placeholder="Search..."
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          marginTop: 10,
          borderRadius: "25px", // Rounded edges
          "& .MuiOutlinedInput-root": {
            borderRadius: "25px", // Apply rounded corners to the input field
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray", // Optional: Customize the border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "blue", // Border color on hover
          },
        }}
      />

      {/* Title above the grid */}
      <Typography
        style={{
          textAlign: "center",
          fontSize: "2em",
          marginTop: "20px",
          color: "#333", // Set title color
          marginTop: 50,
          marginBottom: 50,
          fontFamily: CONTENT,
          fontSize: 60,
          fontWeight: 'bold'
        }}
      >
        Your Stories <FaBookOpen />
      </Typography>

      {/* Grid of PDF Cards with added spacing around it */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          width: "100%",
          marginTop: "20px",
          marginLeft: "30px", // Added left margin for spacing
          marginRight: "30px", // Added right margin for spacing
          marginBottom: "30px", // Added bottom margin for spacing
        }}
      >
        {pdfs.map((pdf, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px", // Slightly smaller border radius for smaller cards
              padding: "10px", // Reduced padding for smaller cards
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              background: getRandomGradient(), // Gradient background
              color: "#fff", // White text to contrast with background color
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "200px", // Reduced height for smaller cards
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              textDecoration: "none", // Remove underline from text on hover
            }}
            onClick={() => openModal(pdf)}
          >
            <div
              style={{
                height: "120px", // Smaller image area
                width: "120px", // Smaller image area
                background: `url('/pdf-preview.png') center/cover no-repeat`, // Add a default PDF preview image or use a dynamic one
                margin: "0 auto",
                borderRadius: "8px", // Optional: Add rounded corners to the preview image
              }}
            />
            <h3
              style={{
                marginTop: "10px", // Space between image and text
                fontSize: "1em", // Slightly smaller font size
                fontWeight: "bold", // Bold text
                textAlign: "center", // Ensure text is centered
              }}
            >
              {pdf.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Modal for Viewing PDF */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 200,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              height: "80%",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside it
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                padding: "10px",
                backgroundColor: "#334B71",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
            <iframe
              src={selectedPdf.filePath}
              width="100%"
              height="100%"
              style={{
                border: "none",
                borderRadius: "8px",
              }}
              title="PDF Viewer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
