import styles from "./avatar.module.scss";

export default function Avatar({ alt, src, name }) {
  return (
    <>
      <img className={styles.avatar} alt={alt} src={src} title={alt} />
      {name && <strong className={styles.strong}>{name}</strong>}
    </>
  );
}
