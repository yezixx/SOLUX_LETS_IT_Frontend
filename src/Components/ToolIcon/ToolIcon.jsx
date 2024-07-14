import styles from "./ToolIcon.module.css";

const ToolIcon = ({ src, alt, type, onClick }) => {
  return (
    <button
      className={`${styles.toolIcon} ${styles[`toolIcon--${type}`]}`}
      onClick={onClick}
    >
      <img src={src} alt={alt} />
    </button>
  );
};

export default ToolIcon;
