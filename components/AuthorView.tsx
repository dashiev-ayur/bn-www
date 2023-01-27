import { observer } from "mobx-react";
import React from "react";
import { AuthorInstance } from "../system/store";

interface Props {
  author: AuthorInstance;
}
export const AuthorView = observer(function AuthorView({ author }: Props) {
  return (
    <div>
      <p style={{ border: "1px black solid", padding: "8px" }}>
        ID: {author.id}
        <br />
        Title: {author.name}
      </p>
    </div>
  );
});
