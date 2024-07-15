import MemberItem from "../../../../Components/MemberItem/MemberItem";
import styles from "./ReportSection.module.css";
import QuestionMarkIcon from "../../../../Image/Icons/QuestionMarkIcon";
import ToolTip from "../../../../Components/ToolTip/ToolTip";
import Button from "../../../../Components/Button/Button";
import { useState } from "react";

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
const ReportSection = () => {
  const [visible, setVisible] = useState(false);

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
          <MemberItem key={member.id} memberName={member.name} />
        ))}
      </div>
      <div className={styles.reportSection__dropBoxButtonsWrap}>
        <select className={styles.reportSection__dropBox}>
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
          <Button text="강퇴 제안" type="POINT_120x40" />
          <Button text="신고" type="BOR_POINT_70x40" />
        </div>
      </div>
    </div>
  );
};

export default ReportSection;
