import { createContext, useReducer } from "react";
import styles from "./Teamboard.module.css";
import { Outlet } from "react-router-dom";

const mock_members = [
  { id: 1, userId: "yuming", name: "유밍 BE" },
  { id: 2, userId: "dora", name: "도라" },
  { id: 3, userId: "tom", name: "Tom BE" },
];

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

const Teamboard = () => {
  const [member, dispatch] = useReducer(reducer, mock_members);

  const onDelete = (userId) => {
    dispatch({
      type: "DELETE",
      userId: userId,
    });
  };
  return (
    <div className={styles.teamboard}>
      <MemberStateContext.Provider value={member}>
        <MemberDispatchContext.Provider value={{ onDelete }}>
          <Outlet />
        </MemberDispatchContext.Provider>
      </MemberStateContext.Provider>
    </div>
  );
};

export default Teamboard;
