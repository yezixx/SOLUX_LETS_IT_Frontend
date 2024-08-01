import styles from "./ProfileLink.module.css";
import { getLogoImage } from "../../../../util/getLogoImage";

const ProfileLink = ({ url }) => {
  iconName = Object.keys(url);
  urlName = Object.values(url);
  console.log(url);
  return (
    <div className={styles.ProfileLink}>
      {/* <div className={styles.ProfileLink__icon}>icon</div> */}
      {iconName.map((iconItem, index) => (
        <div key={index} className={styles.ProfileLink__icon}>
          {getLogoImage(iconItem)}
        </div>
      ))}
      {/* {url && <div className={styles.ProfileLink__link}>{url}</div>} */}
      {url &&
        urlName.map((urlItem, index) => (
          <a key={index} className={styles.ProfileLink__link}>
            {urlItem}
          </a>
        ))}
    </div>
  );
};

export default ProfileLink;
