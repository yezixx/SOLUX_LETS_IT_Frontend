import { createContext, useEffect, useReducer, useRef, useState } from "react";
import styles from "./Teamboard.module.css";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { delegateTeamLeader, updateTeam } from "../../service/teamService";
import { getTeam } from "../../service/teamService";
import Loading from "../../Components/Loading/Loading";

// 팀게시판 정보 Context
export const TeamStateContext = createContext();
export const TeamDispatchContext = createContext();

function teamReducer(state, action) {
  switch (action.type) {
    case "GET": // 팀 정보 불러오기
      return action.data;
    case "UPDATE": // 팀 정보 수정
      return action.data;
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
// 팀원 여부 확인
const isMember = (teamData, loginUserId) => {
  return teamData.teamMemberInfo.some(
    (member) => String(member.userId) === String(loginUserId)
  );
};

const Teamboard = () => {
  // 로딩 상태
  const [loading, setLoading] = useState(true);
  // 로그인한 유저 아이디
  const loginUserId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;

  // 팀 아이디
  const [params] = useSearchParams();
  const teamId = params.get("team");

  const nav = useNavigate();

  // 팀 정보 state
  const [teamData, teamDispatch] = useReducer(teamReducer, {
    teamName: "",
    notionLink: "",
    githubLink: "",
    teamMemberInfo: [],
  });
  const [kickData, kickDispatch] = useReducer(kickReducer, []);
  const [meetingData, meetingDispatch] = useReducer(meetingReducer, []);

  // 팀 정보 불러오기
  const fetchTeamData = async () => {
    setLoading(true); // 로딩 시작
    try {
      // 불러오기
      const data = await getTeam(teamId);
      await teamDispatch({
        type: "GET",
        data: data.data,
      });
      if (!isMember(data.data, loginUserId)) {
        // 팀원이 아닌 경우
        alert("팀원 외에는 접근할 수 없습니다.");
        nav(-1, { replace: true });
        return;
      }
      setLoading(false); // 로딩 끝
    } catch (error) {
      // 에러 발생 시
      console.log("teamboard error", error);
      alert("팀 정보를 불러오는 중 오류가 발생했습니다.");
      nav(-1, { replace: true });
    }
  };

  useEffect(() => {
    // 초기 데이터 불러오기
    const initializeData = async () => {
      await fetchTeamData();
    };
    initializeData();
  }, []);

  const kickIdRef = useRef(1);
  const meetingRef = useRef(1);

  const onDeleteMember = (userId) => {
    // 팀원 삭제
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

  const onUpdateTeamData = async (title, notion, github, selectedMember) => {
    // 팀 정보 state 수정 -> 근데 굳이?, 그냥 백엔드에서 다시 불러오면 될듯
    /*teamDispatch({
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
    });*/
    if (
      // 수정된 정보가 기존 정보와 다를 경우에만 실행
      !(
        teamData.teamName === title &&
        teamData.notionLink === notion &&
        teamData.githubLink === github
      )
    ) {
      try {
        await updateTeam(teamId, {
          // 백엔드에 수정된 정보 전송
          teamName: title,
          notionLink: notion,
          githubLink: github,
        });
        // 수정된 정보로 다시 불러오기
        await fetchTeamData();
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
        // 백엔드로 팀장 위임 요청
        await delegateTeamLeader(teamId, selectedMember);
        // 수정된 정보로 다시 불러오기
        await fetchTeamData();
      } catch (e) {
        console.log("delegateTeamLeader error", e);
      }
    }
  };

  const onVote = (memberId, reason) => {
    // 투표 한명만 가능하도록 할거라 필요없을듯
    /*if (kickData.find((member) => String(member.userId) === String(memberId))) {
      alert("이미 투표 중인 팀원입니다.");

      return;
    }*/
    // 투표중인 팀원 데이터 있는지 확인하고 있을 경우에는 투표 제안 불가능하도록 하는 로직 추가 필요
    // 백엔드로 투표 정보 요청보내고, 백엔드에서 투표 정보를 다시 받아오는 방식으로 변경 필요
    /*kickDispatch({
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
    });*/
  };

  // 이거 필요한가?...
  const getTargetMember = (targetUserId) => {
    return kickData.find(
      (member) => String(member.userId) === String(targetUserId)
    );
  };

  // 찬성
  const onAgree = (targetUserId) => {
    const targetData = getTargetMember(targetUserId); // 투표 대상

    // 1인당 1회만 가능하도록
    if (targetData.voteCount.includes(loginUserId)) {
      alert("투표는 1인당 1회만 가능합니다.");
      return;
    }

    // 백엔드로 투표 정보 요청보내고, 백엔드에서 투표 정보를 다시 받아오는 방식으로 변경 필요
    /*
    kickDispatch({
      type: "AGREE",
      data: {
        ...targetData,
        agree: targetData.agree + 1,
        voteCount: [...targetData.voteCount, loginUserId],
      },
    });*/

    // 투표가 팀원수 - 1과 같을 경우, 찬성이 다수일 경우 팀원 삭제 -> 근데 이거 백엔드에서 처리해줄듯?
    /*
    if (
      Number(targetData.agree + 1) ===
      Number(teamData.teamMemberInfo.length - 1)
    ) {
      onDeleteVote(targetUserId);
      onDeleteMember(targetUserId);
    }*/
  };

  // 반대
  const onDisagree = (targetUserId) => {
    const targetData = getTargetMember(targetUserId);

    // 1인당 1회만 가능하도록 -> 중복로직... 따로 뺄까?
    if (targetData.voteCount.includes(loginUserId)) {
      alert("투표는 1인당 1회만 가능합니다.");
      return;
    }

    // 백엔드로 투표 정보 요청보내고, 백엔드에서 투표 정보를 다시 받아오는 방식으로 변경 필요
    /*
    kickDispatch({
      type: "DISAGREE",
      data: {
        ...targetData,
        disagree: targetData.disagree + 1,
        voteCount: [...targetData.voteCount, loginUserId],
      },
    });*/

    // 투표가 팀원수 - 1과 같고 반대가 다수일 경우 투표 종료, 팀원 삭제는 x -> 이거도 아마 백엔드에서?
    /*
    if (
      Number(targetData.voteCount.length) ===
        Number(teamData.teamMemberInfo.length - 1) &&
      Number(targetData.agree) < Number(teamData.teamMemberInfo.length - 1)
    ) {
      onDeleteVote(targetUserId);
    }*/
  };

  // 투표 삭제(투표 종료) -> 백엔드에서 처리해줄듯?
  const onDeleteVote = (targetUserId) => {
    kickDispatch({
      type: "DELETE_VOTE",
      data: targetUserId,
    });
  };

  const onSaveMeeting = (meetingData) => {
    // 백엔드로 회의 정보 저장 요청보내고, 백엔드에서 회의 정보를 다시 받아오는 방식으로 변경 필요
    /*meetingDispatch({
      type: "SAVE_MEETING",
      data: {
        id: meetingRef.current++,
        ...meetingData,
      },
    });*/
  };

  return (
    <div className={styles.teamboard}>
      {loading && <Loading />}
      <TeamStateContext.Provider
        value={{
          teamData,
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
            onVote,
            onAgree,
            onDisagree,
            onSaveMeeting,
          }}
        >
          <Outlet />
        </TeamDispatchContext.Provider>
      </TeamStateContext.Provider>
    </div>
  );
};

export default Teamboard;
