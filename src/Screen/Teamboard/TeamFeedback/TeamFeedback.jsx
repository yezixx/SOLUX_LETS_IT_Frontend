import Button from "../../../Components/Button/Button";
import MemberItem from "../../../Components/MemberItem/MemberItem";
import CheckCircleIcon from "../../../Image/Icons/CheckCircleIcon";
import FeedbackFormItem from "./FeedbackFormItem/FeedbackFormItem";
import styles from "./TeamFeedback.module.css";

const TeamFeedback = () => {
  const members = [
    { id: 1, name: "유밍 BE" },
    { id: 2, name: "도라" },
    { id: 3, name: "Tom BE" },
  ];

  const questions = [
    "시간 / 기한은 잘 지켰나요?",
    "답장 속도는 적절했나요?",
    "적극적으로 프로젝트에 참여했나요?",
    "상대방을 존중하고 배려했나요?",
  ];

  return (
    <div className={styles.teamFeedback}>
      <div className={styles.teamFeedback__label}>팀원 평가</div>
      <div className={styles.teamFeedback__container}>
        <div className={styles.teamFeedback__innerLabel}>
          <CheckCircleIcon
            width={"26px"}
            height={"26px"}
            color={"var(--main-color2)"}
          />
          평가할 팀원을 선택해주세요
        </div>
        <div className={styles.teamFeedback__item}>
          {members.map((member) => (
            <MemberItem
              key={member.id}
              memberName={member.name}
              type={"ONLYBORDER"}
            />
          ))}
        </div>
        <div className={styles.teamFeedback__formContainer}>
          <div className={styles.teamFeedback__form}>
            {questions.map((question, index) => (
              <FeedbackFormItem key={index} question={question} />
            ))}
          </div>
        </div>
        <div className={styles.teamFeedback__submitButton}>
          <Button
            text="제출하기"
            borderRadius="10px"
            fontFamily="preTendardM"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamFeedback;
