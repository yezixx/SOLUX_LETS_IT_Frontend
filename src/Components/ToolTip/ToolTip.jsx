import styles from "./ToolTip.module.css";

const ToolTip = ({ children, msg, width, height }) => {
  const style = {
    height: height,
    width: width,
  };

  return (
    <div className={styles.ToolTip} style={style}>
      {children}
      <div className={styles.ToolTip__msg}>{msg}</div>
    </div>
  );
};

export default ToolTip;
