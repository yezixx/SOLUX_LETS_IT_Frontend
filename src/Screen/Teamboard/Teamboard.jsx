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
};

export const TeamStateContext = createContext();
export const TeamDispatchContext = createContext();
export const MemberStateContext = createContext();
export const MemberDispatchContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "DELETE":
      return state.filter(
        (item) => String(item.userId) !== String(action.userId)
      );
    default:
      return state;
  }
}

function teamReducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      return action.data;
    case "UPDATE_MEMBER":
      return action.data;
    default:
      return state;
  }
}

const Teamboard = () => {
  const [teamData, teamDispatch] = useReducer(teamReducer, mock_teamData);
  const [member, dispatch] = useReducer(reducer, teamData.members);

  const onDelete = (userId) => {
    dispatch({
      type: "DELETE",
      userId: userId,
    });
    teamDispatch({
      type: "UPDATE_MEMBER",
      data: {
        ...teamData,
        members: member,
      },
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
  console.log(teamData);

  return (
    <div className={styles.teamboard}>
      <TeamStateContext.Provider value={teamData}>
        <TeamDispatchContext.Provider value={{ onUpdateTeamData }}>
          <MemberStateContext.Provider value={member}>
            <MemberDispatchContext.Provider value={{ onDelete }}>
              <Outlet />
            </MemberDispatchContext.Provider>
          </MemberStateContext.Provider>
        </TeamDispatchContext.Provider>
      </TeamStateContext.Provider>
    </div>
  );
};

export default Teamboard;
