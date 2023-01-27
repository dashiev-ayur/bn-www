import React, { ReactNode } from 'react';
import { observer } from "mobx-react";
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <main>
      <div>
        <Link href="/">Home</Link>&nbsp;<Link href="/authors">Authors</Link>
      </div>
      {children}
    </main>
  );
};

export default observer(Layout);
