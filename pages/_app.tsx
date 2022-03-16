import '../styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { AppProps } from 'next/app'
import { BottomNavigation, BottomNavigationAction, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search'
import PlayListIcon from '@mui/icons-material/List'
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Component {...pageProps} />
    </ThemeProvider>

  )
}

export default MyApp
