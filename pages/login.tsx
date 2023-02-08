import React from 'react';
import { observer } from "mobx-react";
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import Layout from '../app/layout';
import { useRouter } from 'next/router';
import { ILoginForm } from '../system/typing';
import { store } from '../system/store';

const PageLogin = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<ILoginForm>();

  const onSubmit = async (data: ILoginForm) => {
    try {
      const { login, password } = data;
      await store.auth.login(login, password);
      if (store.auth.isAuth) {
        router.push({ pathname: '/' });
      }
    } catch (err) {
      console.log('err>>>>>>', err);
    }
  }

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
          Авторизация
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
            name="login"
            control={control}
            render={({ field }) =>
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Login"
                autoComplete="login"
                autoFocus
              />}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) =>
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
              />}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Fire
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#">Забыли пароль ?</Link>
            </Grid>
            <Grid item>
              <Link href="/reg">Регистрация</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default observer(PageLogin);
