import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

//MUI
import { Box } from "@mui/system";
import { Avatar } from "@mui/material";

//components
import Navbar from "../../components/misc/Navbar";
import Footer from "../../components/misc/Footer";

//components (Pages)
// import ChatBotPage from "../components/ChatBot/ChatBotPage";
// import ExploreProjectsPage from "../components/ExploreProjectsPage/ExploreProjectsPage";
// import KidsProfilePage from "../components/KidsProfilePage/KidsProfilePage";
// import ProfilePage from "../components/KidsProfilePage/ProfilePage";
// import ProjectInfoPage from "../components/ProjectInfoPage/ProjectInfoPage";
// import CodeEditorPage from "../components/CodeEditorPage/CodeEditorPage";
// import YourProjectsPage from "../components/YourProjectsPage/YourProjectsPage";
// import ProblemsPage from "../components/ProblemsPage/ProblemsPage";

// import ConnectWithParent from "../components/ConnectWithParent/ConnectWithParent";

import Translation from "../../components/UserPage/Translation";
import ContentCreation from "../../components/UserPage/ContentCreation";
import Search from "../../components/UserPage/Search";
import Chatbot from "../../components/UserPage/Chatbot";
import Analytics from "../../components/UserPage/Analytics";


import FullScreenLoading from "../../components/misc/FullScreenLoading";
import Loading from "../../components/misc/Loading";

//icons
import { MdLandscape } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";

//values
import {
  bottomText,
  email,
  phone,
  footerBackgroundColor,
  footerTextColor,
} from "../../values/Footer";

// menuItem, paths (for the navbar), logo (for the appbar/navbar), deafault path, quicklinks constants
import {
  menuItem,
  paths,
  appBarLogoSrc,
  defaultPathName,
  quickLinks,
} from "./UserPage_constants";

function UserPage({ setAuth, setUserType }) {
  const [isLoading, setIsLoading] = useState(true);

  //handling loading during creating, updating, and cloning project
  const [loadingScreen, setLoadingScreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <div style={{ position: "relative" }}>
      <Navbar
        paths={paths} //array of paths that correspond to the buttons in the appbar
        appBarLogoSrc={appBarLogoSrc} //imag src of the logo
        defaultPathName={defaultPathName} //pathname corresponding to '/'
        appBarBackgroundColor="#e0e0e0"
        buttonTextColor="#000"
        buttonTextColorOnActive="#fff"
        buttonBackgroundColor="transparent"
        buttonBackgroundColorOnActive="#334B71"
        buttonBorderRadius="30px"
        activeButtonColorOnHover="#2a3950"
        inactiveButtonBackgroundColorOnHover="#90D1DB"
        inactiveButtonColorOnHover="black"
        menuItem={menuItem}
        sideBarIconColor="#fff"
        sideBarIconBackGroundColor= "#334B71"
        // sideBarIconColorOnHover="white"
        // sideBarIconBackGroundColorOnhover="black"
        sideBarColor="#fcfbe6"
        // sideBarItemColor="black"
        // sideBarItemColorOnHover="white"
        sideBarItemBackgroundColorOnHover="#334B71"
        notificationsIconColor="white"
        notificationsBackgroundColor="#334B71"
        notificationsIconColorOnHover="yellow"
        notificationsBackgroundColorOnHover="black"
        parentPath="kids"
        setAuth={setAuth}
        setUserType={setUserType}
      />
      {/* These values aren't used that much in other places of the application. So no need to localize these in the 'values' folder 
                Also this navbar will be used in the KidsPage, ParentsPage, and AdminPage. So, without localizing the styles, option have been kept to make those styles different for those Navbars */}

      {/* <Box sx={{height:'100vh'}}>

                </Box> */}

      <Box sx={{ pt: 10 }}>
        {" "}
        {/* pt for padding-top */}
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="/" element={<Navigate to="./translation" replace />} />
            <Route
              path="/translation"
              element={<Translation />}
            />
            <Route
              path="/contentCreation"
              element={<ContentCreation />}
            />
            <Route
              path="/search"
              element={<Search />}
            />
            <Route
              path="/chatbot"
              element={<Chatbot />}
            />
            <Route
              path="/analytics"
              element={<Analytics />}
            />
          </Route>
        </Routes>
      </Box>

      <Footer
        quickLinks={quickLinks} //all the names are self-explanatory
        bottomText={bottomText}
        email={email}
        phone={phone}
        backgroundColor={footerBackgroundColor}
        textColor={footerTextColor} //text color is the color of all the texts and icons. You can customize it if you want
      />
      {loadingScreen && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            //alignItems: "center",
            backgroundColor: "#edffe8",
            opacity: 0.8,
            padding: 230,
            zIndex: 2000,
          }}
        >
          <Loading
            spinnerLogoURL={`${window.location.origin}/path/to/logo`}
            sprinnerWidth="350px"
            spinnerHeight="350px"
            spinnerImageWidth="300px"
            spinnerImageHeight="300px"
            spinnerColor="#334B71"
            spinnerBackgroundColor="#ebfdff"
          />
        </div>
      )}
    </div>
  );
}

export default UserPage;
