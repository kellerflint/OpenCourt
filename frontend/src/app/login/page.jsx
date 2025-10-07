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
        id="required"
        label="required"
        defaultValue="Email Address"
        />
        <TextField
        required
        id="required"
        label="required"
        defaultValue="Password"
        />
        <TextField
        required
        id="required"
        label="required"
        defaultValue="Username"
        />
        
      </div>
    </Box>
  );
}
