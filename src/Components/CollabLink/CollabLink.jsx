import { useState } from "react";
import styles from "./CollabLink.module.css";
import ToolIcon from "../ToolIcon/ToolIcon";
import SelectIcon from "../SelectIcon/SelectIcon";

const getToolList = (type) => {
  return type === "SHORT"
    ? [
        {
          tool: "gmail",
          logo: "",
          altMsg: "gmail",
        },
        {
          tool: "github",
          image: "",
          altMsg: "github",
        },
        {
          tool: "notion",
          image: "",
          altMsg: "notion",
        },
        {
          tool: "linkedIn",
          image: "",
          altMsg: "linkedIn",
        },
        {
          tool: "stack overflow",
          image: "",
          altMsg: "stack overflow",
        },
        {
          tool: "blog",
          image: "",
          altMsg: "blog",
        },
        {
          tool: "others",
          image: "",
          altMsg: "others",
        },
      ]
    : [
        {
          tool: "github",
          image: "",
          altMsg: "github",
        },
        {
          tool: "notion",
          image: "",
          altMsg: "notion",
        },
        {
          tool: "jira",
          logo: "",
          altMsg: "jira",
        },
        {
          tool: "figma",
          image: "",
          altMsg: "figma",
        },
        {
          tool: "slack",
          image: "",
          altMsg: "slack",
        },
        {
          tool: "discord",
          image: "",
          altMsg: "discord",
        },
        {
          tool: "others",
          image: "",
          altMsg: "others",
        },
      ];
};

const CollabLink = ({ id, value, type, init, onChange, onClick }) => {
  const [visible, setVisible] = useState(false);

  const toolList = getToolList(type);
  const [selectedIcon, setSelectedIcon] = useState(
    init ? init : toolList[0].tool
  );

  const onChangeInput = (e) => {
    onChange(id, e.target.value);
  };

  const onChangeIcon = (tool) => {
    setSelectedIcon(tool);
    onClick(id, tool);
    setVisible(false);
  };

  return (
    <div className={styles.collabLink}>
      {visible === true ? (
        <div className={styles.collabLink__selectIcon}>
          <SelectIcon list={toolList} onChange={onChangeIcon} />
        </div>
      ) : null}
      <div
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <ToolIcon
          title={selectedIcon}
          alt={selectedIcon}
          type={type === "SHORT" ? "" : "NONE"}
        />
      </div>
      <input
        className={`${styles.collabLink__input} ${
          styles[`collabLink__input--${type}`]
        }`}
        type="text"
        value={value}
        onChange={onChangeInput}
        placeholder="URL을 입력해주세요."
      ></input>
    </div>
  );
};

export default CollabLink;
