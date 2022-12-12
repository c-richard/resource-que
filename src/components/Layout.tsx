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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"
        />
      </Head>
      {name && image && <Menu name={name} image={image} />}
      <main>{children}</main>
    </>
  );
}
