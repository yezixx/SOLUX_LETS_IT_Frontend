import { createContext, useReducer } from "react";
import styles from "./Teamboard.module.css";
import { Outlet } from "react-router-dom";

const mock_teamData = {
  teamId: 1,
  title: "학원 청구 정산 서비스",
  collabLink: [
    {
      id: 1,
      link: "https://www.notion.so/ko-kr",
    },
    {
      id: 2,
      link: "https://github.com/",
    },
  ],
  leader: "yuming",
  members: [
    { id: 1, userId: "yuming", name: "유밍 BE" },
    { id: 2, userId: "dora", name: "도라" },
    { id: 3, userId: "tom", name: "Tom BE" },
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
};

export const TeamStateContext = createContext();
export const TeamDispatchContext = createContext();

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
    default:
      return state;
  }
}

const Teamboard = () => {
  const [teamData, teamDispatch] = useReducer(teamReducer, mock_teamData);

  const onDeleteMember = (userId) => {
    teamDispatch({
      type: "DELETE_MEMBER",
      data: userId,
    });
  };
  console.log(teamData);

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

  return (
    <div className={styles.teamboard}>
      <TeamStateContext.Provider value={teamData}>
        <TeamDispatchContext.Provider
          value={{ onUpdateTeamData, onDeleteMember }}
        >
          <Outlet />
        </TeamDispatchContext.Provider>
      </TeamStateContext.Provider>
    </div>
  );
};

export default Teamboard;
