import { createContext, useEffect, useReducer, useRef, useState } from "react";
import styles from "./Teamboard.module.css";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isLoginAtom, userIdAtom } from "../../atoms/atoms";
import {
  delegateTeamLeader,
  evaluateMember,
  updateTeam,
} from "../../service/teamService";
import { getTeam } from "../../service/teamService";
import Loading from "../../Components/Loading/Loading";

const mock_teamData = [
  {
    teamId: 1,
    teamName: "팀게시판 메인",
    notionLink: "https://www.notion.so/project1",
    githubLink: "https://github.com/project1",
    teamMemberInfo: [
      {
        userId: 1,
        userName: "Alice",
        position: "Team_Leader",
        profile_image_url: "testurl1",
      },
      {
        userId: 2,
        userName: "Bob",
        position: "Team_Member",
        profile_image_url: "testurl2",
      },
      {
        userId: 3,
        userName: "Charlie",
        position: "Team_Leader",
        profile_image_url: "testurl3",
      },
    ],
  },
  {
    teamId: 2,
    teamName: "팀 데이터 2",
    notionLink: "https://www.notion.so/project2",
    githubLink: "https://github.com/project2",
    teamMemberInfo: [
      {
        userId: "1",
        userName: "Charlie",
        position: "Team_Leader",
        profile_image_url: "testurl1",
      },
      {
        userId: "2",
        userName: "Diana",
        position: "Team_Member",
        profile_image_url: "testurl2",
      },
      {
        userId: 3,
        userName: "3",
        position: "Team_Member",
        profile_image_url: "testurl3",
      },
    ],
  },
];

const mock_scheduleData = [
  /*
  {
    id: 0,
    title: "프엔 회의",
    start: "2024-07-01",
    end: "2024-07-01",
    description: `회의 안건
      - 라이브러리 선정
      - 화면 구조 논의`,
  },
  {
    id: 1,
    title: "정기 회의",
    start: "2024-07-03",
    end: "2024-07-03",
    description: `회의 안건
    - 프론트&백 스터디 진행 상황 공유
    - 서비스 네이밍
    - 다음주 일정 공유`,
  },
  {
    id: 2,
    title: "스터디 인증 기간",
    start: "2024-07-22",
    end: "2024-07-27",
    description:
      "각자 수강한 스터디 강의 노션의 스터디 > 인증 보드에 인증해주세요!",
  },*/
];

const mock_meetingData = [
  /*
  {
    id: 1,
    date: "2024-07-03",
    nonParticipants: ["Alice"],
    proofImages: "first_week.png",
  },
  {
    id: 2,
    date: "2024-07-10",
    nonParticipants: [],
    proofImages: "second_week.png",
  },*/
];

const mock_kickData = [
  /*{
    id: 1,
    userId: "letsit_backend.model.Member@72f9fde6",
    name: "Alice",
    reason: "사유2",
    voteCount: [],
    agree: 0,
    disagree: 0,
  },*/
];

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
  console.log(
    teamData.teamMemberInfo.some(
      (member) => String(member.userId) === String(loginUserId)
    )
  );
  return teamData.teamMemberInfo.some(
    (member) => String(member.userId) === String(loginUserId)
  );
};

const Teamboard = () => {
  const [loading, setLoading] = useState(true);
  const loginUserId = useAtomValue(userIdAtom);

  const islogin = useAtomValue(isLoginAtom);

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
  const [scheduleData, scheduleDispatch] = useReducer(
    scheduleReducer,
    mock_scheduleData
  );
  const [kickData, kickDispatch] = useReducer(kickReducer, mock_kickData);
  const [meetingData, meetingDispatch] = useReducer(
    meetingReducer,
    mock_meetingData
  );

  const fetchTeamData = async () => {
    setLoading(true);
    try {
      const data = await getTeam(teamId);
      teamDispatch({
        type: "GET",
        data: data.data,
      });
      setLoading(false);

      /*if (!isMember(teamData, loginUserId)) {
        alert("팀원 외에는 접근할 수 없습니다.");
        nav("/");
        return;
      }*/
      if (!loginUserId) {
        alert("로그인이 필요한 페이지입니다.");
        nav("/");
      }
    } catch (error) {
      console.log("teamboard error", error);
      setLoading(false);
      alert("팀 정보를 불러오는 중 오류가 발생했습니다.");
      nav(`/`);
    }
  };

  useEffect(() => {
    /*if (!islogin) { // 로그인 안되어있으면 로그인 페이지로 이동
      nav("/login");
    }*/
    console.log(islogin);
    fetchTeamData();
    /*getTeam(teamId)
      .then((res) => {
        teamDispatch({
          type: "GET",
          data: res.data,
        });
        console.log(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log("teamboard error", error);
      });*/
  }, []);
  console.log(teamData);

  const kickIdRef = useRef(1);
  const meetingRef = useRef(1);
  const eventRef = useRef(1);

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
