import React from 'react';
import { observer } from "mobx-react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Layout from '../app/layout';
import { store } from '../system/store';
import { useRouter } from 'next/router';

const PageLogout = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await store.auth.logout();
    const backUrl = sessionStorage.getItem('backUrl');
    router.push(backUrl ? backUrl : '/', undefined, { shallow: true });
  };

  return (
    <Layout>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Выход
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Fire
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default observer(PageLogout);
