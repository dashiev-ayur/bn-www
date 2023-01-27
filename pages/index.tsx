import _ from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { useEffect } from 'react'
import { useQuery } from 'react-query';
import Layout from '../app/layout'
import { BookView } from '../components/BookView';
import { useStore } from '../system/store';

const state = observable({
  count: 0
});

const Home = () => {
  const store = useStore();
  const query = useQuery("bookList", () => store.bookStore.readBookList());
  const bookList = _.flatMap(query.data, (response) => response);

  useEffect(() => {
    // console.log(getSnapshot(User));
  }, []);

  return (
    <Layout>
      <div>
        {query.isLoading && "Loading..."}
        {bookList.map((book) => {
          return <BookView key={book.id} book={book} />;
        })}
      </div>
    </Layout>
  )
}

export default observer(Home);