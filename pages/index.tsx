import { observer } from 'mobx-react';
import Layout from '../app/layout'
import Auth from '../components/Auth';
import Logout from '../components/Logout';
import { store } from '../system/store';

const Home = () => {
  return (
    <Layout>
      <Auth>
        <p>{store.auth.isAuth ? '+' : '-'}</p>
        {!store.auth.isAuth &&
          <div>
            Авторизуйтесь !
          </div>
        }
        {store.auth.isAuth &&
          <div>
            <Logout />
          </div>
        }
      </Auth>
    </Layout>
  )
}

export default observer(Home);