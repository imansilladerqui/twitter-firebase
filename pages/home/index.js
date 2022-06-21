import { useState, useEffect } from "react";
import styles from "./home.module.scss";
import Devit from "components/Devit";

export default function Home() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch("/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline);
  }, []);

  return (
    <div className={styles.container}>
      <main>
        <header>
          <h2>Inicio</h2>
        </header>
        <section className={styles.section}>
          {timeline.map(({ id, username, avatar, message }) => (
            <Devit
              avatar={avatar}
              id={id}
              key={id}
              message={message}
              username={username}
            />
          ))}
        </section>
        <nav>Navbar</nav>
      </main>
    </div>
  );
}
