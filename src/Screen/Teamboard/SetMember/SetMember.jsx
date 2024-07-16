import styles from "./SetMember.module.css";
import VoteSection from "./VoteSection/VoteSection";
import ReportSection from "./ReportSection/ReportSection";
import { createContext, useContext, useReducer, useRef } from "react";
import { MemberStateContext } from "../Teamboard";

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

export const KickStateContext = createContext();
export const KickDispatchContext = createContext();

const kickReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return [...state, action.data];
    case ("AGREE", "DISAGREE"):
      return state.map((item) =>
        String(item.userId) === String(action.data.userId) ? action.data : item
      );
    default:
      return state;
  }
};

const SetMember = () => {
  const members = useContext(MemberStateContext);

  const [voteKickmembers, dispatch] = useReducer(
    kickReducer,
    mock_voteKickmembers
  );

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

    dispatch({
      type: "CREATE",
      data: {
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
    });
  };

  const onAgree = (targetUserId) => {
    const targetData = voteKickmembers.find(
      (member) => String(member.userId) === String(targetUserId)
    );
    dispatch({
      type: "AGREE",
      data: {
        agree: targetData.agree++,
        voteCount: targetData.voteCount++,
        ...targetData,
      },
    });
  };

  const onDisagree = (targetUserId) => {
    const targetData = voteKickmembers.find(
      (member) => String(member.userId) === String(targetUserId)
    );
    dispatch({
      type: "DISAGREE",
      data: {
        agree: targetData.disagree++,
        voteCount: targetData.voteCount++,
        ...targetData,
      },
    });
  };

  console.log(voteKickmembers);

  const onReport = (memberId, reason) => {
    alert(`${memberId}님을 신고하였습니다.\n사유: ${reason}`);
  };

  return (
    <div className={styles.setMember}>
      <KickStateContext.Provider value={voteKickmembers}>
        <KickDispatchContext.Provider value={{ onVote, onAgree, onDisagree }}>
          <VoteSection />
          <ReportSection onReport={onReport} />
        </KickDispatchContext.Provider>
      </KickStateContext.Provider>
    </div>
  );
};

export default SetMember;
