// src/app/components/Navbar.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation'; // <<-- use this in app router

// navbar that will be pushed to layout.jsx
export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch('http://localhost:3001/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout request failed', err);
    }
    router.replace('/');
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'left', gap: 1 }}>
          <Image src="/logo.png" alt="Logo" width={75} height={50} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>

          <Button color="inherit" component={Link} href="/courts">
            Find Open Courts
          </Button>

          <Button color="inherit" component={Link} href="/new">
            Submit A New Game
          </Button>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
