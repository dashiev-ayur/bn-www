import { flow, getEnv, getRoot, Instance, types, getIdentifier, isStateTreeNode } from "mobx-state-tree";
import _ from "lodash";
import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
import { api } from "../api";

export function isPrimitive(
  value: any
) {
  if (typeof value === "object") {
    return value === null;
  }
  return typeof value !== "function";
}

/**
 *
 * @param instance A list of MST instances or a single MST Instance or any other value
 * @returns If the input param is a single MST instance the return value
 * is the instance identifier. If the input param is a list of MST instances,
 * the return value is a list of identifiers. If the input param is something else
 * entirely, the function will return it unchanged.
 */
export function getInstanceId(instance: any) {
  const instanceList = _.castArray(instance);
  const mapped = instanceList.map((instance) => {
    if (isStateTreeNode(instance)) return getIdentifier(instance);
    return instance;
  });

  return Array.isArray(instance) ? mapped : mapped[0];
}



const { model, identifier, safeReference, string, map } = types;

export const Author = model("Author", {
  id: identifier,
  name: string
});
export type AuthorInstance = Instance<typeof Author>;
export interface IAuthor extends Instance<typeof Author> {}

const Book = model("Book", {
  id: identifier,
  title: string,
  author: safeReference(Author),
  isFavorite: false
}).actions((self) => ({
  makeFavorite() {
    self.isFavorite = true;
  }

}));
export type BookInstance = Instance<typeof Book>;

const BookStore = model("BookStore", {
  map: map(Book)
})
  .actions((self) => ({
    process(data: any): any {
      const root: StoreInstance = getRoot(self);

      const dataList = _.castArray(data);

      const mapped = dataList.map((book) => {
        if (isPrimitive(book)) {
          return book;
        }

        book.author = getInstanceId(root.authorStore.process(book.author));

        const existing = self.map.get(getInstanceId(book));

        return existing
          ? _.mergeWith(existing, book, (_, next: any) => {
              if (Array.isArray(next)) return next; // Treat arrays like atoms
            })
          : self.map.put(book);
      });

      return Array.isArray(data) ? mapped : mapped[0];
    }
  }))
  .actions((self) => ({
    readBookList: flow<BookInstance[], []>(function* readBookList(): any {
      const bookListRaw = yield getEnv(self).api.readBookList();
      return self.process(bookListRaw);
    })
  }));

const AuthorStore = model("AuthorStore", {
  map: map(Author)
})
  .actions((self) => ({
    process(data: any): any {
      const dataList = _.castArray(data);
      const mapped = dataList.map((author) => {
        if (isPrimitive(author)) {
          return author;
        }

        const existing = self.map.get(getInstanceId(author));

        return existing
          ? _.mergeWith(existing, author, (_, next: any) => {
              if (Array.isArray(next)) return next; // Treat arrays like atoms
            })
          : self.map.put(author);
      });
      return Array.isArray(data) ? mapped : mapped[0];
    }
  }))
  .actions((self) => {
    return {
      readAuthorList: flow<AuthorInstance[], []>(
        function* readAuthorList(): any {
          const authorList = yield getEnv(self).api.readAuthorList();
          return self.process(authorList);
        }
      )
    };
  });

export const Store = model("Store", {
  bookStore: BookStore,
  authorStore: AuthorStore
});

export type StoreInstance = Instance<typeof Store>;

export function useStore(): StoreInstance {
  return useContext(MobXProviderContext).store;
}

const environment = { api };
export const store = Store.create({ 
  authorStore: {}, 
  bookStore: {} }, 
  environment
);