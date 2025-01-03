import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//MUI
import { Grid, Typography } from "@mui/material";

//components
import CustomRoundedTextField from "../../misc/CustomRoundedTextField";
import CustomRoundedButton from "../../misc/CustomRoundedButton";

//color/attribute/font values
import {
  colorOnFocus,
  borderRadius,
  backgroundColor,
} from "../../../values/TextField";
import {
  textColorOnHover,
  textColor,
  buttonBackgroundColor,
  buttonBackgroundColorOnHover,
  buttonBorderRadius,
} from "../../../values/Button";
import { TITLE_THICK, TITLE, CONTENT } from "../../../values/Fonts";

//env values
// import { USER_SERVICE_URI, PARENT_SERVICE_URI } from "../../../env";
import { API_ENDPOINT } from "../../../env";
import { setISODay } from "date-fns";

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function Register({ setAuth, setUserType, setUserID, setIsLoading, type }) {
  ///Handling the inputs together. May be handled separately too
  /////////////
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, password, confirmPassword } = inputs;
  const handleInputChange = (e) => {
    //you may put a bracket around e. Can be renamed to anything else too
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  ///////////

  const navigate = useNavigate();

  function generateRandomNumber() {
    return Math.floor(Math.random() * 11) + 1;
  }

  const handleRegisterClick = async () => {
    if (username === "" || email === "" || password === "") {
      setShowMessage(true);
      setMessage("No fields can be empty");
      return;
    } else if (!isValidEmail(email)) {
      setShowMessage(true);
      setMessage("Please enter a valid email address");
      return;
    } else if (password.length < 6) {
      setShowMessage(true);
      setMessage("Passwords must have at least 6 characters");
      return;
    } else if (password !== confirmPassword) {
      setShowMessage(true);
      setMessage("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);

      let res;
      res = await fetch(`${API_ENDPOINT}/api/v1/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //'token': localStorage.token
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const parseRes = await res.json();

      if (res.ok) {
        console.log(parseRes);
        setAuth(true)
        localStorage.setItem("token", parseRes.access_token);
        const userID = parseRes.user_id;
        setUserType("user")
        navigate(`/user/${userID}`, { replace: true });
      } else {
      }
    } catch (err) {
      console.error("Error registering: ", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={1} alignItems="center" width="80%">
        <Grid item xs={12} md={12}>
          <CustomRoundedTextField
            label="Username"
            name="username"
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            colorOnFocus={colorOnFocus}
            handleInputChange={handleInputChange}
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomRoundedTextField
            label="Email"
            name="email"
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            colorOnFocus={colorOnFocus}
            handleInputChange={handleInputChange}
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomRoundedTextField
            label="Password"
            name="password"
            type="password"
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            colorOnFocus={colorOnFocus}
            handleInputChange={handleInputChange}
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomRoundedTextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            colorOnFocus={colorOnFocus}
            handleInputChange={handleInputChange}
            required={true}
          />
        </Grid>
        {showMessage && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Typography sx={{ color: "red", fontFamily: CONTENT }}>
              {message}
            </Typography>
          </div>
        )}
      </Grid>

      <CustomRoundedButton
        textColor={textColor}
        textColorOnHover={textColorOnHover}
        backgroundColor={buttonBackgroundColor}
        backgroundColorOnHover={buttonBackgroundColorOnHover}
        borderRadius={buttonBorderRadius}
        label="Register"
        handleClick={handleRegisterClick}
      />
    </div>
  );
}

export default Register;
