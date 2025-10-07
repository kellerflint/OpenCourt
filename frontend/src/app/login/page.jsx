import React from "react";
import { FormControl, InputLabel, Input, Button, TextField, Box } from "@mui/material";

//setting up effects


//functions


export default function LoginPage() {
  return (
    <Box
      componet="form"
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
        />
      </div>
    </Box>
  );
}
