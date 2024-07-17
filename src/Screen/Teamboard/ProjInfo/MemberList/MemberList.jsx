import styles from "./MemberList.module.css";
import MemberItem from "../../../../Components/MemberItem/MemberItem";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TeamStateContext } from "../../Teamboard";

const MemberList = () => {
  const teamData = useContext(TeamStateContext);
  const members = teamData.members;

  return (
    <div className={styles.memberList}>
      <div className={styles.memberList__item}>
        {members.map((member) => (
          <Link
            key={member.id}
            to={"/teamboard/member/profile"}
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
