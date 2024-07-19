import { useContext, useState } from "react";
import Button from "../../../Components/Button/Button";
import MemberItem from "../../../Components/MemberItem/MemberItem";
import CheckCircleIcon from "../../../Image/Icons/CheckCircleIcon";
import FeedbackFormItem from "./FeedbackFormItem/FeedbackFormItem";
import styles from "./TeamFeedback.module.css";
import { TeamDispatchContext, TeamStateContext } from "../Teamboard";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../../atoms/atoms";
import { useNavigate } from "react-router-dom";

const getMembersExcludingSelf = (loginUserId, members) => {
  return members.filter(
    (member) => String(member.userId) !== String(loginUserId)
  );
};

const isCompletedMember = (targetId, data) => {
  const isIncluded = data.some(
    (member) => String(member.id) === String(targetId)
  );
  return isIncluded;
};

const TeamFeedback = () => {
  const { teamData } = useContext(TeamStateContext);
  const members = teamData.members;

  const { feedbackData } = useContext(TeamStateContext);
  const { onSubmitFeedback } = useContext(TeamDispatchContext);

  const [selectedMember, setSelectedMember] = useState();
  const [feedback, setFeedback] = useState();
  const [promiseValue, setPromiseValue] = useState();
  const [frequencyValue, setFrequencyValue] = useState();
  const [participateValue, setParticipateValue] = useState();
  const [kindnessValue, setKindnessValue] = useState();

  /*userId 전역 상태에서 불러오기 */
  const loginUserId = useAtomValue(userIdAtom);

  const nav = useNavigate();

  const membersExcludingSelf = getMembersExcludingSelf(loginUserId, members);

  const onChangePromise = (value) => {
    setFeedback({
      ...feedback,
      promise: value,
    });
    setPromiseValue(value);
  };
  const onChangeFrequency = (value) => {
    setFeedback({
      ...feedback,
      frequency: value,
    });
    setFrequencyValue(value);
  };
  const onChangeParticipate = (value) => {
    setFeedback({
      ...feedback,
      participate: value,
    });
    setParticipateValue(value);
  };
  const onChangeKindness = (value) => {
    setFeedback({
      ...feedback,
      kindness: value,
    });
    setKindnessValue(value);
  };

  const isValidate = () => {
    if (!selectedMember) {
      alert("평가할 팀원을 선택해주세요.");
      return false;
    }

    const feedbackValues = feedback ? Object.values(feedback) : null;
    if (
      feedbackValues === null ||
      Number(feedbackValues.length) !== 4 ||
      feedbackValues.every((data) => data === undefined)
    ) {
      alert("모든 항목에 체크해주세요.");
      return false;
    }
    return true;
  };

  const onClickSubimt = () => {
    if (!isValidate()) return;

    if (!confirm("평가를 제출하시겠습니까?")) return;
    onSubmitFeedback(selectedMember, feedback);

    setSelectedMember(null);
    setPromiseValue(null);
    setFrequencyValue(null);
    setParticipateValue(null);
    setKindnessValue(null);
    setFeedback(null);
  };

  const onClickFinish = () => {
    if (!isValidate()) return;
    onSubmitFeedback(selectedMember, feedback);
    alert("팀원 평가를 완료합니다.");

    setSelectedMember(null);
    setPromiseValue(null);
    setFrequencyValue(null);
    setParticipateValue(null);
    setKindnessValue(null);
    setFeedback(null);

    nav("/myproj/attendproj", { replace: true });
  };

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
          {membersExcludingSelf.map((member) => (
            <MemberItem
              key={member.id}
              memberName={member.name}
              type={
                isCompletedMember(member.userId, feedbackData)
                  ? "COMPLETED"
                  : String(selectedMember) === String(member.userId)
                  ? "ONLYBORDER_SELECTED"
                  : "ONLYBORDER"
              }
              onClick={() => {
                setSelectedMember(member.userId);
              }}
            />
          ))}
        </div>
        <div className={styles.teamFeedback__formContainer}>
          <div className={styles.teamFeedback__form}>
            <FeedbackFormItem
              targetId={selectedMember}
              question={"시간 / 기한은 잘 지켰나요?"}
              answer={promiseValue}
              onChange={onChangePromise}
            />
            <FeedbackFormItem
              targetId={selectedMember}
              question={"답장 속도는 적절했나요?"}
              answer={frequencyValue}
              onChange={onChangeFrequency}
            />
            <FeedbackFormItem
              targetId={selectedMember}
              question={"적극적으로 프로젝트에 참여했나요?"}
              answer={participateValue}
              onChange={onChangeParticipate}
            />
            <FeedbackFormItem
              targetId={selectedMember}
              question={"상대방을 존중하고 배려했나요?"}
              answer={kindnessValue}
              onChange={onChangeKindness}
            />
          </div>
        </div>
        <div className={styles.teamFeedback__submitButton}>
          {feedbackData.length === membersExcludingSelf.length - 1 ? (
            <Button
              text={"평가종료"}
              type={"RAD-10__FONT-M"}
              onClick={onClickFinish}
            />
          ) : (
            <Button
              text={"제출하기"}
              type={"RAD-10__FONT-M"}
              onClick={onClickSubimt}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamFeedback;
