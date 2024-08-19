import styles from "./ToolIcon.module.css";

const ToolIcon = ({ src, type, title, onClick }) => {
  return (
    <button
      className={`${styles.toolIcon} ${styles[`toolIcon--${type}`]}`}
      onClick={onClick}
    >
      <img src={src} alt={title} title={title} />
    </button>
  );
};

export default ToolIcon;
