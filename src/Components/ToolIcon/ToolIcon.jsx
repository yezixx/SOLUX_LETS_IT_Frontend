import styles from "./ToolIcon.module.css";

const ToolIcon = ({ src, alt, type, title, onClick }) => {
  return (
    <button
      className={`${styles.toolIcon} ${styles[`toolIcon--${type}`]}`}
      onClick={onClick}
    >
      <img src={src} alt={alt} title={title} />
    </button>
  );
};

export default ToolIcon;
