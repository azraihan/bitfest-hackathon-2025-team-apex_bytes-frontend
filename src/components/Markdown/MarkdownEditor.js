// src/components/Editor.jsx
import React, { useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { marked } from "marked";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
import CustomRoundedButton from "../misc/CustomRoundedButton";
import "../../styles/fonts/bengali_fonts.css";

// url
import { API_ENDPOINT } from "../../env";

const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;

const generateContent = async (banglish_text) => {
  try {
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
    } else {
    }
  } catch (err) {
    console.error("Error fetching /*...*/", err.message);
  }
};

export default function Editor({ height = "100%", width = "100%" }) {
  const [markdown, setMarkdown] = useState(mdStr);
  const [preview, setPreview] = useState(marked(mdStr));
  const [selectedFont, setSelectedFont] = useState("FontName1");

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
    <div style={{ width: width, height: height, marginBottom: 25 }}>
      {/* Font Selection Dropdown */}
      <Box sx={{ marginBottom: 2 }}>
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
          label="Save Preview"
          backgroundColor="#b0b0b0"
        />
        <CustomRoundedButton
          handleClick={generateContent(markdown)}
          label="Generate Content"
          backgroundColor="#334B71"
          textColor="white"
        />
      </div>
    </div>
  );
}
