import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import _ from "lodash";
import { Author, useStore } from "../../system/store";
import { AuthorView } from "../../components/AuthorView";
import Layout from "../../app/layout";
import { onSnapshot } from "mobx-state-tree";

export const AuthorList = () => {
  const store = useStore();
  const query = useQuery("authorList", () =>
    store.authorStore.readAuthorList()
  );

  // Convert array of responses to a single array.
  // authorList type is correclty infered
  const authorList = _.flatMap(query.data, (response) => response);

  useEffect(()=>{
    onSnapshot(store, (snapshot) => {
      console.log('----------------');
      console.log('>', snapshot);
    });
  }, [store]);

  return (
    <Layout>
      {query.isLoading && "Loading..."}
      {authorList.map((author) => {
        return <AuthorView key={author.id} author={author} />;
      })}
    </Layout>
  );
};

export default observer(AuthorList)