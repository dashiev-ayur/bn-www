import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { store } from "../system/store";
import { IAuthDTO, IUser } from "../system/typing";

const MAX_REFRESH_COUNT = 1000;

const Auth = () => {
  const [testing, setTesting] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

  const test = () => store.auth.test().catch(() => null);
  const test2 = () => {
    if(!document.hidden) store.auth.test().catch(() => null);
  };
  const refresh = () => store.auth.refresh().catch(() => null);

  const testQuery = useQuery<IUser, AxiosError | Error>({
    queryKey: ['test-access-token'],
    queryFn: test,
    refetchInterval: 2 * 1000,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    enabled: testing,
  });

  const refreshQuery = useQuery<IAuthDTO, AxiosError | Error>({
    queryKey: ['refresh-token'],
    queryFn: refresh,
    refetchInterval: 6 * 1000,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    enabled: refreshing,
  });

  useEffect(() => {
    console.log('testQuery.failureCount>>', testQuery.failureCount)
    if (testQuery.failureCount > 3) {
      setTesting(false);
    } else {
      setTesting(true);
    }
  }, [testQuery.failureCount]);
  
  useEffect(() => {
    console.log('refreshQuery.failureCount>>', refreshQuery.failureCount)
    if (refreshQuery.failureCount > 3) {
      setRefreshing(false);
    } else {
      setRefreshing(true);
    }
  }, [refreshQuery.failureCount]);

  // =========================================
  // информация с других вкладок
  useEffect(() => {
    window.addEventListener('storage', test);
    return () => window.removeEventListener('storage', test);
  }, []);

  // =========================================
  useEffect(() => {
    sessionStorage.setItem('backUrl', window.location.href);
  }, []);

  // =========================================
  useEffect(() => {
    window.addEventListener('storage', test);
    return () => window.removeEventListener('storage', test);
  }, []);
  
  return null;
}

export default observer(Auth);