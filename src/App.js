import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// components (pages)
import LandingPage from "./pages/LandingPage";
import UserPage from './pages/UserPage/UserPage'

// utliity components
import FullScreenLoading from "./components/misc/FullScreenLoading";
import Loading from "./components/misc/Loading";

// url
import { API_ENDPOINT } from "./env";

function App() {
  const [auth, setAuth] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userID, setUserID] = useState(null);

  const checkAuthenticated = async () => {
    if(!localStorage.token) return;
    const token = localStorage.token;
    try {
      const res = await fetch(`${API_ENDPOINT}/verify-token?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // token: localStorage.token,
        },
        // body: JSON.stringify({
        //   /*request body*/
        // }),
      });

      const parseRes = await res.json();

      if (res.ok) {
        console.log(parseRes)
        if (parseRes.valid === true) {
          setAuth(true);
          setUserType("user");
          // set more logic if needed
        } else {
          setAuth(false);
          setUserType(null);
          // set more logic if needed
        }
      } else {
        setAuth(false);
        setUserType(null);
        // set more logic if needed
      }
    } catch (err) {
      console.error("Error fetching /*...*/", err.message);
      setAuth(false);
      setUserType(null);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  if (auth === null) {
    return <FullScreenLoading />;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              !auth ? (
                <Navigate to="/landingPage" replace />  // Add more logic if necessary
              ) : !auth && userType === "user" ? (
                <Navigate to="/user/:userID" replace />
              ) : (
                <FullScreenLoading />
              )
            }
          />
          <Route
            exact
            path="/landingPage/*"
            element={
              !auth ? (
                <LandingPage
                  setAuth={setAuth}                   // Add more logic if necessary
                  setUserType={setUserType}
                  setUserID={setUserID}
                />
              ) : (
                <Navigate to="/user/:userID" replace />
              )
            }
          />
          <Route
            exact
            path="/user/:userID/*"
            element={
              auth && userType === "user" ? (          // Add more logic if necessary
                <UserPage setAuth={setAuth} setUserType={setUserType}/>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/* Add more routes if necessary */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
