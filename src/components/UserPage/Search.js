import React, { useState } from "react";
import { TextField, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FaBookOpen } from "react-icons/fa";
import { TITLE_THICK, TITLE, CONTENT } from "../../values/Fonts";

import VoiceInputComponent from '../VoiceInputComponent/VoiceInputComponent'

// Sample PDFs array (moved from ContentCreation)
const pdfs = [
  { name: "আমার ছোট বেলার স্মৃতিচারণ", filePath: "/stories/story_1.pdf", content: "আমার ছোট বেলা আমি ছোট বেলায় অনেক মজার মজার খেলা করতাম। সকালেই উঠে আমার বন্ধুদের সাথে গলিতে ক্রিকেট খেলতাম। আমাদের দলে সবাই অনেক উৎসাহিত থাকত, এবং যে কোনো ম্যাচে জিতবে এই বিষয়টা নিয়ে খুব আলোচনা করতাম। এমনও হতে পারত যে আমাদের মধ্যে অনেক তনাতনি হত, কিন্তু ম্যাচ শেষ হলে আবার সবাই বন্ধু হয়ে যেতাম। স্কুলে যাওয়ার সময় আমাকে আমাদের বাড়ি থেকে একটা লাল ব্যাগ দিয়ে পাঠানো হত। সেই ব্যাগের মধ্যে থাকত বই, খাতা, এবং একটা ছোট টিফিন বক্স। টিফিনে মা অনেক রকমের খাবার পাঠাতো। কখনো স্যান্ডউইচ, কখনো পরোটা এবং ভিজি ভূনা। টিফিনের সময় বন্ধুদের সাথে মিলে বসে খাবার খেতাম। (ছোট বেলায় ক্রিকেট খেলার উচ্ছ্বাস, স্কুলে যাওয়ার সময়ের লাল ব্যাগ এবং টিফিন খাবারের কথা মনে পড়ে নিজেকে স্মৃতিমগ্ন হয়ে পড়া।)" },
  { name: "ছোটবেলার অসাধারণ ক্ষণগুলি", filePath: "/stories/story_2.pdf", content: "আমি ছোট বেলায় অনেক দিন বন্ধুদের সাথে খেলা করতাম। স্কুলের পর শেষে, আমরা সবাই যাকে ছোট বাঁশি দিয়ে খেলতে বের হতাম। সকালে উঠে বেশ উত্তেজিত হয়ে স্কুল যেতে হত। (ছোট বেলায় বন্ধুদের সাথে খেলা এবং বাঁশি দিয়ে বের হওয়ার মিথ্যে আনন্দ এবং সকাল উঠে স্কুল যাওয়ার উত্তেজনা।)"},
  { name: "ছোটবেলার অসাধারণ ক্ষণগুলি", filePath: "/stories/story_3.pdf", content: "আপনার ছোটবেলার স্মৃতিগুলি খুবই সুন্দর এবং অনুভূতিপূর্ণ। এখানে আপনার পাঠ্যটি পরিষ্কারভাবে তুলে ধরা হলো: আমি ছোট বেলায় অনেক দিন বন্ধুদের সাথে খেলা করতাম। স্কুলের পর শেষে, আমরা সবাই যাকে ছোট বাঁশি দিয়ে খেলতে বের হতাম। সকালে উঠে বেশ উত্তেজিত হয়ে স্কুল যেতে হত। (ছোট বেলায় বন্ধুদের সাথে খেলা এবং বাঁশি দিয়ে বের হওয়ার মিথ্যে আনন্দ এবং সকাল উঠে স্কুল যাওয়ার উত্তেজনা।)" },
  { name: "প্রথম দিনের স্কুলের অভিজ্ঞতা", filePath: "/stories/story_4.pdf", content: "প্রথম দিন স্কুলে গিয়ে অনেক ভয় লাগছিল, কিন্তু বন্ধুরা সবাই খুব ভালো ছিল। তাদের সাথে নতুন বই নিয়ে খেলার মাঝে দিনটা ভালো কাটলো। (প্রথম দিন স্কুলে গিয়ে ভয় পেলেও বন্ধুদের সান্নিধ্য ও নতুন বই নিয়ে খেলার অভিজ্ঞতা দিনটাকে অর্থবহ করে তুলেছে।)" },
  { name: "গরম দিনের মজার কাহিনী", filePath: "/stories/story_5.pdf", content: "গরম দিনে আমাদের বাড়িতে অনেক মিষ্টি হয়। নদীতে ডুব ভরসা, মাঝে মাঝে বন্ধুদের সাথে বাইক চালাই, এবং কিছু কিছু খেতে যাই। (গরম দিনে নদীতে ডুব ও বন্ধুদের সাথে বাইক চালানোর মতো মজাদার কাজগুলোর বর্ণনা।)" },
  { name: "প্রাণী প্রেমের অভিজ্ঞতা: আমার পেট ডগ", filePath: "/stories/story_6.pdf", content: "আমি আমার পেট ডগের সাথে দিন কাটাতে অনেক ভালোবাসি। সে আমার সাথে খেলতে অনেক ভালোবাসে, ও আমার বন্ধু হয়ে আছে। (প্রাণী প্রেমিক একজন যেমন তার পেট ডগের সাথে দিন কাটায়, তেমনি সে ডগটিকে তার বন্ধু হিসেবে গণ্য করে। তাদের মধ্যে প্রেম ও আনন্দের সম্পর্ক তৈরি হয়েছে।)" },
  { name: "বৃষ্টির রাতে বাড়ির শান্তি", filePath: "/stories/story_7.pdf", content:"বৃষ্টির রাতে, আমাদের বাড়িতে বেশ অনেক শান্তি ছিল। বাড়ির চাঁদ তা বৃষ্টির সবুজ পানির মধ্যে খেলতে থাকত। (বৃষ্টির এক রাতে বাড়ির অত্যন্ত শান্তিময় পরিবেশ, যেখানে চাঁদ বৃষ্টির সবুজ পানির মধ্যে খেলছে।)" },
  { name: "উদ্দীপনাপূর্ণ রাত্ডে উদযাপন", filePath: "/stories/story_8.pdf", content: "আমি আমার বার্থডে-তে অনেক উত্তেজিত ছিলাম। টিফিন-এ চকোলেট কেক, আইসক্রিম, এবং বন্ধুরা আমার সাথে অনেক মজা করেছিল। (বার্থডে-তে চকোলেট কেক এবং আইসক্রিম নিয়ে বন্ধুদের সাথে মজার সময় কাটানো।)"},
  { name: "মরিচিকা রাতে সমুদ্র সৈকের মনোরম অভিজ্ঞতা", filePath: "/stories/story_9.pdf", content: "মরিচিকা রাতে, আমরা সুন্দর সমুদ্রিক ছুটি কাটলাম। আমাদের সামনে সাদা পদ্ম, সবুজ পানির গলি এবং নীল আকাশ ছিল। (সুন্দর সমুদ্র সৈকতের অভিজ্ঞতা যেখানে সাদা পদ্ম, সবুজ পানির গলি এবং নীল আকাশের মাঝে মরিচিকা রাত কাটানো।)"},
  { name: "পার্কে খেলার আনন্দ", filePath: "/stories/story_10.pdf", content: "মরিচিকা রাতে, আমরা সুন্দর সমুদ্রিক ছুটি কাটলাম। আমাদের সামনে সাদা পদ্ম, সবুজ পানির গলি এবং নীল আকাশ ছিল। (সুন্দর সমুদ্র সৈকতের অভিজ্ঞতা যেখানে সাদা পদ্ম, সবুজ পানির গলি এবং নীল আকাশের মাঝে মরিচিকা রাত কাটানো।)"},
  { name: "দাবার মধ্যে অপরিসীম আনন্দ", filePath: "/stories/story_11.pdf", content: "আমি প্রতিদিন অনেক সময় দাবা খেলতে ভালোবাসি। আমার বন্ধুরা ও দাবা খেলার মধ্যে আমি অনেক আনন্দ করি।(লেখক প্রতিদিন দাবা খেলতে ভালোবাসে এবং তার বন্ধুদের সঙ্গে এই খেলার মধ্যে অনেক আনন্দ উপভোগ করে।)"},
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
  const [searchText, setSearchText] = useState(""); // State for the search text

  const openModal = (pdf) => {
    setSelectedPdf(pdf);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdf(null);
  };

  // Filter the PDFs based on search text
  const filteredPdfs = pdfs.filter((pdf) =>
    pdf.content.includes(searchText) // Match the search text with content
  );

  return (
    <div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop:20}}>
        <VoiceInputComponent setTranslatedText={setSearchText}/>
      </div>
      <TextField
        variant="outlined"
        placeholder="Search..."
        fullWidth
        value={searchText} // Bind the search text to the state
        onChange={(e) => setSearchText(e.target.value)} // Update the state on text change
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
          fontFamily: TITLE_THICK,
        }}
      >
        Read Your Stories
      </Typography>

      {/* Display filtered PDFs in grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: 40,
          marginBottom: 50,
        }}
      >
        {filteredPdfs.map((pdf) => (
          <div
            key={pdf.name}
            onClick={() => openModal(pdf)}
            style={{
              cursor: "pointer",
              background: getRandomGradient(),
              padding: "10px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: 'center',
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              height: '200px'
            }}
          >
            <FaBookOpen
              style={{ fontSize: "40px", color: "#fff", marginBottom: "10px" }}
            />
            <Typography
              variant="h6"
              style={{
                color: "#fff",
                fontFamily: TITLE,
                textAlign: "center",
                fontSize: "1.2rem",
              }}
            >
              {pdf.name}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
