import MemberItem from "../../../../Components/MemberItem/MemberItem";
import styles from "./ReportSection.module.css";
import QuestionMarkIcon from "../../../../Image/Icons/QuestionMarkIcon";
import ToolTip from "../../../../Components/ToolTip/ToolTip";
import Button from "../../../../Components/Button/Button";
import { useContext, useRef, useState } from "react";
import { TeamDispatchContext, TeamStateContext } from "../../Teamboard";

const OPTIONS = [
  { id: 0, value: "사유1" },
  { id: 1, value: "사유2" },
  { id: 2, value: "사유3" },
  { id: 3, value: "사유4" },
  { id: 4, value: "사유5" },
  { id: 5, value: "사유6" },
];

const msg = (
  <ul style={{ listStyleType: "disc", paddingLeft: "40px" }}>
    <li>강퇴 : 프로젝트 강제 퇴장 및 페널티</li>
    <li>신고 : 프로젝트는 그대로 진행 및 페널티</li>
  </ul>
);
const ReportSection = ({ onReport }) => {
  const teamData = useContext(TeamStateContext);
  const members = teamData.members;
  const { onVote } = useContext(TeamDispatchContext);

  const [visible, setVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState();
  const [selectedOption, setSelectedOption] = useState();

  const selectRef = useRef();

  const onClickKick = () => {
    // 선택한 팀원이 없을 경우
    if (!selectedMember) {
      alert("팀원을 선택해주세요.");
      return;
    }
    // 선택한 이유가 없을 경우
    if (!selectedOption) {
      selectRef.current.focus();
      return;
    }
    if (
      confirm("강퇴 제안은 취소할 수 없습니다.\n계속해서 진행하시겠습니까?")
    ) {
      onVote(selectedMember, selectedOption);
      // 선택 초기화
      setSelectedMember(null);
      setSelectedOption(null);
      selectRef.current.value = "null";
    }
  };

  const onClickReport = () => {
    // 선택한 팀원이 없을 경우
    if (!selectedMember) {
      alert("팀원을 선택해주세요.");
      return;
    }
    // 선택한 이유가 없을 경우
    if (!selectedOption) {
      selectRef.current.focus();
      return;
    }
    if (confirm("신고를 완료하시겠습니까?")) {
      onReport(selectedMember, selectedOption);
      // 선택 초기화
      setSelectedMember(null);
      setSelectedOption(null);
      selectRef.current.value = "null";
    }
  };

  const onChangeOption = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className={styles.reportSection}>
      <div className={styles.reportSection__label}>
        <div>강퇴 및 신고</div>
        {visible && (
          <div className={styles.reportSection__toolTip}>
            <ToolTip msg={msg} width={"300px"} height={"60px"} />
          </div>
        )}
        <div
          className={styles.reportSection__icon}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <QuestionMarkIcon width={"15px"} height={"15px"} />
        </div>
      </div>
      <div className={styles.reportSection__item}>
        {members.map((member) => (
          <MemberItem
            key={member.id}
            memberName={member.name}
            onClick={() => setSelectedMember(member.userId)}
            type={`${selectedMember === member.userId ? "SELECTED" : ""}`}
          />
        ))}
      </div>
      <div className={styles.reportSection__dropBoxButtonsWrap}>
        <select
          className={styles.reportSection__dropBox}
          onChange={onChangeOption}
          ref={selectRef}
          defaultValue="null"
        >
          <option
            value="null"
            disabled
            hidden
            className={styles.reportSection__option}
          >
            강퇴 및 신고 사유를 선택해주세요.
          </option>
          {OPTIONS.map((option) => (
            <option
              className={styles.reportSection__option}
              key={option.id}
              value={option.value}
            >
              {option.value}
            </option>
          ))}
        </select>
        <div className={styles.reportSection__buttons}>
          <Button text="강퇴 제안" type="POINT_120x40" onClick={onClickKick} />
          <Button text="신고" type="BOR_POINT_70x40" onClick={onClickReport} />
        </div>
      </div>
    </div>
  );
};

export default ReportSection;
