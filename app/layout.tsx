import React, { ReactNode } from 'react';
import { observer } from "mobx-react";
import Link from 'next/link';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <p>
        <Link href="/">Home</Link>&nbsp;&nbsp;&nbsp;
        <Link href="/authors">Authors</Link>&nbsp;&nbsp;&nbsp;
        <Link href="/login">Login</Link>&nbsp;&nbsp;&nbsp;
      </p>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
      
    </Typography>
  );
}
interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {children}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default observer(Layout);
