import styles from "./MemberList.module.css";
import MemberItem from "../../../../Components/MemberItem/MemberItem";
import { Link } from "react-router-dom";

const MemberList = () => {
  const members = [
    { id: 1, name: "유밍 BE" },
    { id: 2, name: "도라" },
    { id: 3, name: "Tom BE" },
  ];

  return (
    <div className={styles.memberList}>
      <div className={styles.memberList__item}>
        {members.map((member) => (
          <Link
            key={member.id}
            to={"/member/profile"}
            style={{ textDecoration: "none" }}
          >
            <MemberItem key={member.id} memberName={member.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
