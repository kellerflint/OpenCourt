"use client"

import {Box, TextField, Button, Typography } from '@mui/material'

export default function LoginPage() {
  return (
    <Box component="main" sx={{ p: 3, maxWidth: 420, mx: "auto"}}>
      <Typography variant="h5" gutterBottom>Login</Typography>

      <Box component="form" noValidate autoComplete='off'>
        <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        autoComplete="off"
        inputProps={{ autoComplete: "off" }}
        />
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