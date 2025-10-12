"use client"
import React, { useState } from "react";
import {Box, TextField, Button, Typography, Alert } from '@mui/material'

export default function LoginPage() {
// user effects! 

  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);
  

  //toggle function
  function handleToggle() {
    if (mode === "login") {
      setMode("register");
    } else {
      setMode("login");
    }
  }

  //handle submit

  async function handleSubmit(e){
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

      try {
        const res = await fetch("http://localhost:3001/api/newUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          // Show backend error 
          setError(data.message || "Something went wrong.");
        } else {
          setSuccess("Account created successfully!");
        }
      } catch (err) {
        setError("Network error. Please try again later.");
      }
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

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" noValidate autoComplete='off' onSubmit={handleSubmit}>

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
        name = "email"
        fullWidth
        margin="normal"
        autoComplete="off"
        inputProps={{ autoComplete: "off" }}
        />

        {/* Password */}
        <TextField
          label="Password"
          type="password"
          name="password"
          fullWidth
          margin="normal"
          inputProps={{ autoComplete: "new-password" }}
        />
        <Button type='submit' variant='contained' fullWidth sx={{ mt:2}}>Submit</Button>
      </Box>
    </Box>
  );
}