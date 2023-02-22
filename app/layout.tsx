import React, { ReactNode } from 'react';
import { observer } from "mobx-react";
import Link from 'next/link';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { store } from '../system/store';
import Copyright from '../components/Copyright';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const theme = createTheme();
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        {children}
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Toaster position="top-center" reverseOrder={false} />
      </Container>
    </ThemeProvider>
  );
};

export default observer(Layout);
