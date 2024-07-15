import styles from "./SetMember.module.css";
import VoteSection from "./VoteSection/VoteSection";
import ReportSection from "./ReportSection/ReportSection";
import { useRef, useState } from "react";

const mock_voteKickmembers = [
  {
    id: 1,
    userId: "tom",
    name: "Tom BE",
    reason: "사유2",
    voteCount: 0,
    agree: 0,
    disagree: 0,
  },
];

const members = [
  { id: 1, userId: "yuming", name: "유밍 BE" },
  { id: 2, userId: "dora", name: "도라" },
  { id: 3, userId: "tom", name: "Tom BE" },
];

const SetMember = () => {
  const [voteKickmembers, setVotemembers] = useState(mock_voteKickmembers);

  const kickIdRef = useRef(2);

  const onVote = (memberId, reason) => {
    if (
      voteKickmembers.find(
        (member) => String(member.userId) === String(memberId)
      )
    ) {
      alert("이미 투표 중인 팀원입니다.");
      return;
    }

    setVotemembers([
      ...voteKickmembers,
      {
        id: kickIdRef.current++,
        userId: memberId,
        name: members.find(
          (member) => String(member.userId) === String(memberId)
        ).name,
        reason: reason,
        voteCount: 0,
        agree: 0,
        disagree: 0,
      },
    ]);
  };
  console.log(voteKickmembers);
  return (
    <div className={styles.setMember}>
      <VoteSection voteKickmembers={voteKickmembers} />
      <ReportSection members={members} onVote={onVote} />
    </div>
  );
};

export default SetMember;
