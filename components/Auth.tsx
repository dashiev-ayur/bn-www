import { observer } from "mobx-react";
import { ReactNode, useEffect } from "react";
import { api } from "../system/api";
import { store } from "../system/store";
import { IAuthDTO } from "../system/typing";

interface IProps {
  children: ReactNode;
}
const Auth = ({ children }: IProps) => {
  useEffect(() => {
    const interval = setInterval(() => {
      store.auth.refresh();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}

export default observer(Auth);