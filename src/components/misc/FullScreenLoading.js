import React from "react";

//components
import Loading from "./Loading";

function FullScreenLoading() {
  return (
    <div
      onClick={(e)=> e.stopPropagation()}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Loading
        spinnerLogoURL={`${window.location.origin}/logo/banglamate_logo_transparent.png`}
        sprinnerWidth="350px"
        spinnerHeight="350px"
        spinnerImageWidth="300px"
        spinnerImageHeight="300px"
        spinnerColor="#334B71"
        spinnerBackgroundColor="#ebfdff"
      />
    </div>
  );
}

export default FullScreenLoading;
