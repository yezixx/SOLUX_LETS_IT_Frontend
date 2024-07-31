//import Button from "../Button/Button";
import { forwardRef } from "react";
import CollabLink from "../CollabLink/CollabLink";
import styles from "./CollabLinkForm.module.css";

const CollabLinkForm = forwardRef(({ type, links, onChange, onClick }, ref) => {
  return (
    <div className={styles.collabLinkForm}>
      <div className={styles.collabLinkForm__label}>협업툴 링크</div>
      <div
        className={`${styles.collabLinkForm__linkItem} ${
          styles[`collabLinkForm__linkItem--${type}`]
        }`}
      >
        {links.map((link, index) => (
          <CollabLink
            key={index}
            id={link.id ? link.id : index}
            value={link.link}
            init={link.tool}
            onChange={onChange}
            onClick={onClick}
            type={type}
            ref={ref[index]}
          />
        ))}
      </div>
      {/*<div className={styles.collabLinkForm__button}>
        <Button text="+ 추가" type="NONE__TEXT-TC2" />
      </div>*/}
    </div>
  );
});

CollabLinkForm.displayName = "CollabLinkForm";

export default CollabLinkForm;
