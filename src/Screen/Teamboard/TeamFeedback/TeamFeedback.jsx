import { useContext, useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import MemberItem from "../../../components/MemberItem/MemberItem";
import CheckCircleIcon from "../../../Image/Icons/CheckCircleIcon";
import FeedbackFormItem from "./FeedbackFormItem/FeedbackFormItem";
import styles from "./TeamFeedback.module.css";
import { TeamDispatchContext, TeamStateContext } from "../Teamboard";
import { useNavigate } from "react-router-dom";
import {
  checkTeamCompleted,
  getEvaluatedList
} from "../../../service/teamService";
import Loading from "../../../components/Loading/Loading";

const getMembersExcludingSelf = (loginUserId, members) => {
  return members.filter(
    (member) => String(member.userId) !== String(loginUserId)
  );
};

const isCompletedMember = (feedbackTargetId, evaluatedList) => {
  //if (!evaluatedList) return false;
  const isIncluded = evaluatedList.find(
    (member) => member.userId === feedbackTargetId
  );
  return isIncluded;
};

const TeamFeedback = () => {
  const { teamData, teamId } = useContext(TeamStateContext);
  const members = teamData.teamMemberInfo;

  const { feedbackData } = useContext(TeamStateContext);
  const { onSubmitFeedback } = useContext(TeamDispatchContext);

  const [selectedMemberId, setSelectedMemberId] = useState();
  const [feedback, setFeedback] = useState();
  const [promiseValue, setPromiseValue] = useState();
  const [frequencyValue, setFrequencyValue] = useState();
  const [participateValue, setParticipateValue] = useState();
  const [kindnessValue, setKindnessValue] = useState();
  const [loading, setLoading] = useState(true);
  const [evaluatedList, setEvaluatedList] = useState([]);

  const loginUserId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;

  const nav = useNavigate();

  const membersExcludingSelf = getMembersExcludingSelf(loginUserId, members);

  let pollingInterval = null; // 폴링 간격을 관리할 로컬 변수

  console.log(feedbackData);

  const fetchEvaluatedListData = async () => {
    try {
      const response = await getEvaluatedList(teamId, loginUserId);
      setEvaluatedList(response.data);
    } catch (error) {
      console.error("Error fetching evaluated member list", error);
      alert("평가한 팀원 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchIsTeamCompleted = async () => {
    try {
      const response = await checkTeamCompleted(teamId);
      console.log("isTeamCompleted", response.data);
      if (!response.data) {
        alert("팀 프로젝트가 완료되지 않았습니다.");
        nav(-1, { replace: true });
      }
    } catch (error) {
      console.error("Error fetching team completed", error);
      alert("팀 완료 여부를 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // 백엔드 데이터 처리될 때까지 대기
      // 초기 데이터 로드
      fetchIsTeamCompleted();
      fetchEvaluatedListData();
    }, 1000);

    // 폴링 설정
    if (!pollingInterval) {
      pollingInterval = setInterval(fetchEvaluatedListData, 5000); // 5초마다 데이터 요청
    }

    // 컴포넌트 언마운트 시 폴링 중지
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
      }
    };
  }, [teamId, loginUserId]);

  const onChangePromise = (value) => {
    setFeedback({
      ...feedback,
      promise: Number(value)
    });
    setPromiseValue(value);
  };
  const onChangeFrequency = (value) => {
    setFeedback({
      ...feedback,
      frequency: Number(value)
    });
    setFrequencyValue(value);
  };
  const onChangeParticipate = (value) => {
    setFeedback({
      ...feedback,
      participate: Number(value)
    });
    setParticipateValue(value);
  };
  const onChangeKindness = (value) => {
    setFeedback({
      ...feedback,
      kindness: Number(value)
    });
    setKindnessValue(value);
  };

  const isValidate = () => {
    if (!selectedMemberId) {
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
    try {
      onSubmitFeedback(teamId, String(loginUserId), String(selectedMemberId), {
        ...feedback
      });
    } catch (error) {
      console.error("Error fetching evaluate member", error);
      throw error;
    }

    setSelectedMemberId(null);
    setPromiseValue(null);
    setFrequencyValue(null);
    setParticipateValue(null);
    setKindnessValue(null);
    setFeedback(null);
  };

  const onClickFinish = () => {
    if (!isValidate()) return;
    try {
      onSubmitFeedback(teamId, String(loginUserId), String(selectedMemberId), {
        ...feedback
      });
    } catch (error) {
      console.error("Error fetching evaluate member", error);
      throw error;
    }
    alert("팀원 평가를 완료합니다.");

    setSelectedMemberId(null);
    setPromiseValue(null);
    setFrequencyValue(null);
    setParticipateValue(null);
    setKindnessValue(null);
    setFeedback(null);

    nav("/myproj/attendproj", { replace: true });
  };

  return (
    <div className={styles.teamFeedback}>
      {loading && <Loading />}
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
          {membersExcludingSelf.map((member, index) => (
            <MemberItem
              key={index}
              memberName={member.userName}
              profilePic={member.profileImageUrl}
              type={
                isCompletedMember(member.userId, evaluatedList)
                  ? "COMPLETED"
                  : String(selectedMemberId) === String(member.userId)
                    ? "ONLYBORDER_SELECTED"
                    : "ONLYBORDER"
              }
              onClick={() => {
                setSelectedMemberId(member.userId);
              }}
            />
          ))}
        </div>
        <div className={styles.teamFeedback__formContainer}>
          <div className={styles.teamFeedback__form}>
            <FeedbackFormItem
              targetId={selectedMemberId}
              question={"시간 / 기한은 잘 지켰나요?"}
              answer={promiseValue}
              onChange={onChangePromise}
            />
            <FeedbackFormItem
              targetId={selectedMemberId}
              question={"답장 속도는 적절했나요?"}
              answer={frequencyValue}
              onChange={onChangeFrequency}
            />
            <FeedbackFormItem
              targetId={selectedMemberId}
              question={"적극적으로 프로젝트에 참여했나요?"}
              answer={participateValue}
              onChange={onChangeParticipate}
            />
            <FeedbackFormItem
              targetId={selectedMemberId}
              question={"상대방을 존중하고 배려했나요?"}
              answer={kindnessValue}
              onChange={onChangeKindness}
            />
          </div>
        </div>
        <div className={styles.teamFeedback__submitButton}>
          {feedbackData.length >= membersExcludingSelf.length - 1 ? (
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
