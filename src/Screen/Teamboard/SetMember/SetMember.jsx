import styles from "./SetMember.module.css";
import VoteSection from "./VoteSection/VoteSection";
import ReportSection from "./ReportSection/ReportSection";
import { useContext } from "react";
import { TeamStateContext } from "../Teamboard";

const SetMember = () => {
  const { teamData } = useContext(TeamStateContext);
  const members = teamData.teamMemberInfo;
  const onReport = (memberId, reason) => {
    const targetName = members.find(
      (member) => member.userId === memberId
    ).userName;
    alert(`${targetName}님을 신고하였습니다.\n사유: ${reason}`);
  };

  return (
    <div className={styles.setMember}>
      <VoteSection />
      <ReportSection onReport={onReport} />
    </div>
  );
};

export default SetMember;
