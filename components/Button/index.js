import styles from "./Button.module.scss";

export default function Button({ children, disabled, onClick }) {
  return (
    <>
      <button disabled={disabled} className={styles.button} onClick={onClick}>
        {children}
      </button>
    </>
  );
}
