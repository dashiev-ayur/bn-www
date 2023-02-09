import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { store } from "../system/store";

const MAX_REFRESH_COUNT = 1000;

const Auth = ({ showCount }: { showCount?: boolean }) => {
  const router = useRouter();
  const [count, setCount] = useState(0);

  // =========================================
  useEffect(() => {
    if (count < MAX_REFRESH_COUNT) {
      console.log('refresh====', count);
      store.auth.refresh();
    }
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => setCount(c => c + 1), 60 * 1000); // refresh every 1 min
    return () => clearInterval(interval);
  }, []);

  // =========================================
  const test = () => {
    store.auth
      .test()
      .then(() => null)
      .catch(() => null)
  };

  useEffect(() => {
    test();
    const interval = setInterval(test, 20 * 1000); // check access every 20 sec
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener('storage', test);
    return () => window.removeEventListener('storage', test);
  }, []);

  // =========================================
  useEffect(() => {
    sessionStorage.setItem('backUrl', window.location.href);
  }, []);

  // =========================================
  if (!showCount) return null;
  return <>{count}</>;
}

export default observer(Auth);