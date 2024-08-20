import styles from "./Button.module.css";

const Button = ({ text = "add text", type, onClick }) => {
  return (
    <button
      className={`${styles.button} ${styles[`button--${type}`]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
