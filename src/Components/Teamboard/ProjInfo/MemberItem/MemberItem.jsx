import styles from "./MemberItem.module.css";

const MemberItem = ({ memberName }) => {
  return (
    <div className={styles.member_item__wrapper}>
      <div className={styles.member_item__container}>
        <button className={styles.member_item__button}>
          <div className={styles.member_item__profile_pic}>사진</div>
          <div className={styles.member_item__name}>{memberName}</div>
        </button>
      </div>
    </div>
  );
};

export default MemberItem;
