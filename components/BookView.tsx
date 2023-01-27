import { observer } from "mobx-react";
import React from "react";

export const BookView = observer(function BookView({ book }:any) {
  return (
    <div>
      <p style={{ border: "1px black solid", padding: "8px" }}>
        ID: {book.id}
        <br />
        Title: {book.title}
        <br />
        Author name: {book.author.name}
        <br />
        Favorited: {book.isFavorite ? "Yes" : "No"}
        <br />
        <button onClick={book.makeFavorite}>Add to favorites</button>
      </p>
    </div>
  );
});
