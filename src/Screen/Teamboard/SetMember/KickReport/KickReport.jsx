import MemberItem from "../../ProjInfo/MemberList/MemberItem/MemberItem";
import styles from "./KickReport.module.css";
import QuestionMarkIcon from "../../../../Image/Icons/QuestionMarkIcon";
import ToolTip from "../../../../Components/ToolTip/ToolTip";

const KickReport = () => {
  const members = [
    { id: 1, name: "유밍 BE" },
    { id: 2, name: "도라" },
    { id: 3, name: "Tom BE" },
  ];

  const OPTIONS = [
    { id: null, value: "강퇴 사유를 선택해주세요." },
    { id: 0, value: "사유1" },
    { id: 1, value: "사유2" },
    { id: 2, value: "사유3" },
    { id: 3, value: "사유4" },
    { id: 4, value: "사유5" },
    { id: 5, value: "사유6" },
  ];

  const msg = (
    <ul style={{ listStyleType: "disc", paddingLeft: "40px" }}>
      <li>강퇴 : 프로그램 강제 퇴장 및 페널티</li>
      <li>신고 : 프로그램은 그대로 진행 및 페널티</li>
    </ul>
  );

  return (
    <div className={styles.kickReport}>
      <div className={styles.kickReport__label}>
        <div>강퇴 및 신고</div>
        <div className={styles.kickReport__toolTip}>
          <ToolTip msg={msg} width={"300px"} height={"60px"} />
        </div>
        <div className={styles.kickReport__icon}>
          <QuestionMarkIcon width={"15px"} height={"15px"} />
        </div>
      </div>
      <div className={styles.kickReport__container}>
        {members.map((member) => (
          <MemberItem key={member.id} memberName={member.name} />
        ))}
      </div>
      <div className={styles.kickReport__dropBoxButtonsWrap}>
        <select className={styles.kickReport__dropBox}>
          {OPTIONS.map((option) => (
            <option
              className={styles.kickReport__option}
              key={option.id}
              value={option.value}
            >
              {option.value}
            </option>
          ))}
        </select>
        <div className={styles.kickReport__buttons}>
          <button className={styles.kickReport__kickButton}>강퇴 제안</button>
          <button className={styles.kickReport__reportButton}>신고</button>
        </div>
      </div>
    </div>
  );
};

export default KickReport;
