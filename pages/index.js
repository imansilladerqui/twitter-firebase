import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./index.module.scss";
import Button from "components/Button";
import GitHub from "components/Icons/GitHub";
import { loginWithGitHub, onAuthStateChangedAPI } from "../firebase/client";
import Logo from "components/Icons/Logo";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChangedAPI(setUser);
  }, []);

  useEffect(() => {
    user && router.replace("/home");
  }, [user]);

  const handleClick = () => {
    loginWithGitHub(setUser).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Head>
        <title>Twitter MVP</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.section}>
        <Logo width="100" />
        <h1 className={styles.title}>Twitter MVP</h1>
        <h2 className={styles.title}>
          The new Twitter <br /> made by Next.js
        </h2>
        <div>
          {user === null && (
            <Button onClick={handleClick}>
              <GitHub fill={"#fff"} width={24} height={24} />
              Login with GitHub
            </Button>
          )}

          {user === undefined && <img src="/spinner.gif" />}
        </div>
      </section>
    </>
  );
}
