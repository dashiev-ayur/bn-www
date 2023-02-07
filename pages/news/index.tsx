import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import _ from "lodash";
import Layout from "../../app/layout";

const sleep = (m: number) => new Promise(r => setTimeout(r, m))

interface INews {
  id: number;
  title: string;
}

const fetchNews = async (): Promise<INews[]> => {
  await sleep(1000);
  // throw new Error('Unknown error !!!');
  console.log('FETCH NEWS !!!!');
  
  return Promise.resolve([
    {
      id: 1,
      title: 'news1',
    },
    {
      id: 2,
      title: 'news2',
    },
  ])
}

const NewsTitles = () => {
  const { data: news } = useQuery<INews[]>("newsList", fetchNews);
  return (
    <ul>
      {news?.map((row) => {
        return <li key={row.id}>{row.title}</li>;
      })}
    </ul>
  )
}

export const NewsList = () => {
  const { data: news, isLoading, isError } = useQuery<INews[]>("newsList1", fetchNews, {
    useErrorBoundary: (error) => {
      console.log('error>>', error);
      return false; // Глобальное отображение ошибки !
    },
    // placeholderData: [{
    //   id: 1,
    //   title: 'news000',
    // }],
  });

  return (
    <Layout>
      <main>
        {isError && <div>Не могу загрузить новости !</div>}
        {isLoading && <div>Загружаю новости..</div>}
        {!isLoading &&
          <ul>
            {news?.map((row) => {
              return <li key={row.id}>{row.title}</li>;
            })}
          </ul>
        }
        <hr />
        <NewsTitles />
      </main>
    </Layout>
  );
};

export default observer(NewsList)