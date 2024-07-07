import styles from "./CollabTool.module.css";

const CollabTool = ({ tool }) => {
  return (
    <div className={styles.collabTool}>
      <button className={styles.collabTool__button}>{tool}</button>
    </div>
  );
};

export default CollabTool;
