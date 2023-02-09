import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';

const Copyright = (props: any) => {
  const [backUrl, setBackUrl] = useState('');

  useEffect(() => {
    setBackUrl(sessionStorage.getItem('backUrl') || '');
  }, []);

  return (
    <div>
      <div>
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          <Link href="/">Home</Link>&nbsp;&nbsp;&nbsp;
          <Link href="/news">News</Link>&nbsp;&nbsp;&nbsp;
          <Link href="/login">Login</Link>&nbsp;&nbsp;&nbsp;
          <Link href="/logout">Logout</Link>&nbsp;&nbsp;&nbsp;
          <Link href="/reg">Reg</Link>&nbsp;&nbsp;&nbsp;
        </Typography>
      </div>
      <div>
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          BACK TO: {backUrl}
        </Typography>
      </div>
      <div>
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          {new Date().getFullYear()}{'.'}
        </Typography>
      </div>
    </div>
  );
}

export default observer(Copyright);