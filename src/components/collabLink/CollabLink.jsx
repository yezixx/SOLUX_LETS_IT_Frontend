import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./CollabLink.module.css";
import ToolIcon from "../toolIcon/ToolIcon";
import SelectIcon from "../selectIcon/SelectIcon";

import { getLogoImage } from "../../util/getLogoImage";

const getToolList = (type) => {
  return type === "SHORT"
    ? [
        {
          tool: "email",
          image: getLogoImage("email")
        },
        {
          tool: "github",
          image: getLogoImage("github")
        },
        {
          tool: "linkedIn",
          image: getLogoImage("linkedin")
        },
        {
          tool: "velog",
          image: getLogoImage("velog")
        },
        {
          tool: "naverblog",
          image: getLogoImage("naverblog")
        },
        {
          tool: "tistory",
          image: getLogoImage("tistory")
        },
        {
          tool: "others",
          image: getLogoImage("others")
        }
      ]
    : [
        {
          tool: "github",
          image: getLogoImage("github")
        },
        {
          tool: "notion",
          image: getLogoImage("notion")
        },
        {
          tool: "jira",
          image: getLogoImage("jira")
        },
        {
          tool: "figma",
          image: getLogoImage("figma")
        },
        {
          tool: "slack",
          image: getLogoImage("slack")
        },
        {
          tool: "discord",
          image: getLogoImage("discord")
        },
        {
          tool: "others",
          image: getLogoImage("others")
        }
      ];
};

const CollabLink = forwardRef(
  ({ id, value, type, init, onChange, onClick }, ref) => {
    const [visible, setVisible] = useState(false);

    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      }
    }));

    const toolList = getToolList(type);
    const [selectedIcon, setSelectedIcon] = useState(
      init
        ? {
            tool: { init },
            image: getLogoImage(init),
            altMsg: { init }
          }
        : toolList[0].tool
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
        {visible === true && type ? (
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
            title={selectedIcon.tool}
            src={selectedIcon.image}
            type={type === "SHORT" ? "" : "NONE"}
          />
        </div>
        <input
          className={`${styles.collabLink__input} ${
            styles[`collabLink__input--${type}`]
          }`}
          type="text"
          value={value}
          ref={inputRef}
          onChange={onChangeInput}
          placeholder="URL을 입력해주세요."
        ></input>
      </div>
    );
  }
);

CollabLink.displayName = "CollabLink";

export default CollabLink;
