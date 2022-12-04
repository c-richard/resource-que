import { useSession } from "next-auth/react";
import Head from "next/head";
import { Menu } from "./Menu";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ title, children }: LayoutProps) {
  const { data: sessionData } = useSession();

  const name = sessionData?.user?.name;
  const image = sessionData?.user?.image;

  return (
    <>
      <Head>
        <title>{`${title} | Resource Queue`}</title>
        <meta name="description" content="Resource Queue" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {name && image && <Menu name={name} image={image} />}
        {children}
      </main>
    </>
  );
}
