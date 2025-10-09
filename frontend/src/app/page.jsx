"use client"

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


  // page 
  return (
    <Box component="main" sx={{ p: 3, maxWidth: 420, mx: "auto"}}>
  
      {/* Page Title */}
      <Typography variant="h5" gutterBottom>
        {mode === "login" ? "Sign in" : "Create account"}
      </Typography>


      <Box component="form" noValidate autoComplete='off'>

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