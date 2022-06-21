import Avatar from "components/Avatar";
import styles from "./devit.module.scss";

export default function Devit({ avatar, username, message, id }) {
  return (
    <div className={styles.container}>
      <article>
        <div>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
        </section>
      </article>
    </div>
  );
}
