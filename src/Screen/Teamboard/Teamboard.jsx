import { createContext, useReducer, useRef } from "react";
import styles from "./Teamboard.module.css";
import { Outlet } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../atoms/atoms";

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
};

const mock_scheduleData = [
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
];

const mock_meetingData = [
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
];

const mock_kickData = [
  {
    id: 1,
    userId: "tom",
    name: "Tom BE",
    reason: "사유2",
    voteCount: [],
    agree: 0,
    disagree: 0,
  },
];

export const TeamStateContext = createContext();
export const TeamDispatchContext = createContext();

function teamReducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      return action.data;
    case "DELETE_MEMBER":
      if (action.data === state.leader) {
        return {
          ...state,
          members: state.members.filter(
            (item) => String(item.userId) !== String(action.data)
          ),
          leader: state.members.filter(
            (item) => String(item.userId) !== String(action.data)
          )[0].userId,
        };
      }

      return {
        ...state,
        members: state.members.filter(
          (item) => String(item.userId) !== String(action.data)
        ),
      };
    default:
      return state;
  }
}

function scheduleReducer(state, action) {
  switch (action.type) {
    case "CREATE_EVENT":
      return [...state, action.data];
    case "DELETE_EVENT":
      return state.filter((item) => String(item.id) !== String(action.data));
    default:
      return state;
  }
}

function kickReducer(state, action) {
  switch (action.type) {
    case "CREATE_VOTE":
      return [...state, action.data];
    case "AGREE":
    case "DISAGREE":
      return state.map((item) =>
        String(item.userId) === String(action.data.userId) ? action.data : item
      );
    case "DELETE_VOTE":
      return state.filter(
        (item) => String(item.userId) !== String(action.data)
      );
    default:
      return state;
  }
}

function meetingReducer(state, action) {
  switch (action.type) {
    case "SAVE_MEETING":
      return [...state, action.data];
    default:
      return state;
  }
}

function feedbackReducer(state, action) {
  switch (action.type) {
    case "SUBMIT_FEEDBACK":
      return [...state, action.data];
    default:
      return state;
  }
}

const Teamboard = () => {
  const [teamData, teamDispatch] = useReducer(teamReducer, mock_teamData);
  const [feedbackData, feedbackDispatch] = useReducer(feedbackReducer, []);
  const [scheduleData, scheduleDispatch] = useReducer(
    scheduleReducer,
    mock_scheduleData
  );
  const [kickData, kickDispatch] = useReducer(kickReducer, mock_kickData);
  const [meetingData, meetingDispatch] = useReducer(
    meetingReducer,
    mock_meetingData
  );

  const loginUserId = useAtomValue(userIdAtom);

  const kickIdRef = useRef(2);
  const meetingRef = useRef(3);
  const eventRef = useRef(3);

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

  const onCreateEvent = (title, startDate, endDate, description) => {
    if (startDate !== endDate) {
      const newDate = new Date(endDate);
      newDate.setDate(newDate.getDate() + 1);
      endDate = newDate.toISOString().split("T")[0];
    }
    scheduleDispatch({
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
      scheduleDispatch({
        type: "DELETE_EVENT",
        data: targetId,
      });
    }
  };

  const onVote = (memberId, reason) => {
    if (kickData.find((member) => String(member.userId) === String(memberId))) {
      alert("이미 투표 중인 팀원입니다.");

      return;
    }

    kickDispatch({
      type: "CREATE_VOTE",
      data: {
        id: kickIdRef.current++,
        userId: memberId,
        name: teamData.members.find(
          (member) => String(member.userId) === String(memberId)
        ).name,
        reason: reason,
        voteCount: [],
        agree: 0,
        disagree: 0,
      },
    });
  };

  console.log(kickData);

  const getTargetMember = (targetUserId) => {
    return kickData.find(
      (member) => String(member.userId) === String(targetUserId)
    );
  };

  const onAgree = (targetUserId) => {
    const targetData = getTargetMember(targetUserId);

    if (targetData.voteCount.includes(loginUserId)) {
      alert("투표는 1인당 1회만 가능합니다.");
      return;
    }

    kickDispatch({
      type: "AGREE",
      data: {
        ...targetData,
        agree: targetData.agree + 1,
        voteCount: [...targetData.voteCount, loginUserId],
      },
    });

    if (Number(targetData.agree + 1) === Number(teamData.members.length - 1)) {
      onDeleteVote(targetUserId);
      onDeleteMember(targetUserId);
    }
  };

  const onDisagree = (targetUserId) => {
    const targetData = getTargetMember(targetUserId);

    if (targetData.voteCount.includes(loginUserId)) {
      alert("투표는 1인당 1회만 가능합니다.");
      return;
    }

    kickDispatch({
      type: "DISAGREE",
      data: {
        ...targetData,
        disagree: targetData.disagree + 1,
        voteCount: [...targetData.voteCount, loginUserId],
      },
    });

    if (
      Number(targetData.voteCount.length) ===
        Number(teamData.members.length - 1) &&
      Number(targetData.agree) < Number(teamData.members.length - 1)
    ) {
      onDeleteVote(targetUserId);
    }
  };

  const onDeleteVote = (targetUserId) => {
    kickDispatch({
      type: "DELETE_VOTE",
      data: targetUserId,
    });
  };

  const onSaveMeeting = (meetingData) => {
    meetingDispatch({
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
      <TeamStateContext.Provider
        value={{ teamData, feedbackData, scheduleData, meetingData, kickData }}
      >
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
            onSubmitFeedback,
          }}
        >
          <Outlet />
        </TeamDispatchContext.Provider>
      </TeamStateContext.Provider>
    </div>
  );
};

export default Teamboard;
