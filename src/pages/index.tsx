import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { Button } from "../components/Button";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  function getStarted() {
    if (sessionData) {
      router.push("/resources");
    } else {
      signIn(undefined, {
        callbackUrl: `${window.location.origin}/resources`,
      });
    }
  }

  return (
    <Layout title="Homepage">
      <h1>Resource Queue</h1>
      <p>
        Resource Queue allows you to coordinate access to shared resources by
        requesting access. Resource Queue will automatically determine the
        current user and notify you when changes are made.
      </p>
      <Button onClick={getStarted}>Get Started</Button>
    </Layout>
  );
};

export default Home;
