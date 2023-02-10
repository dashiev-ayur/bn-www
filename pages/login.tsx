import React, { useCallback, useEffect, useState } from 'react';
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
import { Alert } from '@mui/material';
import axios from 'axios';

const PageLogin = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<ILoginForm>({
    defaultValues: { login: '', password: '' }
  });
  const [error, setError] = useState<string>('');

  const onLogin = () => {
    if (store.auth.isAuth) {
      const backUrl = sessionStorage.getItem('backUrl');
      router.push(backUrl ? backUrl : '/', undefined, { shallow: true });
    }
  }
  // ===================================================
  const onSubmit = async (data: ILoginForm) => {
    try {
      const { login, password } = data;
      await store.auth.login(login, password)
      onLogin();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 401: setError('Пользователь не найден !'); break;
          default: setError(err.message);
        }
      } else{
        setError('Network error !');
      }
    }
  }

  // ===================================================
  // Если в любой другой вкладке авторизовались
  const autologin = (event: StorageEvent) => {
    if (event.key === 'auth') {
      store.auth.refresh().then(() => { onLogin(); }).catch(()=>{});
    }
  };

  useEffect(() => {
    window.addEventListener('storage', autologin, false); // перехват событий других вкладок
    return () => window.removeEventListener('storage', autologin);
  }, []);

  // ===================================================
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
            rules={{ required: true }}
            render={({ field }) =>
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Login"
                autoComplete="login"
                autoFocus
                error={errors.login ? true : false}
                onFocus={() => setError('')}
              // helperText={errors.login ? 'Обязательное поле' : ''}
              />}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) =>
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                error={errors.password ? true : false}
                onFocus={() => setError('')}
              />}
          />
          {error && <Alert severity="error">{error}</Alert>}

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
