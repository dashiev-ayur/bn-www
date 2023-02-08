import { observer } from "mobx-react";
import { ReactNode, useEffect, useState } from "react";
import { api } from "../system/api";
import { store } from "../system/store";
import { IAuthDTO } from "../system/typing";

interface IProps {
  children: ReactNode;
}
const Auth = ({ children }: IProps) => {

  const test = () => {
    store.auth
      .test()
      .then((r) => console.log('test>>> ok', r))
      .catch(err => console.error('test>>> false', err.message))
  };

  const refresh = () => {
    store.auth.refresh();
  };
  
  useEffect(() => {
    const interval = setInterval(refresh, 3 * 60 * 60 * 1000); // TODO CHANGE
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    test();
    const interval = setInterval(test, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}

export default observer(Auth);