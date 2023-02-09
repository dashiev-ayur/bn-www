import { useQuery } from '@tanstack/react-query';
import { observer } from 'mobx-react';
import Layout from '../app/layout'
import Auth from '../components/Auth';
import { api } from '../system/api';
import { store } from '../system/store';

const Home = () => {

  const {data} = useQuery(['users'], api.getUsers);

  return (
    <Layout>
      <Auth showCount={true}/>
        <p>{store.auth.isAuth ? '+' : '-'}</p>
        {!store.auth.isAuth &&
          <div>
            Авторизуйтесь !
          </div>
        }
        {store.auth.isAuth &&
          <div>
            Вы авторизованы !
            <pre>{JSON.stringify(data?.data, null, 2)}</pre>
          </div>
        }
      
    </Layout>
  )
}

export default observer(Home);