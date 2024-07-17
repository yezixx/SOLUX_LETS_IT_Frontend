import { useContext, useState } from "react";
import Button from "../../../../Components/Button/Button";
import MemberItem from "../../../../Components/MemberItem/MemberItem";
import { TeamDispatchContext, TeamStateContext } from "../../Teamboard";
import styles from "./AttendanceDetail.module.css";

const AttendanceDetail = () => {
  const teamData = useContext(TeamStateContext);
  const members = teamData.members;
  const meetings = teamData.meetingLog;
  const { onSaveMeeting } = useContext(TeamDispatchContext);
  const [selectedMember, setSelectedMember] = useState();
  const [proofImage, setProofImage] = useState();

  const onClickSave = () => {
    if (selectedMember && members.length - selectedMember.length < 1) {
      alert("참여인원은 1명 이상이어야 합니다.");
      return;
    }
    onSaveMeeting({
      date: new Date().toISOString().split("T")[0],
      nonParticipants: selectedMember ? selectedMember : [],
      proofImages: "third_week.png",
    });
    setSelectedMember(null);
  };

  const onClickMember = (userId) => {
    if (selectedMember && selectedMember.includes(userId)) {
      setSelectedMember(
        selectedMember.filter((member) => String(member) !== String(userId))
      );
    } else if (selectedMember && !selectedMember.includes(userId))
      setSelectedMember([...selectedMember, userId]);
    else setSelectedMember([userId]);
  };

  return (
    <div className={styles.attendanceDetail}>
      <div className={styles.attendanceDetail__container}>
        <div className={styles.attendanceDetail__label}>
          <span>{meetings.length + 1} 번째</span> 회의 인증
        </div>
        <div className={styles.attendanceDetail__file}>
          <div className={styles.attendanceDetail__fileLabel}>
            <div className={styles.attendanceDetail__fileName}>
              {proofImage}
            </div>
            <div className={styles.attendanceDetail__countLabel}>
              참여인원{" "}
              {selectedMember
                ? members.length - selectedMember.length
                : members.length}{" "}
              | 불참인원 {selectedMember ? selectedMember.length : 0}
            </div>
          </div>
          <Button text="첨부파일" type="SEC_80x30" />
        </div>
        <div className={styles.attendanceDetail__list}>
          <div className={styles.attendanceDetail__listLabel}>불참한 팀원</div>
          <div className={styles.attendanceDetail__members}>
            {members.map((member) =>
              selectedMember && selectedMember.includes(member.userId) ? (
                <MemberItem
                  key={member.id}
                  memberName={member.name}
                  type="SELECTED"
                  onClick={() => {
                    onClickMember(member.userId);
                  }}
                />
              ) : (
                <MemberItem
                  key={member.id}
                  memberName={member.name}
                  onClick={() => {
                    onClickMember(member.userId);
                  }}
                />
              )
            )}
          </div>
        </div>
        <div className={styles.attendanceDetail__button}>
          <Button text={"저장"} type={"MC2_120x40"} onClick={onClickSave} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetail;
