import React, { useState } from "react";

import { Typography } from "@mui/material";

// components
import MarkdownEditor from "../Markdown/MarkdownEditor";
import CustomRoundedButton from "../misc/CustomRoundedButton";
import Loading from "../misc/Loading";

import { TITLE_THICK, TITLE, CONTENT } from "../../values/Fonts";

function ContentCreation() {
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div
      style={{
        height: "140vh",
        display: "flex",
        justifyContent: "center",
        padding: 20,
        position: "relative",
      }}
    >

      <MarkdownEditor
        height="50vh"
        width="1000px"
        setIsGeneratingContent={setIsGeneratingContent}
      />

      {/* Loading Spinner */}
      {isGeneratingContent && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
            opacity: 0.7,
            width: "100%",
            height: "100%",
            zIndex: 100,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Loading
            spinnerLogoURL={`${window.location.origin}/logo/banglamate_logo_transparent.png`}
            sprinnerWidth="250px"
            spinnerHeight="250px"
            spinnerImageWidth="200px"
            spinnerImageHeight="200px"
            spinnerColor="#334B71"
            spinnerBackgroundColor="#ebfdff"
          />
        </div>
      )}
    </div>
  );
}

export default ContentCreation;
