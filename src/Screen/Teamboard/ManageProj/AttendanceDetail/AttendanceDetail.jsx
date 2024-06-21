import MemberItem from "../../../../Components/MemberItem/MemberItem";
import styles from "./AttendanceDetail.module.css";

const AttendanceDetail = () => {
  const members = [
    { id: 1, name: "유밍 BE" },
    { id: 2, name: "도라" },
    { id: 3, name: "Tom BE" },
  ];

  return (
    <div className={styles.attendanceDetail}>
      <div className={styles.attendanceDetail__container}>
        <div className={styles.attendanceDetail__label}>
          <span>3 번째</span> 회의 인증
        </div>
        <div className={styles.attendanceDetail__file}>
          <div className={styles.attendanceDetail__fileLabel}>
            <div className={styles.attendanceDetail__fileName}>
              this_week.png
            </div>
            <div className={styles.attendanceDetail__countLabel}>
              참여인원 3 | 불참인원 1
            </div>
          </div>
          <button className={styles.attendanceDetail__fileButton}>
            첨부파일
          </button>
        </div>
        <div className={styles.attendanceDetail__list}>
          <div className={styles.attendanceDetail__listLabel}>불참한 팀원</div>
          <div className={styles.attendanceDetail__item}>
            {members.map((member) => (
              <MemberItem key={member.id} memberName={member.name} />
            ))}
          </div>
        </div>
        <button className={styles.attendanceDetail__saveButton}>저장</button>
      </div>
    </div>
  );
};

export default AttendanceDetail;
