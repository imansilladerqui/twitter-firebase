import Avatar from "components/Avatar";
import styles from "./devit.module.scss";

export default function Devit({ avatar, userName, content, createdAt, id }) {
  return (
    <div className={styles.container}>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <date className={styles.date}>{createdAt}</date>
          </header>
          <p>{content}</p>
        </section>
      </article>
    </div>
  );
}
