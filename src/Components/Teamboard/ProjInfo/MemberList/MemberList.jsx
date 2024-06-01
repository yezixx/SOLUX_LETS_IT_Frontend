import styles from "./MemberList.module.css";
import MemberItem from "../MemberItem/MemberItem";

const MemberList = () => {
  const members = [
    { id: 1, name: "유밍 BE" },
    { id: 2, name: "도라" },
    { id: 3, name: "Tom BE" },
  ];

  const groupedMembers = members.reduce((acc, member, index) => {
    if (index % 2 === 0) {
      acc.push([member]);
    } else {
      acc[acc.length - 1].push(member);
    }
    return acc;
  }, []);

  return (
    <div className={styles.member_list__wrapper}>
      {groupedMembers.map((group, index) => (
        <div key={index} className={styles.member_list__container}>
          {group.map((member) => (
            <MemberItem key={member.id} memberName={member.name} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MemberList;
