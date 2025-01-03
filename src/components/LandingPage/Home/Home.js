import React, { useEffect } from "react";

//MUI
import { Box } from "@mui/material";

//import components
import ImageSlideShow from "../utils/ImageSlideShow";
import Description from "../utils/Description";

//slideshow image array and website descriptions array
import { images, descriptions } from "./home_contents";

function Home() {
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
      </Box>
    </>
  );
}

export default Home;
