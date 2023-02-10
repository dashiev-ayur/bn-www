import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { observer } from 'mobx-react';
import Layout from '../app/layout'
import Auth from '../components/Auth';
import { api } from '../system/api';
import { store } from '../system/store';
import { IUser } from '../system/typing';


const useUsers = () => {
  return useQuery<AxiosResponse, AxiosError, IUser[]>({
    queryKey: ['users'],
    queryFn: api.getUsers,
    select: (data) => data.data,
    // retry: 2,
    // retryDelay: 5 * 1000,
    // staleTime: 20 * 1000,
    // refetchOnMount: true,
    // refetchOnReconnect: true,
    // refetchOnWindowFocus: true,
    enabled: false, // disable auto load...
  });
}
const Home = () => {

  const { data, isError, isFetching, error, refetch } = useUsers();

  return (
    <Layout>
      <Auth />
      <p>Авторизация: {store.auth.isAuth ? '+' : '-'}</p>

      <button onClick={()=>refetch()}>Get news !</button>
      <div>
        {isError && <div>Не могу загрузить новости ! {error.message}</div>}
        {isFetching && <div>Загружаю новости..</div>}
        {data && data.map((el: IUser) => {
          return (
            <div key={el.id}>{el.login} = {el.role}</div>
          )
        })}
      </div>

    </Layout>
  )
}

export default observer(Home);