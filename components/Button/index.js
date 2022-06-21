import styles from "Button.module.scss";

export default function Button({ children, onClick }) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
