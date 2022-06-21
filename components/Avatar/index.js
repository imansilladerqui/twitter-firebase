import styles from "./avatar.module.scss";

export default function Avatar({ alt, src, text }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} alt={alt} src={src} title={alt} />
      {text && <strong>{text}</strong>}
    </div>
  );
}
