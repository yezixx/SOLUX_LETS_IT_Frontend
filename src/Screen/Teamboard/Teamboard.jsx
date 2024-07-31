import { createContext, useEffect, useReducer, useRef, useState } from "react";
import styles from "./Teamboard.module.css";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import {
  createSchedule,
  delegateTeamLeader,
  deleteSchedule,
  evaluateMember,
  getSchedule,
  updateTeam,
} from "../../service/teamService";
import { getTeam } from "../../service/teamService";
import Loading from "../../Components/Loading/Loading";

export const TeamStateContext = createContext();
export const TeamDispatchContext = createContext();

function teamReducer(state, action) {
  switch (action.type) {
    case "GET":
      return action.data;
    case "UPDATE":
      return action.data;
    default:
      return state;
  }
}

function scheduleReducer(state, action) {
  switch (action.type) {
    case "GET_EVENT":
      return action.data.map((item) => {
        return {
          id: String(item.calendarId),
          title: String(item.title),
          start: String(item.startDate),
          end: String(item.endDate),
          description: String(item.description),
        };
      });
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

const isMember = (teamData, loginUserId) => {
  return teamData.teamMemberInfo.some(
    (member) => String(member.userId) === String(loginUserId)
  );
};

const Teamboard = () => {
  const [loading, setLoading] = useState(true);
  const loginUserId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;

  const [params] = useSearchParams();
  const teamId = params.get("team");

  const nav = useNavigate();

  const [teamData, teamDispatch] = useReducer(teamReducer, {
    teamName: "",
    notionLink: "",
    githubLink: "",
    teamMemberInfo: [],
  });

  const [feedbackData, feedbackDispatch] = useReducer(feedbackReducer, []);
  const [scheduleData, scheduleDispatch] = useReducer(scheduleReducer, []);
  const [kickData, kickDispatch] = useReducer(kickReducer, []);
  const [meetingData, meetingDispatch] = useReducer(meetingReducer, []);

  const fetchTeamData = async () => {
    setLoading(true);
    try {
      const data = await getTeam(teamId);
      await teamDispatch({
        type: "GET",
        data: data.data,
      });
      if (!isMember(data.data, loginUserId)) {
        alert("팀원 외에는 접근할 수 없습니다.");
        nav(-1);
        return;
      }
      setLoading(false);
    } catch (error) {
      console.log("teamboard error", error);
      alert("팀 정보를 불러오는 중 오류가 발생했습니다.");
      nav(-1);
    }
  };

  const fetchScheduleData = async () => {
    try {
      const data = await getSchedule(teamId);
      await scheduleDispatch({
        type: "GET_EVENT",
        data: data.data,
      });
    } catch (error) {
      console.log("schedule error", error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchTeamData();
      await fetchScheduleData();
    };
    initializeData();
  }, []);

  const kickIdRef = useRef(1);
  const meetingRef = useRef(1);

  const onDeleteMember = (userId) => {
    const filteredMember = teamData.teamMemberInfo.filter((item) => {
      return String(item.userId) !== String(userId);
    });
    if (
      userId ===
      teamData.teamMemberInfo.find((item) => item.position === "Team_Leader")
        .userId
    ) {
      teamDispatch({
        type: "UPDATE",
        data: {
          ...teamData,
          teamMemberInfo: filteredMember.map((item, index) =>
            index === 0
              ? { ...item, position: "Team_Leader" }
              : { ...item, position: "Team_Member" }
          ),
        },
      });
    } else {
      teamDispatch({
        type: "UPDATE",
        data: {
          ...teamData,
          teamMemberInfo: [...filteredMember],
        },
      });
    }
  };

  const onUpdateTeamData = (title, notion, github, selectedMember) => {
    teamDispatch({
      type: "UPDATE",
      data: {
        ...teamData,
        teamName: title,
        notionLink: notion,
        githubLink: github,
        teamMemberInfo: teamData.teamMemberInfo.map((member) => {
          if (String(member.userId) === String(selectedMember)) {
            return { ...member, position: "Team_Leader" };
          }
          return { ...member, position: "Team_Member" };
        }),
      },
    });
    if (
      // 수정된 정보가 기존 정보와 다를 경우에만 실행
      !(
        teamData.teamName === title &&
        teamData.notionLink === notion &&
        teamData.githubLink === github
      )
    ) {
      try {
        updateTeam(teamId, {
          teamName: title,
          notionLink: notion,
          githubLink: github,
        });
      } catch (e) {
        console.log("updateTeam error", e);
      }
    }

    if (
      // 선택한 팀원이 팀장이 아닌 경우
      !(
        teamData.teamMemberInfo.find(
          (member) => String(member.userId) === String(selectedMember)
        ).position === "Team_Leader"
      )
    ) {
      try {
        console.log(teamId, selectedMember);
        delegateTeamLeader(teamId, selectedMember);
      } catch (e) {
        console.log("delegateTeamLeader error", e);
      }
    }
  };

  const onCreateEvent = async (title, startDate, endDate, description) => {
    if (startDate !== endDate) {
      const newDate = new Date(endDate);
      newDate.setDate(newDate.getDate() + 1);
      endDate = newDate.toISOString().split("T")[0];
    }
    await createSchedule(teamId, {
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
    });
    fetchScheduleData();
  };

  const onDeleteEvent = (targetId) => {
    if (confirm("일정을 삭제하시겠습니까?")) {
      deleteSchedule(targetId);
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
        name: teamData.teamMemberInfo.find(
          (member) => String(member.userId) === String(memberId)
        ).userName,
        reason: reason,
        voteCount: [],
        agree: 0,
        disagree: 0,
      },
    });
  };

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

    if (
      Number(targetData.agree + 1) ===
      Number(teamData.teamMemberInfo.length - 1)
    ) {
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
        Number(teamData.teamMemberInfo.length - 1) &&
      Number(targetData.agree) < Number(teamData.teamMemberInfo.length - 1)
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

  const onSubmitFeedback = (teamId, loginUserId, targetId, value) => {
    feedbackDispatch({
      type: "SUBMIT_FEEDBACK",
      data: {
        userId: targetId,
      },
    });
    evaluateMember(teamId, loginUserId, targetId, value);
  };

  return (
    <div className={styles.teamboard}>
      {loading ? <Loading /> : null}
      <TeamStateContext.Provider
        value={{
          teamData,
          feedbackData,
          scheduleData,
          meetingData,
          kickData,
          teamId,
          loading,
        }}
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
