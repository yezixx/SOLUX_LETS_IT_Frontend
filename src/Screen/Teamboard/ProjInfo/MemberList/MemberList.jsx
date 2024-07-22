import styles from "./MemberList.module.css";
import MemberItem from "../../../../Components/MemberItem/MemberItem";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TeamStateContext } from "../../Teamboard";

const MemberList = () => {
  const { teamData } = useContext(TeamStateContext);
  const members = teamData.teamMemberInfo;

  const nav = useNavigate();

  const onClickMemberItem = (userId) => {
    nav(`/teamboard/member/profile/${userId}`);
  };

  return (
    <div className={styles.memberList}>
      <div className={styles.memberList__item}>
        {members.map((member, index) => (
          <MemberItem
            key={index}
            memberName={member.userName}
            memberId={member.userId}
            onClick={() => {
              onClickMemberItem(member.userId);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MemberList;
