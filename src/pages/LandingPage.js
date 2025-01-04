import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

//import components
import AppBar from "../components/LandingPage/utils/AppBar";
import Home from "../components/LandingPage/Home/Home";
import Section_1 from "../components/LandingPage/Section_1/Section_1";
import GetStarted from "../components/LandingPage/GetStarted/GetStarted";
import Footer from "../components/misc/Footer";
import FullScreenLoading from "../components/misc/FullScreenLoading";

//values (for footer)
import {
  bottomText,
  email,
  phone,
  footerBackgroundColor,
  footerTextColor,
} from "../values/Footer";
import { useState } from "react";

function LandingPage({ setAuth, setUserType, setUserID }) {
  const paths = [
    "/",
    //"/about",
    // "/section_1",
    // "/kids",
    "/getStarted",
  ]; //always write the paths in camelcase
  const appBarLogoSrc = "/logo/banglamate_logo_transparent.png";
  const defaultPathName = "Home";

  //for footer
  const quickLinks = [
    //"About",
    // "Section_1",
    //"Kids",
    "Get Started",
  ];

  //to handle loading after login or reg
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <>
      <AppBar
        paths={paths} //array of paths that correspond to the buttons in the appbar. Always keep the paths in camelcase
        appBarLogoSrc={appBarLogoSrc} //imag src of the logo
        defaultPathName={defaultPathName} //pathname corresponding to '/'
        appBarBackgroundColor="#e0e0e0"
        buttonTextColor="#000"
        buttonTextColorOnActive="#fff"
        buttonBackgroundColor="transparent"
        buttonBackgroundColorOnActive="#334B71"
        buttonBorderRadius="30px"
        activeButtonColorOnHover="#2a3950"
        inactiveButtonBackgroundColorOnHover="#90D1DB" //the other names are self explanatory
        parentPath={`landingPage`}
      />

      {/**these values aren't used that much in other places of the application. So no need to localize these in the 'values' folder*/}

      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route
            path="/section_1"
            element={
              <Section_1
                setAuth={setAuth}
                setUserType={setUserType}
                setUserID={setUserID}
                setIsLoading={setIsLoading}
              />
            }
          /> */}
          {/* <Route path="/kids" element={<Kids />} /> */}
          <Route
            exact
            path="getStarted"
            element={
              <GetStarted
                setAuth={setAuth}
                setUserType={setUserType}
                setUserID={setUserID}
                setIsLoading={setIsLoading}
              />
            }
          />
        </Route>
      </Routes>

      <Footer
        quickLinks={quickLinks} //all the names are self-explanatory
        bottomText={bottomText}
        email={email}
        phone={phone}
        backgroundColor={footerBackgroundColor}
        textColor={footerTextColor} //text color is the color of all the texts and icons. You can customize it if you want
      />
    </>
  );
}

export default LandingPage;
