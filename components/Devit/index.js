import Avatar from "components/Avatar";
import useTimeAgo from "hooks/useTimeAgo";
import useDateTimeFormat from "hooks/useDateTimeFormat";
import styles from "./devit.module.scss";

export default function Devit({
  avatar,
  userName,
  content,
  createdAt,
  img,
  id,
}) {
  const timeago = useTimeAgo(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);

  console.log(img);

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
            <date title={createdAtFormated}>{timeago}</date>
          </header>
          <p>{content}</p>
          {img && <img className={styles.attachImg} src={img} />}
        </section>
      </article>
    </div>
  );
}
