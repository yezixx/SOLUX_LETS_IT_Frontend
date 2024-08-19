import styles from "./MemberList.module.css";
import MemberItem from "../../../../components/MemberItem/MemberItem";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TeamStateContext } from "../../Teamboard";
import { isLeader } from "../../isLeader";

const MemberList = () => {
  const { teamData, teamId } = useContext(TeamStateContext);
  const members = teamData.teamMemberInfo;
  console.log(members);

  const nav = useNavigate();

  const onClickMemberItem = (userId) => {
    nav(`/teamboard/member/profile/?team=${teamId}`, { state: { userId } });
  };

  return (
    <div className={styles.memberList}>
      <div className={styles.memberList__item}>
        {members.map((member, index) => (
          <MemberItem
            key={index}
            memberName={member.userName}
            memberId={member.userId}
            profilePic={member.profileImageUrl}
            onClick={() => {
              onClickMemberItem(member.userId);
            }}
            isLeader={isLeader(members, member.userId) ? "LEADER" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default MemberList;
