import styles from "./avatar.module.scss";

export default function Avatar({ alt, src, name }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} alt={alt} src={src} title={alt} />
      {name && <strong>{name}</strong>}
    </div>
  );
}
