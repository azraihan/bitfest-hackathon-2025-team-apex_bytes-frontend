import React, { useEffect } from "react";

//MUI
import { Box } from "@mui/material";

//components
import ImageSlideShow from "../utils/ImageSlideShow";
import Description from "../utils/Description";
import LoginRegisterView from "../Authentication/LoginRegisterView";


//slideshow image array and website descriptions array
import {images, descriptions} from './section_1_constants'

function Parents({ setAuth, setUserType, setUserID, setIsLoading }) {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  return (
    <>
      <ImageSlideShow images={images} height="500px" />{" "}
      {/** images= array of images, height= height of the slideshow box */}
      <Box sx={{ p: 10, backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
        {" "}
        {/**p= padding (for sx props) */}
        <Description descriptions={descriptions} />{" "}
        {/** descriptions= array of descriptions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "60vh", // Full viewport height
            marginTop: 6,
          }}
        >
          <img src={`${window.location.origin}/Parentpage/login.gif`}/>
          <LoginRegisterView
            setAuth={setAuth}
            setUserType={setUserType}
            setUserID={setUserID}
            setIsLoading={setIsLoading}
            type={"parents"}
          />
        </Box>
      </Box>
    </>
  );
}

export default Parents;
