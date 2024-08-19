import styles from "./ProfileLink.module.css";
import { getLogoImage } from "../../../../util/getLogoImage";

const ProfileLink = ({ url }) => {
  const iconName = Object.keys(url);
  const urlName = Object.values(url);
  // const iconName = ["notion"];
  // const urlName = ["notion.com"];
  console.log(url);
  return (
    <div className={styles.ProfileLink}>
      <div className={styles.ProfileLink__container}>
        {iconName.map((iconItem, index) => (
          <img
            src={getLogoImage(iconItem)}
            key={index}
            className={styles.ProfileLink__icon}
          ></img>
        ))}
      </div>
      <div className={styles.ProfileLink__container}>
        {url &&
          urlName.map((urlItem, index) => (
            <a key={index} className={styles.ProfileLink__link}>
              {urlItem}
            </a>
          ))}
      </div>
    </div>
  );
};

export default ProfileLink;
