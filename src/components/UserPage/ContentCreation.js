import React from "react";

// components
import MarkdownEditor from "../Markdown/MarkdownEditor";
import CustomRoundedButton from "../misc/CustomRoundedButton";






function ContentCreation() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        //alignItems: "center",
        padding: 20,
      }}
    >
      <MarkdownEditor height="50vh" width="1000px" />
    </div>
  );
}

export default ContentCreation;
