import Button from "../../../../Components/Button/Button";
import CollabLink from "./CollabLink/CollabLink";
import styles from "./CollabLinkForm.module.css";

const CollabLinkForm = ({ type }) => {
  const collabLinks = [
    {
      id: 0,
      link: "http://github.com",
    },
    {
      id: 1,
      link: "http://www.notion.org",
    },
    {
      id: 2,
      link: "https://www.atlassian.com/software/jira",
    },
  ];

  return (
    <div className={styles.collabLinkForm}>
      <div className={styles.collabLinkForm__label}>협업툴 링크</div>
      <div
        className={`${styles.collabLinkForm__linkItem} ${
          styles[`collabLinkForm__linkItem--${type}`]
        }`}
      >
        {collabLinks.map((link) => (
          <CollabLink key={link.id} link={link.link} />
        ))}
      </div>
      <div className={styles.collabLinkForm__button}>
        <Button text="+ 추가" type="NONE__TEXT-TC2" />
      </div>
    </div>
  );
};

export default CollabLinkForm;
