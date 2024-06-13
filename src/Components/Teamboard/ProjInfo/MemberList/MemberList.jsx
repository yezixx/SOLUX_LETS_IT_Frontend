import styles from "./MemberList.module.css";
import MemberItem from "./MemberItem/MemberItem";

const MemberList = () => {
  const members = [
    { id: 1, name: "유밍 BE" },
    { id: 2, name: "도라" },
    { id: 3, name: "Tom BE" },
  ];

  return (
    <div className={styles.memberList__wrapper}>
      <div className={styles.memberList__container}>
        {members.map((member) => (
          <MemberItem key={member.id} memberName={member.name} />
        ))}
      </div>
    </div>
  );
};

export default MemberList;
