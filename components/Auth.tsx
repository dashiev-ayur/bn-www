import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { store } from "../system/store";

const Auth = () => {
  const [testing, setTesting] = useState(true);
  const [count, setCount] = useState(0);

  const test = async () => {
    // toast.success('test !!!');
    try {
      if(document.hidden) return Promise.resolve(false);
      await store.auth.test();
      return Promise.resolve(true);
    } catch (err) {
      throw err;
    }
  }

  const autologin = () => {
    store.auth.fromStorage();
  }

  const testQuery = useQuery<boolean, AxiosError | Error>({
    queryKey: ['test-access-token'],
    queryFn: test,
    refetchInterval: 10 * 1000,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    enabled: testing,
    onError: (err) => {
      // toast.error('onError:' + err.message);
      // console.log('error>', err.message);
      store.auth.refresh()
        .then(() => {
          // console.log('Access token refreshed !');
          setCount(count => count + 1);
          toast.success('Access token refreshed ! Count = ' + count);
        })
        .catch(() => {
          // console.log('Error refresh token !');
          toast.error('Error refresh token ! Failure = ' + testQuery.failureCount);
          // setTesting(false);
        });
    },
    onSuccess: () => {
      // toast.success('onSuccess');
      if (!store.auth.isAuth) {
        autologin();
      }
    },
  });

  useEffect(() => {
    autologin();
  }, []);

  useEffect(() => {
    console.log('testQuery.failureCount>>', testQuery.failureCount)
    if (testQuery.failureCount > 5) {
      setTesting(false);
    } else {
      setTesting(true);
    }
  }, [testQuery.failureCount]);

  // =========================================
  useEffect(() => {
    sessionStorage.setItem('backUrl', window.location.href);
  }, []);

  // =========================================
  // useEffect(() => {
  //   window.addEventListener('visibilitychange', test);
  //   return () => window.removeEventListener('visibilitychange', test);
  // }, []);

  // useEffect(() => {
  //   window.addEventListener('storage', test);
  //   return () => window.removeEventListener('storage', test);
  // }, []);

  return null;
}

export default observer(Auth);