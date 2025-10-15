"use client";

import Link from "next/link";
import Image from 'next/image';
import { AppBar, Toolbar, Button, Box } from "@mui/material";

// navbar that will be pushed to layout.jsx
export default function Navbar() {
  return (
    <AppBar position="static">

      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "left", gap: 1 }}>
          <Image src="/logo.png" alt="Logo" width={75} height={50} />
        </Box>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/courts">
          Find Open Courts
        </Button>
         <Button color="inherit" component={Link} href="/new">
          Submit A New Game
        </Button>
      </Toolbar>
    </AppBar>
  );
}