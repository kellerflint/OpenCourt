"use client"
import React, { useState } from "react";
import {Box, TextField, Button, Typography } from '@mui/material'

export default function LoginPage() {
// user effects! 

  const [mode, setMode] = useState("login");

  //toggle function
  function handleToggle() {
    if (mode === "login") {
      setMode("register");
    } else {
      setMode("login");
    }
  }

  //handle submit

  function handleSubmit(e){
    e.preventDefault(); // stop page reload

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const username = form.get("login-username");

    if(mode === "login"){
      // post to login
      console.log("Logging in with:", email, password);
      
    } else {
      console.log("Registering with:", username, email, password);

      //post to register
    }

  }


  // page 
  return (
    <Box component="main" sx={{ p: 3, maxWidth: 420, mx: "auto"}}>
  
      {/* Page Title */}
      <Typography variant="h5" gutterBottom>
        {mode === "login" ? "Sign in" : "Create account"}
      </Typography>


      <Button
      variant="text"
      size="small"
      sx={{ p: 0, mb: 1 }}
      onClick={handleToggle}
      >
        {mode === "login" ? "Need an account? Register" : "Have an account? Sign in"}
      </Button>

      <Box component="form" noValidate autoComplete='off'>

        {/* Username (only for register mode) */}
        {mode === "register" && (
          <TextField
            label="Username"
            type="text"
            name="login-username"
            fullWidth
            margin="normal"
            autoComplete="off"
            inputProps={{ autoComplete: "off" }}
          />
        )}

        {/* {Email Address} */}
        <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        autoComplete="off"
        inputProps={{ autoComplete: "off" }}
        />

        {/* Password */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          inputProps={{ autoComplete: "new-password" }}
        />
        <Button type='submit' variant='contained' fullWidth sx={{ mt:2}}>Submit</Button>
      </Box>
    </Box>
  );
}