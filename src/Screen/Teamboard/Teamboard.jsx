import { createContext, useReducer, useRef } from "react";
import styles from "./Teamboard.module.css";
import { Outlet } from "react-router-dom";

const mock_teamData = {
  teamId: 1,
  title: "학원 청구 정산 서비스",
  collabLink: [
    {
      id: 1,
      tool: "notion",
      link: "https://www.notion.so/ko-kr",
    },
    {
      id: 2,
      tool: "github",
      link: "https://github.com/",
    },
  ],
  leader: "yuming",
  members: [
    { id: 1, userId: "yuming", name: "유밍 BE" },
    { id: 2, userId: "dora", name: "도라" },
    { id: 3, userId: "tom", name: "Tom BE" },
  ],
  events: [
    {
      id: 0,
      title: "event 1",
      start: "2024-07-01",
      end: "2024-07-01",
      description: "test",
    },
    {
      id: 1,
      title: "event 2",
      start: "2024-07-03",
      end: "2024-07-03",
      description: "test",
    },
    {
      id: 2,
      title: "event 3",
      start: "2024-07-01",
      end: "2024-07-03",
      description: "test",
    },
  ],
  voteKickmembers: [
    {
      id: 1,
      userId: "tom",
      name: "Tom BE",
      reason: "사유2",
      voteCount: 0,
      agree: 0,
      disagree: 0,
    },
  ],
  meetingLog: [
    {
      id: 1,
      date: "2024-04-10",
      nonParticipants: ["tom"],
      proofImages: "first_week.png",
    },
    {
      id: 2,
      date: "2024-04-14",
      nonParticipants: [],
      proofImages: "second_week.png",
    },
  ],
};

export const TeamStateContext = createContext();
export const TeamDispatchContext = createContext();
export const FeedbackStateContext = createContext();
export const FeedbackDispatchContext = createContext();

function teamReducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      return action.data;
    case "DELETE_MEMBER":
      return {
        ...state,
        members: state.members.filter(
          (item) => String(item.userId) !== String(action.data)
        ),
      };
    case "CREATE_EVENT":
      return {
        ...state,
        events: [...state.events, action.data],
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter(
          (item) => String(item.id) !== String(action.data)
        ),
      };
    case "CREATE_VOTE":
      return {
        ...state,
        voteKickmembers: [...state.voteKickmembers, action.data],
      };
    case ("AGREE", "DISAGREE"):
      return {
        ...state,
        voteKickmembers: state.voteKickmembers.map((item) =>
          String(item.userId) === String(action.data.userId)
            ? action.data
            : item
        ),
      };
    case "DELETE_VOTE":
      return {
        ...state,
        voteKickmembers: state.voteKickmembers.filter(
          (item) => String(item.userId) !== String(action.data)
        ),
      };
    case "SAVE_MEETING":
      return {
        ...state,
        meetingLog: [...state.meetingLog, action.data],
      };
    default:
      return state;
  }
}

function feedbackReducer(state, action) {
  switch (action.type) {
    case "SUBMIT_FEEDBACK":
      return [...state, action.data];
  }
}

const Teamboard = () => {
  const [teamData, teamDispatch] = useReducer(teamReducer, mock_teamData);
  const [feedbackData, feedbackDispatch] = useReducer(feedbackReducer, []);
  const kickIdRef = useRef(2);
  const meetingRef = useRef(3);
  const eventRef = useRef(3);

  console.log(feedbackData);

  const onDeleteMember = (userId) => {
    teamDispatch({
      type: "DELETE_MEMBER",
      data: userId,
    });
  };

  const onUpdateTeamData = (title, links, selectedMember) => {
    teamDispatch({
      type: "UPDATE",
      data: {
        ...teamData,
        title: title,
        collabLink: links,
        leader: selectedMember,
      },
    });
  };

  const onVote = (memberId, reason) => {
    if (
      teamData.voteKickmembers.find(
        (member) => String(member.userId) === String(memberId)
      )
    ) {
      alert("이미 투표 중인 팀원입니다.");

      return;
    }

    teamDispatch({
      type: "CREATE_VOTE",
      data: {
        id: kickIdRef.current++,
        userId: memberId,
        name: teamData.members.find(
          (member) => String(member.userId) === String(memberId)
        ).name,
        reason: reason,
        voteCount: 0,
        agree: 0,
        disagree: 0,
      },
    });
  };

  const onCreateEvent = (title, startDate, endDate, description) => {
    if (startDate !== endDate) {
      const newDate = new Date(endDate);
      newDate.setDate(newDate.getDate() + 1);
      endDate = newDate.toISOString().split("T")[0];
    }
    teamDispatch({
      type: "CREATE_EVENT",
      data: {
        id: eventRef.current++,
        title: title,
        start: startDate,
        end: endDate,
        description: description,
      },
    });
  };

  const onDeleteEvent = (targetId) => {
    if (confirm("일정을 삭제하시겠습니까?")) {
      teamDispatch({
        type: "DELETE_EVENT",
        data: targetId,
      });
    }
  };

  const onAgree = (targetUserId) => {
    const targetData = teamData.voteKickmembers.find(
      (member) => String(member.userId) === String(targetUserId)
    );
    teamDispatch({
      type: "AGREE",
      data: {
        agree: targetData.agree++,
        voteCount: targetData.voteCount++,
        ...targetData,
      },
    });

    if (Number(targetData.agree) === Number(teamData.members.length - 1)) {
      onDeleteVote(targetUserId);
      onDeleteMember(targetUserId);
    }
  };

  const onDisagree = (targetUserId) => {
    const targetData = teamData.voteKickmembers.find(
      (member) => String(member.userId) === String(targetUserId)
    );
    teamDispatch({
      type: "DISAGREE",
      data: {
        agree: targetData.disagree++,
        voteCount: targetData.voteCount++,
        ...targetData,
      },
    });

    if (
      Number(targetData.voteCount) === Number(teamData.members.length - 1) &&
      Number(targetData.agree) < Number(teamData.members.length - 1)
    ) {
      onDeleteVote(targetUserId);
    }
  };

  const onDeleteVote = (targetUserId) => {
    teamDispatch({
      type: "DELETE_VOTE",
      data: targetUserId,
    });
  };

  const onSaveMeeting = (meetingData) => {
    teamDispatch({
      type: "SAVE_MEETING",
      data: {
        id: meetingRef.current++,
        ...meetingData,
      },
    });
  };

  const onSubmitFeedback = (targetId, value) => {
    feedbackDispatch({
      type: "SUBMIT_FEEDBACK",
      data: {
        id: targetId,
        ...value,
      },
    });
  };

  return (
    <div className={styles.teamboard}>
      <TeamStateContext.Provider value={teamData}>
        <TeamDispatchContext.Provider
          value={{
            onUpdateTeamData,
            onDeleteMember,
            onCreateEvent,
            onDeleteEvent,
            onVote,
            onAgree,
            onDisagree,
            onSaveMeeting,
          }}
        >
          <FeedbackStateContext.Provider value={feedbackData}>
            <FeedbackDispatchContext.Provider value={onSubmitFeedback}>
              <Outlet />
            </FeedbackDispatchContext.Provider>
          </FeedbackStateContext.Provider>
        </TeamDispatchContext.Provider>
      </TeamStateContext.Provider>
    </div>
  );
};

export default Teamboard;
