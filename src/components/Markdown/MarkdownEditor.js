import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { marked } from "marked";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import CustomRoundedButton from "../misc/CustomRoundedButton";
import "../../styles/fonts/bengali_fonts.css";
import supabase from "../UserPage/utils/supabaseClient"; // Import supabase client

import { TITLE_THICK, TITLE, CONTENT } from "../../values/Fonts";

import VoiceInputComponent from "../VoiceInputComponent/VoiceInputComponent";

// url
import { API_ENDPOINT } from "../../env";

import { BiSolidBookContent } from "react-icons/bi";

const mdStr = `# ছোটবেলার অসাধারণ ক্ষণগুলি   \n## prakritik shoundorjo  \n###### গরম দিনের মজার কাহিনী`;

const generateContent = async (
  banglish_text,
  setPreview,
  setIsGeneratingContent,
  setPdfTitle
) => {
  try {
    setIsGeneratingContent(true);
    const res = await fetch(`${API_ENDPOINT}/content/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //'token': localStorage.token
      },
      body: JSON.stringify({
        title: "string",
        banglish_text: banglish_text,
        bangla_text: "string",
        visibility: "private",
        selected_font: "string",
      }),
    });

    const parseRes = await res.json();

    if (res.ok) {
      const title = parseRes.title;
      const bangla_text = parseRes.bangla_text;
      const caption = parseRes.caption;

      setPdfTitle(title);

      const pdf_content = `# ${title}\n${bangla_text}\n##### ${caption}`;

      console.log(pdf_content);

      setPreview(marked(pdf_content));
    }
  } catch (err) {
    console.error("Error fetching /*...*/", err.message);
  } finally {
    setIsGeneratingContent(false);
  }
};

const savePDFToSupabase = async (id, title, setIsGeneratingContent) => {
  try {
    setIsGeneratingContent(true);
    const previewDiv = document.getElementById("markdown-preview");
    if (previewDiv) {
      const canvas = await html2canvas(previewDiv, { useCORS: true, scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Generate PDF file
      const pdfBlob = pdf.output("blob");

      // URL encode the file path to avoid issues with special characters
      const encodedTitle = encodeURIComponent(title);
      const encodedId = encodeURIComponent(id);

      // Upload the PDF file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("bitfest_hackathon_2025_file_storage")
        .upload(`stories/${id}/story_11.pdf`, pdfBlob, {
          contentType: "application/pdf",
          upsert: true, // If the file exists, it will overwrite
        });

      if (error) {
        console.error("Error uploading PDF:", error.message);
      } else {
        console.log("PDF uploaded successfully", data);
      }
    }
  } catch (err) {
    console.log("Error:", err);
  } finally {
    setIsGeneratingContent(false);
  }
};

export default function Editor({
  height = "100%",
  width = "100%",
  setIsGeneratingContent,
}) {
  const { userID } = useParams();

  const [markdown, setMarkdown] = useState(mdStr);
  const [preview, setPreview] = useState(marked(mdStr));
  const [selectedFont, setSelectedFont] = useState("FontName1");
  const [pdfTitle, setPdfTitle] = useState();

  const handleMarkdownChange = (value) => {
    setMarkdown(value);
    setPreview(marked(value));
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const saveAsPDF = async () => {
    const previewDiv = document.getElementById("markdown-preview");
    if (previewDiv) {
      const canvas = await html2canvas(previewDiv, { useCORS: true, scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("preview.pdf");
    }
  };

  const availableFonts = [
    { name: "AnekBangla", label: "Anek Bangla" },
    { name: "BalooDa2", label: "BalooDa 2" },
    { name: "Galada", label: "Galada" },
    { name: "HindiSiliguri", label: "Hindi Siliguri" },
    { name: "NotoSansBengali", label: "Noto Sans Bengali" },
    { name: "NotoSerifBengali", label: "Noto Serif Bengali" },
    { name: "TiroBangla", label: "Tiro Bangla" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h5"
        sx={{
          fontSize: 40,
          fontWeight: "bold",
          fontFamily: CONTENT,
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        Content Generation <BiSolidBookContent />
      </Typography>
      <div style={{ width: width, height: height, marginBottom: 25 }}>
        {/* Font Selection Dropdown */}
        <Box sx={{ marginBottom: 2 , display: 'flex', justifyContent: 'space-between'}}>
          <div style={{ width: "30%" }}>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ borderRadius: "8px" }}
            >
              <InputLabel id="font-select-label">Select Font</InputLabel>
              <Select
                labelId="font-select-label"
                id="font-select"
                value={selectedFont}
                onChange={handleFontChange}
                label="Select Font"
                sx={{
                  bgcolor: "#f0f0f0",
                  borderRadius: "30px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "30px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "darkgray",
                  },
                }}
              >
                {availableFonts.map((font) => (
                  <MenuItem
                    key={font.name}
                    value={font.name}
                    sx={{
                      "&:hover": {
                        bgcolor: "black",
                        color: "white",
                      },
                      "&.Mui-selected": {
                        bgcolor: "darkgray",
                        color: "black",
                        "&:hover": {
                          bgcolor: "darkgray",
                          color: "black",
                        },
                      },
                    }}
                  >
                    {font.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <VoiceInputComponent setTranslatedText={setMarkdown}/> 
        </Box>

        {/* Markdown Editor */}
        <MarkdownEditor
          value={markdown}
          height={height}
          onChange={(value) => handleMarkdownChange(value)}
        />

        {/* Markdown Preview */}
        <div
          id="markdown-preview"
          style={{
            marginTop: 20,
            padding: 10,
            border: "1px solid #ddd",
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: preview }}
            style={{
              backgroundColor: "#f9f9f9",
              padding: "10px",
              borderRadius: "5px",
              fontFamily: selectedFont,
            }}
          />
        </div>

        {/* Save as PDF Button */}
        <div
          style={{
            marginTop: 20,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CustomRoundedButton
            handleClick={saveAsPDF}
            label="Download Preview"
            backgroundColor="#b0b0b0"
          />
          <CustomRoundedButton
            handleClick={() =>
              generateContent(
                markdown,
                setPreview,
                setIsGeneratingContent,
                setPdfTitle
              )
            }
            label="Generate Content"
            backgroundColor="#334B71"
            textColor="white"
          />
          <CustomRoundedButton
            handleClick={() =>
              savePDFToSupabase(userID, pdfTitle, setIsGeneratingContent)
            }
            label="Save PDF"
            backgroundColor="#2d7d8b"
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
}
