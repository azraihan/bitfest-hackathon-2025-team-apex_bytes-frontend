import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        borderRadius: '25px', // Rounded edges
        '& .MuiOutlinedInput-root': {
          borderRadius: '25px', // Apply rounded corners to the input field
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'gray', // Optional: Customize the border color
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'blue', // Border color on hover
        },
      }}
    />
  );
};

export default SearchBar;
