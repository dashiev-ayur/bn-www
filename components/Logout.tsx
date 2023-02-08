import { observer } from "mobx-react";
import { store } from "../system/store";

const Logout = () => {
  const handleLogout = async () => {
    await store.auth.logout();
  }
  return <a onClick={handleLogout}>Logout</a>
}

export default observer(Logout);
