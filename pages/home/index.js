import { useState, useEffect } from "react";
import styles from "./home.module.scss";
import Devit from "components/Devit";
import useUser from "hooks/useUser";
import { listenLatestDevits } from "../../firebase/client";
import Head from "next/head";
import Navbar from "components/Navbar";

export default function Home() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    let unsubscribe;
    if (user) {
      unsubscribe = listenLatestDevits(setTimeline);
    }
    return () => unsubscribe && unsubscribe();
  }, [user]);

  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      <header className={styles.header}>
        <h2>Inicio</h2>
      </header>
      <section className={styles.section}>
        {timeline.map(
          ({ createdAt, id, img, userName, avatar, content, userId }) => (
            <Devit
              avatar={avatar}
              createdAt={createdAt}
              id={id}
              img={img}
              key={id}
              content={content}
              userName={userName}
              userId={userId}
            />
          )
        )}
      </section>
      <Navbar />
    </>
  );
}
