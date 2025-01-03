import React from "react";


//MUI
import { Button } from "@mui/material";


function CustomRoundedButton({handleClick, textColor="black", textColorOnHover="white", backgroundColor="#f0f0f0", backgroundColorOnHover="black", borderRadius="30px", label, disabled=false}){
    return(
        <Button variant="contained" color="primary" disabled={disabled} onClick={handleClick} sx={{
            backgroundColor: backgroundColor, // Button background color
            color: textColor, //text color
            borderRadius: borderRadius,
            
            '&:hover': {
              backgroundColor: backgroundColorOnHover, // Button hover background color
              color:textColorOnHover  //text color on hover
            },
          }}>
            <div style={{fontWeight:'bold'}}>{label}</div>
          </Button>
    );
}

export default CustomRoundedButton;