import styles from "./SetMember.module.css";
import VoteSection from "./VoteSection/VoteSection";
import ReportSection from "./ReportSection/ReportSection";

const SetMember = () => {
  const onReport = (memberId, reason) => {
    alert(`${memberId}님을 신고하였습니다.\n사유: ${reason}`);
  };

  return (
    <div className={styles.setMember}>
      <VoteSection />
      <ReportSection onReport={onReport} />
    </div>
  );
};

export default SetMember;
