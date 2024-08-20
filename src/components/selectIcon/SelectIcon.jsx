import ToolIcon from "../toolIcon/ToolIcon";
import styles from "./SelectIcon.module.css";

const SelectIcon = ({ children, list, onChange }) => {
  const msg = (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {list.map((item, index) => (
        <ToolIcon
          key={index}
          type="SHADOW"
          src={item.image}
          alt={item.altMsg}
          title={item.altMsg}
          onClick={() => {
            onChange(item);
          }}
        />
      ))}
    </div>
  );

  return (
    <div className={styles.SelectIcon}>
      {children}
      <div className={styles.SelectIcon__msg}>{msg}</div>
    </div>
  );
};

export default SelectIcon;
